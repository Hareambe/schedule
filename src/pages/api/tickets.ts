import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase';
import { ref, push, get, update } from 'firebase/database';

type Ticket = {
    id?: string;
    subject: string;
    topic: string;
    resolved: boolean;
    username: string; // User who created the ticket
};

// Response handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'POST':
            // Create a new ticket
            return createTicket(req, res);
        case 'GET':
            // Fetch all tickets
            return fetchTickets(req, res);
        case 'PUT':
            // Update a ticket (e.g., mark as resolved)
            return updateTicket(req, res);
        default:
            // Method not allowed
            res.setHeader('Allow', ['POST', 'GET', 'PUT']);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}

// Create a new ticket
async function createTicket(req: NextApiRequest, res: NextApiResponse) {
    const { subject, topic, username } = req.body as Ticket;

    if (!subject || !topic || !username) {
        return res.status(400).json({ error: 'Subject, topic, and username are required.' });
    }

    try {
        const newTicket = { subject, topic, resolved: false, username };
        const ticketRef = await push(ref(db, 'tickets'), newTicket);
        res.status(201).json({ id: ticketRef.key, ...newTicket });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create ticket', details: error });
    }
}

// Fetch all tickets
async function fetchTickets(req: NextApiRequest, res: NextApiResponse) {
    try {
        const snapshot = await get(ref(db, 'tickets'));
        const tickets = snapshot.val();

        // Transform tickets object into an array
        const ticketsArray = tickets
            ? Object.keys(tickets).map((key) => ({ id: key, ...tickets[key] }))
            : [];

        res.status(200).json(ticketsArray);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tickets', details: error });
    }
}

// Update a ticket (e.g., mark as resolved)
async function updateTicket(req: NextApiRequest, res: NextApiResponse) {
    const { id, resolved } = req.body;

    if (!id || typeof resolved !== 'boolean') {
        return res.status(400).json({ error: 'Ticket ID and resolved status are required.' });
    }

    try {
        await update(ref(db, `tickets/${id}`), { resolved });
        res.status(200).json({ message: 'Ticket updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update ticket', details: error });
    }
}

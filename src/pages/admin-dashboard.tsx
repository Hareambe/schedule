import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { onValue, ref, update } from 'firebase/database';

type Ticket = {
    id: string;
    subject: string;
    topic: string;
    resolved: boolean;
    username: string;
};

const AdminDashboard: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        const unsubscribe = onValue(ref(db, 'tickets'), (snapshot) => {
            const data = snapshot.val() || {};
            const allTickets = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            setTickets(allTickets);
        });

        return () => unsubscribe();
    }, []);

    const markAsResolved = async (id: string) => {
        await update(ref(db, `tickets/${id}`), { resolved: true });
        alert('Ticket marked as resolved!');
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {tickets.map((ticket) => (
                <div key={ticket.id}>
                    <p><strong>User:</strong> {ticket.username}</p>
                    <p><strong>Subject:</strong> {ticket.subject}</p>
                    <p><strong>Topic:</strong> {ticket.topic}</p>
                    <p><strong>Resolved:</strong> {ticket.resolved ? 'Yes' : 'No'}</p>
                    {!ticket.resolved && (
                        <button onClick={() => markAsResolved(ticket.id)}>Mark as Resolved</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AdminDashboard;

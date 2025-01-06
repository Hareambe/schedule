import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { onValue, ref } from 'firebase/database';

type Ticket = {
    id: string;
    subject: string;
    topic: string;
    resolved: boolean;
};

const UserDashboard: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        const unsubscribe = onValue(ref(db, 'tickets'), (snapshot) => {
            const data = snapshot.val() || {};
            const userTickets = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            setTickets(userTickets);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h1>Your Tickets</h1>
            {tickets.map((ticket) => (
                <div key={ticket.id}>
                    <p><strong>Subject:</strong> {ticket.subject}</p>
                    <p><strong>Topic:</strong> {ticket.topic}</p>
                    <p><strong>Resolved:</strong> {ticket.resolved ? 'Yes' : 'No'}</p>
                </div>
            ))}
        </div>
    );
};

export default UserDashboard;

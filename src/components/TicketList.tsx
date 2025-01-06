import React from 'react';

type Ticket = {
    id: string;
    subject: string;
    topic: string;
    resolved: boolean;
};

type TicketListProps = {
    tickets: Ticket[];
    onViewDetails: (ticketId: string) => void;
};

const TicketList: React.FC<TicketListProps> = ({ tickets, onViewDetails }) => (
    <div>
        {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-item">
                <p>
                    <strong>Subject:</strong> {ticket.subject}{' '}
                    <span style={{ color: ticket.resolved ? 'green' : 'red' }}>
            {ticket.resolved ? '(Resolved)' : '(Unresolved)'}
          </span>
                </p>
                <p>
                    <strong>Topic:</strong> {ticket.topic}
                </p>
                <button onClick={() => onViewDetails(ticket.id)}>View Details</button>
            </div>
        ))}
    </div>
);

export default TicketList;

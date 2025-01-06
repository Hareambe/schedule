import React, { useState } from 'react';

type Message = {
    sender: string;
    text: string;
    isAdmin: boolean;
};

type TicketDetailsProps = {
    ticket: {
        id: string;
        subject: string;
        topic: string;
        messages: Message[];
        resolved: boolean;
    };
    onSendMessage: (message: string) => void;
    onResolve?: () => void;
};

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket, onSendMessage, onResolve }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <div>
            <h2>{ticket.subject}</h2>
            <p>{ticket.topic}</p>
            <h3>Messages</h3>
            <div>
                {ticket.messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            {!ticket.resolved && onResolve && (
                <button onClick={onResolve}>Mark as Resolved</button>
            )}
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
            ></textarea>
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default TicketDetails;

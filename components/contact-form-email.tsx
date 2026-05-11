import * as React from 'react';

interface ContactFormEmailProps {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export function ContactFormEmail({ name, email, subject, message }: ContactFormEmailProps) {
    return (
        <div>
            <h1>Welcome, {name}!</h1>
            <h1>Email, {email}!</h1>
            <h1>Welcome, {subject}!</h1>
            <h1>Message, {message}!</h1>
        </div>
    );
}
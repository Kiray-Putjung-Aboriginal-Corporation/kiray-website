import {Resend} from "resend";


export async function POST(request: Request) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const body = await request.json();

        const name = String(body.name ?? "").trim();
        const email = String(body.email ?? "").trim();
        const emailSubject = String(body.subject ?? "").trim();
        const message = String(body.message ?? "").trim();

        if (!name || !email || !emailSubject || !message) {
            return Response.json(
                {error: "Name, email, subject and message required"},
                {status: 400}
            );
        }

        const {data, error} = await resend.emails.send({
            from: "Kiray Website Contact <noreply@kiray.org>",
            to: [process.env.CONTACT_EMAIL ?? "contact@kiray.org"],
            replyTo: email,
            subject: `New contact form submission from ${name}`,
            text: `
            Name: ${name}
            Email: ${email}
            Subject: ${emailSubject}
            Message:${message}
            `,
            html: `
            <h2>New contact form message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${emailSubject}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p>${message.replace(/\n/g, "<br />")}</p>
            `
        });

        if (error) {
            return Response.json({error}, {status: 500});
        }

        return Response.json({success: true, data});
    } catch (error) {
        return Response.json(
            {error: "Something went wrong sending the email, please try again later"},
            {status: 500}
        );
    }
}
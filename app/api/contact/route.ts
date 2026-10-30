import {Resend} from "resend";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const emailSubject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !emailSubject || !message) {
      return Response.json({error: "Name, email, subject and message are required."}, {status: 400});
    }

    if (name.length > 100 || email.length > 254 || emailSubject.length > 150 || message.length > 5000) {
      return Response.json({error: "One or more fields are too long."}, {status: 400});
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(emailSubject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const {data, error} = await resend.emails.send({
      from: "Kiray Website Contact <noreply@kiray.org>",
      to: [process.env.CONTACT_EMAIL ?? "contact@kiray.org"],
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${emailSubject}\nMessage:\n${message}`,
      html: `
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong><br />${safeMessage}</p>
      `,
    });

    if (error) {
      return Response.json({error: "The message could not be sent."}, {status: 500});
    }

    return Response.json({success: true, data});
  } catch {
    return Response.json({error: "Something went wrong sending the email. Please try again later."}, {status: 500});
  }
}

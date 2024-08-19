import { Resend } from "resend";

const resend = new Resend(process.env.VITE_RESEND_API_KEY);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await resend.emails.send({
    from: "Inkwell <onboarding@resend.dev>",
    to: "evany0226@gmail.com",
    subject: body.subject,
    html: `<p>This is a reminder from Inkwell notifying you to complete your task: ${body.subject} </p>`,
    scheduledAt: body.date,
  });

  const headers = {
    "Access-Control-Allow-Origin": "*", // Allow any origin
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS", // Allow specific methods
    "Access-Control-Allow-Headers": "Content-Type", // Allow specific headers
  };

  if (error) {
    return new Response(`Failed: ${error.message}`, { status: 200, headers });
  }

  console.log({ data });

  return new Response(`Successfully send email: ${data}`, {
    status: 200,
    headers,
  });
}

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const message = String(body?.message ?? "").trim();

    // Anti-spam (campo oculto)
    const company = String(body?.company ?? "").trim();
    if (company) return NextResponse.json({ ok: true }, { status: 200 });

    if (name.length < 2) return NextResponse.json({ ok: false, error: "Nombre inválido" }, { status: 400 });
    if (!isEmail(email)) return NextResponse.json({ ok: false, error: "Email inválido" }, { status: 400 });
    if (message.length < 10) return NextResponse.json({ ok: false, error: "Mensaje muy corto" }, { status: 400 });

    const to = "admin@eliteprotectionmexico.com";
    const from = process.env.CONTACT_FROM_EMAIL || "Elite Contact <onboarding@resend.dev>";

    const subject = `Nuevo contacto — ${name}`;

    const text = [
      "Nuevo mensaje desde el formulario ELITE",
      "",
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Teléfono: ${phone || "—"}`,
      "",
      "Mensaje:",
      message,
    ].join("\n");

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      replyTo: email,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: "No se pudo enviar email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida" }, { status: 400 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { subject, content } = await request.json();

    // Configuration du transporteur
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'gerernoscommandes@gmail.com',
        pass: 'sjui nygc otpy vwrp',
      },
    });

    // Configuration de l'email
    const mailOptions = {
      from: '"objekté" <gerernoscommandes@gmail.com>',
      to: 'gerernoscommandes@gmail.com',
      subject: subject || 'Nouvelle commande objekté',
      text: content,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1A1A1A; border-bottom: 1px solid #E1E1E1; padding-bottom: 10px;">
            🚀 NOUVELLE COMMANDE objekté
          </h2>
          <div style="background-color: #F5F2ED; padding: 20px; border-radius: 4px; margin: 20px 0;">
            <pre style="font-family: monospace; white-space: pre-wrap; color: #1A1A1A;">
${content}
            </pre>
          </div>
          <p style="color: #666666; font-size: 12px;">
            ⏰ Action requise : Préparer la livraison et contacter le client.
          </p>
        </div>
      `,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email envoyé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}

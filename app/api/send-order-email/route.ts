import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, text, html } = await request.json();

    // Configuration du transporteur Gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'gerernoscommandes@gmail.com',
        pass: 'sjui nygc otpy vwrp', // Mot de passe d'application Gmail
      },
    });

    // Configuration de l'email
    const mailOptions = {
      from: '"objekté" <gerernoscommandes@gmail.com>',
      to: to || 'gerernoscommandes@gmail.com',
      subject: subject || 'Nouvelle commande objekté',
      text: text || '',
      html: html || `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1A1A1A; border-bottom: 1px solid #E1E1E1; padding-bottom: 10px;">
            🚀 NOUVELLE COMMANDE objekté
          </h2>
          <div style="background-color: #F5F2ED; padding: 20px; border-radius: 4px; margin: 20px 0;">
            ${text ? `<pre style="font-family: monospace; white-space: pre-wrap; color: #1A1A1A;">${text}</pre>` : ''}
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
  } catch (error: any) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur lors de l\'envoi de l\'email',
        error: error.message 
      },
      { status: 500 }
    );
  }
}

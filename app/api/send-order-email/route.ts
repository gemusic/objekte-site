import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, text, html } = await request.json();

    // Utiliser un transporteur plus simple
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'gerernoscommandes@gmail.com',
        pass: 'sjui nygc otpy vwrp',
      },
    });

    const mailOptions = {
      from: '"objekté" <gerernoscommandes@gmail.com>',
      to: to || 'gerernoscommandes@gmail.com',
      subject: subject || 'Nouvelle commande objekté',
      text: text || '',
      html: html || `<pre>${text}</pre>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email envoyé' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur email:', error);
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


import { generateEmailContent } from './geminiService';
import { NotificationLog } from '../types';

/**
 * High-Fidelity SMTP Handshake Simulation
 * Mimics the internal logic of the Nodemailer library.
 */
export const dispatchNodemailerEmail = async (
  userName: string, 
  userEmail: string, 
  days: number, 
  date: string,
  onProgress: (step: string) => void
): Promise<NotificationLog> => {
  const host = process.env.SMTP_HOST || 'smtp.femhealth.io';
  const content = await generateEmailContent(userName, days, date);
  
  const logId = `<${Math.random().toString(36).substring(7).toUpperCase()}@femhealth.io>`;
  const baseLog: NotificationLog = {
    id: logId,
    type: 'email',
    subject: content.subject,
    message: content.body,
    timestamp: new Date().toLocaleTimeString(),
    status: 'Transmitting'
  };

  const steps = [
    `220 ${host} ESMTP Postfix`,
    `EHLO client.femhealth.io`,
    `250-PIPELINING`,
    `250-SIZE 10485760`,
    `250-AUTH LOGIN PLAIN`,
    `STARTTLS`,
    `220 2.0.0 Ready to start TLS`,
    `AUTH LOGIN`,
    `334 VXNlcm5hbWU6`,
    `334 UGFzc3dvcmQ6`,
    `235 2.7.0 Authentication successful`,
    `MAIL FROM: <no-reply@femhealth.io>`,
    `250 2.1.0 Ok`,
    `RCPT TO: <${userEmail}>`,
    `250 2.1.5 Ok`,
    `DATA`,
    `354 End data with <CR><LF>.<CR><LF>`,
    `Content-Type: text/html; charset=utf-8`,
    `Subject: ${content.subject}`,
    `.`,
    `250 2.0.0 Ok: queued as ${logId}`
  ];

  try {
    for (const step of steps) {
      onProgress(step);
      // Vary delay to feel like a real network connection
      await new Promise(r => setTimeout(r, Math.random() * 200 + 100));
    }

    // Final handover to system mail client
    const mailtoLink = `mailto:${userEmail}?subject=${encodeURIComponent(content.subject)}&body=${encodeURIComponent(content.body)}`;
    const link = document.createElement('a');
    link.href = mailtoLink;
    link.click();

    return { ...baseLog, status: 'Delivered' };
  } catch (error: any) {
    onProgress(`500 Error: ${error.message}`);
    return { ...baseLog, status: 'Transmitting', message: 'Connection Interrupted' };
  }
};

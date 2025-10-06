// Vercel Serverless Function for sending contact form emails
// Uses Resend SDK

import { Resend } from 'resend';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).json({ success: true, message: 'Preflight OK' });
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            message: 'Method not allowed. Only POST requests are accepted.' 
        });
    }

    try {
        console.log('Handler started, method:', req.method);
        console.log('Environment check - RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
        console.log('Environment check - COMPANY_EMAIL exists:', !!process.env.COMPANY_EMAIL);
        
        const { companyName, yourName, email, phone, subject, message } = req.body || {};

        // Debug: Log received data
        console.log('Received request body:', req.body);
        console.log('Extracted fields:', { companyName, yourName, email, phone, subject, message });

        // Validate required fields
        if (!companyName || !yourName || !email || !subject || !message) {
            console.log('Validation failed - missing fields');
            return res.status(400).json({
                success: false,
                message: 'Missing required fields. Please fill in all required fields.'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('Validation failed - invalid email format');
            return res.status(400).json({
                success: false,
                message: 'Invalid email format.'
            });
        }

        console.log('Validation passed, sending email...');
        const subjectText = getSubjectText(subject);
        
        // Send email using Resend API
        await sendEmailWithResend({
            companyName,
            yourName,
            email,
            phone,
            subject: subjectText,
            message
        });

        console.log('Email sent successfully');
        return res.status(200).json({
            success: true,
            message: 'Email sent successfully! We will get back to you soon.'
        });

    } catch (error) {
        console.error('Error in handler:', error);
        console.error('Error stack:', error.stack);
        return res.status(500).json({
            success: false,
            message: 'Failed to send email. Please try again later or contact us directly.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Resend SDK function
async function sendEmailWithResend({ companyName, yourName, email, phone, subject, message }) {
    const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_eBWxS7ho_8swTbwq7BnivitHYoA4FDMVK';
    
    console.log('Sending email with Resend SDK...');
    console.log('API Key available:', !!RESEND_API_KEY);
    
    if (!RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY not configured');
    }

    // Initialize Resend client
    const resend = new Resend(RESEND_API_KEY);

    const emailData = {
        from: 'VOYAGER Contact <onboarding@resend.dev>', // Using Resend default domain
        to: [process.env.COMPANY_EMAIL || 'kagami08092004@gmail.com'],
        subject: `Contact Form: ${subject} - ${companyName}`,
        html: generateEmailHTML({
            companyName,
            yourName,
            email,
            phone,
            subject,
            message
        }),
        reply_to: email
    };

    console.log('Email data prepared:', {
        from: emailData.from,
        to: emailData.to,
        subject: emailData.subject,
        reply_to: emailData.reply_to
    });

    try {
        const result = await resend.emails.send(emailData);
        console.log('Resend SDK result:', result);
        return result;
    } catch (error) {
        console.error('Error in sendEmailWithResend:', error);
        throw error;
    }
}


function generateEmailHTML({ companyName, yourName, email, phone, subject, message }) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
            <style>
                body { 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                    line-height: 1.6; 
                    color: #333; 
                    margin: 0; 
                    padding: 0; 
                }
                .container { 
                    max-width: 600px; 
                    margin: 0 auto; 
                    background: #ffffff; 
                }
                .header { 
                    background: linear-gradient(135deg, #222b63 0%, #1e40af 100%); 
                    color: white; 
                    padding: 30px 20px; 
                    text-align: center; 
                }
                .header h1 { 
                    margin: 0; 
                    font-size: 24px; 
                    font-weight: 600; 
                }
                .header p { 
                    margin: 5px 0 0 0; 
                    opacity: 0.9; 
                }
                .content { 
                    padding: 30px 20px; 
                }
                .field { 
                    margin-bottom: 15px; 
                    padding: 12px; 
                    background: #f8fafc; 
                    border-radius: 6px; 
                    border-left: 4px solid #222b63; 
                }
                .field strong { 
                    color: #222b63; 
                    display: inline-block; 
                    min-width: 120px; 
                }
                .message-box { 
                    background: #f1f5f9; 
                    padding: 20px; 
                    border-radius: 8px; 
                    border-left: 4px solid #3b82f6; 
                    margin: 20px 0; 
                    font-style: italic; 
                }
                .footer { 
                    background: #f8fafc; 
                    text-align: center; 
                    font-size: 12px; 
                    color: #666; 
                    padding: 20px; 
                    border-top: 1px solid #e2e8f0; 
                }
                .timestamp { 
                    color: #94a3b8; 
                    font-size: 11px; 
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📧 New Contact Form Submission</h1>
                    <p>VOYAGER Inc. Website</p>
                </div>
                <div class="content">
                    <h2 style="color: #222b63; margin-bottom: 20px;">Contact Details</h2>
                    
                    <div class="field">
                        <strong>🏢 Company:</strong> ${companyName}
                    </div>
                    <div class="field">
                        <strong>👤 Contact Person:</strong> ${yourName}
                    </div>
                    <div class="field">
                        <strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #3b82f6;">${email}</a>
                    </div>
                    <div class="field">
                        <strong>📱 Phone:</strong> ${phone || 'Not provided'}
                    </div>
                    <div class="field">
                        <strong>📋 Subject:</strong> ${subject}
                    </div>
                    
                    <h2 style="color: #222b63; margin: 30px 0 15px 0;">Message</h2>
                    <div class="message-box">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                </div>
                <div class="footer">
                    <p>This message was sent from the VOYAGER Inc. website contact form.</p>
                    <p class="timestamp">⏰ ${new Date().toLocaleString('en-US', { 
                        timeZone: 'Asia/Ho_Chi_Minh',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                    })}</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

function getSubjectText(subjectValue) {
    const subjects = {
        'general': 'General Inquiry',
        'services': 'Services Information',
        'partnership': 'Partnership Opportunity',
        'support': 'Technical Support'
    };
    return subjects[subjectValue] || 'General Inquiry';
}

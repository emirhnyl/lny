import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    smtp_configured: {
      host: process.env.SMTP_HOST || 'NOT_SET',
      port: process.env.SMTP_PORT || 'NOT_SET', 
      user: process.env.SMTP_USER || 'NOT_SET',
      pass: process.env.SMTP_PASS ? 'SET' : 'NOT_SET'
    },
    resend_configured: process.env.RESEND_API_KEY ? 'SET' : 'NOT_SET'
  })
}

export async function POST() {
  try {
    // Test Hostinger SMTP
    const nodemailer = await import('nodemailer')
    
    const port = parseInt(process.env.SMTP_PORT || '587')
    const secure = port === 465
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Verify SMTP connection
    await transporter.verify()
    
    // Send test email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"LnY Test" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || 'info@lnarge.com',
      subject: '🧪 Test Email - Hostinger SMTP',
      html: `
        <h2>Test Email</h2>
        <p>Bu email Hostinger SMTP ile gönderilmiştir.</p>
        <p>Zaman: ${new Date().toLocaleString('tr-TR')}</p>
      `
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully via Hostinger SMTP' 
    })

  } catch (error: any) {
    console.error('SMTP Test Error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      details: error
    }, { status: 500 })
  }
}
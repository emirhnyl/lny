import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

interface ContactData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
  file: File | null
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const data: ContactData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
      file: formData.get('file') as File | null,
    }

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Ad, email ve mesaj zorunlu alanlardir' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Gecersiz email formatı' },
        { status: 400 }
      )
    }

    let filePath: string | null = null

    // Handle file upload if present
    if (data.file && data.file.size > 0) {
      const allowedTypes = [
        'application/pdf',
        'application/step',
        'application/vnd.step',
        'application/sla',
        'application/dwg',
        'image/vnd.dwg',
        'model/step',
        'model/step+xml',
        'application/x-step',
        'text/plain'
      ]
      
      const allowedExtensions = ['.pdf', '.step', '.stp', '.dwg', '.glb', '.gltf', '.obj', '.stl']
      
      const fileExtension = data.file.name.toLowerCase().slice(data.file.name.lastIndexOf('.'))
      
      if (!allowedTypes.includes(data.file.type) && !allowedExtensions.includes(fileExtension)) {
        return NextResponse.json(
          { error: 'Dosya türü desteklenmiyor. PDF, STEP, DWG, GLB veya STL dosyaları yükleyebilirsiniz.' },
          { status: 400 }
        )
      }

      // Check file size (25MB limit)
      if (data.file.size > 25 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Dosya boyutu çok büyük. Maksimum boyut 25MB.' },
          { status: 400 }
        )
      }

      // Save file to uploads directory
      try {
        const uploadsDir = join(process.cwd(), 'uploads')
        if (!existsSync(uploadsDir)) {
          await mkdir(uploadsDir, { recursive: true })
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        const fileName = `${timestamp}-${data.file.name}`
        filePath = join(uploadsDir, fileName)

        const bytes = await data.file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        await writeFile(filePath, buffer)

        console.log(`File uploaded: ${fileName}`)
      } catch (error) {
        console.error('File upload error:', error)
        return NextResponse.json(
          { error: 'Dosya yükleme hatası' },
          { status: 500 }
        )
      }
    }

    // Send email using Hostinger SMTP
    try {
      // Try Hostinger SMTP first
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        const nodemailer = await import('nodemailer')
        
        const port = parseInt(process.env.SMTP_PORT || '587')
        const secure = port === 465
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port,
          secure, // true for 465 (SSL), false for 587 (STARTTLS)
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })

        const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #F5C10E 0%, #E5B004 100%); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #000; margin: 0; font-size: 24px;">🚀 LnY - Yeni İletişim Formu</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #333; margin-top: 0;">İletişim Bilgileri</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Ad Soyad:</td>
                <td style="padding: 8px 0; color: #333;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; color: #333;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Telefon:</td>
                <td style="padding: 8px 0; color: #333;">${data.phone || 'Belirtilmemiş'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Şirket:</td>
                <td style="padding: 8px 0; color: #333;">${data.company || 'Belirtilmemiş'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Hizmet:</td>
                <td style="padding: 8px 0; color: #333;">${data.service || 'Belirtilmemiş'}</td>
              </tr>
            </table>
            
            <h3 style="color: #333; margin-top: 20px;">Mesaj:</h3>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #F5C10E;">
              <p style="margin: 0; color: #333; white-space: pre-line;">${data.message}</p>
            </div>
            
            ${data.file && filePath ? `
            <h3 style="color: #333; margin-top: 20px;">Ek Dosya:</h3>
            <p style="margin: 5px 0; color: #666;">
              📎 ${data.file.name} (${(data.file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
            ` : ''}
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
              <p>Bu mesaj LnY web sitesi iletişim formu üzerinden gönderilmiştir.</p>
              <p>Gönderim Zamanı: ${new Date().toLocaleString('tr-TR')}</p>
            </div>
          </div>
        </div>
        `

        // Build attachments if file was provided
        const attachments = [] as Array<{ filename: string; content: Buffer }>
        if (data.file && data.file.size > 0) {
          const fileBuffer = Buffer.from(await data.file.arrayBuffer())
          attachments.push({ filename: data.file.name, content: fileBuffer })
        }

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"LnY İletişim" <${process.env.SMTP_USER}>`,
          to: process.env.MAIL_TO || 'info@lnarge.com',
          subject: `🚀 LnY İletişim: ${data.name} - ${data.service || 'Genel'}`,
          html: emailHtml,
          replyTo: data.email,
          attachments: attachments.length ? attachments : undefined,
        })

        console.log('Email sent successfully via Hostinger SMTP')
      }
      // Fallback to Resend if Hostinger fails
      else if (process.env.RESEND_API_KEY) {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #F5C10E 0%, #E5B004 100%); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #000; margin: 0; font-size: 24px;">🚀 Ln-ArGe - İletişim Formu</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #333; margin-top: 0;">İletişim Bilgileri</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Ad Soyad:</td>
                <td style="padding: 8px 0; color: #333;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; color: #333;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Telefon:</td>
                <td style="padding: 8px 0; color: #333;">${data.phone || 'Belirtilmemiş'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Şirket:</td>
                <td style="padding: 8px 0; color: #333;">${data.company || 'Belirtilmemiş'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Hizmet:</td>
                <td style="padding: 8px 0; color: #333;">${data.service || 'Belirtilmemiş'}</td>
              </tr>
            </table>
            
            <h3 style="color: #333; margin-top: 20px;">Mesaj:</h3>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #F5C10E;">
              <p style="margin: 0; color: #333; white-space: pre-line;">${data.message}</p>
            </div>
            
            ${data.file && filePath ? `
            <h3 style="color: #333; margin-top: 20px;">Ek Dosya:</h3>
            <p style="margin: 5px 0; color: #666;">
              📎 ${data.file.name} (${(data.file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
            ` : ''}
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
              <p>Bu mesaj LnY web sitesi iletişim formu üzerinden gönderilmiştir.</p>
              <p>Gönderim Zamanı: ${new Date().toLocaleString('tr-TR')}</p>
            </div>
          </div>
        </div>
        `

        await resend.emails.send({
          from: process.env.SMTP_FROM || 'LnY İletişim <noreply@lnarge.com>', // Kendi domain'iniz
          to: [process.env.MAIL_TO || 'info@lnarge.com'],
          subject: `🚀 LnY İletişim: ${data.name} - ${data.service || 'Genel'}`,
          html: emailHtml,
          replyTo: data.email,
        })

        console.log('Email sent successfully via Resend')
      } else {
        console.log('No email service configured, skipping email')
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the request if email fails
    }

    // Log successful submission
    console.log('Contact form submission:', {
      ...data,
      file: data.file ? { 
        name: data.file.name, 
        size: data.file.size, 
        type: data.file.type,
        savedPath: filePath 
      } : null,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json(
      { 
        message: 'Form başarıyla gönderildi! En kısa sürede size dönüş yapacağız.',
        fileUploaded: !!filePath
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    )
  }
}

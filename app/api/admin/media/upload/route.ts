import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { writeFile } from "fs/promises"
import { join } from "path"
import { prisma } from "@/lib/prisma"
import { mkdir } from "fs/promises"

// Configure route for large file uploads
export const maxDuration = 60 // 60 seconds timeout
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const files = formData.getAll("files") as File[]
    const folder = formData.get("folder") as string || ""

    const uploadedFiles = []

    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Create unique filename
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 15)
      const extension = file.name.split(".").pop()
      const filename = `${timestamp}-${randomString}.${extension}`

      // Determine upload path based on file type
      let uploadPath = "public/uploads"
      if (file.type.startsWith("image/")) {
        uploadPath = "public/images/uploads"
      } else if (file.name.endsWith(".glb")) {
        uploadPath = "public/models/uploads"
      }

      if (folder) {
        uploadPath = `${uploadPath}/${folder}`
      }

      // Ensure directory exists
      const dirPath = join(process.cwd(), uploadPath)
      await mkdir(dirPath, { recursive: true })

      const path = join(process.cwd(), uploadPath, filename)
      await writeFile(path, buffer)

      // Save to database
      const url = `${uploadPath.replace("public", "")}/${filename}`
      const media = await prisma.media.create({
        data: {
          filename,
          originalName: file.name,
          mimeType: file.type,
          size: file.size,
          url,
          folder: folder || null
        }
      })

      uploadedFiles.push(media)
    }

    // Auto-restart PM2 in production to serve new static files
    if (process.env.NODE_ENV === 'production') {
      try {
        const { exec } = require('child_process')
        exec('pm2 restart lny-website', (error: any) => {
          if (error) {
            console.error('PM2 restart error:', error)
          } else {
            console.log('PM2 restarted successfully after file upload')
          }
        })
      } catch (error) {
        console.error('PM2 restart failed:', error)
      }
    }

    return NextResponse.json({ files: uploadedFiles })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { writeFile } from "fs/promises"
import { join } from "path"
import { prisma } from "@/lib/prisma"

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

    return NextResponse.json({ files: uploadedFiles })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

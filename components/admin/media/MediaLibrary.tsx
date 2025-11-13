"use client"

import { useState } from "react"
import { Upload, X, FolderOpen, Image as ImageIcon, FileText } from "lucide-react"
import { toast } from "sonner"

interface MediaLibraryProps {
  files: any[]
  folders: string[]
  totalPages: number
  currentPage: number
}

export default function MediaLibrary({ files, folders, totalPages, currentPage }: MediaLibraryProps) {
  const [uploading, setUploading] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState("")

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList || fileList.length === 0) return

    setUploading(true)

    try {
      const formData = new FormData()
      Array.from(fileList).forEach((file) => {
        formData.append("files", file)
      })
      
      if (selectedFolder) {
        formData.append("folder", selectedFolder)
      }

      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData
      })

      if (!res.ok) throw new Error()

      toast.success("Dosyalar yüklendi")
      window.location.reload()
    } catch {
      toast.error("Yükleme başarısız")
    } finally {
      setUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i]
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return <ImageIcon className="w-8 h-8" />
    return <FileText className="w-8 h-8" />
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Dosya Yükle
          </h3>
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
          >
            <option value="">Ana Klasör</option>
            {folders.map((folder) => (
              <option key={folder} value={folder}>{folder}</option>
            ))}
            <option value="__new__">+ Yeni Klasör</option>
          </select>
        </div>

        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Dosya seçmek için tıklayın</span> veya sürükleyip bırakın
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              PNG, JPG, GLB, PDF (MAX. 10MB)
            </p>
          </div>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
            accept="image/*,.glb,.pdf"
          />
        </label>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="group relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex flex-col items-center space-y-2">
              {file.mimeType.startsWith("image/") ? (
                <img
                  src={file.url}
                  alt={file.originalName}
                  className="w-full h-24 object-cover rounded"
                />
              ) : (
                <div className="w-full h-24 flex items-center justify-center text-gray-400">
                  {getFileIcon(file.mimeType)}
                </div>
              )}
              <div className="w-full text-center">
                <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                  {file.originalName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => {
                navigator.clipboard.writeText(file.url)
                toast.success("URL kopyalandı")
              }}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 bg-primary text-dark rounded transition-opacity"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {files.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          Henüz dosya yüklenmemiş
        </div>
      )}
    </div>
  )
}

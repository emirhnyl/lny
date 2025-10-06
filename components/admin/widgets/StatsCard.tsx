"use client"

import { FileText, FolderOpen, Mail, TrendingUp, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  iconName: "FileText" | "FolderOpen" | "Mail" | "TrendingUp" | "BarChart"
  trend?: {
    value: number
    isPositive: boolean
  }
  color: "blue" | "green" | "yellow" | "purple" | "red" | "orange"
}

const iconMap = {
  FileText,
  FolderOpen,
  Mail,
  TrendingUp,
  BarChart
}

const colorClasses = {
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  green: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  yellow: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  red: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
  orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
}

export default function StatsCard({ title, value, iconName, trend, color }: StatsCardProps) {
  const Icon = iconMap[iconName]
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {trend && (
            <p className={cn(
              "text-sm mt-2",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              {trend.isPositive ? "↑" : "↓"} {trend.value}% bu ay
            </p>
          )}
        </div>
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center",
          colorClasses[color]
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}

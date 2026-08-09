"use client"

import { Badge } from "@/components/ui/badge"

type StatusType = "Active" | "Pending" | "Completed" | string

interface StatusBadgeProps {
  status: StatusType
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = (status: StatusType) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-200 border-green-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200"
      case "Completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200"
    }
  }

  return (
    <Badge variant="outline" className={`font-medium ${getStatusStyles(status)}`}>
      {status}
    </Badge>
  )
}
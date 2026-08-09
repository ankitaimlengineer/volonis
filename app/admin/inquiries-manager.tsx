"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "./status-badge"
import { Mail, Trash2, Eye } from "lucide-react"

interface Inquiry {
  id: string
  name: string
  email: string
  subject: string
  status: "Pending" | "Completed"
  date: string
}

export function InquiriesManager() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    { id: "1", name: "કિશનભાઈ પટેલ", email: "kishan@gmail.com", subject: "કૃષિ ઈન્ફો વેબસાઇટ વિશે માહિતી", status: "Pending", date: "2026-06-01" },
    { id: "2", name: "રમેશભાઈ સોની", email: "ramesh@gmail.com", subject: "જ્વેલરી શોપ સોફ્ટવેર પૂછપરછ", status: "Completed", date: "2026-06-03" },
  ])

  const handleDelete = (id: string) => {
    setInquiries(inquiries.filter((item) => item.id !== id))
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">ગ્રાહક પૂછપરછ મેનેજમેન્ટ (Inquiries Manager)</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" /> કુલ પૂછપરછ: {inquiries.length}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>નામ</TableHead>
              <TableHead>ઇમેઇલ</TableHead>
              <TableHead>વિષય</TableHead>
              <TableHead>સ્ટેટસ</TableHead>
              <TableHead>તારીખ</TableHead>
              <TableHead className="text-right">એક્શન</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell className="font-medium">{inquiry.name}</TableCell>
                <TableCell>{inquiry.email}</TableCell>
                <TableCell>{inquiry.subject}</TableCell>
                <TableCell>
                  <StatusBadge status={inquiry.status} />
                </TableCell>
                <TableCell>{inquiry.date}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(inquiry.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
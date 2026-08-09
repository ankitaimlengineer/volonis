"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Order {
  id: string
  customerName: string
  productName: string
  time: string
  amount: string
  status: string
}

export function OrdersManager() {
  const [orders] = useState<Order[]>([
    {
      id: "1",
      customerName: "કિશનભાઈ પટેલ",
      productName: "કૃષિ ઈન્ફો (Krushi Info)",
      time: "2026-06-04, 10:30 AM",
      amount: "₹1,500",
      status: "Success"
    }
  ])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">ઓર્ડર અને વેચાણ રેકોર્ડ (Orders & Sales)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ગ્રાહકનું નામ</TableHead>
              <TableHead>પ્રોડક્ટ</TableHead>
              <TableHead>તારીખ અને સમય</TableHead>
              <TableHead>પેમેન્ટ રકમ</TableHead>
              <TableHead>સ્ટેટસ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.customerName}</TableCell>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.time}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
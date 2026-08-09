"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProjectForm() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [status, setStatus] = useState("Pending")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ title, category, status })
    alert("પ્રોજેક્ટ સફળતાપૂર્વક સેવ થઈ ગયો છે!")
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">નવો પ્રોજેક્ટ ઉમેરો / એડિટ કરો</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">પ્રોજેક્ટનું નામ</Label>
            id="title"
            <Input
              placeholder="દા.ત. કૃષિ ઈન્ફો અથવા JN Soni Jewellers"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">કેટેગરી</Label>
            <Input
              id="category"
              placeholder="દા.ત. Agriculture / E-Commerce"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">સ્ટેટસ</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="સ્ટેટસ પસંદ કરો" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline">
            રદ કરો
          </Button>
          <Button type="submit">સેવ કરો</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
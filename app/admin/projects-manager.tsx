"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "./status-badge"
import { Plus, Trash2, Edit } from "lucide-react"

interface Project {
  id: string
  title: string
  category: string
  status: "Active" | "Pending" | "Completed"
  date: string
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", title: "કૃષિ ઈન્ફો (Krushi Info)", category: "Agriculture", status: "Active", date: "2025-08-15" },
    { id: "2", title: "JN Soni Jewellers", category: "E-Commerce", status: "Pending", date: "2026-02-10" },
  ])

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">પ્રોજેક્ટ મેનેજમેન્ટ (Projects Manager)</CardTitle>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> નવો પ્રોજેક્ટ ઉમેરો
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>પ્રોજેક્ટનું નામ</TableHead>
              <TableHead>કેટેગરી</TableHead>
              <TableHead>સ્ટેટસ</TableHead>
              <TableHead>તારીખ</TableHead>
              <TableHead className="text-right">એક્શન</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>{project.category}</TableCell>
                <TableCell>
                  <StatusBadge status={project.status} />
                </TableCell>
                <TableCell>{project.date}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(project.id)}>
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
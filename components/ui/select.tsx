"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SelectProps extends React.ComponentProps<"select"> {
 onValueChange?: (value: string) => void
}

function Select({ children, value, onValueChange, className, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-lg border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}

function SelectTrigger({ className, children, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center justify-between w-full", className)} {...props}>{children}</div>
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span>{placeholder}</span>
}

function SelectContent({ children, ...props }: React.ComponentProps<"div">) {
  return <div {...props}>{children}</div>
}

function SelectItem({ value, children, ...props }: React.ComponentProps<"option"> & { value: string }) {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  )
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
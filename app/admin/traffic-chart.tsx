"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TrafficChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">વેબસાઇટ ટ્રાફિક ઓવરવ્યુ (Traffic Overview)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full flex items-center justify-center border border-dashed rounded-lg bg-muted/50">
          <div className="text-center text-muted-foreground">
            <p className="font-medium">ચાર્ટ ગ્રાફ વિસ્તાર (Chart Area)</p>
            <p className="text-sm">અહીં સાપ્તાહિક અથવા માસિક ટ્રાફિક ડેટા દેખાશે.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
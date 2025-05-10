import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export interface ReceivableData {
    year: string
    paid: number
    unpaid: number
    overdue: number
}

interface DashboardRevenueChartProps {
    invoices?: ReceivableData[]
}

const chartConfig = {
    paid: {
        label: "Paid",
        color: "hsl(var(--chart-1))",
    },
    unpaid: {
        label: "Unpaid",
        color: "hsl(var(--chart-2))",
    },
    overdue: {
        label: "Overdue",
        color: "#FF0000",
    },
 } satisfies ChartConfig

export default function DashboardReceivableChart({invoices} : DashboardRevenueChartProps) {
    return(
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={invoices} margin={{left: 0, right: 8, top: 8}} width={300}>
                <CartesianGrid vertical={false}/>
                <XAxis
                    dataKey={"year"}
                    tickMargin={8}
                />
                <YAxis
                    tickMargin={8}
                    tickFormatter={(value) => (value / 1000000).toLocaleString() + " JT"}
                />
                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            hideLabel
                            formatter={(value, name, item, index) => (
                                <>
                                  <div
                                    className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                    style={
                                      {
                                        "background-color": `var(--color-${name})`,
                                      } as React.CSSProperties
                                    }
                                  />
                                  {chartConfig[name as keyof typeof chartConfig]?.label ||
                                   name}
                                  <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                    Rp{Number(value) / 1000000}
                                     <span className="font-normal text-muted-foreground">
                                      JT
                                    </span>
                                  </div>
                                </>
                            )}
                        />
                    }
                />
                <Bar dataKey={"paid"} fill="var(--color-paid)" stroke="var(--color-paid)" radius={[4,4,0,0]}/>
                <Bar dataKey={"unpaid"} fill="var(--color-unpaid)" stroke="var(--color-unpaid)" stackId={"b"}/>
                <Bar dataKey={"overdue"} fill="var(--color-overdue)" stroke="var(--color-overdue)" radius={[4,4,0,0]} stackId={"b"}/>
                <ChartLegend
                    content={<ChartLegendContent />}
                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
            </BarChart>
        </ChartContainer>
    )
}

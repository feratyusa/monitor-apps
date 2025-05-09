import { Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "./ui/chart";

export interface SupplierChartData {
    kolekbilitas: string
    value: number,
}

interface DashboardSupplierKolChartProps {
    data: SupplierChartData[]
}

const config = {
    kolekbilitas: {
        label: "Kolekbilitas",
    },
    kol1: {
        label: "Kol 1",
        color: "hsl(var(--chart-1))"
    },
    kol2: {
        label: "Kol 2",
        color: "hsl(var(--chart-2))"
    },
    kol3: {
        label: "Kol 3",
        color: "hsl(var(--chart-3))"
    },
    kol4: {
        label: "Kol 4",
        color: "hsl(var(--chart-4))"
    },
    kol5: {
        label: "Kol 5",
        color: "hsl(var(--chart-5))"
    },
} satisfies ChartConfig

export default function DashboardSupplierKolChart({data} : DashboardSupplierKolChartProps) {

    const chartData = [
        {...data[0], fill: "var(--color-kol1)"},
        {...data[1], fill: "var(--color-kol2)"},
        {...data[2], fill: "var(--color-kol3)"},
        {...data[3], fill: "var(--color-kol4)"},
        {...data[4], fill: "var(--color-kol5)"},
    ]

    console.log(chartData)

    return(
        <ChartContainer config={config} className="min-h-[200px] w-full">
            <PieChart>
                <Pie data={chartData} dataKey={"value"} label nameKey={"kolekbilitas"}/>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend
                    content={<ChartLegendContent nameKey="kolekbilitas" />}

                />
            </PieChart>
        </ChartContainer>
    )
}

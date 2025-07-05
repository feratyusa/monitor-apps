import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dForecastMonth } from "@/dummy/dummy_data";
import AppLayout from "@/layouts/app-layout";
import { MONTH_NAME } from "@/lib/utils";
import { BreadcrumbItem } from "@/types";
import { ForecastMonth } from "@/types/local";
import { Head, router } from "@inertiajs/react";
import { ChartLine } from "lucide-react";

interface ForecastingMonthProps {
    year: number
    forecast_month: ForecastMonth[]
}

export default function ForecastingMonth({
    year= 2025,
    forecast_month = dForecastMonth
}: ForecastingMonthProps) {
    return (
        <AppLayout>
            <Head title="Forecast Month" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <Button size={"sm"} className="mr-5" onClick={() => window.history.back()}>Back</Button>
                        <ChartLine />
                        <p className="text-2xl font-extrabold">Forecasting</p>
                    </div>
                    <p className="text-sm">Report Perencanaan Pembelian Solar</p>
                    <p className="text-lg font-black">Tahun {year}</p>
                </div>
                <ForecastMonthTable year={year} forecast_month={forecast_month} />
            </div>
        </AppLayout>
    );
}

interface ForecastingMonthProps {
    year: number
    forecast_month: ForecastMonth[]
}

function ForecastMonthTable({year, forecast_month }: ForecastingMonthProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-gray-200/50 hover:bg-gray-200/50">
                    <TableHead>Bulan</TableHead>
                    <TableHead>Jumlah (kL)</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {forecast_month.map((forecast) => (
                    <TableRow className="cursor-pointer hover:bg-gray-100" onClick={() => router.get(route('forecasting.week', [year, forecast.month]))}>
                        <TableCell className="font-medium">{MONTH_NAME[forecast.month - 1]}</TableCell>
                        <TableCell>{forecast.quantity_total.toLocaleString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow className="bg-gray-100">
                    <TableCell>TOTAL</TableCell>
                    <TableCell>{forecast_month.reduce((acc, curr) => acc + curr.quantity_total, 0).toLocaleString()}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
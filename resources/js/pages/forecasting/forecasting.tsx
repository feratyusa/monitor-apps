import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dForecastYear } from "@/dummy/dummy_data";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { ForecastYear } from "@/types/local";
import { Head, router } from "@inertiajs/react";
import { ChartLine } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forecasting',
        href: '/forecasting',
    },
];

interface ForecastingProps {
    forecast_year: ForecastYear[]
}

export default function Forecasting({
    forecast_year = dForecastYear
}: ForecastingProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Forecast" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <ChartLine />
                        <p className="text-2xl font-extrabold">Forecasting</p>
                    </div>
                </div>
                <ForecastYearTable forecast_year={forecast_year}/>
            </div>
        </AppLayout>
    );
}

interface ForecastYearTableProps {
    forecast_year: ForecastYear[]
}

function ForecastYearTable({ forecast_year }: ForecastYearTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-gray-200/50 hover:bg-gray-200/50">
                    <TableHead>Tahun</TableHead>
                    <TableHead>Jumlah (kL)</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {forecast_year.map((forecast) => (
                    <TableRow className="cursor-pointer hover:bg-gray-100" onClick={() => router.get(route('forecasting.month', [forecast.year]))}>
                        <TableCell className="font-medium">{forecast.year}</TableCell>
                        <TableCell>{forecast.quantity_total.toLocaleString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dForecastItems, dForecastWeek } from "@/dummy/dummy_data";
import AppLayout from "@/layouts/app-layout";
import { MONTH_NAME } from "@/lib/utils";
import { ForecastWeek } from "@/types/local";
import { Head } from "@inertiajs/react";
import { ChartLine, Check } from "lucide-react";

interface ForecastingWeekProps {
    year: number,
    month: number,
    forecast_week: ForecastWeek[]
}

export default function ForecastingWeek({
    year = 2025,
    month = 1,
    forecast_week = dForecastWeek
}: ForecastingWeekProps) {
    function KeteranganTanggalDetail({ text, color }: { text: string, color: string }) {
        return (
            <div className="flex gap-2 items-center">
                <div className={`w-3 h-3 ${color}`} />
                <p>{text}</p>
            </div>
        )
    }
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
                    <p className="text-lg font-black">{`${year} - ${MONTH_NAME[month - 1]}`}</p>
                    <p className="text-sm font-black">Keterangan Tanggal</p>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                        <KeteranganTanggalDetail text="Minggu 1 = 1 s/d 7" color="bg-orange-200"/>
                        <KeteranganTanggalDetail text="Minggu 2 = 8 s/d 14" color="bg-green-200"/>
                        <KeteranganTanggalDetail text="Minggu 3 = 15 s/d 21" color="bg-red-200"/>
                        <KeteranganTanggalDetail text="Minggu 4 = 22 s/d akhir bulan" color="bg-blue-200"/>
                    </div>
                </div>
                <ForecastWeekTable forecast_week={forecast_week} />
            </div>
        </AppLayout>
    );
}

interface ForecastWeekTableProps {
    forecast_week: ForecastWeek[]
}

function ForecastWeekTable({ forecast_week }: ForecastWeekTableProps) {
    const tableBorderClassName = "border-2 border-black/50"

    const ColumnWeekDetail = ({ color }: { color: string }) => (
        <>
            <TableCell className={`${tableBorderClassName} ${color}`}>Jumlah (kL)</TableCell>
            <TableCell className={`${tableBorderClassName} ${color}`}>Cash</TableCell>
            <TableCell className={`${tableBorderClassName} ${color}`}>Invoice</TableCell>
        </>
    )

    function CheckItem() {
        return (
            <div className="flex justify-center"><Check /></div>
        )
    }

    function accumulateWeek(index: number) {
        return forecast_week.reduce((acc, cur) => {
            const item = cur.forecast_item.find(f => f.week == index)
            return acc + (item === undefined ? 0 : item.quantity)
        }, 0).toLocaleString()
    }

    return (
        <Table className="text-center">
            <TableHeader>
                <TableRow className="font-black bg-gray-200/50 hover:bg-gray-200/50">
                    <TableCell className={`${tableBorderClassName}`} rowSpan={2}>Nama Perusahaan</TableCell>
                    <TableCell className={`${tableBorderClassName} bg-orange-200`} colSpan={3}>Minggu 1</TableCell>
                    <TableCell className={`${tableBorderClassName} bg-green-200`} colSpan={3}>Minggu 2</TableCell>
                    <TableCell className={`${tableBorderClassName} bg-red-200`} colSpan={3}>Minggu 3</TableCell>
                    <TableCell className={`${tableBorderClassName} bg-blue-200`} colSpan={3}>Minggu 4</TableCell>
                </TableRow>
                <TableRow className="font-black bg-gray-200/50 hover:bg-gray-200/50">
                    <ColumnWeekDetail color="bg-orange-200" />
                    <ColumnWeekDetail color="bg-green-200" />
                    <ColumnWeekDetail color="bg-red-200" />
                    <ColumnWeekDetail color="bg-blue-200" />
                </TableRow>
            </TableHeader>
            <TableBody>
                {forecast_week.map((forecast) => (
                    <TableRow>
                        <TableCell className={`${tableBorderClassName}`}>{forecast.customer.name}</TableCell>
                        {[1, 2, 3, 4].map((index) => {
                            const week = forecast.forecast_item.find(f => f.week == index)
                            return (
                                <>
                                    <TableCell className={`${tableBorderClassName}`}>{week != undefined ? week.quantity.toLocaleString() : '-'}</TableCell>
                                    <TableCell className={`${tableBorderClassName}`}>{week != undefined ? week.type == "cash" ? <CheckItem /> : '-' : '-'}</TableCell>
                                    <TableCell className={`${tableBorderClassName}`}>{week != undefined ? week.type == "invoice" ? <CheckItem /> : '-' : '-'}</TableCell>
                                </>
                            )
                        })}
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter className="font-black text-lg bg-gray-200">
                <TableRow>
                    <TableCell className={`${tableBorderClassName}`}>Total per Minggu</TableCell>
                    <TableCell className={`${tableBorderClassName}`} colSpan={3}>{accumulateWeek(1)}</TableCell>
                    <TableCell className={`${tableBorderClassName}`} colSpan={3}>{accumulateWeek(2)}</TableCell>
                    <TableCell className={`${tableBorderClassName}`} colSpan={3}>{accumulateWeek(3)}</TableCell>
                    <TableCell className={`${tableBorderClassName}`} colSpan={3}>{accumulateWeek(4)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={`${tableBorderClassName}`}>Grand Total</TableCell>
                    <TableCell className={`${tableBorderClassName}`} colSpan={12}>{forecast_week.reduce((acc, curr) => acc + curr.forecast_item.reduce((a, c) => a + c.quantity, 0), 0).toLocaleString()}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
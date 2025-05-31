import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ForecastItem, ForecastLocation } from "@/types/local";

interface ForecatingContentsProps {
    forecast_items: ForecastItem[]
}

export default function ForecatingContents({
    forecast_items
} : ForecatingContentsProps) {
    return(
        <div className="m-5">
            <div className="mb-5">
                <p className="text-sm font-bold">Keterangan:</p>
                <div className="grid gap-2 mx-2">
                    <div className="grid md:flex md:gap-5 items-center overflow-auto">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <p className="text-sm">Prediksi</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-black"></div>
                            <p className="text-sm">Real</p>
                        </div>
                        <p className="italic text-sm">*jumlah dalam liter</p>
                    </div>
                </div>
            </div>
           {
            forecast_items.map((item, index) => (
                <div key={"forecastYearTable_"+index} className="mb-5">
                    <div className="mb-2">
                        <p className="text-2xl font-bold">{item.year}</p>
                    </div>
                    <ForecastYearTable forecast_locations={item.locations}/>
                </div>
            ))
           } 
        </div>
    )
}

interface ForecastYearTableProps {
    forecast_locations: ForecastLocation[]
}

function ForecastYearTable({forecast_locations} : ForecastYearTableProps) {
    return(
        <Table>
            <TableHeader>
                <TableRow className="font-extrabold">
                    <TableHead>Lokasi</TableHead>
                    <TableHead>Januari</TableHead>
                    <TableHead>Februari</TableHead>
                    <TableHead>Maret</TableHead>
                    <TableHead>April</TableHead>
                    <TableHead>Mei</TableHead>
                    <TableHead>Juni</TableHead>
                    <TableHead>Juli</TableHead>
                    <TableHead>Agustus</TableHead>
                    <TableHead>September</TableHead>
                    <TableHead>Oktober</TableHead>
                    <TableHead>November</TableHead>
                    <TableHead>Desember</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    forecast_locations.map((location, index) => (
                        <TableRow key={"tableBody_"+index}>
                            <TableCell>{location.location.name}</TableCell>
                            {
                                location.months.map((month, mIndex) => (
                                    <TableCell 
                                        className={`${month.prediction ? 'text-green-500' : ''}`}
                                    >
                                        {month.amount.toLocaleString()}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}
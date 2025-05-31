import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
                        <p className="italic text-sm">*jumlah dalam kiloliter (kL)</p>
                    </div>
                </div>
            </div>
            {
                forecast_items.length > 0 ?
                <ForecastYearTabs forecast_items={forecast_items}/>
                :
                <p>Kosong</p>
            }
        </div>
    )
}

interface ForecastYearTabsProps {
    forecast_items: ForecastItem[]
}

function ForecastYearTabs({forecast_items}: ForecastYearTabsProps) {
    return(
        <div className="flex w-full flex-col gap-6">
            <Tabs defaultValue={new Date().getFullYear().toString()}>
                <TabsList>
                    {
                        forecast_items.map((item, index) => (
                            <TabsTrigger key={"fctab_"+index} value={item.year.toString()}>{item.year}</TabsTrigger>
                        ))
                    }
                </TabsList>
                {
                    forecast_items.map((item, index) => (
                        <TabsContent key={"fcontenttab_"+index} value={item.year.toString()}>
                            <Card>
                                <CardHeader>
                                    <p className="text-2xl font-bold">{item.year}</p>
                                </CardHeader>
                                <CardContent>
                                    <ForecastYearTable key={"fctable_"+index} forecast_locations={item.locations}/>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))
                }
            </Tabs>
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
                <TableRow>
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
                            <TableCell className="font-bold">{location.location.name}</TableCell>
                            {
                                location.months.map((month, mIndex) => (
                                    <TableCell 
                                        className={`${month.prediction ? 'text-green-500' : ''}`}
                                        key={"tcell_fc_"+mIndex}
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
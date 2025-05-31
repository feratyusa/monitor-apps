import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SummaryItem, SummaryLocation } from "@/types/local"

interface SummaryContentsProps {
    summary_items: SummaryItem[]
}

export default function SummaryContents({summary_items} : SummaryContentsProps) {
    return(
        <div className="m-5">
            <div className="mb-5">
                <p className="text-sm font-bold">Keterangan:</p>
                <div className="grid gap-2 mx-2">
                    <p className="italic text-sm">*rekap purchase prediction per bulan</p>
                    <p className="italic text-sm">*jumlah dalam kiloliter (kL)</p>
                </div>
            </div>
            {
                summary_items.length > 0 ?
                <SummaryYearTabs summary_items={summary_items}/>
                :
                <p>Kosong</p>
            }
        </div>
    )
}

interface SummaryYearTabProps {
    summary_items: SummaryItem[]
}

function SummaryYearTabs({summary_items}: SummaryYearTabProps) {
    return(
        <div className="flex w-full flex-col gap-6">
            <Tabs defaultValue={new Date().getFullYear().toString()}>
                <TabsList>
                    {
                        summary_items.map((item, index) => (
                            <TabsTrigger key={"fctab_"+index} value={item.year.toString()}>{item.year}</TabsTrigger>
                        ))
                    }
                </TabsList>
                {
                    summary_items.map((item, index) => (
                        <TabsContent key={"fcontenttab_"+index} value={item.year.toString()}>
                            <Card>
                                <CardHeader>
                                    <p className="text-2xl font-bold">{item.year}</p>
                                </CardHeader>
                                <CardContent>
                                    <SummaryYearTable key={"fctable_"+index} summary_locations={item.locations}/>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))
                }
            </Tabs>
        </div>
    )

}

interface SummaryYearTableProps {
    summary_locations: SummaryLocation[]
}

function SummaryYearTable({summary_locations} : SummaryYearTableProps) {
    const summMonthclassName = "border-t-2 border-black/50"

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
                    <TableHead className="border-l-2 border-black/50 font-extrabold">Jumlah Cabang</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    summary_locations.map((location, index) => (
                        <TableRow key={"tableBody_"+index}>
                            <TableCell className="font-bold">{location.location.name}</TableCell>
                            {
                                location.months.map((month, mIndex) => (
                                    <TableCell 
                                        key={"tcell_fc_"+mIndex}
                                    >
                                        {month.toLocaleString()}
                                    </TableCell>
                                ))
                            }
                            <TableCell className="border-l-2 border-black/50 font-extrabold">{location.months.reduce((acc, curr) => acc + curr).toLocaleString()}</TableCell>
                        </TableRow>
                    ))
                }
                <TableRow className="font-extrabold">
                    <TableCell className={summMonthclassName}>Jumlah Bulan</TableCell>
                    <TableCell className={summMonthclassName}>{summary_locations.reduce((acc, curr) => acc + curr.months[0], 0).toLocaleString()}</TableCell>
                    <TableCell className={summMonthclassName}>{summary_locations.reduce((acc, curr) => acc + curr.months[1], 0).toLocaleString()}</TableCell>
                    <TableCell className={summMonthclassName}>{summary_locations.reduce((acc, curr) => acc + curr.months[2], 0).toLocaleString()}</TableCell>
                    <TableCell className={summMonthclassName}>{summary_locations.reduce((acc, curr) => acc + curr.months[3], 0).toLocaleString()}</TableCell>
                    <TableCell className={summMonthclassName}>{summary_locations.reduce((acc, curr) => acc + curr.months[4], 0).toLocaleString()}</TableCell>
                    <TableCell className={summMonthclassName}>{summary_locations.reduce((acc, curr) => acc + curr.months[5], 0).toLocaleString()}</TableCell>
                    <TableCell className={summMonthclassName}>{summary_locations.reduce((acc, curr) => acc + curr.months[6], 0).toLocaleString()}</TableCell>
                    <TableCell className={summMonthclassName}>{summary_locations.reduce((acc, curr) => acc + curr.months[7], 0).toLocaleString()}</TableCell>
                    <TableCell className={summMonthclassName}>{summary_locations.reduce((acc, curr) => acc + curr.months[8], 0).toLocaleString()}</TableCell>
                    <TableCell className={summMonthclassName}>{summary_locations.reduce((acc, curr) => acc + curr.months[9], 0).toLocaleString()}</TableCell>
                    <TableCell className={summMonthclassName}>{summary_locations.reduce((acc, curr) => acc + curr.months[10], 0).toLocaleString()}</TableCell>
                    <TableCell className={summMonthclassName}>{summary_locations.reduce((acc, curr) => acc + curr.months[11], 0).toLocaleString()}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
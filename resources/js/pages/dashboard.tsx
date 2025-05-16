import DashboardInvoiceContent, { InvoiceCounts } from '@/components/dashboard-invoice-counts-content';
import DashboardReceivableChart, { ReceivableData } from '@/components/dashboard-receivable-chart';
import DashboardSupplierKolChart, { SupplierChartData } from '@/components/dashboard-supplier-kol-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowBigDown, ArrowBigUp, ArrowDown10, ArrowUp10, Building2, Equal, ListOrdered, Wallet } from 'lucide-react';

const dummyIncome: ReceivableData[] = [
    {year: '2024', month: "6", paid: 45000000, unpaid: 0, overdue: 25000000},
    {year: '2024', month: "7", paid: 70000000, unpaid: 0, overdue: 86000000},
    {year: '2024', month: "8", paid: 32000000, unpaid: 0, overdue: 50000000},
    {year: '2024', month: "9", paid: 59000000, unpaid: 0, overdue: 78000000},
    {year: '2024', month: "10", paid: 60000000, unpaid: 0, overdue: 67200202},
    {year: '2024', month: "11", paid: 71000000, unpaid: 0, overdue: 8700000},
    {year: '2024', month: "12", paid: 80000000, unpaid: 50000000, overdue: 7689000},
    {year: '2025', month: "1", paid: 32000000, unpaid: 32200000, overdue: 50000000},
    {year: '2025', month: "2", paid: 12000000, unpaid: 0, overdue: 20000000},
    {year: '2025', month: "3", paid: 5000000, unpaid: 0, overdue: 23000000},
    {year: '2025', month: "4", paid: 22000000, unpaid: 0, overdue: 23000000},
    {year: '2025', month: "5", paid: 56000000, unpaid: 30000000, overdue: 15000000},
]

const dummyInvoiceCounts: InvoiceCounts = {
    paid: 83,
    last_paid: 67,
    unpaid: 32,
    overdue: 12,
    last_overdue: 20
}

const dummyRevenueLoss: RevenueData = {
    thisMonthRevenue: 35000000,
    lastMonthRevenue: 25000000,
    total_revenue: 1050000000,
}

const dummyLoss: LossData = {
    thisMonthLoss: 15000000,
    lastMonthLoss: 20000000,
    total_loss: 750000000,
}

const dummySupplierChartData: SupplierChartData[] = [
    {kolekbilitas: "kol1", value: 22},
    {kolekbilitas: "kol2", value: 13},
    {kolekbilitas: "kol3", value: 20},
    {kolekbilitas: "kol4", value: 11},
    {kolekbilitas: "kol5", value: 8},
]

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface RevenueData {
    thisMonthRevenue: number
    lastMonthRevenue: number
    total_revenue: number
}

interface LossData {
    thisMonthLoss: number
    lastMonthLoss: number
    total_loss: number
}

interface DashboardProps {
    receivables?: ReceivableData[]
    counts?: InvoiceCounts
    revenue?: RevenueData,
    loss?: LossData,
    suppliers?: SupplierChartData[],
    test?: any
}

export default function Dashboard({
    receivables = dummyIncome,
    counts = dummyInvoiceCounts,
    revenue = dummyRevenueLoss,
    suppliers = dummySupplierChartData,
    loss = dummyLoss,
    test,
} : DashboardProps) {
    console.log(test)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='grid gap-5 lg:grid-cols-4 md:grid-cols-2'>
                    <InvoiceReceivablesCard receivables={receivables}/>
                    <InvoiceCountsCard counts={counts}/>
                    <RevenueCard
                        thisMonthRevenue={revenue.thisMonthRevenue}
                        lastMonthRevenue={revenue.lastMonthRevenue}
                        totalRevenue={revenue.total_revenue}
                    />
                    <EstimateLossCard
                        thisMonthLoss={loss.thisMonthLoss}
                        lastMonthLoss={loss.lastMonthLoss}
                        totalLoss={loss.total_loss}
                    />
                    <SupplierCollectbilityRecapCard suppliers={suppliers}/>
                </div>
            </div>

        </AppLayout>
    );
}

function InvoiceReceivablesCard({receivables} : {receivables : ReceivableData[]}) {
    const first = receivables[0]
    const last = receivables[receivables.length - 1]
    const firstMonth = Intl.DateTimeFormat('id', { month: 'long' }).format(new Date(first.month))
    const lastMonth = Intl.DateTimeFormat('id', { month: 'long' }).format(new Date(last.month))

    return(
        <Card className='md:col-span-3'>
            <CardHeader>
                <CardTitle className='flex justify-between'>
                    <p>Invoice Receivables </p>
                    <Wallet />
                </CardTitle>
                <CardDescription>{`${firstMonth} ${first.year} - ${lastMonth} ${last.year}`}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex max-h-60'>
                    <DashboardReceivableChart invoices={receivables} />
                </div>
            </CardContent>
        </Card>
    )
}

function InvoiceCountsCard({counts} : {counts : InvoiceCounts}) {
    return(
        <Card>
            <CardHeader>
                <CardTitle className='flex justify-between'>
                    <p>Invoice Counts</p>
                    <ListOrdered />
                </CardTitle>
                <CardDescription>Current Year</CardDescription>
            </CardHeader>
            <CardContent>
                <DashboardInvoiceContent counts={counts}/>
            </CardContent>
        </Card>
    )
}

function RevenueCard({thisMonthRevenue, lastMonthRevenue, totalRevenue} : {thisMonthRevenue: number, lastMonthRevenue: number, totalRevenue: number}) {
    const p = (thisMonthRevenue - lastMonthRevenue) / (lastMonthRevenue) * 100
    const textColor = p < 0 ? 'text-red-500' : p > 0 ? 'text-green-500' : '';

    return(
        <Card>
            <CardHeader>
                <CardTitle className='flex justify-between'>
                    <p>Revenue</p>
                    <ArrowUp10 />
                </CardTitle>
                <CardDescription>
                    Earned and Total
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='grid gap-5'>
                    <div className='flex gap-5 items-center'>
                        {
                            p > 0 ? <ArrowBigUp className={textColor}/> :
                            p < 0 ? <ArrowBigDown className={textColor}/> :
                            <Equal className={textColor}/>
                        }
                        <div>
                            <p className='text-xl md:text-2x'>Rp {thisMonthRevenue.toLocaleString()}</p>
                            <p className='text-muted-foreground text-xs'>{p.toFixed(2)}% from last month</p>
                        </div>
                    </div>
                    <Separator className='my-2'/>
                    <div className='grid gap-5 overflow-auto'>
                        <p>Total Revenue</p>
                        <p className='text-xl md:text-2xl font-black'>{`Rp ${totalRevenue.toLocaleString()}`}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function EstimateLossCard({thisMonthLoss, lastMonthLoss, totalLoss} :
    {thisMonthLoss: number, lastMonthLoss: number, totalLoss: number}
) {
    const p = (thisMonthLoss - lastMonthLoss) / (lastMonthLoss) * 100
    const textColor = p > 0 ? 'text-red-500' : p < 0 ? 'text-green-500' : '';

    return(
        <Card>
            <CardHeader>
                <CardTitle className='flex justify-between'>
                    <p>Estimated Loss</p>
                    <ArrowDown10 />
                </CardTitle>
                <CardDescription>
                    Unpaid and Overdue
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='grid gap-5'>
                    <div className='flex gap-5 items-center'>
                        {
                            p > 0 ? <ArrowBigUp className={textColor}/> :
                            p < 0 ? <ArrowBigDown className={textColor}/> :
                            <Equal className={textColor}/>
                        }
                        <div>
                            <p className='text-xl md:text-2x'>Rp {thisMonthLoss.toLocaleString()}</p>
                            <p className='text-muted-foreground text-xs'>{p.toFixed(2)}% from last month</p>
                        </div>
                    </div>
                    <Separator className='my-2'/>
                    <div className='grid gap-5 overflow-auto'>
                        <p>Total Estimated Loss</p>
                        <p className='text-xl md:text-2xl font-black'>{`Rp ${totalLoss.toLocaleString()}`}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function SupplierCollectbilityRecapCard({suppliers} : {suppliers : SupplierChartData[]}) {
    return(
        <Card className='md:col-span-2'>
            <CardHeader>
                <CardTitle className='flex justify-between'>
                    <p>Kolekbilitas Customer</p>
                    <Building2 />
                </CardTitle>
                <CardDescription>Status Kolekbilitas</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex max-h-60'>
                    <DashboardSupplierKolChart data={suppliers}/>
                </div>
            </CardContent>
        </Card>
    )
}

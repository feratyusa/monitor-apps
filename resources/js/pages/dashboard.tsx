import DashboardInvoiceContent, { InvoiceCounts } from '@/components/dashboard-invoice-counts-content';
import DashboardReceivableChart, { ReceivableData } from '@/components/dashboard-receivable-chart';
import DashboardSupplierKolChart, { SupplierChartData } from '@/components/dashboard-supplier-kol-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowBigUp, ArrowDown10, Building2, ListOrdered, Wallet } from 'lucide-react';

const dummyIncome: ReceivableData[] = [
    {year: "2022", paid: 35000000, unpaid: 0, overdue: 10000000},
    {year: "2023", paid: 70000000, unpaid: 0, overdue: 25000000},
    {year: "2024", paid: 40000000, unpaid: 0, overdue: 10000000},
    {year: "2025", paid: 80000000, unpaid: 8000000, overdue: 30000000},
]

const dummyInvoiceCounts: InvoiceCounts = {
    paid: 83,
    last_paid: 67,
    unpaid: 32,
    overdue: 12,
    last_overdue: 20
}

const dummyRevenueLoss: RevenueData = {
    revenueIncrease: 35000000,
    total_revenue: 1050000000,
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
    revenueIncrease: number
    total_revenue: number
}

interface DashboardProps {
    receivables?: ReceivableData[]
    counts?: InvoiceCounts
    revenue?: RevenueData,
    suppliers?: SupplierChartData[],
    test?: any
}

export default function Dashboard({
    receivables = dummyIncome,
    counts = dummyInvoiceCounts,
    revenue = dummyRevenueLoss,
    suppliers = dummySupplierChartData,
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
                    <RevenueCard revenueIncrease={revenue.revenueIncrease} totalRevenue={revenue.total_revenue}/>
                    <SupplierCollectbilityRecapCard suppliers={suppliers}/>
                </div>
            </div>

        </AppLayout>
    );
}

function InvoiceReceivablesCard({receivables} : {receivables : ReceivableData[]}) {
    return(
        <Card className='md:col-span-3'>
            <CardHeader>
                <CardTitle className='flex justify-between'>
                    <p>Invoice Receivables </p>
                    <Wallet />
                </CardTitle>
                <CardDescription>{receivables[0].year} - {receivables[2].year}</CardDescription>
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

function RevenueCard({revenueIncrease, totalRevenue} : {revenueIncrease: number, totalRevenue: number}) {
    const p = revenueIncrease / (totalRevenue - revenueIncrease) * 100

    return(
        <Card className='md:col-span-2'>
            <CardHeader>
                <CardTitle className='flex justify-between'>
                    <p>Revenue</p>
                    <ArrowDown10 />
                </CardTitle>
                <CardDescription>
                    Earned and Total
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='grid gap-5'>
                    <div className='flex gap-5 items-center'>
                        <ArrowBigUp className='text-green-500'/>
                        <div>
                            <p className='text-xl md:text-2xl text-green-500'>Rp {revenueIncrease.toLocaleString()}</p>
                            <p className='text-muted-foreground text-xs'>{p.toFixed(2)}% from last year</p>
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

function SupplierCollectbilityRecapCard({suppliers} : {suppliers : SupplierChartData[]}) {
    return(
        <Card className='md:col-span-2'>
            <CardHeader>
                <CardTitle className='flex justify-between'>
                    <p>Kolekbilitas Supplier</p>
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

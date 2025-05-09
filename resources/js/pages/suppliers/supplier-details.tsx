import DetailHeader from "@/components/detail-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dummyInvoices, dummyPurchaseOrders, dummySuppliers } from "@/dummy/dummy_data";
import AppLayout from "@/layouts/app-layout";
import { toIndonesiaDate } from "@/lib/utils";
import { BreadcrumbItem } from "@/types";
import { ProductItem, PurchaseOrderItem, SupplierItem, type InvoiceItem } from "@/types/local";
import { Head, Link } from "@inertiajs/react";
import { Building2, CogIcon, Trash } from "lucide-react";
import { useState } from "react";
import { DialogConfirmDelete } from "@/components/dialog-confirm-delete";
import SupplierDetailInfo from "@/components/supplier-detail-info";
import PaymentStatusBadge from "@/components/paymentstatus-badge";
import CollectbilityBadge from "@/components/collectbility-badge";
import BasicDataTable from "@/components/basic-data-table";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

interface SupplierDetailProps {
    supplier: SupplierItem
    kolekbilitas: number
    purchase_orders: PurchaseOrderItem[]
    invoices: InvoiceItem[]
}

export default function SupplierDetails({
    supplier = dummySuppliers[0],
    kolekbilitas = 3,
    purchase_orders = dummyPurchaseOrders.filter(p => p.supplier.id == 1),
    invoices = dummyInvoices.filter(i => i.purchase_order.supplier.id == 1)
} : SupplierDetailProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Supplier Details',
            href: '/suppliers/1',
        },
    ];

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={supplier.name} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DetailHeader title={`Detail Supplier`}/>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center overflow-auto">
                            <div className="flex gap-2 items-center">
                                <Building2 />
                                <p className="text-2xl">{supplier.name}</p>
                                <CollectbilityBadge number={kolekbilitas}/>
                            </div>
                            <SupplierActionButtons supplier={supplier}/>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SupplierCardContent supplier={supplier} purchase_orders={purchase_orders} invoices={invoices}/>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}

interface SupplierCardContentProps {
    supplier: SupplierItem,
    purchase_orders: PurchaseOrderItem[]
    invoices: InvoiceItem[]
}

function SupplierCardContent({supplier, purchase_orders, invoices} : SupplierCardContentProps) {
    function SupplierDetailRow({name, value} : {name: string, value: string}) {
        return(
            <div>
                <Label className="font-black">{name}</Label>
                <p>{value}</p>
            </div>
        )
    }

    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-auto mb-10">
                <SupplierDetailRow name="Alamat" value={supplier.address}/>
                <SupplierDetailRow name="Email" value={supplier.email}/>
                <SupplierDetailRow name="Contact Person" value={supplier.contact_person}/>
                <SupplierDetailRow name="Phone 1" value={supplier.phone1}/>
                <SupplierDetailRow name="Phone 2" value={supplier.phone2 ?? "-"}/>
            </div>
            <Separator className="my-4" />
            <div className="my-10 grid gap-5">
                <p className="text-xl font-bold">Riwayat Purchase Order</p>
                <SupplierPOHistory purchase_orders={purchase_orders}/>
            </div>
            <Separator className="my-4"/>
            <div className="my-10 grid gap-5">
                <p className="text-xl font-bold">Riwayat Invoice</p>
                <SupplierInvoiceHistory invoices={invoices}/>
            </div>
        </>
    )
}

function SupplierActionButtons({supplier} : {supplier: SupplierItem}) {
    const [openDialog, setDialogOpen] = useState<boolean | undefined>(false)

    function handleDialogOpen() {
        setDialogOpen(true)
    }

    function handleDelete() {
        console.log(supplier)
    }

    function handleDialogClose() {
        setDialogOpen(false)
    }

    return(
        <div className="flex gap-2">
            {/* <Link href={route('suppliers.edit', [1])}> */}
                <Button>
                    <CogIcon />
                    Edit
                </Button>
            {/* </Link> */}
            <Button variant={"destructive"} onClick={handleDialogOpen}>
                <Trash />
                Hapus
            </Button>
            <DialogConfirmDelete
                nomor={supplier.name}
                open={openDialog}
                handleDialogClose={handleDialogClose}
                handleDelete={handleDelete}
            />
        </div>
    )
}

function SupplierPOHistory({purchase_orders} : {purchase_orders: PurchaseOrderItem[]}) {
    const columns: ColumnDef<PurchaseOrderItem>[] = [
        {
            accessorKey: 'nomor',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title={"No. PO"} hideable={false}/>
            ),
        },
        {
            accessorKey: 'purchase_date',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title={"Tanggal PO"} hideable={false}/>
            ),
        },
        {
            accessorKey: 'quantity',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title={"Jumlah Unit"} hideable={false}/>
            ),
        },
        {
            accessorKey: 'price',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title={"Total Harga"} hideable={false}/>
            ),
        },
    ]

    return(
        <BasicDataTable data={purchase_orders} columns={columns}/>
    )
}

function SupplierInvoiceHistory({invoices} : {invoices: InvoiceItem[]}) {
    const columns: ColumnDef<InvoiceItem>[] = [
        {
            accessorKey: 'nomor',
            header: ({column}) => <DataTableColumnHeader column={column} title="No. Invoice" hideable={false}/>
        },
        {
            accessorKey: 'invoice_date',
            header: ({column}) => <DataTableColumnHeader column={column} title="Tanggal Invoice" hideable={false}/>
        },
        {
            accessorKey: 'due_date',
            header: ({column}) => <DataTableColumnHeader column={column} title="Jatuh Tempo" hideable={false}/>
        },
        {
            accessorFn: (row, id) => row.payment_status ? "1" : "0",
            id: 'payment_status',
            header: ({column}) => <DataTableColumnHeader column={column} title="Status Pembayaran" hideable={false}/>,
            cell: ({row}) => <PaymentStatusBadge status={row.original.payment_status}/>,
        },
    ]

    return(
        <BasicDataTable data={invoices} columns={columns}/>
    )
}


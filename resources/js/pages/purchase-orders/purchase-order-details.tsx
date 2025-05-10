import DetailHeader from "@/components/detail-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dummyInvoices, dummyPurchaseOrders } from "@/dummy/dummy_data";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { ProductItem, PurchaseOrderItem, SupplierItem, type InvoiceItem } from "@/types/local";
import { Head, Link, useForm } from "@inertiajs/react";
import { Building2, CogIcon, Trash } from "lucide-react";
import { useState } from "react";
import { DialogConfirmDelete } from "@/components/dialog-confirm-delete";
import SupplierDetailInfo from "@/components/supplier-detail-info";
import PaymentStatusBadge from "@/components/paymentstatus-badge";

interface PurchaseOrderDetailsProps {
    purchase_order: PurchaseOrderItem,
    invoices: InvoiceItem[]
}

export default function PurchaseOrderDetails({
    purchase_order = dummyPurchaseOrders[0],
    invoices = []
} : PurchaseOrderDetailsProps) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Purchase Orders Details',
            href: '/purchase-orders/1',
        },
    ];

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={purchase_order.nomor} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DetailHeader title={`Detail Purchase Order ${purchase_order.nomor}`}/>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-end items-center overflow-auto">
                            <POActionButtons purchase_order={purchase_order}/>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <POCardContent
                            purchase_order={purchase_order}
                            supplier={purchase_order.supplier}
                            product={purchase_order.product}
                            invoices={invoices}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}

interface POCardContentProps {
    purchase_order: PurchaseOrderItem,
    supplier: SupplierItem,
    product: ProductItem,
    invoices: InvoiceItem[]
}

function POCardContent({purchase_order, supplier, product, invoices} : POCardContentProps) {
    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0 overflow-auto">
                <SupplierDetailInfo supplier={supplier}/>
                <POExtraDetails
                    po_nomor={purchase_order.nomor}
                    po_date={purchase_order.purchase_date}
                />
            </div>
            <Separator className="my-4" />
            <POPriceTable quantity={purchase_order.quantity} name={product.name} price_per_unit={product.price_per_unit}/>
            <div className="flex justify-end mt-5">
                <PORecapTable total_amount={purchase_order.quantity * product.price_per_unit}/>
            </div>
            <Separator className="my-4"/>
            <div className="grid gap-2">
                <p className="font-black text-xl">Riwayat Invoice</p>
                <POInvoiceHistory invoices={invoices}/>
            </div>
        </>
    )
}

interface POExtraDetailProps {
    po_nomor: string
    po_date: string
}

function POExtraDetails({po_nomor, po_date} : POExtraDetailProps) {

    function PODetailRow({name, value} : {name: string, value: string}) {
        return(
            <div>
                <Label className="font-black">{name}</Label>
                <p>{value}</p>
            </div>
        )
    }

    return(
        <div className="flex flex-col bg-gray-500/10 rounded-xl p-4 gap-3">
            <PODetailRow name="Nomor Purchase Order" value={po_nomor}/>
            <PODetailRow name="Tanggal Purchase Order" value={po_date}/>
        </div>
    )
}

interface POPriceTableProps {
    name: string,
    quantity: number,
    price_per_unit: number,
}

function POPriceTable({name, quantity, price_per_unit} : POPriceTableProps) {
    return(
        <Table>
            <TableHeader>
                <TableRow className="bg-gray-500/10">
                    <TableHead>No</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{quantity.toLocaleString()}</TableCell>
                    <TableCell>Rp {price_per_unit.toLocaleString()}</TableCell>
                    <TableCell>Rp {(price_per_unit * quantity).toLocaleString()}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

interface PORecapTableProps {
    total_amount: number,
}

function PORecapTable({total_amount} : PORecapTableProps) {
    return(
        <div className="w-md">
            <Table className="text-right">
                <TableBody>
                    <TableRow>
                        <TableCell className="bg-gray-500/10 font-black">Total Harga Akhir</TableCell>
                        <TableCell>Rp {total_amount.toLocaleString()}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

function POActionButtons({purchase_order} : {purchase_order: PurchaseOrderItem}) {
    const {delete: destroy} = useForm()
    const [openDialog, setDialogOpen] = useState<boolean | undefined>(false)

    function handleDialogOpen() {
        setDialogOpen(true)
    }

    function handleDelete() {
        console.log(purchase_order)
        destroy(route('purchase-orders.destroy', [purchase_order.id]), {
            onSuccess: () => {
                setDialogOpen(false)
            }
        })
    }

    function handleDialogClose() {
        setDialogOpen(false)
    }

    return(
        <div className="flex gap-2">
            <Link href={route('purchase-orders.edit', [purchase_order.id])}>
                <Button>
                    <CogIcon />
                    Edit
                </Button>
            </Link>
            <Button variant={"destructive"} onClick={handleDialogOpen}>
                <Trash />
                Hapus
            </Button>
            <DialogConfirmDelete
                nomor={purchase_order.nomor}
                open={openDialog}
                handleDialogClose={handleDialogClose}
                handleDelete={handleDelete}
            />
        </div>
    )
}

interface POInvoiceHistoryProps {
    invoices: InvoiceItem[]
}

function POInvoiceHistory({invoices} : POInvoiceHistoryProps) {
    return(
        <Table>
            <TableHeader>
                <TableRow className="bg-gray-500/10">
                    <TableHead>No</TableHead>
                    <TableHead>Nomor Invoice</TableHead>
                    <TableHead>Tanggal Invoice</TableHead>
                    <TableHead>Status Pembayaran</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { invoices.length > 0 ?
                    invoices.map((invoice, index) => (
                        <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{invoice.nomor}</TableCell>
                            <TableCell>{invoice.invoice_date}</TableCell>
                            <TableCell>
                                <PaymentStatusBadge status={invoice.payment_status}/>
                            </TableCell>
                        </TableRow>
                    )) :
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">Kosong</TableCell>
                    </TableRow>
                }
            </TableBody>
        </Table>
    )
}

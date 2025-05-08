import CollectbilityBadge from "@/components/collectbility-badge";
import DetailHeader from "@/components/detail-header";
import PaymentStatusBadge from "@/components/paymentstatus-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dummyInvoices } from "@/dummy/dummy_data";
import AppLayout from "@/layouts/app-layout";
import { toIndonesiaDate } from "@/lib/utils";
import { BreadcrumbItem } from "@/types";
import { ProductItem, PurchaseOrderItem, SupplierItem, type InvoiceItem } from "@/types/local";
import { Head, Link } from "@inertiajs/react";
import { Building2, CogIcon, Trash } from "lucide-react";
import { useState } from "react";
import { DialogConfirmDelete } from "@/components/dialog-confirm-delete";

export default function InvoiceDetails({invoice = dummyInvoices[0]} : {invoice: InvoiceItem}) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Invoice Details',
            href: '/invoices/1',
        },
    ];

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={invoice.nomor} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DetailHeader title={`Detail Invoice ${invoice.nomor}`}/>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center overflow-auto">
                            <div className="flex h-fit gap-2 overflow-auto">
                                <CollectbilityBadge status={invoice.payment_status} due_date={invoice.due_date}/>
                                <PaymentStatusBadge status={invoice.payment_status}/>
                            </div>
                            <InvoiceActionButtons invoice={invoice}/>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <InvoiceCardContent
                            invoice={invoice}
                            purchase_order={invoice.purchase_order}
                            supplier={invoice.purchase_order.supplier}
                            product={invoice.purchase_order.product}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}

interface InvoiceCardContentProps {
    invoice: InvoiceItem,
    purchase_order: PurchaseOrderItem,
    supplier: SupplierItem,
    product: ProductItem,
}

function InvoiceCardContent({invoice, purchase_order, supplier, product} : InvoiceCardContentProps) {
    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0 overflow-auto">
                <InvoiceSupplierInfo
                    name={supplier.name}
                    address={supplier.address}
                    phone1={supplier.phone1}
                    email={supplier.email}
                    contact_person={supplier.contact_person}
                    phone2={supplier.phone2}
                />
                <InvoiceExtraDetails
                    invoice_nomor={invoice.nomor}
                    purchase_order_nomor={purchase_order.nomor}
                    invoice_date={invoice.invoice_date}
                    invoice_due_date={invoice.due_date}
                    bank={invoice.bank}
                />
            </div>
            <Separator className="my-4" />
            <InvoicePriceTable
                name={product.name}
                quantity={purchase_order.quantity}
                price_per_unit={product.price_per_unit}
            />
            <div className="flex justify-end mt-5">
                <InvoiceRecapTable discount={invoice.discount} total_amount={product.price_per_unit * purchase_order.quantity}/>
            </div>
        </>
    )
}

interface InvoiceSupplierInfoProps {
    name: string,
    address: string,
    phone1: string,
    email: string,
    contact_person: string,
    phone2: string | null,
}

function InvoiceSupplierInfo({name, address, phone1, email, contact_person, phone2} : InvoiceSupplierInfoProps) {
    return(
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <Building2 />
                <p className="text-xl font-black">Supplier</p>
            </div>
            <p>{name}</p>
            <p>{address}</p>
            <p>{phone1} | <span className="underline">{email}</span></p>
            <p><span className="font-black">CP :</span> {contact_person}</p>
            <p><span className="font-black">Alt Phone :</span> {phone2 ? phone2 : '-'}</p>
        </div>
    )
}

interface InvoiceExtraDetailsProps {
    invoice_nomor: string,
    purchase_order_nomor: string,
    invoice_date: string,
    invoice_due_date: string,
    bank: string,
}

function InvoiceExtraDetails({invoice_nomor, purchase_order_nomor, invoice_date, invoice_due_date, bank} : InvoiceExtraDetailsProps) {

    function InvoiceDetailRow({name, value} : {name: string, value: string}) {
        return(
            <div>
                <Label className="font-black">{name}</Label>
                <p>{value}</p>
            </div>
        )
    }

    return(
        <div className="flex flex-col bg-gray-500/10 rounded-xl p-4 gap-3">
            <InvoiceDetailRow name="Nomor Invoice" value={invoice_nomor}/>
            <InvoiceDetailRow name="Nomor Purchase Order" value={purchase_order_nomor}/>
            <div className="grid grid-cols-2 gap-2 md:gap-0">
                <InvoiceDetailRow name="Tanggal Invoice" value={toIndonesiaDate(invoice_date)}/>
                <InvoiceDetailRow name="Jatuh Tempo" value={toIndonesiaDate(invoice_due_date)}/>
            </div>
            <InvoiceDetailRow name="Bank" value={bank}/>
        </div>
    )
}

interface InvoicePriceTableProps {
    name: string,
    quantity: number,
    price_per_unit: number,
}

function InvoicePriceTable({name, quantity, price_per_unit} : InvoicePriceTableProps) {
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

interface InvoiceRecapTableProps {
    discount: number,
    total_amount: number,
}

function InvoiceRecapTable({discount, total_amount} : InvoiceRecapTableProps) {
    return(
        <div className="w-md">
            <Table className="text-right">
                <TableBody>
                    <TableRow>
                        <TableCell>Total Harga</TableCell>
                        <TableCell>Rp {total_amount.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Discount</TableCell>
                        <TableCell>{discount * 100}%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="bg-gray-500/10 font-black">Total Harga Akhir</TableCell>
                        <TableCell>Rp {(total_amount * (1 - discount)).toLocaleString()}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

function InvoiceActionButtons({invoice} : {invoice: InvoiceItem}) {
    const [openDialog, setDialogOpen] = useState<boolean | undefined>(false)

    function handleDialogOpen() {
        setDialogOpen(true)
    }

    function handleDelete() {
        console.log(invoice)
    }

    function handleDialogClose() {
        setDialogOpen(false)
    }

    return(
        <div className="flex gap-2">
            <Link href={route('invoices.edit', [1])}>
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
                nomor={invoice.nomor}
                open={openDialog}
                handleDialogClose={handleDialogClose}
                handleDelete={handleDelete}
            />
        </div>
    )
}

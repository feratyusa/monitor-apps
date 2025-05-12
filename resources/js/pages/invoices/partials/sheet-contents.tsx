import CollectbilityBadge from "@/components/collectbility-badge";
import PaymentStatusBadge from "@/components/paymentstatus-badge";
import SheetDetailOnTableRow from "@/components/sheet-detail-content";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { type InvoiceItem } from "@/types/local";
import { Link } from "@inertiajs/react";

interface InvoiceSheetContentsProps {
    label: string,
    invoice: InvoiceItem,
}

export default function InvoiceSheetContents({label, invoice} : InvoiceSheetContentsProps) {
    return (
        <SheetDetailOnTableRow
            title="Detail Invoice"
            description={invoice.nomor}
            trigger={<p>{label}</p>}
            body={<InvoiceSheetBody invoice={invoice}/>}
            footer={<InvoiceSheetFooter id={invoice.id}/>}
        />
    )
}

function InvoiceSheetBody({invoice} : {invoice: InvoiceItem}) {
    const finalPrice = invoice.purchase_order.price * (100 - invoice.discount) / 100;
    const diffDays = (new Date(invoice.due_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
    return(
        <div className="flex flex-col gap-5 px-5 overflow-auto">
            <InvoiceItem name="Customer" value={invoice.purchase_order.supplier.name} />
            <InvoiceItem name="Alamat Customer" value={invoice.purchase_order.supplier.address} />
            <InvoiceItem name="CP Customer" value={invoice.purchase_order.supplier.contact_person} />
            <InvoiceItem name="Phone Customer" value={invoice.purchase_order.supplier.phone1} />
            <div className="grid grid-cols-2">
                <InvoiceItem name="Tanggal Invoice" value={invoice.invoice_date} />
                <InvoiceItem name="Jatuh Tempo" value={invoice.due_date} />
            </div>
            <div className="grid grid-cols-2">
                <InvoiceItem name="Produk" value={invoice.purchase_order.product.name} />
                <InvoiceItem name="Jumlah" value={`${invoice.purchase_order.quantity} Liter`} />
            </div>
            <InvoiceItem name="Total Harga" value={`Rp ${invoice.purchase_order.price.toLocaleString()}`} />
            <InvoiceItem name="Diskon" value={`${invoice.discount}%`} />
            <InvoiceItem name="Harga Akhir " value={`Rp ${finalPrice.toLocaleString()}`} />
            <InvoiceItem name="Status Pembayaran " value={invoice.payment_status ? "1" : "0"} payment={true} />
            <div className="flex flex-col gap-2">
                <Label className="font-black">Status Kolekbilitas</Label>
                <CollectbilityBadge due_date={invoice.due_date} status={invoice.payment_status}/>
            </div>
        </div>
    )
}

function InvoiceItem({name, value, payment = false} : {name: string, value: string, payment?: boolean}) {
    return(
        <div className="flex flex-col gap-2">
            <Label className="font-black">{name}</Label>
            {
                payment ?
                <PaymentStatusBadge status={value == "1" ? true : false} />
                :
                <p className="font-light">{value}</p>
            }
        </div>
    )
}

function InvoiceSheetFooter({id} : {id: number}) {
    return(
        <Link href={route('invoices.detail', [id])}>
            <Button className="w-full">Lebih Lengkap</Button>
        </Link>
    )
}

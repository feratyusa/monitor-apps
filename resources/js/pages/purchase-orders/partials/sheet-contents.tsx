import CollectbilityBadge from "@/components/collectbility-badge";
import PaymentStatusBadge from "@/components/paymentstatus-badge";
import SheetDetailOnTableRow from "@/components/sheet-detail-content";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PurchaseOrderItem, type InvoiceItem as POItem } from "@/types/local";
import { Link } from "@inertiajs/react";

interface POSheetContentProps {
    label: string,
    purchase_order: PurchaseOrderItem,
}

export default function POSheetContent({label, purchase_order} : POSheetContentProps) {
    return (
        <SheetDetailOnTableRow
            title="Detail Purchase Order"
            description={purchase_order.nomor}
            trigger={<p>{label}</p>}
            body={<POSheetBody purchase_order={purchase_order}/>}
            footer={<POSheetFooter id={purchase_order.id}/>}
        />
    )
}

function POSheetBody({purchase_order} : {purchase_order: PurchaseOrderItem}) {
    return(
        <div className="flex flex-col gap-5 px-5 overflow-auto">
            <POItem value={purchase_order.supplier.name} name="Customer"/>
            <POItem value={purchase_order.product.name} name="Product"/>
            <div className="grid grid-cols-2 gap-2">
                <POItem value={purchase_order.quantity.toLocaleString()} name="Jumlah Unit (L)"/>
                <POItem value={`Rp ${purchase_order.price.toLocaleString()}`} name="Total Harga"/>
            </div>
            <POItem value={purchase_order.purchase_date} name="Tanggal Purchase Order"/>
        </div>
    )
}

function POItem({name, value, payment = false} : {name: string, value: string, payment?: boolean}) {
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

function POSheetFooter({id} : {id: number}) {
    return(
        <Link href={route('purchase-orders.detail', [id])}>
            <Button className="w-full">Lebih Lengkap</Button>
        </Link>
    )
}

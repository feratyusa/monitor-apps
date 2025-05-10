import CollectbilityBadge from "@/components/collectbility-badge";
import PaymentStatusBadge from "@/components/paymentstatus-badge";
import SheetDetailOnTableRow from "@/components/sheet-detail-content";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SupplierItem } from "@/types/local";
import { Link } from "@inertiajs/react";

interface SupplierSheetContentProps {
    label: string,
    supplier: SupplierItem,
}

export default function SupplierSheetContent({label, supplier} : SupplierSheetContentProps) {
    return (
        <SheetDetailOnTableRow
            title="Detail Supplier"
            description={''}
            trigger={<p>{label}</p>}
            body={<SupplierSheetBody supplier={supplier}/>}
            footer={<SupplierSheetFooter id={supplier.id}/>}
        />
    )
}

function SupplierSheetBody({supplier} : {supplier: SupplierItem}) {
    return(
        <div className="flex flex-col gap-5 px-5 overflow-auto">
            <SupplierRowItem value={supplier.name} name="Supplier"/>
            <SupplierRowItem value={supplier.address} name="Alamat"/>
            <SupplierRowItem value={supplier.email} name="Email"/>
            <SupplierRowItem value={supplier.contact_person} name="Contact Person"/>
            <SupplierRowItem value={supplier.phone1} name="Phone 1"/>
            <SupplierRowItem value={supplier.phone2 ?? "-"} name="Phone 2"/>
            <div className="flex flex-col gap-2">
                <Label className="font-black">Kolekbilitas</Label>
                <CollectbilityBadge number={supplier.kolekbilitas}/>
            </div>
        </div>
    )
}

function SupplierRowItem({name, value} : {name: string, value: string}) {
    return(
        <div className="flex flex-col gap-2">
            <Label className="font-black">{name}</Label>
            <p className="font-light">{value}</p>
        </div>
    )
}

function SupplierSheetFooter({id} : {id: number}) {
    return(
        <Link href={route('suppliers.detail', [id])}>
            <Button className="w-full">Lebih Lengkap</Button>
        </Link>
    )
}

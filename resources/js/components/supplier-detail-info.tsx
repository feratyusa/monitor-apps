import { SupplierItem } from "@/types/local"
import { Building2 } from "lucide-react"

interface SupplierDetailInfoProps {
    supplier: SupplierItem
}

export default function SupplierDetailInfo({supplier} : SupplierDetailInfoProps) {
    return(
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <Building2 />
                <p className="text-xl font-black">Supplier</p>
            </div>
            <p>{supplier.name}</p>
            <p>{supplier.address}</p>
            <p>{supplier.phone1} | <span className="underline">{supplier.email}</span></p>
            <p><span className="font-black">CP :</span> {supplier.contact_person}</p>
            <p><span className="font-black">Alt Phone :</span> {supplier.phone2 ? supplier.phone2 : '-'}</p>
        </div>
    )
}

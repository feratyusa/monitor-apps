import CollectbilityBadge from "@/components/collectbility-badge";
import PaymentStatusBadge from "@/components/paymentstatus-badge";
import SheetDetailOnTableRow from "@/components/sheet-detail-content";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ProductItem } from "@/types/local";

interface ProductSheetContentProps {
    label: string,
    product: ProductItem,
}

export default function ProductSheetContent({label, product} : ProductSheetContentProps) {
    return (
        <SheetDetailOnTableRow
            title="Detail Customer"
            description={''}
            trigger={<p>{label}</p>}
            body={<ProductSheetBody product={product}/>}
            footer={<ProductSheetFooter id={1}/>}
        />
    )
}

function ProductSheetBody({product} : {product: ProductItem}) {
    return(
        <div className="flex flex-col gap-5 px-5 overflow-auto">
            <ProductRowItem value={product.name} name="Nama"/>
            <ProductRowItem value={product.price_per_unit.toLocaleString()} name="Harga per Unit"/>
        </div>
    )
}

function ProductRowItem({name, value} : {name: string, value: string}) {
    return(
        <div className="flex flex-col gap-2">
            <Label className="font-black">{name}</Label>
            <p className="font-light">{value}</p>
        </div>
    )
}

function ProductSheetFooter({id} : {id: number}) {
    return(
        // <Link href={route('products.detail', [id])}>
            <Button className="w-full">Lebih Lengkap</Button>
        // </Link>
    )
}

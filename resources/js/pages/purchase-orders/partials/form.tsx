import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { dummyProducts, dummyPurchaseOrders } from "@/dummy/dummy_data"
import { ProductItem, PurchaseOrderItem } from "@/types/local"
import { useForm } from "@inertiajs/react"
import { Receipt } from "lucide-react"
import { FormEventHandler, useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import Select from "react-select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { productOptions, supplierOptions } from "../table/po-filter-options"

interface POFormProps {
    purchase_order?: PurchaseOrderItem | null,
}

type POFormFields =  {
    nomor: string | undefined
    supplier_id: number | undefined
    product_id: number | undefined
    purchase_date: string | undefined
    quantity: number
}

export default function POFormComps({purchase_order} : POFormProps) {
    const {data, setData, post, put, processing, reset, errors} = useForm<Required<POFormFields>>({
        nomor: purchase_order?.nomor,
        supplier_id: purchase_order?.supplier.id,
        product_id: purchase_order?.product.id,
        purchase_date: purchase_order ? purchase_order.purchase_date : '',
        quantity: purchase_order?.quantity ?? 0,
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()
        console.log(data)
    }

    const [totalAmount, setTotalAmount] = useState<number>(0)

    const [product, setProduct] = useState<ProductItem | null>(null)

    useEffect(() => {
        setProduct(dummyProducts.find(p => p.id === data.product_id) ?? null)
    }, [data.product_id])

    useEffect(() => {
        setTotalAmount((product?.price_per_unit ?? 0) * data.quantity)
    }, [product, data.quantity])

    return(
        <Card className="shadow-xl w-full max-w-4xl">
            <CardHeader>
                <CardTitle className="flex gap-6 items-center text-xl">
                    <Receipt />
                    Form Invoice
                </CardTitle>
                <CardDescription>Tambah invoice baru</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-6 p-4" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="nomor">Nomor PO *</Label>
                        <Input
                            id="nomor"
                            name="nomor"
                            placeholder="Nomor Purchase Order"
                            value={data.nomor}
                            onChange={(e) => setData('nomor', e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="supplier">Supplier *</Label>
                        <Select
                            id="supplier"
                            name="supplier"
                            placeholder="Supplier"
                            value={supplierOptions.find(po => po.value == data.supplier_id)}
                            options={supplierOptions}
                            onChange={(e) => setData('supplier_id', e?.value)}
                            className="text-black"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="product">Product *</Label>
                        <Select
                            id="product"
                            name="product"
                            placeholder="Product"
                            value={productOptions.find(po => po.value == data.product_id)}
                            options={productOptions}
                            onChange={(e) => setData('product_id', e?.value)}
                            className="text-black"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="po_date">Tanggal Purchase Order</Label>
                        <Input
                            id="po_date"
                            name="po_date"
                            type="date"
                            value={data.purchase_date}
                            onChange={(e) => setData('purchase_date', e.target.value)}
                        />
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        <div className="grid gap-2">
                            <Label htmlFor="quantity">Jumlah Unit (L)</Label>
                            <Input
                                id="quantity"
                                name="quantity"
                                value={data.quantity}
                                onChange={(e) => setData('quantity', Number(e.target.value))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="total_amount">Total Harga</Label>
                            <Input
                                id="total_amount"
                                name="total_amount"
                                value={`Rp ${totalAmount.toLocaleString()}`}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="grid grid-cols-2 gap-5 w-full max-w-lg">
                            <Button type="submit">
                                Submit
                            </Button>
                            <Button onClick={() => window.history.back()}>
                                Cancel
                            </Button>
                        </div>
                    </div>

                </form>
            </CardContent>
        </Card>
    )
}

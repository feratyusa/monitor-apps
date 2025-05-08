import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { dummyPurchaseOrders } from "@/dummy/dummy_data"
import { InvoiceItem, PurchaseOrderItem } from "@/types/local"
import { useForm } from "@inertiajs/react"
import { Receipt } from "lucide-react"
import { FormEventHandler, useState, useEffect } from "react"
import { purchaseOrderOptions } from "../table/filter-options"
import { Label } from "@/components/ui/label"
import Select from "react-select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface InvoiceFormProps {
    invoice?: InvoiceItem | null,
}

type InvoiceFormFields =  {
    purchase_order_id: string | undefined
    invoice_date: string
    due_date: string
    discount: number
    bank: string
}

export default function InvoiceFormComps({invoice} : InvoiceFormProps) {
    const {data, setData, post, put, processing, reset, errors} = useForm<Required<InvoiceFormFields>>({
        purchase_order_id: invoice ? invoice.purchase_order.nomor : undefined,
        invoice_date: invoice ? invoice.invoice_date : '',
        due_date: invoice ? invoice.due_date : '',
        discount: invoice?.discount ?? 0,
        bank: invoice ? invoice.bank : '',
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()
        console.log(data)
    }

    const [po, setPo] = useState<PurchaseOrderItem | null>(null)
    const [fa, setFa] = useState<number | null>(0)

    useEffect(() => {
        console.log(data.discount)
        setFa((po?.price ?? 0) * ((100 - data.discount) / 100))
    }, [po, data.discount])

    useEffect(() => {
        setPo(dummyPurchaseOrders.find(po => po.nomor == data.purchase_order_id) ?? null)
    }, [data.purchase_order_id])

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
                        <Label htmlFor="po">Purchase Order *</Label>
                        <Select
                            id="po"
                            name="purchase-order"
                            placeholder="Purchase Order"
                            value={purchaseOrderOptions.find(po => po.value == data['purchase_order_id'])}
                            options={purchaseOrderOptions}
                            onChange={(e) => setData('purchase_order_id', e?.value)}
                            className="text-black"
                        />
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        <div className="grid gap-2">
                            <Label htmlFor="product">Produk</Label>
                            <Input
                                id="product"
                                name="product"
                                value={po?.product.name ?? ""}
                                disabled
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="quantity">Jumlah</Label>
                            <Input
                                id="quantity"
                                name="quantity"
                                value={po?.quantity ?? ""}
                                disabled
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="total_amount">Total Harga</Label>
                            <Input
                                id="total_amount"
                                name="total_amount"
                                value={`Rp ${po?.price.toLocaleString() ?? ""}`}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                            <Label htmlFor="po_date">Tanggal Purchase Order</Label>
                            <Input
                                id="po_date"
                                name="po_date"
                                type="date"
                                value={po?.purchase_date ?? ""}
                                disabled
                            />
                        </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="invoice_date">Tanggal Invoice *</Label>
                            <Input
                                id="invoice_date"
                                name="invoice_date"
                                type="date"
                                value={data.invoice_date}
                                onChange={(e) => setData('invoice_date', e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="due_date">Jatuh Tempo *</Label>
                            <Input
                                id="due_date"
                                name="due_date"
                                type="date"
                                value={data.due_date}
                                onChange={(e) => setData('due_date', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="discount">Diskon (%) *</Label>
                            <Input
                                id="discount"
                                name="discount"
                                value={data.discount}
                                onChange={(e) => setData('discount', Number(e.target.value))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="final_amount">Total Akhir</Label>
                            <Input
                                id="final_amount"
                                name="final_amount"
                                value={`Rp ${fa?.toLocaleString()}`}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                            <Label htmlFor="bank">Bank *</Label>
                            <Input
                                id="bank"
                                name="bank"
                                value={data.bank}
                                onChange={(e) => setData('bank', e.target.value)}
                            />
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

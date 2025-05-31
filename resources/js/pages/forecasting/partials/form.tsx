import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { InvoiceItem, LocationItem, PurchaseHistoryItem, PurchaseOrderItem, SelectOptionAttribute } from "@/types/local"
import { useForm } from "@inertiajs/react"
import { Receipt } from "lucide-react"
import { FormEventHandler, useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import ReactSelect from "react-select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import CurrencyInput from 'react-currency-input-field';

type PurchaseFormFields =  {
    purchase_history_id: number | null
    buyer: string
    location_id: number
    purchase_date: string
    total_price: number
    amount: number
}

interface PurchaseFormCompsProps {
    purchase_history?: PurchaseHistoryItem
    location_selections: SelectOptionAttribute[]
}

export default function PurchaseFormComps({purchase_history, location_selections} : PurchaseFormCompsProps) {
    const {data, setData, post, put, processing, reset, errors} = useForm<Required<PurchaseFormFields>>({
        purchase_history_id: purchase_history ? purchase_history.id : null,
        buyer: purchase_history ? purchase_history.buyer : '',
        location_id: purchase_history ? purchase_history.location.id : 0,
        purchase_date: purchase_history ? purchase_history.purchase_date : '',
        total_price: purchase_history ? purchase_history.total_price : 0,
        amount: purchase_history ? purchase_history.amount : 0,
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()
        console.log(data)
        post(route('forecasting.purchase.store'))
    }

    return(
        <Card className="shadow-xl w-full max-w-4xl">
            <CardHeader>
                <CardTitle className="flex gap-6 items-center text-xl">
                    <Receipt />
                    Form Purchase Prediction
                </CardTitle>
                <CardDescription>Tambah Purchase Prediction baru</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-6 p-4" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="buyer">Pembeli *</Label>
                        <Input
                            id="buyer"
                            name="buyer"
                            value={data.buyer}
                            onChange={(e) => setData('buyer', e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="location">Cabang *</Label>
                        <ReactSelect
                            id="location"
                            name="location"
                            placeholder="Cabang"
                            value={location_selections.find(l => l.value == data.location_id.toString())}
                            options={location_selections}
                            onChange={(e) => setData('location_id', e?.value ? Number(e.value) : 0)}
                            className="text-black"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="amount">Jumlah Pembelian (kL) *</Label>
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                value={data.amount}
                                onChange={(e) => setData('amount', Number(e.target.value))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="total_price">Total Harga *</Label>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold">Rp</p>
                                <Input
                                    id="total_price"
                                    name="total_price"
                                    type="number"
                                    value={data.total_price}
                                    onChange={(e) => setData('total_price', Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="purchase_date">Tanggal Pembelian *</Label>
                        <Input
                            id="purchase_date"
                            name="purchase_date"
                            type="date"
                            value={data.purchase_date}
                            onChange={(e) => setData('purchase_date', e.target.value)}
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

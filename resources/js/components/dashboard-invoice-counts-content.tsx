import { Separator } from "@radix-ui/react-separator"
import { ArrowBigDown, ArrowBigUp } from "lucide-react"
import { text } from "stream/consumers"

export interface InvoiceCounts {
    paid: number,
    last_paid: number,
    unpaid: number
    overdue: number
    last_overdue: number,
}

interface DashboardInvoiceCountsProps {
    counts: InvoiceCounts
}

export default function DashboardInvoiceContent({counts} : DashboardInvoiceCountsProps) {
    const paidIncrease = counts.paid - counts.last_paid

    return(
        <div className="flex flex-col gap-5">
            <IncreaseStatus label="Paid" current={counts.paid} last={counts.last_paid}/>
            <IncreaseStatus label="Unpaid" current={counts.unpaid} last={0} active={false} reverse={true}/>
            <IncreaseStatus label="Overdue" current={counts.overdue} last={counts.last_overdue} reverse={true}/>
        </div>
    )
}

function IncreaseStatus(
    {label, current, last, reverse = false, active = true}
    : {label: string, current: number, last: number, reverse?: boolean, active?: boolean}
)  {
    const n = current - last
    const p = (n / last) * 100
    const textColor = reverse ? n < 0 ? "text-green-500" : "text-red-500" : n < 0 ? "text-red-500" : "text-green-500"

    return(
        <div className="grid">
            <div className="grid md:flex gap-2">
                <p>{label}</p>
                {
                    active &&
                    <div className="flex items-center">
                        <p className={`text-xs ${textColor}`}>
                            {
                                n < 0 ?
                                `${n} (${p * -1 < 1000 ? (-1 * p).toFixed(2) : "+999"}%)`
                                :
                                `+${n} / ${p < 1000 ? p.toFixed(2) : "+999"}%`
                            } from last year</p>
                    </div>
                }
            </div>
            <div className="flex gap-2 items-center">
                <p className="text-2xl font-black">{current}</p>
                {
                    active ?
                    n < 0 ? <ArrowBigDown className={textColor}/> : <ArrowBigUp className={textColor}/>
                    :
                    <></>
                }
            </div>
        </div>
    )
}

import { Badge } from "./ui/badge";

export default function PaymentStatusBadge({status} : {status : boolean}) {
    return(
        <Badge className={`uppercase text-white font-bold ${status ? "bg-green-500" : "bg-red-500"}`}>
            {status ? "Paid" : "Unpaid"}
        </Badge>
    )
}

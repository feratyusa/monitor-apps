import { Badge } from "./ui/badge";

interface CollectbilityBadgeProps {
    due_date?: string
    status?: boolean
    number?: number
}

export default function CollectbilityBadge({due_date, status, number} : CollectbilityBadgeProps) {
    const dueDate = new Date(due_date ?? "");
    const diffDays = (dueDate.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24);

    if(status || number === 1) return <Badge className="text-white bg-green-500 font-bold uppercase">Kol 1</Badge>
    else {
        if(diffDays >= 0 || number == 1) return <Badge className="text-white bg-green-500 font-bold uppercase">Kol 1</Badge>
        else if(diffDays >= -90 || number == 2) return <Badge className="text-white bg-blue-500 font-bold uppercase">Kol 2</Badge>
        else if(diffDays >= -120 || number == 3) return <Badge className="text-white bg-orange-500 font-bold uppercase">Kol 3</Badge>
        else if(diffDays >= -180 || number == 4) return <Badge className="text-white bg-amber-500 font-bold uppercase">Kol 4</Badge>
        else return <Badge variant={"destructive"} className="text-white font-bold uppercase" >Kol 5</Badge>
    }
}

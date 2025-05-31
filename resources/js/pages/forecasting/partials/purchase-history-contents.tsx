import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { PurchaseHistoryDataTable } from "../table/data-table";
import { PurchaseHistoryItem } from "@/types/local";

interface PurchaseHistoryContentsProps {
    purchase_histories: PurchaseHistoryItem[]
}

export default function PurchaseHistoryContents({purchase_histories} : PurchaseHistoryContentsProps) {
    return(
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 w-full">
            <Link href={route('forecasting.purchase.create')}>
                <Button className="w-full" variant={"outline"}>
                    <Plus />
                    Tambah Purchase Prediction
                </Button>
            </Link>
            <PurchaseHistoryDataTable data={purchase_histories}/>
        </div>
    )
}
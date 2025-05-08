import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

export default function DetailHeader({title} : {title: string}) {
    return(
        <div className="flex gap-5 items-center overflow-auto">
            <Button size={"sm"} onClick={() => window.history.back()} className="cursor-pointer">
                <ArrowLeft />
                Kembali
            </Button>
            <p className="font-black text-xl">{title}</p>
        </div>
    )
}

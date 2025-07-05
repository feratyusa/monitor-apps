import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { ChartLine } from "lucide-react";

interface ForecastingData {
    
}

export default function ForecastingData({
    
}: ForecastingData) {
    function KeteranganTanggalDetail({ text, color }: { text: string, color: string }) {
        return (
            <div className="flex gap-2 items-center">
                <div className={`w-3 h-3 ${color}`} />
                <p>{text}</p>
            </div>
        )
    }
    return (
        <AppLayout>
            <Head title="Forecast Month" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <ChartLine />
                        <p className="text-2xl font-extrabold">Forecasting Data</p>
                    </div>
                    <p className="text-sm">Data Forecasting</p>
                </div>
            </div>
        </AppLayout>
    );
}
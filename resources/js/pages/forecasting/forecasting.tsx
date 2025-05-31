import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { ChartLine } from "lucide-react";
import { ForecastItem, PurchaseHistoryItem } from "@/types/local";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PurchaseHistoryContents from "./partials/purchase-history-contents";
import { dummyForecastItem, dummyPurchaseHistoryItems } from "@/dummy/dummy_data";
import ForecatingContents from "./partials/forecasting-contents";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forecasting',
        href: '/forecasting',
    },
];

interface ForecastingProps {
    forecasting_items: ForecastItem[]
    purchase_histories: PurchaseHistoryItem[]
}

export default function Forecasting({
    forecasting_items = dummyForecastItem, 
    purchase_histories = dummyPurchaseHistoryItems
} : ForecastingProps) {    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <ChartLine />
                        <p className="text-2xl font-extrabold">Forecasting</p>
                    </div>
                    <div className="">
                        <p className="text-sm ext-muted-foreground">Prediction of the supply needed on upcoming months</p>
                        <p className="text-sm ext-muted-foreground">(uses moving average method on past 12 months history)</p>
                    </div>
                </div>

                <ForecastingTabs
                    forecastingNode={
                        <ForecatingContents forecast_items={forecasting_items}/>
                    }
                    historyNode={
                        <PurchaseHistoryContents purchase_histories={purchase_histories}/>
                    } 
                />
            </div>
        </AppLayout>
    );
}

interface ForecastingTabsProps {
    forecastingNode: React.ReactNode
    historyNode: React.ReactNode
}

function ForecastingTabs({forecastingNode, historyNode} : ForecastingTabsProps) {
    return(
        <div className="flex w-full flex-col gap-6">
            <Tabs defaultValue="forecast">
                <TabsList>
                    <TabsTrigger className="text-lg mr-5" value="forecast">Forecast</TabsTrigger>
                    <TabsTrigger className="text-lg" value="history">Purchase History</TabsTrigger>
                </TabsList>
                <TabsContent  value="forecast">
                    {forecastingNode}
                </TabsContent>
                <TabsContent value="history">
                    {historyNode}
                </TabsContent>
            </Tabs>
        </div>
    )
}

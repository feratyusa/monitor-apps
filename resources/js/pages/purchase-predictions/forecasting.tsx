import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { ChartLine } from "lucide-react";
import { PurchasePredictionItem, PurchaseHistoryItem, SummaryItem } from "@/types/local";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PurchaseHistoryContents from "./partials/purchase-history-contents";
import { dummyForecastItem, dummyPurchaseHistoryItems, dummySummary } from "@/dummy/dummy_data";
import ForecatingContents from "./partials/forecasting-contents";
import React from "react";
import SummaryContents from "./partials/summary-contents";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Purchase Predictions',
        href: '/purchase-predictions',
    },
];

interface ForecastingProps {
    forecasting_items: PurchasePredictionItem[]
    purchase_histories: PurchaseHistoryItem[]
    summary_items: SummaryItem[]
}

export default function PurchasePredictions({
    forecasting_items = dummyForecastItem, 
    purchase_histories = dummyPurchaseHistoryItems,
    summary_items = dummySummary,
} : ForecastingProps) {    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Purchase Predictions" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <ChartLine />
                        <p className="text-2xl font-extrabold">Purchase Predictions</p>
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
                    summaryHistoryNode={
                        <SummaryContents summary_items={summary_items}/>
                    }
                />
            </div>
        </AppLayout>
    );
}

interface ForecastingTabsProps {
    forecastingNode: React.ReactNode
    historyNode: React.ReactNode
    summaryHistoryNode: React.ReactNode
}

function ForecastingTabs({forecastingNode, historyNode, summaryHistoryNode} : ForecastingTabsProps) {
    return(
        <div className="flex w-full flex-col gap-6">
            <Tabs defaultValue="summary">
                <TabsList>
                    {/* <TabsTrigger className="text-lg mr-5" value="forecast">Forecast</TabsTrigger> */}
                    <TabsTrigger className="text-lg mr-5" value="history">Purchase Prediction</TabsTrigger>
                    <TabsTrigger className="text-lg" value="summary">Summary Purchase Prediction</TabsTrigger>
                </TabsList>
                {/* <TabsContent  value="forecast">
                    {forecastingNode}
                </TabsContent> */}
                <TabsContent value="history">
                    {historyNode}
                </TabsContent>
                <TabsContent value="summary">
                    {summaryHistoryNode}
                </TabsContent>
            </Tabs>
        </div>
    )
}

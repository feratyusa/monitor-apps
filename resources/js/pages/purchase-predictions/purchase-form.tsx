import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import PurchaseFormComps from "./partials/form";
import { dummyLocations } from "@/dummy/dummy_data";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forecasting',
        href: '/forecasting',
    },
];

const locationSelection = [
    {value: dummyLocations[0].id.toString(), label: dummyLocations[0].name},
    {value: dummyLocations[1].id.toString(), label: dummyLocations[1].name},
    {value: dummyLocations[2].id.toString(), label: dummyLocations[2].name},
    {value: dummyLocations[3].id.toString(), label: dummyLocations[3].name},
    {value: dummyLocations[4].id.toString(), label: dummyLocations[4].name},
]

export default function PurchaseForm() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <div className="flex h-full flex-1 flex-col gap-4 items-center rounded-xl p-4">
                <PurchaseFormComps location_selections={locationSelection} />
            </div>
        </AppLayout>
    );
}
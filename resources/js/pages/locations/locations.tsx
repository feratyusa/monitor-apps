import { Button } from "@/components/ui/button";
import { dummyLocations } from "@/dummy/dummy_data";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { LocationItem } from "@/types/local";
import { Head, Link } from "@inertiajs/react";
import { Box, MapPin, Plus } from "lucide-react";
import { LocationDataTable } from "./table/data-table";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Locations',
        href: '/locations',
    },
];

interface LocationsProps {
    locations: LocationItem[]
}

export default function Locations({locations = dummyLocations} : LocationsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Locations" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <MapPin />
                        <p className="text-2xl font-extrabold">Locations</p>
                    </div>
                    <p className="text-sm ext-muted-foreground">Lokasi Cabang</p>
                </div>
                <Link href={'#'}>
                    <Button className="w-full" variant={"outline"}>
                        <Plus />
                        Tambah Lokasi Cabang
                    </Button>
                </Link>
                <LocationDataTable data={locations}/>
            </div>
        </AppLayout>
    );
}

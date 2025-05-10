import { Button } from "@/components/ui/button";
import { dummySuppliers } from "@/dummy/dummy_data";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Building2, Plus } from "lucide-react";
import { SupplierDataTable } from "./table/data-table";
import { SupplierItem } from "@/types/local";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Suppliers',
        href: '/suppliers',
    },
];

interface SuppliersProps {
    suppliers: SupplierItem[]
}

export default function Suppliers({suppliers} : SuppliersProps) {
    console.log(suppliers)

    const data = suppliers

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Purchase Orders" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <Building2 />
                        <p className="text-2xl font-extrabold">Suppliers</p>
                    </div>
                    <p className="text-sm ext-muted-foreground">List supplier</p>
                </div>
                {/* <Link href={''}> */}
                    <Button className="w-full" variant={"outline"}>
                        <Plus />
                        Tambah Supplier
                    </Button>
                {/* </Link> */}
                <SupplierDataTable data={data}/>
            </div>
        </AppLayout>
    );
}

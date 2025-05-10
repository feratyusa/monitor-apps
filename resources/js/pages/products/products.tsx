import { Button } from "@/components/ui/button";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import { dummyProducts } from "@/dummy/dummy_data";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { ProductItem } from "@/types/local";
import { Head } from "@inertiajs/react";
import { Box, Plus } from "lucide-react";
import { ProductDataTable } from "./table/data-table";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface ProductsProps {
    products: ProductItem[]
}

export default function Products({products} : ProductsProps) {
    const data = products

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <Box />
                        <p className="text-2xl font-extrabold">Products</p>
                    </div>
                    <p className="text-sm ext-muted-foreground">List product</p>
                </div>
                {/* <Link href={''}> */}
                    <Button className="w-full" variant={"outline"}>
                        <Plus />
                        Tambah Product
                    </Button>
                {/* </Link> */}
                <ProductDataTable data={data}/>
            </div>
        </AppLayout>
    );
}

import { dummyProducts, dummySuppliers } from "@/dummy/dummy_data";

export const supplierOptions = [
    {
        label: dummySuppliers[0].name,
        value: dummySuppliers[0].id
    },
    {
        label: dummySuppliers[1].name,
        value: dummySuppliers[1].id
    },
    {
        label: dummySuppliers[2].name,
        value: dummySuppliers[2].id
    },
    {
        label: dummySuppliers[3].name,
        value: dummySuppliers[3].id
    },
    {
        label: dummySuppliers[4].name,
        value: dummySuppliers[4].id
    },
]

export const productOptions = [
    {
        label: dummyProducts[0].name,
        value: dummyProducts[0].id
    },
    {
        label: dummyProducts[1].name,
        value: dummyProducts[1].id
    },
    {
        label: dummyProducts[2].name,
        value: dummyProducts[2].id
    },
]

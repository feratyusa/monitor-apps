import { dummyProducts, dummySuppliers } from "@/dummy/dummy_data";

export const supplierOptions = [
    {
        label: dummySuppliers[0].name,
        value: dummySuppliers[0].id.toLocaleString()
    },
    {
        label: dummySuppliers[1].name,
        value: dummySuppliers[1].id.toLocaleString()
    },
    {
        label: dummySuppliers[2].name,
        value: dummySuppliers[2].id.toLocaleString()
    },
    {
        label: dummySuppliers[3].name,
        value: dummySuppliers[3].id.toLocaleString()
    },
    {
        label: dummySuppliers[4].name,
        value: dummySuppliers[4].id.toLocaleString()
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

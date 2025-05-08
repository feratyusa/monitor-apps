export interface SupplierItem {
    name: string,
    address: string,
    phone1: string,
    phone2: string | null,
    contact_person: string,
    email: string,
}

export interface ProductItem {
    name: string,
    price_per_unit: number,
}

export interface PurchaseOrderItem {
    nomor: string,
    supplier: SupplierItem,
    product: ProductItem,
    purchase_date: string,
    quantity: number,
    price: number,
}

export interface InvoiceItem {
    nomor: string,
    invoice_date: string,
    due_date: string,
    total_amount: number,
    discount: number,
    payment_status: boolean
    purchase_order: PurchaseOrderItem,
    bank: string,
}

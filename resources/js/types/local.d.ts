export interface SupplierItem {
    id: number,
    name: string,
    address: string,
    phone1: string,
    phone2: string | null,
    contact_person: string,
    email: string,
    kolekbilitas?: number
}

export interface ProductItem {
    id: number,
    name: string,
    price_per_unit: number,
}

export interface PurchaseOrderItem {
    id: number
    nomor: string,
    supplier: SupplierItem,
    product: ProductItem,
    purchase_date: string,
    quantity: number,
    price: number,
}

export interface InvoiceItem {
    id: number
    nomor: string,
    invoice_date: string,
    due_date: string,
    total_amount: number,
    tax: number,
    payment_status: boolean
    purchase_order: PurchaseOrderItem,
    bank: string,
    delivery_date: string
}

export interface SelectOptionAttribute {
    value: string
    label: string
}

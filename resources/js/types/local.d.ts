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

export interface LocationItem {
    id: number
    name: string
    address: string
}

export interface PurchaseHistoryItem {
    id: number
    buyer: string
    amount: number
    total_price: number
    purchase_date: string
    location: LocationItem
}

export interface PurchasePredictionItem {
    year: number
    locations: PurchasePredictionLocation[]
}

export interface PurchasePredictionLocation {
    location: LocationItem
    months: PurchasePredictionMonth[]
}

export interface PurchasePredictionMonth {
    amount: number
    prediction: boolean
}

export interface SummaryItem {
    year: number
    locations: SummaryLocation[]
}

export interface SummaryLocation {
    location: LocationItem
    months: number[]
}

export interface ForecastYear {
    year: number
    quantity_total: number
}

export interface ForecastMonth {
    month: number
    quantity_total: number
}

export interface ForecastItem {
    customer: SupplierItem
    type: "cash" | "invoice"
    quantity: number
    purchase_date: string
    week: number
}

export interface ForecastWeek {
    customer: SupplierItem
    forecast_item: ForecastItem[]
}
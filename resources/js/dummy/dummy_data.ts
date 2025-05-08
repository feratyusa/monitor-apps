import { InvoiceItem, ProductItem, PurchaseOrderItem, SupplierItem } from "@/types/local";

export const dummyProducts: ProductItem[] = [
    {
        name: "BIOSOLAR (60)",
        price_per_unit: 13000,
    },
    {
        name: "BIOSOLAR (70)",
        price_per_unit: 14000,
    },
    {
        name: "BIOSOLAR (80)",
        price_per_unit: 12800,
    },
]

export const dummySuppliers: SupplierItem[] = [
    {
        name: "Global Tech Solutions",
        address: "123 Business Park, Suite 450, New York, NY 10001",
        phone1: "+1 212-555-0187",
        phone2: "+1 212-555-0188",
        contact_person: "Sarah Johnson",
        email: "s.johnson@globaltech.com"
    },
    {
        name: "Premium Office Supplies",
        address: "456 Commerce Street, Chicago, IL 60601",
        phone1: "+1 312-555-0246",
        phone2: null,
        contact_person: "Michael Chen",
        email: "michael.chen@premiumoffice.com"
    },
    {
        name: "Eco-Friendly Materials Co.",
        address: "789 Green Avenue, Portland, OR 97201",
        phone1: "+1 503-555-0135",
        phone2: "+1 503-555-0136",
        contact_person: "Emily Rodriguez",
        email: "emily@ecofriendlymaterials.org"
    },
    {
        name: "Swift Logistics International",
        address: "321 Transport Lane, Miami, FL 33101",
        phone1: "+1 305-555-0199",
        phone2: "+1 305-555-0200",
        contact_person: "David Wilson",
        email: "d.wilson@swiftlogistics.com"
    },
    {
        name: "Quality Food Distributors",
        address: "654 Market Street, San Francisco, CA 94103",
        phone1: "+1 415-555-0165",
        phone2: null,
        contact_person: "Jessica Lee",
        email: "jlee@qualityfooddist.com"
    },
    {
        name: "Advanced Manufacturing Inc.",
        address: "987 Industrial Way, Detroit, MI 48201",
        phone1: "+1 313-555-0222",
        phone2: "+1 313-555-0223",
        contact_person: "Robert Thompson",
        email: "r.thompson@advmanufacturing.com"
    }
];

export const dummyPurchaseOrders: PurchaseOrderItem[] = [
    {
        nomor: "PO-2023-001",
        supplier: dummySuppliers[0], // Global Tech Solutions
        product: dummyProducts[0], // BIOSOLAR (60)
        purchase_date: "2023-01-15",
        quantity: 50,
        price: 650000 // 50 * 13000
    },
    {
        nomor: "PO-2023-002",
        supplier: dummySuppliers[1], // Premium Office Supplies
        product: dummyProducts[1], // BIOSOLAR (70)
        purchase_date: "2023-01-18",
        quantity: 35,
        price: 490000 // 35 * 14000
    },
    {
        nomor: "PO-2023-003",
        supplier: dummySuppliers[2], // Eco-Friendly Materials Co.
        product: dummyProducts[2], // BIOSOLAR (80)
        purchase_date: "2023-01-22",
        quantity: 42,
        price: 537600 // 42 * 12800
    },
    {
        nomor: "PO-2023-004",
        supplier: dummySuppliers[3], // Swift Logistics International
        product: dummyProducts[0], // BIOSOLAR (60)
        purchase_date: "2023-02-05",
        quantity: 60,
        price: 780000 // 60 * 13000
    },
    {
        nomor: "PO-2023-005",
        supplier: dummySuppliers[4], // Quality Food Distributors
        product: dummyProducts[1], // BIOSOLAR (70)
        purchase_date: "2023-02-12",
        quantity: 28,
        price: 392000 // 28 * 14000
    },
    {
        nomor: "PO-2023-006",
        supplier: dummySuppliers[5], // Advanced Manufacturing Inc.
        product: dummyProducts[2], // BIOSOLAR (80)
        purchase_date: "2023-02-18",
        quantity: 55,
        price: 704000 // 55 * 12800
    },
    {
        nomor: "PO-2023-007",
        supplier: dummySuppliers[0], // Global Tech Solutions
        product: dummyProducts[1], // BIOSOLAR (70)
        purchase_date: "2023-03-01",
        quantity: 40,
        price: 560000 // 40 * 14000
    },
    {
        nomor: "PO-2023-008",
        supplier: dummySuppliers[2], // Eco-Friendly Materials Co.
        product: dummyProducts[0], // BIOSOLAR (60)
        purchase_date: "2023-03-10",
        quantity: 75,
        price: 975000 // 75 * 13000
    },
    {
        nomor: "PO-2023-009",
        supplier: dummySuppliers[4], // Quality Food Distributors
        product: dummyProducts[2], // BIOSOLAR (80)
        purchase_date: "2023-03-15",
        quantity: 30,
        price: 384000 // 30 * 12800
    },
    {
        nomor: "PO-2023-010",
        supplier: dummySuppliers[3], // Swift Logistics International
        product: dummyProducts[1], // BIOSOLAR (70)
        purchase_date: "2023-03-20",
        quantity: 45,
        price: 630000 // 45 * 14000
    }
];

export const dummyInvoices: InvoiceItem[] = [
    {
        nomor: "INV-2024-001",
        invoice_date: "2025-01-15",
        due_date: "2025-04-14",
        total_amount: 650000,
        discount: 0.05,
        payment_status: true,
        purchase_order: dummyPurchaseOrders[0],  // PO-2023-001
        bank: "Bank Jatim",
    },
    {
        nomor: "INV-2024-002",
        invoice_date: "2025-03-20",
        due_date: "2025-06-19",
        total_amount: 490000,
        discount: 0,
        payment_status: false,
        purchase_order: dummyPurchaseOrders[1],  // PO-2023-002
        bank: "Bank Mandiri",
    },
    {
        nomor: "INV-2024-003",
        invoice_date: "2024-01-25",
        due_date: "2024-02-24",
        total_amount: 537600,
        discount: 0.1,
        payment_status: false,
        purchase_order: dummyPurchaseOrders[2], // PO-2023-003
        bank: "Bank BCA",
    },
    {
        nomor: "INV-2024-004",
        invoice_date: "2024-11-10",
        due_date: "2025-01-11",
        total_amount: 780000,
        discount: 0.02,
        payment_status: false,
        purchase_order: dummyPurchaseOrders[3], // PO-2023-004
        bank: "CIMB Niaga",
    },
    {
        nomor: "INV-2024-005",
        invoice_date: "2025-01-15",
        due_date: "2025-02-16",
        total_amount: 392000,
        discount: 0,
        payment_status: true,
        purchase_order: dummyPurchaseOrders[4], // PO-2023-005
        bank: "Bank Jatim",
    },
    {
        nomor: "INV-2024-006",
        invoice_date: "2024-10-20",
        due_date: "2024-12-21",
        total_amount: 704000,
        discount: 0.15,
        payment_status: false,
        purchase_order: dummyPurchaseOrders[5], // PO-2023-006
        bank: "Bank BRI",
    },
    {
        nomor: "INV-2024-007",
        invoice_date: "2025-03-05",
        due_date: "2025-05-04",
        total_amount: 560000,
        discount: 0.07,
        payment_status: false,
        purchase_order: dummyPurchaseOrders[6], // PO-2023-007
        bank: "CIMB Niagas",
    },
];

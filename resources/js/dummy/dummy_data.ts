import { PurchasePredictionItem, InvoiceItem, LocationItem, ProductItem, PurchaseHistoryItem, PurchaseOrderItem, SummaryItem, SupplierItem, ForecastYear, ForecastMonth, ForecastItem, ForecastWeek } from "@/types/local";

export const dummyProducts: ProductItem[] = [
    {
        id: 1,
        name: "BIOSOLAR (60)",
        price_per_unit: 13000,
    },
    {
        id: 2,
        name: "BIOSOLAR (70)",
        price_per_unit: 14000,
    },
    {
        id: 3,
        name: "BIOSOLAR (80)",
        price_per_unit: 12800,
    },
]

export const dummySuppliers: SupplierItem[] = [
    {
        id: 1,
        name: "Global Tech Solutions",
        address: "123 Business Park, Suite 450, New York, NY 10001",
        phone1: "+1 212-555-0187",
        phone2: "+1 212-555-0188",
        contact_person: "Sarah Johnson",
        email: "s.johnson@globaltech.com",
        kolekbilitas: 1,
    },
    {
        id: 2,
        name: "Premium Office Supplies",
        address: "456 Commerce Street, Chicago, IL 60601",
        phone1: "+1 312-555-0246",
        phone2: null,
        contact_person: "Michael Chen",
        email: "michael.chen@premiumoffice.com",
        kolekbilitas: 2,
    },
    {
        id: 3,
        name: "Eco-Friendly Materials Co.",
        address: "789 Green Avenue, Portland, OR 97201",
        phone1: "+1 503-555-0135",
        phone2: "+1 503-555-0136",
        contact_person: "Emily Rodriguez",
        email: "emily@ecofriendlymaterials.org",
        kolekbilitas: 3,
    },
    {
        id: 4,
        name: "Swift Logistics International",
        address: "321 Transport Lane, Miami, FL 33101",
        phone1: "+1 305-555-0199",
        phone2: "+1 305-555-0200",
        contact_person: "David Wilson",
        email: "d.wilson@swiftlogistics.com",
        kolekbilitas: 5,
    },
    {
        id: 5,
        name: "Quality Food Distributors",
        address: "654 Market Street, San Francisco, CA 94103",
        phone1: "+1 415-555-0165",
        phone2: null,
        contact_person: "Jessica Lee",
        email: "jlee@qualityfooddist.com",
        kolekbilitas: 4,
    },
    {
        id: 6,
        name: "Advanced Manufacturing Inc.",
        address: "987 Industrial Way, Detroit, MI 48201",
        phone1: "+1 313-555-0222",
        phone2: "+1 313-555-0223",
        contact_person: "Robert Thompson",
        email: "r.thompson@advmanufacturing.com",
        kolekbilitas: 2,
    }
];

export const dummyPurchaseOrders: PurchaseOrderItem[] = [
    {
        id: 1,
        nomor: "PO-2023-001",
        supplier: dummySuppliers[0], // Global Tech Solutions
        product: dummyProducts[0], // BIOSOLAR (60)
        purchase_date: "2023-01-15",
        quantity: 50,
        price: 650000 // 50 * 13000
    },
    {
        id: 2,
        nomor: "PO-2023-002",
        supplier: dummySuppliers[1], // Premium Office Supplies
        product: dummyProducts[1], // BIOSOLAR (70)
        purchase_date: "2023-01-18",
        quantity: 35,
        price: 490000 // 35 * 14000
    },
    {
        id: 3,
        nomor: "PO-2023-003",
        supplier: dummySuppliers[2], // Eco-Friendly Materials Co.
        product: dummyProducts[2], // BIOSOLAR (80)
        purchase_date: "2023-01-22",
        quantity: 42,
        price: 537600 // 42 * 12800
    },
    {
        id: 4,
        nomor: "PO-2023-004",
        supplier: dummySuppliers[3], // Swift Logistics International
        product: dummyProducts[0], // BIOSOLAR (60)
        purchase_date: "2023-02-05",
        quantity: 60,
        price: 780000 // 60 * 13000
    },
    {
        id: 5,
        nomor: "PO-2023-005",
        supplier: dummySuppliers[4], // Quality Food Distributors
        product: dummyProducts[1], // BIOSOLAR (70)
        purchase_date: "2023-02-12",
        quantity: 28,
        price: 392000 // 28 * 14000
    },
    {
        id: 6,
        nomor: "PO-2023-006",
        supplier: dummySuppliers[5], // Advanced Manufacturing Inc.
        product: dummyProducts[2], // BIOSOLAR (80)
        purchase_date: "2023-02-18",
        quantity: 55,
        price: 704000 // 55 * 12800
    },
    {
        id: 7,
        nomor: "PO-2023-007",
        supplier: dummySuppliers[0], // Global Tech Solutions
        product: dummyProducts[1], // BIOSOLAR (70)
        purchase_date: "2023-03-01",
        quantity: 40,
        price: 560000 // 40 * 14000
    },
    {
        id: 8,
        nomor: "PO-2023-008",
        supplier: dummySuppliers[2], // Eco-Friendly Materials Co.
        product: dummyProducts[0], // BIOSOLAR (60)
        purchase_date: "2023-03-10",
        quantity: 75,
        price: 975000 // 75 * 13000
    },
    {
        id: 9,
        nomor: "PO-2023-009",
        supplier: dummySuppliers[4], // Quality Food Distributors
        product: dummyProducts[2], // BIOSOLAR (80)
        purchase_date: "2023-03-15",
        quantity: 30,
        price: 384000 // 30 * 12800
    },
    {
        id: 10,
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
        id: 1,
        nomor: "INV-2024-001",
        invoice_date: "2025-01-15",
        due_date: "2025-04-14",
        total_amount: 650000,
        tax: 0.05,
        payment_status: true,
        purchase_order: dummyPurchaseOrders[0],  // PO-2023-001
        bank: "Bank Jatim",
        delivery_date: '2025-01-01',
    },
    {
        id: 2,
        nomor: "INV-2024-002",
        invoice_date: "2025-03-20",
        due_date: "2025-06-19",
        total_amount: 490000,
        tax: 0,
        payment_status: false,
        purchase_order: dummyPurchaseOrders[1],  // PO-2023-002
        bank: "Bank Mandiri",
        delivery_date: '2025-01-01',
    },
    {
        id: 3,
        nomor: "INV-2024-003",
        invoice_date: "2024-01-25",
        due_date: "2024-02-24",
        total_amount: 537600,
        tax: 0.1,
        payment_status: false,
        purchase_order: dummyPurchaseOrders[2], // PO-2023-003
        bank: "Bank BCA",
        delivery_date: '2025-01-01',
    },
    {
        id: 4,
        nomor: "INV-2024-004",
        invoice_date: "2024-11-10",
        due_date: "2025-01-11",
        total_amount: 780000,
        tax: 0.02,
        payment_status: false,
        purchase_order: dummyPurchaseOrders[3], // PO-2023-004
        bank: "CIMB Niaga",
        delivery_date: '2025-01-01',
    },
    {
        id: 5,
        nomor: "INV-2024-005",
        invoice_date: "2025-01-15",
        due_date: "2025-02-16",
        total_amount: 392000,
        tax: 0,
        payment_status: true,
        purchase_order: dummyPurchaseOrders[4], // PO-2023-005
        bank: "Bank Jatim",
        delivery_date: '2025-01-01',
    },
    {
        id: 6,
        nomor: "INV-2024-006",
        invoice_date: "2024-10-20",
        due_date: "2024-12-21",
        total_amount: 704000,
        tax: 0.15,
        payment_status: false,
        purchase_order: dummyPurchaseOrders[5], // PO-2023-006
        bank: "Bank BRI",
        delivery_date: '2025-01-01',
    },
    {
        id: 7,
        nomor: "INV-2024-007",
        invoice_date: "2025-03-05",
        due_date: "2025-05-04",
        total_amount: 560000,
        tax: 0.07,
        payment_status: false,
        purchase_order: dummyPurchaseOrders[6], // PO-2023-007
        bank: "CIMB Niagas",
        delivery_date: '2025-01-01',
    },
];

export const dummyLocations: LocationItem[] = [
    { id: 1, name: "Balangan", address: "Jalan Balangan" },
    { id: 2, name: "Banjarmasin", address: "Jalan Balangan" },
    { id: 3, name: "Tanah Bumbu", address: "Jalan Tanah Bumbu" },
    { id: 4, name: "Tanah Laut", address: "Jalan Tanah Laut" },
    { id: 5, name: "Tanah Baru", address: "Jalan Tanah Baru" },
]

export const dummyPurchaseHistoryItems: PurchaseHistoryItem[] = [
    {
        id: 1,
        buyer: "PT Jaya Sandi",
        location: dummyLocations[0],
        amount: 2500,
        total_price: 15000000,
        purchase_date: '2025-01-02',
    },
    {
        id: 2,
        buyer: "CV Budi Sandi",
        location: dummyLocations[1],
        amount: 2500,
        total_price: 15000000,
        purchase_date: '2025-02-02',
    },
    {
        id: 3,
        buyer: "PT Lima Kata",
        location: dummyLocations[2],
        amount: 2500,
        total_price: 15000000,
        purchase_date: '2025-03-02',
    },
    {
        id: 4,
        buyer: "CV Optik Utama",
        location: dummyLocations[3],
        amount: 2500,
        total_price: 15000000,
        purchase_date: '2025-04-02',
    },
    {
        id: 5,
        buyer: "PT Luka Sandi",
        location: dummyLocations[4],
        amount: 2500,
        total_price: 15000000,
        purchase_date: '2025-05-02',
    },
]

export const dummyForecastItem: PurchasePredictionItem[] = [
    {
        year: 2026,
        locations: [
            {
                location: dummyLocations[0],
                months: [
                    { amount: 25000, prediction: true },
                    { amount: 32100, prediction: true },
                    { amount: 24200, prediction: true },
                    { amount: 21230, prediction: true },
                    { amount: 15000, prediction: true },
                    { amount: 32000, prediction: true },
                    { amount: 23200, prediction: true },
                    { amount: 22000, prediction: true },
                    { amount: 23300, prediction: true },
                    { amount: 24100, prediction: true },
                    { amount: 15200, prediction: true },
                    { amount: 12400, prediction: true },
                ]
            },
            {
                location: dummyLocations[1],
                months: [
                    { amount: 25000, prediction: true },
                    { amount: 32100, prediction: true },
                    { amount: 24200, prediction: true },
                    { amount: 21230, prediction: true },
                    { amount: 15000, prediction: true },
                    { amount: 32000, prediction: true },
                    { amount: 23200, prediction: true },
                    { amount: 22000, prediction: true },
                    { amount: 23300, prediction: true },
                    { amount: 24100, prediction: true },
                    { amount: 15200, prediction: true },
                    { amount: 12400, prediction: true },
                ]
            },
            {
                location: dummyLocations[3],
                months: [
                    { amount: 25000, prediction: true },
                    { amount: 32100, prediction: true },
                    { amount: 24200, prediction: true },
                    { amount: 21230, prediction: true },
                    { amount: 15000, prediction: true },
                    { amount: 32000, prediction: true },
                    { amount: 23200, prediction: true },
                    { amount: 22000, prediction: true },
                    { amount: 23300, prediction: true },
                    { amount: 24100, prediction: true },
                    { amount: 15200, prediction: true },
                    { amount: 12400, prediction: true },
                ]
            },
            {
                location: dummyLocations[4],
                months: [
                    { amount: 25000, prediction: true },
                    { amount: 32100, prediction: true },
                    { amount: 24200, prediction: true },
                    { amount: 21230, prediction: true },
                    { amount: 15000, prediction: true },
                    { amount: 32000, prediction: true },
                    { amount: 23200, prediction: true },
                    { amount: 22000, prediction: true },
                    { amount: 23300, prediction: true },
                    { amount: 24100, prediction: true },
                    { amount: 15200, prediction: true },
                    { amount: 12400, prediction: true },
                ]
            },
        ]
    },
    {
        year: 2025,
        locations: [
            {
                location: dummyLocations[0],
                months: [
                    { amount: 25000, prediction: false },
                    { amount: 32100, prediction: false },
                    { amount: 24200, prediction: false },
                    { amount: 21230, prediction: false },
                    { amount: 15000, prediction: false },
                    { amount: 32000, prediction: true },
                    { amount: 23200, prediction: true },
                    { amount: 22000, prediction: true },
                    { amount: 23300, prediction: true },
                    { amount: 24100, prediction: true },
                    { amount: 15200, prediction: true },
                    { amount: 12400, prediction: true },
                ]
            },
            {
                location: dummyLocations[1],
                months: [
                    { amount: 25000, prediction: false },
                    { amount: 32100, prediction: false },
                    { amount: 24200, prediction: false },
                    { amount: 21230, prediction: false },
                    { amount: 15000, prediction: false },
                    { amount: 32000, prediction: true },
                    { amount: 23200, prediction: true },
                    { amount: 22000, prediction: true },
                    { amount: 23300, prediction: true },
                    { amount: 24100, prediction: true },
                    { amount: 15200, prediction: true },
                    { amount: 12400, prediction: true },
                ]
            },
            {
                location: dummyLocations[3],
                months: [
                    { amount: 25000, prediction: false },
                    { amount: 32100, prediction: false },
                    { amount: 24200, prediction: false },
                    { amount: 21230, prediction: false },
                    { amount: 15000, prediction: false },
                    { amount: 32000, prediction: true },
                    { amount: 23200, prediction: true },
                    { amount: 22000, prediction: true },
                    { amount: 23300, prediction: true },
                    { amount: 24100, prediction: true },
                    { amount: 15200, prediction: true },
                    { amount: 12400, prediction: true },
                ]
            },
            {
                location: dummyLocations[4],
                months: [
                    { amount: 25000, prediction: false },
                    { amount: 32100, prediction: false },
                    { amount: 24200, prediction: false },
                    { amount: 21230, prediction: false },
                    { amount: 15000, prediction: false },
                    { amount: 32000, prediction: true },
                    { amount: 23200, prediction: true },
                    { amount: 22000, prediction: true },
                    { amount: 23300, prediction: true },
                    { amount: 24100, prediction: true },
                    { amount: 15200, prediction: true },
                    { amount: 12400, prediction: true },
                ]
            },
        ]
    },
    {
        year: 2024,
        locations: [
            {
                location: dummyLocations[0],
                months: [
                    { amount: 25000, prediction: false },
                    { amount: 32100, prediction: false },
                    { amount: 24200, prediction: false },
                    { amount: 21230, prediction: false },
                    { amount: 15000, prediction: false },
                    { amount: 32000, prediction: false },
                    { amount: 23200, prediction: false },
                    { amount: 22000, prediction: false },
                    { amount: 23300, prediction: false },
                    { amount: 24100, prediction: false },
                    { amount: 15200, prediction: false },
                    { amount: 12400, prediction: false },
                ]
            },
            {
                location: dummyLocations[1],
                months: [
                    { amount: 25000, prediction: false },
                    { amount: 32100, prediction: false },
                    { amount: 24200, prediction: false },
                    { amount: 21230, prediction: false },
                    { amount: 15000, prediction: false },
                    { amount: 32000, prediction: false },
                    { amount: 23200, prediction: false },
                    { amount: 22000, prediction: false },
                    { amount: 23300, prediction: false },
                    { amount: 24100, prediction: false },
                    { amount: 15200, prediction: false },
                    { amount: 12400, prediction: false },
                ]
            },
            {
                location: dummyLocations[3],
                months: [
                    { amount: 25000, prediction: false },
                    { amount: 32100, prediction: false },
                    { amount: 24200, prediction: false },
                    { amount: 21230, prediction: false },
                    { amount: 15000, prediction: false },
                    { amount: 32000, prediction: false },
                    { amount: 23200, prediction: false },
                    { amount: 22000, prediction: false },
                    { amount: 23300, prediction: false },
                    { amount: 24100, prediction: false },
                    { amount: 15200, prediction: false },
                    { amount: 12400, prediction: false },
                ]
            },
            {
                location: dummyLocations[4],
                months: [
                    { amount: 25000, prediction: false },
                    { amount: 32100, prediction: false },
                    { amount: 24200, prediction: false },
                    { amount: 21230, prediction: false },
                    { amount: 15000, prediction: false },
                    { amount: 32000, prediction: false },
                    { amount: 23200, prediction: false },
                    { amount: 22000, prediction: false },
                    { amount: 23300, prediction: false },
                    { amount: 24100, prediction: false },
                    { amount: 15200, prediction: false },
                    { amount: 12400, prediction: false },
                ]
            },
        ]
    },
]

export const dummySummary: SummaryItem[] = [
    {
        year: 2025,
        locations: [
            {
                location: dummyLocations[0],
                months: [23000, 21500, 22000, 18000, 15000, 19000, 20000, 18000, 19000, 25000, 21000, 22000]
            },
            {
                location: dummyLocations[1],
                months: [23000, 21500, 22000, 18000, 15000, 19000, 20000, 18000, 19000, 25000, 21000, 22000]
            },
            {
                location: dummyLocations[2],
                months: [23000, 21500, 22000, 18000, 15000, 19000, 20000, 18000, 19000, 25000, 21000, 22000]
            },
            {
                location: dummyLocations[3],
                months: [23000, 21500, 22000, 18000, 15000, 19000, 20000, 18000, 19000, 25000, 21000, 22000]
            },
            {
                location: dummyLocations[4],
                months: [23000, 21500, 22000, 18000, 15000, 19000, 20000, 18000, 19000, 25000, 21000, 22000]
            },
        ],
    },
    {
        year: 2024,
        locations: [
            {
                location: dummyLocations[0],
                months: [23000, 21500, 22000, 18000, 15000, 19000, 20000, 18000, 19000, 25000, 21000, 22000]
            },
            {
                location: dummyLocations[1],
                months: [23000, 21500, 22000, 18000, 15000, 19000, 20000, 18000, 19000, 25000, 21000, 22000]
            },
            {
                location: dummyLocations[2],
                months: [23000, 21500, 22000, 18000, 15000, 19000, 20000, 18000, 19000, 25000, 21000, 22000]
            },
            {
                location: dummyLocations[3],
                months: [23000, 21500, 22000, 18000, 15000, 19000, 20000, 18000, 19000, 25000, 21000, 22000]
            },
            {
                location: dummyLocations[4],
                months: [23000, 21500, 22000, 18000, 15000, 19000, 20000, 18000, 19000, 25000, 21000, 22000]
            },
        ],

    }
]

export const dForecastYear: ForecastYear[] = [
    { year: 2025, quantity_total: 12567 },
    { year: 2024, quantity_total: 23487 },
    { year: 2023, quantity_total: 11023 },
    { year: 2022, quantity_total: 11023 },
    { year: 2021, quantity_total: 11023 },
    { year: 2020, quantity_total: 11023 },
]

export const dForecastMonth: ForecastMonth[] = [
    { month: 1, quantity_total: 1063 },
    { month: 2, quantity_total: 1413 },
    { month: 3, quantity_total: 1263 },
    { month: 4, quantity_total: 1223 },
    { month: 5, quantity_total: 1123 },
    { month: 6, quantity_total: 1563 },
    { month: 7, quantity_total: 1863 },
    { month: 8, quantity_total: 2063 },
    { month: 9, quantity_total: 1323 },
    { month: 10, quantity_total: 1223 },
    { month: 11, quantity_total: 1763 },
    { month: 12, quantity_total: 1113 }
]

export const dForecastItems: ForecastItem[] = [
    { customer: dummySuppliers[0], purchase_date: '2025-01-02', quantity: 235, type: "invoice", week: 1 },
    { customer: dummySuppliers[0], purchase_date: '2025-01-09', quantity: 211, type: "cash", week: 2 },
    { customer: dummySuppliers[0], purchase_date: '2025-01-16', quantity: 182, type: "invoice", week: 3 },
    { customer: dummySuppliers[0], purchase_date: '2025-01-28', quantity: 98, type: "cash", week: 4 },
    { customer: dummySuppliers[1], purchase_date: '2025-01-02', quantity: 145, type: "cash", week: 1 },
    { customer: dummySuppliers[1], purchase_date: '2025-01-16', quantity: 90, type: "invoice", week: 2 },
    { customer: dummySuppliers[2], purchase_date: '2025-01-02', quantity: 145, type: "cash", week: 1 },
    { customer: dummySuppliers[2], purchase_date: '2025-01-28', quantity: 90, type: "cash", week: 4 },
]

export const dForecastWeek: ForecastWeek[] = [
    {
        customer: dummySuppliers[0],
        forecast_item: [
            { customer: dummySuppliers[0], purchase_date: '2025-01-02', quantity: 235, type: "invoice", week: 1 },
            { customer: dummySuppliers[0], purchase_date: '2025-01-09', quantity: 211, type: "cash", week: 2 },
            { customer: dummySuppliers[0], purchase_date: '2025-01-16', quantity: 182, type: "invoice", week: 3 },
            { customer: dummySuppliers[0], purchase_date: '2025-01-28', quantity: 98, type: "cash", week: 4 },
        ]
    },
    {
        customer: dummySuppliers[1],
        forecast_item: [
            { customer: dummySuppliers[1], purchase_date: '2025-01-02', quantity: 145, type: "cash", week: 1 },
            { customer: dummySuppliers[1], purchase_date: '2025-01-16', quantity: 90, type: "invoice", week: 2 },
        ]
    },
    {
        customer: dummySuppliers[2],
        forecast_item: [
            { customer: dummySuppliers[2], purchase_date: '2025-01-02', quantity: 145, type: "cash", week: 1 },
            { customer: dummySuppliers[2], purchase_date: '2025-01-28', quantity: 90, type: "cash", week: 4 },
        ]
    },
]
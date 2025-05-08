import { dummyPurchaseOrders } from "@/dummy/dummy_data"

export const kolekOptions = [
    {
        label: "KOL 1",
        value: "1",
      },
      {
        label: "KOL 2",
        value: "2",
      },
      {
        label: "KOL 3",
        value: "3",
      },
      {
        label: "KOL 4",
        value: "4",
      },
      {
        label: "KOL 5",
        value: "5",
      },
]

export const paymentStatusOptions = [
    {
        label: "Paid",
        value: "1",
    },
    {
        label: "Unpaid",
        value: "0",
    }
]

export const purchaseOrderOptions = [
    {
        label: `${dummyPurchaseOrders[0].nomor} (${dummyPurchaseOrders[0].supplier.name})`,
        value: dummyPurchaseOrders[0].nomor,
    },
    {
        label: `${dummyPurchaseOrders[1].nomor} (${dummyPurchaseOrders[1].supplier.name})`,
        value: dummyPurchaseOrders[1].nomor,
    },
    {
        label: `${dummyPurchaseOrders[2].nomor} (${dummyPurchaseOrders[2].supplier.name})`,
        value: dummyPurchaseOrders[2].nomor,
    },
    {
        label: `${dummyPurchaseOrders[3].nomor} (${dummyPurchaseOrders[3].supplier.name})`,
        value: dummyPurchaseOrders[3].nomor,
    },
    {
        label: `${dummyPurchaseOrders[4].nomor} (${dummyPurchaseOrders[4].supplier.name})`,
        value: dummyPurchaseOrders[4].nomor,
    }
]

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface DialogSwitchPaymentProps {
    nomor: string,
    open: boolean | undefined,
    handleDialogClose: () => void
    handleSwitchPayment: () => void
}

export function DialogSwitchPayment({nomor, open, handleDialogClose, handleSwitchPayment} : DialogSwitchPaymentProps) {
    return(
        <AlertDialog open={open} onOpenChange={(isOpen) => isOpen == false ? handleDialogClose : {}}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Ubah Status Pembayaran {nomor}</AlertDialogTitle>
                <AlertDialogDescription>
                    It will change status payment.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogAction className="bg-green-500 text-white hover:bg-green-700" onClick={handleSwitchPayment}>Ubah</AlertDialogAction>
                <AlertDialogCancel onClick={handleDialogClose}>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

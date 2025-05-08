import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { InvoiceItem } from "@/types/local";
import { SetStateAction } from "react";

interface DialogConfirmDeleteProps {
    nomor: string,
    open: boolean | undefined,
    handleDialogClose: () => void
    handleDelete: () => void
}

export function DialogConfirmDelete({nomor, open, handleDialogClose, handleDelete} : DialogConfirmDeleteProps) {
    return(
        <AlertDialog open={open} onOpenChange={(isOpen) => isOpen == false ? handleDialogClose : {}}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Hapus {nomor}</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={handleDialogClose}>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-500 text-white hover:bg-red-700" onClick={handleDelete}>Hapus</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

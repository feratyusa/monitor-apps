import { ReactElement, ReactNode } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { EyeIcon } from "lucide-react";

interface SheetDetailOnTableRowProps {
    title: string,
    description: string,
    trigger: React.ReactNode,
    body: React.ReactNode,
    footer: React.ReactNode,
}

export default function SheetDetailOnTableRow({title, description, trigger, body, footer} : SheetDetailOnTableRowProps) {
    return (
        <Sheet>
          <SheetTrigger asChild className="cursor-pointer">
            {trigger}
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{title}</SheetTitle>
              <SheetDescription>{description}</SheetDescription>
            </SheetHeader>
                {body}
            <SheetFooter>
                {
                    footer ? footer :
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                }
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )
}

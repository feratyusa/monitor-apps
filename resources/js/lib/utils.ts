import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toIndonesiaDate(date: string, options?: Intl.DateTimeFormatOptions) {
    const _options : Intl.DateTimeFormatOptions = options ?? {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }
    return new Date(date).toLocaleDateString('id', _options)

}

export const MONTH_NAME = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", 
    "Agustus", "September", "Oktober", "November", "Desember"
]

export interface Ticket {
    id: number;
    tripId: number;
    date_begin: string;
    payment_status: boolean;
    payment_time: string;
    phone_customer: string;
    name_customer: string;
    email_customer: string;
    price: number;
    seats: any[];
}


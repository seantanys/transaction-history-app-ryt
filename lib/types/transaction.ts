
export type Transaction = {
    id: number;
    type: string;
    amount: number;
    currency: string;
    date: string;
    description: string;
    merchant?: string;
}
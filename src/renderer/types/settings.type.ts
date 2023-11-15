export interface Trash {
    products: string[];
    tables: string[];
    inventory: number[];
    salary: number[];
}
export interface Settings {
    _id: number;
    discount: number;
    vat: number;
    trash: Trash;
    isOnline: boolean;
}
export interface RxSettings{
    _data: Settings;
}
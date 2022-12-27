export interface Bag {
    lineItems: LineItem[];
    id: string;
}

export interface Product {
    name: string;
    sku: string;
    price: Price;
    image: string;
}

export interface LineItem extends Product {
    quantity: number;
}

export interface Price {
    numericPrice: number;
    formattedPrice: string;
    currency: string;
}
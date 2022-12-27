export interface Price {
    numericPrice: number;
    formattedPrice: string;
    currency: string;
}

export interface ProductInventoryItem {
    sku: string,
    name: string,
    description: string,
    image: string,
    price: Price,
    currency: string,
    stock: number,
    outOfStock: boolean
}
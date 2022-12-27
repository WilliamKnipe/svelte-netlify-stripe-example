export interface CreateCheckoutPayload {
    lineItems: LineItem[],
}

export interface LineItem {
    quantity: number,
    sku: string,
}
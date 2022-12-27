import type { Product } from "../types/bag"
export const dummyProducts: Product[] = [
        {
            name: 'The Chair',
            sku: 'sku',
            image: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1068&q=80',
            price: {
                numericPrice: 100,
                currency: "£",
                formattedPrice: "£100"
            }
        },
        {
            name: 'Pinky',
            sku: 'sku2',
            image: 'https://images.unsplash.com/photo-1576528418822-5ddc2568621b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
            price: {
                numericPrice: 70,
                currency: "£",
                formattedPrice: "£70"
            }
        }
    ];
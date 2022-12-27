import { bag, products } from "../store";
import { get } from 'svelte/store'
import type { LineItem } from "src/types/bag";
// import { generateRandomId } from "../utils/almostRandom";

interface QuantSkuProps {
    quantity: number
    sku: string;
}

export const incrementItemBySku = ({quantity, sku}: QuantSkuProps): void => {
    if(!quantity || !sku) {return}
    const updatedLineItems = get(bag).lineItems.map((item) => 
        {
            if(item.sku === sku) {
                return {...item, quantity: item.quantity + quantity};
            } else return item
        }
    );
    bag.set({...get(bag), lineItems: updatedLineItems});
}

export const decrementItemBySku = ({quantity, sku}: QuantSkuProps): void => {
    if(!quantity || !sku) {return}
    const updatedLineItems = get(bag).lineItems.map((item) => 
        {
            if(item.sku === sku) {
                return {...item, quantity: item.quantity - quantity};
            } else return item
        }
    );
    const filterOutZeroQuantityItems = updatedLineItems.filter(item => 
        item.quantity > 0
    )
    bag.set({...get(bag), lineItems: filterOutZeroQuantityItems});
}

// This needs to be asyncronous probably
export const addItemToBag = (sku: string) => {
    if(!sku) {return}
    const b = get(bag);
    const skuIsInBag = b.lineItems.some((item) => item.sku === sku);
    if(skuIsInBag){
        incrementItemBySku({quantity: 1, sku});
        return
    }
    const skuInProducts = get(products).find((item) => item.sku === sku);
    if(skuInProducts){
        const newItem: LineItem = {
            ...skuInProducts, quantity: 1
        };
        const updatedLineItems = [...b.lineItems, newItem];
        bag.set({...b, lineItems: updatedLineItems});
    }
}

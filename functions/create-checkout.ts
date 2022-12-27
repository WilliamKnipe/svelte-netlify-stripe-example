/*
 * This function creates a Stripe Checkout session and returns the session ID
 * for use with Stripe.js (specifically the redirectToCheckout method).
 */
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: '2022-11-15',
  maxNetworkRetries: 2,
});

/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */
import inventory from "./data/products.json";
import { LineItem } from "./types/functions";
// import { ProductInventoryItem } from "./types/inventory";

const validateLineItem = ({ sku, quantity }: LineItem): void => {
  const foundProduct = inventory.find((p) => p.sku === sku);
  console.log('foundProduct', foundProduct);
  if (!foundProduct) {
    throw Error("validateLineItem - SKU is invalid");
  }
  if (foundProduct.outOfStock === true) {
    throw Error("validateLineItem - SKU is out of stock");
  }
  const quantityIsValid = quantity > 0 && quantity < 11;
  if (!quantityIsValid) {
    throw Error("validateLineItem - quantity is invalid");
  }
};

interface StripeLineItem {}

const createLineItems = (lineItems: LineItem[], products): StripeLineItem[] => {
  const stripeLineItems: StripeLineItem[] = [];

  lineItems.forEach(item => {
    const foundProduct = products.find((p) => p.sku === item.sku);
    stripeLineItems.push(
      {
        price_data: {
                currency: 'gbp',
                unit_amount: foundProduct?.price.numericPrice,
                product_data: {
                  name: item.name,
                  description: foundProduct?.description,
                  images: [foundProduct?.image],
                },
              },
              quantity: item.quantity,
      }
    )
  })
  return stripeLineItems;
};

interface MetaLineItem {
  sku: string;
  name: string;
  quantity: number;
}
const createMetaLineItems = (lineItems: LineItem[]): MetaLineItem[] => {
  return lineItems.map((item) => {
    return {
      sku: item.sku,
      quantity: item.quantity,
      name: item.name
    };
  });
};

exports.handler = async (event) => {
  console.log("logevent", event);
  const body = JSON.parse(event.body);
  console.log("inventory", inventory);
  console.log("lineItems", body);

  const lineItems = body.lineItems;

  if(lineItems.length < 0){
    throw Error("create-checkout - no line items in payload");
  }
  lineItems.forEach((lineItem) => {
    validateLineItem(lineItem);
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: ["GB"],
    },

    /*
     * This env var is set by Netlify and inserts the live site URL. If you want
     * to use a different URL, you can hard-code it here or check out the
     * other environment variables Netlify exposes:
     * https://docs.netlify.com/configure-builds/environment-variables/
     */
    success_url: `${process.env.URL}/success`,
    cancel_url: process.env.URL,
    line_items: createLineItems(lineItems, inventory),
    // We are using the metadata to track which items were purchased.
    // We can access this metadata in our webhook handler to then handle
    // the fulfillment process.
    // In a real application you would track this in an order object in your database.
    metadata: {
      items: JSON.stringify(createMetaLineItems(lineItems)),
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };
};

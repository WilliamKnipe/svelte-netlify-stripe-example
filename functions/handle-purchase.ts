/*
 * This function implements a Stripe webhook handler to handle
 * fulfillment for our successful payments. At this point, user has already been
 * successfully redirected to the success page. Use for logging or sending info to API 
 * for fulfilment etc.
 */
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: '2022-11-15',
  maxNetworkRetries: 2,
});

// Self defined MetaData interface
interface MetaData {
  items: string,
}

// Stripe Event Object from https://stripe.com/docs/api/events
interface StripeEventObject {
  metadata: MetaData,
  shipping: Object,
}

exports.handler = async ({ body, headers }) => {
  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );

    // ToDO - fix these types
    if (stripeEvent.type === 'checkout.session.completed') {
      const eventObject = stripeEvent.data.object as StripeEventObject; 
      const items = JSON.parse(eventObject.metadata.items);
      const shippingDetails = eventObject.shipping;

      // Here make an API call / send an email to your fulfillment provider.
      const purchase = { items, shippingDetails };
      console.log(`📦 Fulfill purchase:`, JSON.stringify(purchase, null, 2));
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (err) {
    console.log(`Stripe webhook failed with ${err}`);

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }
};

# Svelte + TS + Vite

Entirely WIP.

This template is a simple example ecommerce site using Svelte, Netlify, and Stripe.

Using Vite for build, and Typescript Netlify functions for now.

## Svelte Ecommerce Site

Two ways of running this site locally: 
 - Simply run the UI standalone.
 - Run the Stripe webhooks and Netlify functions/env with the site locally for testing checkout flow.

## Commands

**Yarn run build**

```
Yarn run build (to build)
```

**Running This Site Locally with Vite**

```
Yarn run dev
```

**Running This Project With Netlify and Stripe Webhook Locally**

```
Yarn run webhook
Yarn run netlifydev
```

Set up Stripe account and fill in the .env file locally. Use Stripe test card details to test checkout.

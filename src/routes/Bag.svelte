<script lang="ts">
  import { bag } from "../store";
  import { newStripe } from "../stripe";
  import { incrementItemBySku, decrementItemBySku } from "../lib/bag";
  import type { LineItem } from "../types/bag";

  const getPrice = (item: LineItem): string => {
    return (
      `${item.price.currency}` +
      `${(item.quantity * item.price.numericPrice).toLocaleString()}`
    );
  };

  const getTotalPrice = (lineItems: LineItem[]): string => {
    let total = 0;
    lineItems.forEach(item =>
    {
      total = item.quantity * item.price.numericPrice + total
    })
    return `£${total}`;
  }

  const onClickCheckoutHandler = async (lineItems) => {
    const data = {
        lineItems,
    };
    const response = await fetch("/.netlify/functions/create-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    const stripe = await newStripe(response.publishableKey);
    console.log('responseSessionId', response.sessionId);
    stripe.redirectToCheckout({ sessionId: response.sessionId })
      .then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  };
</script>

<svelte:head>
	<title>Svelte Netlify Stripe - Bag</title>
</svelte:head>

<div>
  <h2>Your Bag</h2>
  <div class="line-item-container">
    <div>Image</div>
    <div>Name</div>
    <div>Quantity</div>
    <div>Price</div>
    <div></div>
    {#each $bag.lineItems as item (item.sku)}
      <img src={item.image} alt={item.name} />
      <div class="name">
        {item.name}
      </div>
      <div class="quantity">
        <button
          class="quantity-btn"
          on:click={() => decrementItemBySku({ quantity: 1, sku: item.sku })}
          >-</button
        >
        <span class="quantity-span">{item.quantity}</span>
        <button
          class="quantity-btn"
          on:click={() => incrementItemBySku({ quantity: 1, sku: item.sku })}
          >+</button
        >
      </div>
      <div class="price">{getPrice(item)}</div>
      <div>
        <button
          class="quantity-btn"
          on:click={() =>
            decrementItemBySku({ quantity: item.quantity, sku: item.sku })}
          >Remove</button
        >
      </div>
    {/each}
    <div class="total">
      <div>Total</div>
      <div>{getTotalPrice($bag.lineItems)}</div>
    </div>
  </div>
  <button
    on:click={() => onClickCheckoutHandler($bag.lineItems)}
    disabled={$bag.lineItems.length < 1}
    class="checkout-btn"
  >
    Checkout
  </button>
</div>

<style>
  .line-item-container {
    margin: 16px 0px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    /* grid-template-columns: repeat(5, 1fr); */
    /* 1fr 1fr 1fr 1fr auto; */
    gap: 16px;
  }
  img {
    width: 100%;
    background-color: pink;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    aspect-ratio: 1/1;
  }
  .checkout-btn {
    --button-background: var(--mango-green);
    float: right;
  }
  .quantity-btn {
    display: inline-block;
    --button-background: var(--mango-green);
  }
  .quantity-span {
    display: inline-block;
    margin: 0px 12px;
  }
  .total {
    grid-column: 4;
  }
</style>

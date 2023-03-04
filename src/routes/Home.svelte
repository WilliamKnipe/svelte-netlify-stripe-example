<script>
  import AddToBagBtn from "../components/AddToBagBtn.svelte";
</script>

<svelte:head>
  <title>Svelte Netlify Stripe - Home</title>
  <meta
    name="description"
    content="Svelte Netlify Stripe - homepage. Some text here for SEO."
  />
</svelte:head>

<div class="home-container">
  <h1>Home</h1>
  <h2>Some tag line - UK delivery only</h2>
  <div class="colour-block" />
  <h3>Products</h3>
  <div class="products-grid">
    <div class="product-tile">
      <div
        class="product-image"
        style="background-image: url(https://images.unsplash.com/photo-1598300056393-4aac492f4344?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1068&q=80)"
      />
      <h4>The Chair</h4>
      <div>£100</div>
      <p>Woo - what a chair.</p>
      <AddToBagBtn sku="sku" />
    </div>
    <div class="product-tile">
      <div
        class="product-image"
        style="background-image: url(https://images.unsplash.com/photo-1576528418822-5ddc2568621b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)"
      />
      <h4>Pinky</h4>
      <div>£70</div>
      <p>Really pink chair.</p>
      <AddToBagBtn sku="sku2" />
    </div>
    <div class="info-tile">
      <p>Our products something something really tied the room together</p>
      <p>And that's great. Woo-hoo!</p>
    </div>
  </div>
</div>

<style>
  .colour-block {
    background-color: var(--mango-yellow);
    height: 100px;
    width: 100%;
    margin-bottom: 16px;
  }
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
    gap: 16px;
    margin-bottom: 16px;
  }
  .product-image {
    width: 100%;
    background-color: var(--mango-yellow);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    aspect-ratio: 1/1;
  }
  .info-tile {
    background-color: var(--mango-yellow);
    padding: 16px;
  }
</style>

<script lang="ts">
    import { Link } from "svelte-navigator";
    import { bag } from "../store";
    import BagIcon from "../icons/Bagsvg.svelte";

    let totalAmount = 0;

    const calcItemQuantity = (lineItems) => lineItems.forEach( (item, i) => {
        if(i === 0){
            totalAmount = 0 + item.quantity;    
        } else {
            totalAmount = totalAmount + item.quantity
    }});

    $: if($bag.lineItems.length > 0){ calcItemQuantity($bag.lineItems)} else { totalAmount = 0 };
</script>

<nav>
    <div class="container">
        <div>
            <Link to="/"><span>Home</span></Link>
            <Link to="about"><span>Story</span></Link>
        </div>
        <div>
            <Link to="bag"><span>{`bag (${totalAmount})`}</span></Link>
            <BagIcon />
        </div>
    </div>
</nav>

<style>
    .container {
        display: flex;
        justify-content: space-between;
        max-width: min(100vw, 1100px);
		margin: auto;
		left: 0;
		right: 0;
        padding: 16px;
    }
	nav span {
		margin-right: 16px;
	}

    nav {
        position: sticky;
        top: 0px;
        background: var(--mango-orange);
    }

</style>
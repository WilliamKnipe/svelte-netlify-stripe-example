<script lang="ts">
    import { addItemToBag }  from "../lib/bag"
    export let sku: string | null = null;

    let isDisabled = false;

    const addToBagFunc = (sku: string | null): void => {
        if(!sku){
            return
        }
        isDisabled = true;
        setTimeout( () => {
            addItemToBag(sku);
            isDisabled = false;
        }, 600);
    }
</script>

<button disabled={isDisabled} on:click={() => addToBagFunc(sku)}>
    Add to bag
</button>

<style>
    button {
        background-color: black;
    }
</style>
import { writable } from "svelte/store";
import { dummyBag } from "./assets/bag";
import { dummyProducts } from "./assets/products";

export const notifications = writable([]);

export const bag = writable(dummyBag);

export const user = writable({});

export const isDesktop = writable(false);

export const products = writable(dummyProducts)

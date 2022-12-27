import {loadStripe} from "@stripe/stripe-js";

export const newStripe = async (publishableKey) => loadStripe(publishableKey);
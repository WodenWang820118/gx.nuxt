// import stripe from 'stripe';
// import { defineEventHandler, readBody } from 'h3';

// export default defineEventHandler(async (event) => {
//   const body = await readBody(event);
//   const { amount } = body;
//   const stripeSK = process.env.STRIPE_SECRET_KEY;
//   const stripeApp = new stripe(stripeSK as string);
//   const paymentIntent = await stripeApp.paymentIntents.create({
//     amount,
//     currency: 'USD',
//     automatic_payment_methods: {
//       enabled: true
//     }
//   });

//   const clientSecret = paymentIntent.client_secret;

//   return clientSecret;
// });

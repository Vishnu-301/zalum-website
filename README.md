# Zal's Beadworks — Vanilla Website

A responsive multi-page jewellery storefront built with plain HTML, CSS, and JavaScript.

## Pages
- `index.html` — home, categories, bestsellers, testimonials, newsletter
- `shop.html` — product grid, category filters, price sorting, search query support
- `product.html` — product detail page, quantity control, related items
- `about.html` — brand story, values, wholesale enquiry and jewellery care
- `cart.html` — shopping bag, quantity editing, remove item, and order summary

## Run locally
Open `index.html` in a browser, or serve the folder with a local web server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes
- Cart state is stored in browser `localStorage`.
- Checkout is a front-end demo only; no payment gateway, order handoff, or backend is connected yet.
- Product photos and Google Fonts load from external URLs, so internet access is needed for those assets.
- Prices, product names, and descriptions are starter content in `public/assets/main.js`; images and contact email can be edited in the HTML and CSS files.

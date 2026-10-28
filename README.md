# Zal's Beadworks — Vanilla Website

A responsive multi-page jewellery storefront built with plain HTML, CSS, and JavaScript.

## Pages
- `index.html` — home, categories, bestsellers, testimonials, newsletter
- `shop.html` — product grid, category filters, price sorting, search query support
- `product.html` — product detail page, quantity control, related items
- `about.html` — brand story, values, wholesale enquiry and jewellery care
- `cart.html` — shopping bag, quantity editing, remove item, and order summary
- Custom bead links open a WhatsApp chat; the contact number is configured in `public/assets/main.js`.
- Shared responsive styles adapt the pages for desktop, tablet, and compact mobile screens.

## Run locally
Open `index.html` in a browser, or serve the folder with a local web server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes
- Cart state is stored in browser `localStorage`.
- Checkout opens WhatsApp with the bag contents and total so the customer can confirm delivery and payment with the seller.
- Product photos and Google Fonts load from external URLs, so internet access is needed for those assets.
- Prices, product names, and descriptions are starter content in `public/assets/main.js`; images and contact email can be edited in the HTML and CSS files.

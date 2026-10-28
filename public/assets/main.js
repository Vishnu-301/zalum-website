const PRODUCTS = [
  {
    id: 1,
    name: "Pearl necklace",
    category: "Necklaces",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85",
    tag: "Bestseller",
    description:
      "A timeless pearl-inspired necklace with a soft, elegant finish. Easy to style on its own or layered with your favourite pieces.",
  },
  {
    id: 2,
    name: "Golden hour set",
    category: "Necklaces",
    price: 32000,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=85",
    tag: "Customer favourite",
    description:
      "Warm tones and delicate details come together in this handmade set, designed to bring a little glow to any look.",
  },
  {
    id: 3,
    name: "Ocean glow bracelet",
    category: "Bracelets",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=85",
    tag: "Handmade",
    description:
      "A playful beaded bracelet inspired by cool ocean colours. Wear it solo or stack it with other favourites.",
  },
  {
    id: 4,
    name: "Everyday waistbeads",
    category: "Waistbeads",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=85",
    tag: "Bestseller",
    description:
      "Colourful waistbeads handcrafted with care. A personal, expressive accessory made to be worn your way.",
  },
  {
    id: 5,
    name: "Soft lilac anklet",
    category: "Anklets",
    price: 10000,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=85",
    tag: "New",
    description:
      "A delicate anklet with a gentle, feminine feel. A lovely finishing touch for everyday outfits and sunny days.",
  },
  {
    id: 6,
    name: "Berry charm bracelet",
    category: "Bracelets",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=85",
    tag: "Limited batch",
    description:
      "Rich colour and thoughtful details make this bracelet a standout piece for gifting or keeping.",
  },
  {
    id: 7,
    name: "Golden shell necklace",
    category: "Necklaces",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=85",
    tag: "New",
    description:
      "A handmade statement necklace with a relaxed, sunlit feel. Style it with a simple neckline and let it shine.",
  },
  {
    id: 8,
    name: "Colour story waistbeads",
    category: "Waistbeads",
    price: 14000,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=85",
    tag: "Handmade",
    description:
      "A colourful beaded piece for celebrating your own style. Each strand is put together with care.",
  },
];
const money = (n) => "₦" + Number(n).toLocaleString("en-NG");
const WHATSAPP_NUMBER = "2347044472825";
function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
function cartOrderMessage() {
  const cart = getCart();
  const lines = cart.flatMap((item) => {
    const product = PRODUCTS.find((entry) => entry.id === item.id);
    return product
      ? [`• ${product.name} × ${item.qty} — ${money(product.price * item.qty)}`]
      : [];
  });
  const total = cart.reduce((sum, item) => {
    const product = PRODUCTS.find((entry) => entry.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
  return [
    "Hi Zal's Beadworks, I'd like to place this order:",
    "",
    ...lines,
    "",
    `Subtotal: ${money(total)}`,
    "Delivery: please confirm",
    `Total before delivery: ${money(total)}`,
    "Please let me know the next steps.",
  ].join("\n");
}
document.querySelectorAll('[data-whatsapp="custom"]').forEach((link) => {
  link.href = whatsappUrl(
    "Hi Zal's Beadworks, I'd like to ask about a custom bead order.",
  );
});
const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem("zalsCart") || "[]");
  } catch {
    return [];
  }
};
const saveCart = (cart) => {
  localStorage.setItem("zalsCart", JSON.stringify(cart));
  updateCartCount();
};
function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  document
    .querySelectorAll(".cart-count")
    .forEach((el) => (el.textContent = count));
}
function productCard(p) {
  return `<article class="product-card"><span class="product-tag">${p.tag}</span><a href="product.html?id=${p.id}"><img class="product-photo" src="${p.image}" alt="${p.name}" loading="lazy"><h3>${p.name}</h3></a><div class="product-meta"><span class="price">${money(p.price)}</span><button class="mini-add" data-add="${p.id}">Add +</button></div></article>`;
}
function renderCards(el, products) {
  if (el) el.innerHTML = products.map(productCard).join("");
}
function addToCart(id, qty = 1) {
  const p = PRODUCTS.find((x) => x.id === Number(id));
  if (!p) return;
  const cart = getCart();
  const found = cart.find((x) => x.id === p.id);
  if (found) found.qty += qty;
  else cart.push({ id: p.id, qty });
  saveCart(cart);
  toast(`${p.name} added to your bag`);
}
function toast(message) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    Object.assign(t.style, {
      position: "fixed",
      bottom: "22px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#4c0585",
      color: "#fff",
      padding: "13px 20px",
      borderRadius: "30px",
      fontSize: "12px",
      zIndex: "99",
      boxShadow: "0 8px 25px #24053633",
    });
    document.body.appendChild(t);
  }
  t.textContent = message;
  t.style.opacity = "1";
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => (t.style.opacity = "0"), 2300);
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-add]");
  if (b) addToCart(b.dataset.add);
});
const homeProducts = document.getElementById("home-products");
if (homeProducts) renderCards(homeProducts, PRODUCTS.slice(0, 4));
const shopProducts = document.getElementById("shop-products");
if (shopProducts) {
  let category = new URLSearchParams(location.search).get("category") || "All";
  const filters = document.getElementById("filters");
  const search = document.getElementById("product-search");
  function renderShop() {
    let items =
      category === "All"
        ? [...PRODUCTS]
        : PRODUCTS.filter((p) => p.category === category);
    const query = (search?.value || "").trim().toLocaleLowerCase();
    if (query) {
      items = items.filter((p) =>
        `${p.name} ${p.category} ${p.description}`
          .toLocaleLowerCase()
          .includes(query),
      );
    }
    const sort = document.getElementById("sort-products").value;
    if (sort === "low") items.sort((a, b) => a.price - b.price);
    if (sort === "high") items.sort((a, b) => b.price - a.price);
    renderCards(shopProducts, items);
    document
      .getElementById("empty-state")
      .classList.toggle("hidden", items.length > 0);
    filters
      .querySelectorAll("button")
      .forEach((b) =>
        b.classList.toggle("active", b.dataset.category === category),
      );
  }
  filters.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-category]");
    if (b) {
      category = b.dataset.category;
      renderShop();
    }
  });
  document
    .getElementById("sort-products")
    .addEventListener("change", renderShop);
  search?.addEventListener("input", renderShop);
  renderShop();
}
const detailImage = document.getElementById("detail-image");
if (detailImage) {
  const id = Number(new URLSearchParams(location.search).get("id")) || 1;
  const p = PRODUCTS.find((x) => x.id === id) || PRODUCTS[0];
  document.title = p.name + " | Zal's Beadworks";
  document.getElementById("crumb-name").textContent = p.name;
  document.getElementById("detail-category").textContent =
    p.category.toUpperCase();
  document.getElementById("detail-name").textContent = p.name;
  document.getElementById("detail-price").textContent = money(p.price);
  document.getElementById("detail-image").src = p.image;
  document.getElementById("detail-image").alt = p.name;
  document.getElementById("detail-description").textContent = p.description;
  document.getElementById("detail-add-price").textContent = money(p.price);
  const customOrderLink = document.querySelector('[data-whatsapp="custom-product"]');
  if (customOrderLink) {
    customOrderLink.href = whatsappUrl(
      `Hi Zal's Beadworks, I'd like to customize the ${p.name}. Can we discuss colours, sizing, and design options?`,
    );
  }
  let qty = 1;
  const qtyEl = document.getElementById("qty");
  document.getElementById("qty-minus").onclick = () => {
    qty = Math.max(1, qty - 1);
    qtyEl.textContent = qty;
  };
  document.getElementById("qty-plus").onclick = () => {
    qty = Math.min(10, qty + 1);
    qtyEl.textContent = qty;
  };
  document.getElementById("detail-add").onclick = () => addToCart(p.id, qty);
  renderCards(
    document.getElementById("related-products"),
    PRODUCTS.filter((x) => x.id !== p.id).slice(0, 4),
  );
}
function renderCart() {
  const target = document.getElementById("cart-content");
  if (!target) return;
  const cart = getCart();
  const summary = document.getElementById("cart-summary");
  if (!cart.length) {
    target.innerHTML = `<div class="empty-cart"><h2>Your bag is waiting.</h2><p>Looks like you haven't found your favourite piece yet.</p><a class="button button-primary" href="shop.html">Explore the collection ↗</a></div>`;
    summary.style.display = "none";
    return;
  }
  summary.style.display = "block";
  target.innerHTML = cart
    .map((item) => {
      const p = PRODUCTS.find((x) => x.id === item.id);
      if (!p) return "";
      return `<article class="cart-item"><a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a><div><h3>${p.name}</h3><p>${p.category}</p><div class="cart-item-actions"><div class="quantity-control" aria-label="Quantity"><button type="button" data-qty="${p.id}" data-delta="-1" aria-label="Decrease ${p.name} quantity">−</button><span>${item.qty}</span><button type="button" data-qty="${p.id}" data-delta="1" aria-label="Increase ${p.name} quantity">+</button></div><button class="remove-item" data-remove="${p.id}">Remove</button></div></div><span class="cart-item-price">${money(p.price * item.qty)}</span></article>`;
    })
    .join("");
  const total = cart.reduce((sum, item) => {
    const p = PRODUCTS.find((x) => x.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
  document.getElementById("cart-subtotal").textContent = money(total);
  document.getElementById("cart-total").textContent = money(total);
}
const cartContent = document.getElementById("cart-content");
if (cartContent) {
  renderCart();
  cartContent.addEventListener("click", (e) => {
    const b = e.target.closest("[data-remove]");
    if (b) {
      saveCart(getCart().filter((i) => i.id !== Number(b.dataset.remove)));
      renderCart();
    }
    const quantityButton = e.target.closest("[data-qty]");
    if (quantityButton) {
      const id = Number(quantityButton.dataset.qty);
      const delta = Number(quantityButton.dataset.delta);
      const updated = getCart().map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, Math.min(10, item.qty + delta)) }
          : item,
      );
      saveCart(updated);
      renderCart();
    }
  });
  document.getElementById("checkout-button").addEventListener("click", () => {
    const cart = getCart();
    if (!cart.length) return;
    window.location.href = whatsappUrl(cartOrderMessage());
  });
}
document.querySelectorAll("#newsletter-form").forEach((form) =>
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.querySelector(".form-message").textContent =
      "Thanks for joining us! You're on the list.";
    form.reset();
  }),
);
document.querySelectorAll(".menu-toggle").forEach((btn) => {
  const nav = btn.parentElement.querySelector(".nav");
  btn.setAttribute("aria-expanded", "false");
  btn.addEventListener("click", () => {
    const open = nav?.classList.toggle("open") ?? false;
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav?.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open navigation");
    }),
  );
});
if (location.hash === "#product-search") {
  document.getElementById("product-search")?.focus();
}
document
  .querySelectorAll("#year")
  .forEach((el) => (el.textContent = new Date().getFullYear()));
updateCartCount();

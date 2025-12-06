/* --------------------------------------------------
   LOCAL STORAGE UTILITIES
-------------------------------------------------- */
const STORAGE_ITEMS = "renteasy.items.v1";
const STORAGE_TX = "renteasy.tx.v1"; // orders + bookings

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function read(key) {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); }
  catch { return []; }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getItems() { return read(STORAGE_ITEMS); }
function setItems(v) { write(STORAGE_ITEMS, v); }

function getTransactions() { return read(STORAGE_TX); }
function setTransactions(v) { write(STORAGE_TX, v); }

/* --------------------------------------------------
   SEED DEMO PRODUCTS (REAL IMAGES)
-------------------------------------------------- */
function seedDemoItems() {
  if (getItems().length > 0) return;

  const demoProducts = [
    {
      id: uid(),
      title: "Canon EOS 250D",
      description: "DSLR camera with 18-55mm lens",
      price: 1500,
      location: "Dhaka",
      images: ["https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg?auto=compress&cs=tinysrgb&w=800"]
    },
    {
      id: uid(),
      title: "Nikon D5600",
      description: "Professional DSLR camera",
      price: 1800,
      location: "Dhaka",
      images: ["https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg?auto=compress&cs=tinysrgb&w=800"]
    },
    {
      id: uid(),
      title: "DJI Mavic Mini",
      description: "4K video drone with GPS",
      price: 2200,
      location: "Dhaka",
      images: ["https://images.pexels.com/photos/1089305/pexels-photo-1089305.jpeg?auto=compress&cs=tinysrgb&w=800"]
    },
    {
      id: uid(),
      title: "GoPro Hero 9",
      description: "Waterproof action camera",
      price: 900,
      location: "Dhaka",
      images: ["https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800"]
    },
    {
      id: uid(),
      title: "Sony Handycam 4K",
      description: "Professional video camcorder",
      price: 1400,
      location: "Chattogram",
      images: ["https://images.pexels.com/photos/205595/pexels-photo-205595.jpeg?auto=compress&cs=tinysrgb&w=800"]
    },
    {
      id: uid(),
      title: "Gaming Laptop (RTX 3060)",
      description: "i7, 16GB RAM, 512GB SSD",
      price: 2500,
      location: "Chattogram",
      images: ["https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800"]
    },
    {
      id: uid(),
      title: "ASUS ROG Strix",
      description: "High performance gaming laptop",
      price: 3000,
      location: "Dhaka",
      images: ["https://images.pexels.com/photos/6899409/pexels-photo-6899409.jpeg?auto=compress&cs=tinysrgb&w=800"]
    },
    {
      id: uid(),
      title: "Mountain Bike",
      description: "Shimano gear, premium quality",
      price: 900,
      location: "Dhaka",
      images: ["https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800"]
    },
    {
      id: uid(),
      title: "Road Bike",
      description: "Lightweight aluminum frame",
      price: 1000,
      location: "Chattogram",
      images: ["https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800"]
    },
    {
      id: uid(),
      title: "Camping Tent",
      description: "4-person waterproof tent",
      price: 500,
      location: "Sylhet",
      images: ["https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800"]
    },
    {
      id: uid(),
      title: "JBL Party Speaker",
      description: "High bass Bluetooth speaker",
      price: 700,
      location: "Dhaka",
      images: ["https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?auto=compress&cs=tinysrgb&w=800"]
    },
    {
      id: uid(),
      title: "Sony Bluetooth Speaker",
      description: "Portable loud sound system",
      price: 600,
      location: "Sylhet",
      images: ["https://images.pexels.com/photos/3394660/pexels-photo-3394660.jpeg?auto=compress&cs=tinysrgb&w=800"]
    },
    {
      id: uid(),
      title: "LED Projector",
      description: "1080p full HD projector",
      price: 1200,
      location: "Dhaka",
      images: ["https://images.pexels.com/photos/1178687/pexels-photo-1178687.jpeg?auto=compress&cs=tinysrgb&w=800"]
    },
    {
      id: uid(),
      title: "Mic + Sound Mixer",
      description: "Live event audio system",
      price: 900,
      location: "Dhaka",
      images: ["https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=800"]
    }
  ];

  setItems(demoProducts);
}

seedDemoItems();

/* --------------------------------------------------
   SIMPLE HELPERS
-------------------------------------------------- */
function daysBetween(a, b) {
  const d1 = new Date(a);
  const d2 = new Date(b);
  if (isNaN(d1) || isNaN(d2)) return 1;
  const diff = d2 - d1;
  return diff <= 0 ? 1 : Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/* --------------------------------------------------
   HOME PAGE (index.html)
-------------------------------------------------- */
(function initHomePage() {
  const itemsList = document.getElementById("items-list");
  if (!itemsList) return;

  const noItems = document.getElementById("no-items");
  const search = document.getElementById("search");
  const sort = document.getElementById("sort");
  const clearFilters = document.getElementById("clear-filters");
  const txList = document.getElementById("transactions-list");

  // buy / rent modal elements
  const buyModal = document.getElementById("buy-modal");
  const buyTitle = document.getElementById("buy-item-title");
  const buyerName = document.getElementById("buyer-name");
  const buyerAddress = document.getElementById("buyer-address");
  const buyerPhone = document.getElementById("buyer-phone");
  const buySummary = document.getElementById("buy-summary");
  const closeBuy = document.getElementById("close-buy");
  const confirmBuy = document.getElementById("confirm-buy");

  const rentModal = document.getElementById("rent-modal");
  const rentTitle = document.getElementById("rent-item-title");
  const renterName = document.getElementById("renter-name");
  const rentFrom = document.getElementById("rent-from");
  const rentTo = document.getElementById("rent-to");
  const rentSummary = document.getElementById("rent-summary");
  const closeRent = document.getElementById("close-rent");
  const confirmRent = document.getElementById("confirm-rent");

  let currentBuyItem = null;
  let currentRentItem = null;

  function applyFilters(list) {
    let out = [...list];
    const q = (search.value || "").toLowerCase();

    if (q) {
      out = out.filter(i =>
        (i.title || "").toLowerCase().includes(q) ||
        (i.description || "").toLowerCase().includes(q)
      );
    }

    if (sort.value === "price-asc") out.sort((a, b) => a.price - b.price);
    if (sort.value === "price-desc") out.sort((a, b) => b.price - a.price);

    return out;
  }

  function renderItems() {
    const items = applyFilters(getItems());
    itemsList.innerHTML = "";

    if (items.length === 0) {
      noItems.style.display = "block";
      return;
    }
    noItems.style.display = "none";

    items.forEach(item => {
      const div = document.createElement("div");
      div.className = "item-card";
      const imgSrc = item.images && item.images[0] ? item.images[0] : "";
      div.innerHTML = `
        <img src="${imgSrc}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p class="muted">${item.location}</p>
        <p><b>৳${item.price}</b> / day</p>

        <div class="actions">
          <button class="small-btn buy-btn" data-id="${item.id}">Buy</button>
          <button class="small-btn rent-btn" data-id="${item.id}">Rent</button>
          <a href="add-item.html?id=${item.id}" class="small-btn">Edit</a>
        </div>
      `;
      itemsList.appendChild(div);
    });
  }

  function renderTransactions() {
    const list = getTransactions().slice().reverse();
    txList.innerHTML = "";

    if (list.length === 0) {
      txList.innerHTML = "<p class='muted'>No orders/bookings yet</p>";
      return;
    }

    list.forEach(t => {
      const div = document.createElement("div");
      div.className = "booking-row";
      const label = t.type === "buy" ? "Buy" : "Rent";
      div.innerHTML = `
        <strong>[${label}] ${t.itemTitle}</strong> — ${t.customer}<br>
        <span class="muted">
          ${t.type === "rent"
            ? `${t.from} → ${t.to} (${t.days} days)`
            : t.date}
        </span><br>
        ${t.address ? `<span class="muted">📍 ${t.address}</span><br>` : ""}
        ${t.phone ? `<span class="muted">☎ ${t.phone}</span><br>` : ""}
        <b>৳${t.total}</b>
      `;
      txList.appendChild(div);
    });
  }

  search.oninput = renderItems;
  sort.onchange = renderItems;
  clearFilters.onclick = () => {
    search.value = "";
    sort.value = "newest";
    renderItems();
  };

  // GLOBAL click handler for Buy/Rent buttons
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("buy-btn")) {
      const id = e.target.dataset.id;
      const item = getItems().find(x => x.id === id);
      if (!item) return;

      currentBuyItem = item;
      buyTitle.textContent = `${item.title} — ৳${item.price}`;

      buyerName.value = "";
      buyerAddress.value = "";
      buyerPhone.value = "";

      buySummary.textContent = `You are buying this item for ৳${item.price}.`;
      buyModal.classList.remove("hidden");
    }

    if (e.target.classList.contains("rent-btn")) {
      const id = e.target.dataset.id;
      const item = getItems().find(x => x.id === id);
      if (!item) return;

      currentRentItem = item;
      rentTitle.textContent = `${item.title} — ৳${item.price}/day`;

      renterName.value = "";
      rentFrom.value = "";
      rentTo.value = "";
      rentSummary.textContent = "";

      rentModal.classList.remove("hidden");
    }
  });

  closeBuy.onclick = () => buyModal.classList.add("hidden");
  closeRent.onclick = () => rentModal.classList.add("hidden");

  rentFrom.onchange = updateRentSummary;
  rentTo.onchange = updateRentSummary;

  function updateRentSummary() {
    if (!rentFrom.value || !rentTo.value || !currentRentItem) return;
    const days = daysBetween(rentFrom.value, rentTo.value);
    const total = days * currentRentItem.price;
    rentSummary.textContent = `${days} day(s) — Total ৳${total}`;
  }

  confirmBuy.onclick = () => {
    if (!currentBuyItem) return;

    const name = buyerName.value.trim();
    const address = buyerAddress.value.trim();
    const phone = buyerPhone.value.trim();

    if (!name || !address || !phone) {
      alert("Please enter your name, address and phone number.");
      return;
    }

    const tx = getTransactions();
    tx.push({
      id: uid(),
      type: "buy",
      itemId: currentBuyItem.id,
      itemTitle: currentBuyItem.title,
      customer: name,
      address,
      phone,
      total: currentBuyItem.price,
      date: new Date().toISOString().slice(0, 10)
    });

    setTransactions(tx);
    buyModal.classList.add("hidden");
    renderTransactions();
    alert("Order saved (demo).");
  };

  confirmRent.onclick = () => {
    if (!currentRentItem) return;
    if (!rentFrom.value || !rentTo.value) {
      alert("Please select from and to dates");
      return;
    }
    const days = daysBetween(rentFrom.value, rentTo.value);
    const total = days * currentRentItem.price;
    const name = renterName.value.trim() || "Guest";

    const tx = getTransactions();
    tx.push({
      id: uid(),
      type: "rent",
      itemId: currentRentItem.id,
      itemTitle: currentRentItem.title,
      customer: name,
      from: rentFrom.value,
      to: rentTo.value,
      days,
      total
    });
    setTransactions(tx);
    rentModal.classList.add("hidden");
    renderTransactions();
    alert("Rent booking saved (demo).");
  };

  renderItems();
  renderTransactions();
})();

/* --------------------------------------------------
   ADD ITEM PAGE (add-item.html)
-------------------------------------------------- */
(function initAddPage() {
  const form = document.getElementById("item-form");
  if (!form) return;

  const itemId = document.getElementById("item-id");
  const title = document.getElementById("item-title");
  const desc = document.getElementById("item-desc");
  const price = document.getElementById("item-price");
  const loc = document.getElementById("item-location");
  const imgText = document.getElementById("item-image");
  const fileInput = document.getElementById("item-images-files");
  const previews = document.getElementById("image-previews");

  const params = new URLSearchParams(location.search);
  const editId = params.get("id");

  if (editId) {
    const item = getItems().find(i => i.id === editId);
    if (item) {
      itemId.value = item.id;
      title.value = item.title;
      desc.value = item.description;
      price.value = item.price;
      loc.value = item.location;
      imgText.value = (item.images || []).join(", ");
      (item.images || []).forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.style.width = "70px";
        img.style.height = "70px";
        img.style.objectFit = "cover";
        img.style.marginRight = "6px";
        previews.appendChild(img);
      });
    }
  }

  fileInput.addEventListener("change", () => {
    previews.innerHTML = "";
    Array.from(fileInput.files).forEach(f => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(f);
      img.style.width = "70px";
      img.style.height = "70px";
      img.style.objectFit = "cover";
      img.style.marginRight = "6px";
      previews.appendChild(img);
    });
  });

  function fileToBase64(file) {
    return new Promise(res => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.readAsDataURL(file);
    });
  }

  form.onsubmit = async (e) => {
    e.preventDefault();

    let images = imgText.value.split(",")
      .map(s => s.trim())
      .filter(Boolean);

    if (fileInput.files.length) {
      const uploads = await Promise.all(
        Array.from(fileInput.files).map(f => fileToBase64(f))
      );
      images = uploads.concat(images);
    }

    const newItem = {
      id: itemId.value || uid(),
      title: title.value,
      description: desc.value,
      price: Number(price.value),
      location: loc.value,
      images
    };

    const list = getItems().filter(i => i.id !== newItem.id);
    list.push(newItem);
    setItems(list);

    location.href = "index.html";
  };
})();

/* --------------------------------------------------
   ADMIN PAGE (admin.html)
-------------------------------------------------- */
(function initAdminPage() {
  const itemsBody = document.getElementById("admin-items-body");
  if (!itemsBody) return;

  const loginBox = document.getElementById("admin-login-box");
  const controls = document.getElementById("admin-controls");
  const pass = document.getElementById("admin-pass");
  const login = document.getElementById("admin-login");
  const txBox = document.getElementById("admin-transactions-list");

  login.onclick = () => {
    if (pass.value === "admin") {
      loginBox.style.display = "none";
      controls.style.display = "block";
      renderAdminItems();
      renderAdminTx();
    } else {
      alert("Wrong password");
    }
  };

  function renderAdminItems() {
    itemsBody.innerHTML = "";
    getItems().forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.title}</td>
        <td>৳${item.price}</td>
        <td>${item.location}</td>
        <td>
          <a href="add-item.html?id=${item.id}" class="small-btn">Edit</a>
          <button class="small-btn del">Delete</button>
        </td>
      `;
      tr.querySelector(".del").onclick = () => {
        if (!confirm("Delete this item?")) return;
        setItems(getItems().filter(i => i.id !== item.id));
        setTransactions(getTransactions().filter(t => t.itemId !== item.id));
        renderAdminItems();
        renderAdminTx();
      };
      itemsBody.appendChild(tr);
    });
  }

  function renderAdminTx() {
    txBox.innerHTML = "";
    const list = getTransactions().slice().reverse();
    if (list.length === 0) {
      txBox.innerHTML = "<p class='muted'>No orders/bookings yet</p>";
      return;
    }
    list.forEach(t => {
      const div = document.createElement("div");
      div.className = "booking-row";
      const label = t.type === "buy" ? "Buy" : "Rent";
      div.innerHTML = `
        <strong>[${label}] ${t.itemTitle}</strong> — ${t.customer}<br>
        <span class="muted">
          ${t.type === "rent"
            ? `${t.from} → ${t.to} (${t.days} days)`
            : t.date}
        </span><br>
        ${t.address ? `<span class="muted">📍 ${t.address}</span><br>` : ""}
        ${t.phone ? `<span class="muted">☎ ${t.phone}</span><br>` : ""}
        <b>৳${t.total}</b>
      `;
      txBox.appendChild(div);
    });
  }
})();

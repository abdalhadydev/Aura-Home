import { auth } from "../Scripts/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getMyOrders } from "../Scripts/AuraHomeServices.js";

const ordersTableBody = document.getElementById("ordersTableBody");
const orderSearch = document.getElementById("orderSearch");
let allOrders = [];

onAuthStateChanged(auth, (user) => {
  if (user) {
    fetchAndDisplayOrders();
  } else {
    window.location.href = "login.html";
  }
});

async function fetchAndDisplayOrders() {
  try {
    allOrders = await getMyOrders();

    allOrders.sort((a, b) => {
      const dateA = a.createdAt?.seconds
        ? a.createdAt.seconds * 1000
        : new Date(a.createdAt).getTime();
      const dateB = b.createdAt?.seconds
        ? b.createdAt.seconds * 1000
        : new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    renderOrders(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    ordersTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="py-5 text-center text-danger">
                    <i class="fas fa-exclamation-circle mb-2 d-block fs-2"></i>
                    Failed to load orders. Please try again later.
                </td>
            </tr>`;
  }
}

function renderOrders(orders) {
  if (orders.length === 0) {
    ordersTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="py-5 text-center empty-state">
                    <i class="fas fa-box-open"></i>
                    <p class="text-muted">No orders found.</p>
                </td>
            </tr>`;
    return;
  }

  ordersTableBody.innerHTML = "";
  orders.forEach((order) => {
    let dateStr = "N/A";
    if (order.createdAt) {
      const date = order.createdAt.seconds
        ? new Date(order.createdAt.seconds * 1000)
        : new Date(order.createdAt);

      const timePart = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });

      const datePart = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      dateStr = `${timePart} — ${datePart}`;
    }

    const status = (order.status || "pending").toLowerCase();
    let statusClass = "status-pending";
    if (status === "accepted") statusClass = "status-accepted";
    if (status === "completed") statusClass = "status-completed";

    const itemsCount = order.items ? order.items.length : 0;

    const row = `
            <tr class="order-row align-middle">
                <td class="py-3 px-4">
                    <span class="order-id">#${order.id.substring(0, 8).toUpperCase()}</span>
                </td>
                <td>${dateStr}</td>
                <td>${itemsCount} Items</td>
                <td class="fw-bold">$${order.total || 0}</td>
                <td>
                    <span class="status-badge ${statusClass}">
                        ${status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </td>
                <td class="text-end px-4">
                    <a href="OrderDetails.html?id=${order.id}" class="btn-view">
                        View Details
                    </a>
                </td>
            </tr>
        `;
    ordersTableBody.innerHTML += row;
  });
}

orderSearch.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredOrders = allOrders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm),
  );
  renderOrders(filteredOrders);
});

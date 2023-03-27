const orderId = new URLSearchParams(window.location.search).get("orderId");

const displayOrderId = (orderId) => {
  const spanOrderId = document.querySelector("#orderId");
  spanOrderId.textContent = orderId;
};

const clearLocalStorage = () => {
  window.localStorage.clear();
};

displayOrderId(orderId);
clearLocalStorage();

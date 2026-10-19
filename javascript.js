const form = document.getElementById("transactionForm");
const dateInput = document.getElementById("date");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const noteInput = document.getElementById("note");
const list = document.getElementById("transactionList");
const emptyMessage = document.getElementById("emptyMessage");
const formMessage = document.getElementById("formMessage");

const categories = {
  pemasukan: ["Order / Tarif", "Bonus", "Tip", "Lainnya"],
  pengeluaran: ["Operasional", "Pribadi", "Bensin", "Servis", "Makan", "Lainnya"]
};

let transactions = JSON.parse(localStorage.getItem("ojolTransactions") || "[]");

function todayString() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

dateInput.value = todayString();

function rupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", maximumFractionDigits: 0
  }).format(value);
}

function updateCategories() {
  const oldValue = categoryInput.value;
  categoryInput.innerHTML = "";
  categories[typeInput.value].forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryInput.appendChild(option);
  });
  if (categories[typeInput.value].includes(oldValue)) categoryInput.value = oldValue;
}

function saveTransactions() {
  localStorage.setItem("ojolTransactions", JSON.stringify(transactions));
}



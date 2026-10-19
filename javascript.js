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

function render() {
  list.innerHTML = "";
  const today = todayString();
  const todayTransactions = transactions.filter(item => item.date === today);
  const income = todayTransactions
    .filter(item => item.type === "pemasukan")
    .reduce((sum, item) => sum + item.amount, 0);
  const expense = todayTransactions
    .filter(item => item.type === "pengeluaran")
    .reduce((sum, item) => sum + item.amount, 0);

  document.getElementById("incomeTotal").textContent = rupiah(income);
  document.getElementById("expenseTotal").textContent = rupiah(expense);
  document.getElementById("netTotal").textContent = rupiah(income - expense);

  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
  sorted.forEach(item => {
    const row = document.createElement("tr");
    const values = [
      item.date,
      item.type === "pemasukan" ? "Pemasukan" : "Pengeluaran",
      item.category,
      rupiah(item.amount),
      item.note || "-"
    ];

    values.forEach((value, index) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      if (index === 3) cell.className = item.type === "pemasukan" ? "income" : "expense";
      row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.addEventListener("click", () => {
      if (confirm("Yakin ingin menghapus transaksi ini?")) {
        transactions = transactions.filter(transaction => transaction.id !== item.id);
        saveTransactions();
        render();
      }
    });
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    list.appendChild(row);
  });

  emptyMessage.style.display = transactions.length ? "none" : "block";
}

typeInput.addEventListener("change", updateCategories);


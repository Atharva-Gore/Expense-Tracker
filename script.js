let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
const transactionForm = document.getElementById("transactionForm");
const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const transactionList = document.getElementById("transactionList");
const balance = document.getElementById("balance");
const chartCanvas = document.getElementById("chart");
let chart;

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateChart() {
  const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);

  if (chart) chart.destroy();

  chart = new Chart(chartCanvas, {
    type: "pie",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [income, expense],
        backgroundColor: ["#2ecc71", "#e74c3c"]
      }]
    }
  });
}

function renderTransactions() {
  transactionList.innerHTML = "";
  let total = 0;
  transactions.forEach((t, index) => {
    total += t.amount;
    const li = document.createElement("li");
    li.className = t.amount < 0 ? "expense" : "income";
    li.innerHTML = `${t.desc} <span>₹${t.amount}</span> <button onclick="removeTransaction(${index})">❌</button>`;
    transactionList.appendChild(li);
  });
  balance.textContent = total;
  updateChart();
  updateLocalStorage();
}

function addTransaction(e) {
  e.preventDefault();
  const descVal = desc.value.trim();
  const amountVal = parseFloat(amount.value);

  if (!descVal || isNaN(amountVal)) return alert("Fill all fields correctly");

  transactions.push({ desc: descVal, amount: amountVal });
  desc.value = "";
  amount.value = "";
  renderTransactions();
}

function removeTransaction(index) {
  transactions.splice(index, 1);
  renderTransactions();
}

transactionForm.addEventListener("submit", addTransaction);
renderTransactions();

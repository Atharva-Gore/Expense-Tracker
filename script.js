const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const balance = document.getElementById("balance");
const list = document.getElementById("list");

let transactions = [];
let income = 0;
let expense = 0;

const chartCtx = document.getElementById("chart").getContext("2d");
let chart = new Chart(chartCtx, {
  type: "pie",
  data: {
    labels: ["Income", "Expense"],
    datasets: [{
      data: [0, 0],
      backgroundColor: ["#2ecc71", "#e74c3c"],
    }]
  }
});

function updateChart() {
  chart.data.datasets[0].data = [income, expense];
  chart.update();
}

function renderTransactions() {
  list.innerHTML = "";
  transactions.forEach(t => {
    const div = document.createElement("div");
    div.className = `entry ${t.amount > 0 ? "income" : "expense"}`;
    div.innerHTML = `${t.desc} ₹${Math.abs(t.amount)} <button onclick="removeTransaction(${t.id})">❌</button>`;
    list.appendChild(div);
  });

  const total = income - expense;
  balance.textContent = total;
  updateChart();
}

function addSalary() {
  const amt = parseFloat(amount.value);
  if (!desc.value || isNaN(amt) || amt <= 0) return alert("Enter valid salary");

  transactions.push({ id: Date.now(), desc: desc.value, amount: amt });
  income += amt;

  desc.value = "";
  amount.value = "";
  renderTransactions();
}

function addExpense() {
  const amt = parseFloat(amount.value);
  if (!desc.value || isNaN(amt) || amt <= 0) return alert("Enter valid expense");

  transactions.push({ id: Date.now(), desc: desc.value, amount: -amt });
  expense += amt;

  desc.value = "";
  amount.value = "";
  renderTransactions();
}

function removeTransaction(id) {
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) {
    const t = transactions[index];
    if (t.amount > 0) income -= t.amount;
    else expense -= Math.abs(t.amount);
    transactions.splice(index, 1);
    renderTransactions();
  }
}

let balance = 0;
let transactions = [];

const balanceEl = document.getElementById('balance');
const transactionsEl = document.getElementById('transactions');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const ctx = document.getElementById('chart').getContext('2d');

let chart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Income', 'Expense'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#00cc66', '#ff4d4d']
    }]
  },
  options: {
    responsive: false
  }
});

function updateBalance() {
  let income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  let expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  balance = income - expense;
  balanceEl.textContent = balance;
  chart.data.datasets[0].data = [income, expense];
  chart.update();
}

function renderTransactions() {
  transactionsEl.innerHTML = '';
  transactions.forEach((t, i) => {
    const div = document.createElement('div');
    div.className = `transaction ${t.type}`;
    div.innerHTML = `
      ${t.desc} ₹${t.amount}
      <button onclick="deleteTransaction(${i})">❌</button>
    `;
    transactionsEl.appendChild(div);
  });
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  renderTransactions();
  updateBalance();
}

function addIncome() {
  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);
  if (!desc || isNaN(amount) || amount <= 0) return;
  transactions.push({ desc, amount, type: 'income' });
  descInput.value = '';
  amountInput.value = '';
  renderTransactions();
  updateBalance();
}

function addExpense() {
  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);
  if (!desc || isNaN(amount) || amount <= 0) return;
  transactions.push({ desc, amount, type: 'expense' });
  descInput.value = '';
  amountInput.value = '';
  renderTransactions();
  updateBalance();
}
 

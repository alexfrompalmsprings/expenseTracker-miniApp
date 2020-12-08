// -------------  DOM elements  -----------
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let localStorageTransactions = JSON.parse(localStorage.getItem('transactionsDATA'));

let transactionsDATA = localStorage.getItem('transactionsDATA') !== null ? localStorageTransactions : [];

console.log(transactionsDATA);

let dummyTransactions = [{
    id: 1,
    text: 'Flower',
    amount: -20
  },
  {
    id: 2,
    text: 'Salary',
    amount: 200
  },
  {
    id: 3,
    text: 'Book',
    amount: -10
  },
  {
    id: 4,
    text: 'Dividend',
    amount: 15
  },
  {
    id: 5,
    text: 'Tutor',
    amount: 50
  },
]

// -------------  functions  -----------
// function to store transaction
function addTransaction(e) {
  e.preventDefault();

  console.log('hi')

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please enter a transaction!')
  } else {

    let newTransaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    console.log(newTransaction);

    transactionsDATA.push(newTransaction);

    addTransactionToDom(newTransaction);

    updateBalances();

    // update the local storage
    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

// id generator
function generateID() {
  let ID = Math.floor(Math.random() * 1000000)
  return ID;
}

// function to add elements to the DOM
function addTransactionToDom(transaction) {

  // determine the sign
  let sign = transaction.amount < 0 ? '-' : '+';

  let item = document.createElement('li');

  // create the minus/plus class
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span> ${sign} ${Math.abs(transaction.amount)} <span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);

}


// update balances
function updateBalances() {
  let amounts = transactionsDATA.map((trans) => {
    return trans.amount
  })
  console.log(amounts);

  let total = amounts.reduce((result, amount) => {
    return result += amount;
  }, 0).toFixed(2);
  console.log(total);

  let income = amounts
    .filter(amount => amount > 0)
    .reduce((acc, amount) => acc += amount, 0)
    .toFixed(2);
  console.log(income);

  let expense = (amounts
      .filter(item => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);
  console.log(expense);


  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// removes transaction based on the id
function removeTransaction(id) {
  transactionsDATA = transactionsDATA.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  initialize();

}


// updates the local storage
function updateLocalStorage(){
  localStorage.setItem('transactionsDATA', JSON.stringify(transactionsDATA))
}


// initialize func
function initialize() {
  list.innerHTML = '';

  transactionsDATA.forEach((trans) => {
    addTransactionToDom(trans);
  })

  updateBalances();
}


initialize();



// -------------  Events listeners  -----------
form.addEventListener('submit', addTransaction)
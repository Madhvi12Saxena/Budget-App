// Retrieve budgets and expenses from local storage
let budgets = JSON.parse(localStorage.getItem('budgets')) || [];
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Display budgets in the select dropdown
function displayBudgets() {
  const budgetSelect = document.getElementById('budgetSelect');
  budgetSelect.innerHTML = '';

  budgets.forEach((budget) => {
    const option = document.createElement('option');
    option.text = budget.name;
    option.value = budget.name;
    budgetSelect.appendChild(option);
  });
}

// Add a new budget
function addBudget() {
  const budgetNameInput = document.getElementById('budgetName');
  const budgetAmountInput = document.getElementById('budgetAmount');

  const budgetName = budgetNameInput.value;
  const budgetAmount = parseFloat(budgetAmountInput.value);

  // Create a new budget object
  const budget = { name: budgetName, amount: budgetAmount };

  // Add the budget to the list
  budgets.push(budget);

  // Save the updated budgets to local storage
  localStorage.setItem('budgets', JSON.stringify(budgets));

  // Display the updated budgets
  displayBudgets();

  // Clear input fields
  budgetNameInput.value = '';
  budgetAmountInput.value = '';
}

// Add a new expense
function addExpense() {
  const expenseDescInput = document.getElementById('expenseDesc');
  const expenseAmountInput = document.getElementById('expenseAmount');
  const budgetSelect = document.getElementById('budgetSelect');

  const expenseDesc = expenseDescInput.value;
  const expenseAmount = parseFloat(expenseAmountInput.value);
  const selectedBudgetName = budgetSelect.value;

  // Create a new expense object
  const expense = { description: expenseDesc, amount: expenseAmount, budget: selectedBudgetName };

  // Add the expense to the list
  expenses.push(expense);

  // Save the updated expenses to local storage
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Display the updated expenses
  displayExpenses();

  // Clear input fields
  expenseDescInput.value = '';
  expenseAmountInput.value = '';
}

// Delete an expense
function deleteExpense(index) {
  // Remove the expense from the list
  expenses.splice(index, 1);

  // Save the updated expenses to local storage
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Display the updated expenses
  displayExpenses();
}

// Display expenses and calculate total budget amount
function displayExpenses() {
  const expensesList = document.getElementById('expensesList');
  expensesList.innerHTML = '';

  let totalBudgetAmount = 0;

  expenses.forEach((expense, index) => {
    const listItem = document.createElement('div');
    listItem.innerHTML = `${expense.description} - ${expense.amount} - ${expense.budget}`;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = () => deleteExpense(index);

    listItem.appendChild(deleteButton);
    expensesList.appendChild(listItem);

    totalBudgetAmount += expense.amount;
  });

  // Display total budget amount
  const totalBudgetElement = document.createElement('p');
  totalBudgetElement.innerHTML = `Total Budget Amount: ${totalBudgetAmount}`;
  expensesList.appendChild(totalBudgetElement);
}

// Initial display of budgets and expenses
displayBudgets();
displayExpenses();

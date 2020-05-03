import { format, formatISO, parseISO } from 'date-fns';

var button = document.querySelector('button');
var amountInput = document.querySelector('input#amount');
var descInput = document.querySelector('input#description');
var table = document.querySelector('table');
var p = document.querySelector('p');

var expenses = localStorage.getItem('expenses');

var hideElement = function (el) {
	el.style.display = 'none';
}

var constructRow = function (expense) {
	var time = format(parseISO(expense.time), 'dd/MMM/yyyy HH:mm');
	var row = document.createElement('tr');
	row.innerHTML = '<td>' + time + '</td>' +
		'<td>' + expense.amount + '</td>' +
		'<td>' + expense.description + '</td>';
	return row;
}

var addTableRow = function (expense) {
	if (!expenses) hideElement(table);
	var row = constructRow(expense);
	table.appendChild(row);
}

var saveExpense = function (expense) {
	if (!expenses) {
		expenses = [];
		table.style.display = 'block';
	}

	hideElement(p);
	expenses.push(expense);
	localStorage.setItem('expenses', JSON.stringify(expenses));
	addTableRow(expense);
}

var onAddButtonClicked = function () {
	saveExpense({
		time: formatISO(new Date()),
		amount: amountInput.value,
		description: descInput.value
	});
}

document.addEventListener('click', function (event) {
	if (event.target == button) {
		event.preventDefault();
		onAddButtonClicked();
	}
});

amountInput.value = "";
descInput.value = "";

if (!expenses) {
	hideElement(table);
	p.style.display = 'block';
}

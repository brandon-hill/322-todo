const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmation = document.getElementById('confirmation');
const submit = document.querySelector('button');

// Show input error message and outline
function showError(input, message) {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = message;
	throw new error();
}

// Show success outline
function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
	return true;
}

// Check if email is valid
function checkEmail(input) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, 'Email is not valid');
	}
}

// Check required fields
function checkRequired(inputArr) {
	inputArr.forEach(function (input) {
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input)} is required`);
		} else {
			showSuccess(input);
		}
	});
}

// Check input length
function checkLength(input, min, max) {
	console.log(input.value.length);
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} must be at least ${min} characters`
		);
	} else if (input.value.length > max) {
		showError(
			input,
			`${getFieldName(input)} must be less than ${max} characters`
		);
	} else {
		showSuccess(input);
	}
}

// Check passwords match
function checkPasswordsMatch(password, confirmation) {
	if (password.value !== confirmation.value) {
		showError(confirmation, 'Passwords do not match');
	}
}

// Get fieldname
function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Submit event
form.addEventListener('submit', (e) => {});
// form.addEventListener('submit', e => {
// 	e.preventDefault();

// 	try {
// 		checkRequired([firstName, lastName, email, password, confirmation]);
// 		console.log('checked required');
// 		checkLength(firstName, 1, 25);
// 		console.log('checked length of firstname');
// 		checkLength(lastName, 1, 25);
// 		console.log('checked length of lastname');
// 		checkEmail(email);
// 		console.log('checked email');
// 		checkLength(password, 6, 25);
// 		console.log('checked length of password');
// 		checkPasswordsMatch(password, confirmation);
// 		console.log('check passwords match');
// 	} catch (error) {
// 		console.log('caught');
// 	}
// });

// checkRequired([firstName, lastName, email, password, confirmation]);
// checkLength(firstName, 1, 25);
// checkLength(lastName, 1, 25);

// checkLength(lastName, 1, 25) &&
// checkEmail(email) &&
// checkLength(password, 6, 25) &&
// checkLength(confirmation, 6, 25) &&
// checkPasswordsMatch(password, confirmation)

// checkLength(password, 6, 25);
// checkPasswordsMatch(password, confirmation);

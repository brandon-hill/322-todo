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
}

// Show success outline
function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

// Check if email is valid
function checkEmail(input) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, 'Email is not valid');
		return false;
	}
}

// Check required fields
function checkRequired(inputArr) {
	inputArr.forEach(function (input) {
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input)} is required`);
			return false;
		} else {
			showSuccess(input);
		}
	});
}

// Check input length
function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} must be at least ${min} characters`
		);
		return false;
	} else if (input.value.length > max) {
		showError(
			input,
			`${getFieldName(input)} must be less than ${max} characters`
		);
		return false;
	} else {
		showSuccess(input);
	}
}

// Check passwords match
function checkPasswordsMatch(password, confirmation) {
	if (password.value !== confirmation.value) {
		showError(confirmation, 'Passwords do not match');
		return false;
	}
}

// Get fieldname
function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// // Submit event
// form.addEventListener('submit', (e) => {
// 	e.preventDefault();

// 	checkRequired([firstName, lastName, email, password, confirmation]);
// 	checkLength(firstName, 1, 25);
// 	checkLength(lastName, 1, 25);
// 	checkEmail(email);
// 	checkLength(password, 6, 25);
// 	checkLength(confirmation, 6, 25);
// 	checkPasswordsMatch(password, confirmation);

// 	form.submit();
// });

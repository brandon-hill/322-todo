const registerForm = document.getElementById('register-form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmation = document.getElementById('confirmation')
const registerSubmit = document.querySelector('#register-form .submit-btn')
const householdCreateForm = document.getElementById("household-create-form")
const flashMessage = document.querySelector('.flash')
const dismiss = document.querySelector('.dismiss')
const dashboardContainer = document.querySelector('#dashboard-container')
const containerHeaders = document.querySelectorAll('.container-header')
const userNav = document.querySelector('#user-nav')
const caret = document.querySelector('.fa-caret-down')
const userNavMenu = document.querySelector('#nav-menu-container')

// Show input error message and outline
function showError(input, message) {
	const formControl = input.parentElement
	formControl.className = 'form-control error'
	const small = formControl.querySelector('small')
	small.innerText = message
}

// Show success outline
function showSuccess(input) {
	const formControl = input.parentElement
	formControl.className = 'form-control success'
}

// Check if email is valid
function checkEmail(input) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (re.test(input.value.trim())) {
		showSuccess(input)
		return true
	} else {
		showError(input, 'Email is not valid')
	}
}

// Check required fields
function checkRequired(inputArr) {
	let passed = true
	inputArr.forEach((input) => {
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input)} is required`)
			passed = false
		} else {
			showSuccess(input)
		}
	})

	if (passed == true) {
		return true
	}
}

// Check input length
function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} must be at least ${min} characters`
		)
	} else if (input.value.length > max) {
		showError(
			input,
			`${getFieldName(input)} must be less than ${max} characters`
		)
	} else {
		showSuccess(input)
		return true
	}
}

// Check passwords match
function checkPasswordsMatch(password, confirmation) {
	if (password.value !== confirmation.value) {
		showError(confirmation, 'Passwords do not match')
	} else {
		return true
	}
}

// Get fieldname
function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Dismiss flash message
if (flashMessage != null) {
	dismiss.addEventListener('click', () => {
		console.log('toggled')
		flashMessage.classList.add('dismissed')
		flashMessage.classList.remove('visible')
	})
}

// Register form submit
if (registerForm) {
	registerForm.addEventListener('submit', (e) => {
		// Validate fields
		if (
			!checkRequired([username, email, password, confirmation]) ||
			!checkLength(username, 1, 25) ||
			!checkEmail(email) ||
			!checkLength(password, 6, 25) ||
			!checkLength(confirmation, 6, 25) ||
			!checkPasswordsMatch(password, confirmation)
		) {
			e.preventDefault()
		}
	})
}

// Household create form submit
if (householdCreateForm) {
	householdForm.addEventListener('submit', (e) => {
		// Validate fields
		if (
			!checkRequired([]) ||
			!checkLength(username, 1, 25) ||
			!checkEmail(email) ||
			!checkLength(password, 6, 25) ||
			!checkLength(confirmation, 6, 25) ||
			!checkPasswordsMatch(password, confirmation)
		) {
			e.preventDefault()
		}
	})
}

// Toggle create form
Array.from(containerHeaders).forEach((header) => {
	header.addEventListener('click', (e) => {
		if (e.target.classList.contains('add')) {
			e.target.classList.toggle('expanded')
			e.currentTarget.nextSibling.nextSibling.classList.toggle('expanded')
		}
	})
})

// Toggle user nav
userNav.addEventListener('click', (e) => {
	userNavMenu.classList.toggle('hidden')
	caret.classList.toggle('expanded')
})

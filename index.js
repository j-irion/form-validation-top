const form = document.querySelector('form');

const email = document.getElementById('mail');
const country = document.getElementById('country');
const zipCode = document.getElementById('zip-code');
const password = document.getElementById('password');
const confPassword = document.getElementById('conf-password');

const emailError = document.getElementById('error-mail');
const countryError = document.getElementById('error-country');
const zipCodeError = document.getElementById('error-zip-code');
const passwordError = document.getElementById('error-password');
const confPasswordError = document.getElementById('error-conf-password');

document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('input', () => {
    if (input.validity.valid) {
      const error = document.getElementById(`error-${input.id}`);
      error.textContent = '';
      error.className = 'error';
    } else {
      showError(input);
    }
  });
});

form.addEventListener('submit', (event) => {
  if (password.value !== confPassword.value) {
    console.log('test');
    showError(confPassword);
    event.preventDefault();
    return;
  }
  document.querySelectorAll('input').forEach((input) => {
    if (!input.validity.valid) {
      showError(input);
      event.preventDefault();
    }
  });
});

confPassword.addEventListener('input', () => {
  password.className = '';
  confPassword.className = '';
  if (password.value !== confPassword.value) {
    console.log('test');
    showError(confPassword);
  }
});

function showError(input) {
  switch (input.id) {
    case 'mail':
      showMailError();
      break;
    case 'country':
      showCountryError();
      break;
    case 'zip-code':
      showZipCodeError();
      break;
    case 'password':
      showPasswordError();
      break;
    case 'conf-password':
      showConfPasswordError();
      break;
  }
}

function showMailError() {
  console.log('mail error');
  if (email.validity.valueMissing) {
    emailError.textContent = 'You need to enter an e-mail address.';
  } else if (email.validity.typeMismatch) {
    emailError.textContent = 'Entered value needs to be an e-mail address.';
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }

  emailError.className = 'error active';
}

function showCountryError() {
  console.log('country error');
  if (country.validity.valueMissing) {
    countryError.textContent = 'You need to enter a country';
  } else if (country.validity.tooShort) {
    countryError.textContent = `Country should be at least ${country.minLength} charecter; you entered ${country.value.length}`;
  } else if (country.validity.patternMismatch) {
    countryError.textContent = 'Country should only contain letters';
  }

  countryError.className = 'error active';
}

function showZipCodeError() {
  console.log('zip-code error');
  if (zipCode.validity.valueMissing) {
    zipCodeError.textContent = 'You need to enter a zip code';
  } else if (zipCode.validity.rangeUnderflow) {
    zipCodeError.textContent = `Zip code should be at least ${zipCode.min}`;
  } else if (zipCode.validity.rangeOverflow) {
    zipCodeError.textContent = `Zip code should not be more than ${zipCode.max}`;
  }
}

function showPasswordError() {
  console.log('password error');
  if (password.validity.valueMissing) {
    passwordError.textContent = 'You need to enter a password';
  } else if (password.validity.tooShort) {
    passwordError.textContent = `Password should be at least ${password.minLength} character; you entered ${password.value.length}`;
  }
}

function showConfPasswordError() {
  console.log('conf password error');
  if (password.value !== confPassword.value) {
    confPasswordError.textContent = 'Passwords do not match';
    password.classList.add('no-match');
    confPassword.classList.add('no-match');
  } else if (password.validity.valueMissing) {
    confPasswordError.textContent = 'You need to enter a password';
  } else if (password.validity.tooShort) {
    confPasswordError.textContent = `Password should be at least ${password.minLength} character; you entered ${password.value.length}`;
  }
}

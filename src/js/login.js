/*// DOM Element Variables
const loginFormEl = document.getElementById("login");
const loginEmailEl = document.getElementById("login-email");
const loginPasswordEl = document.getElementById("login-password");
const notificationEl = document.getElementById("info");
const loggedInEl = document.getElementById("logged-in");
const successEl = document.getElementById("success");
const errorEl = document.getElementById("error");

// Notification Functions
function displayError(errorMessage) {
  clearNotifications();
  errorEl.innerText = errorMessage;
  $('#error').css('display', 'block');
  $('#info').css('display', 'block');
}

function displaySuccess(successMessage) {
  clearNotifications();
  $('#success').css('display', 'block');
  $('#info').css('display', 'block');
  successEl.innerText = successMessage;
}

function clearNotifications() {
  [errorEl, successEl].forEach(el => el.innerText = "");
}

// Helper Functions
function clearFields(fields) {
  fields.forEach(field => field.value = "");
}

function toggleHiddenElementById(id) {
  document.getElementById(id).classList.toggle("hidden");
}

// UI State Transitions
function showRegistrationForm() {
  clearNotifications();
  resendConfirmationEl.hidden = true;
  registerFormEl.hidden = false;
  loggedInEl.hidden = true;
  postRegistrationEl.hidden = true;
}

function showLoginForm() {
  clearNotifications();
  resendConfirmationEl.hidden = true;
  loginFormEl.hidden = false;
  loggedInEl.hidden = true;
  postRegistrationEl.hidden = true;
}

function showControlPanel() {
  clearNotifications();
  resendConfirmationEl.hidden = true;
  loginFormEl.hidden = true;
  registerFormEl.hidden = true;
  loggedInEl.hidden = true;
  postRegistrationEl.hidden = true;
}

function showResendConfirmationForm() {
  clearNotifications();
  resendConfirmationEl.hidden = false;
  loginFormEl.hidden = true;
  registerFormEl.hidden = true;
  loggedInEl.hidden = true;
  postRegistrationEl.hidden = true;
}

function showLoggedInState() {
  clearFields([loginEmailEl, loginPasswordEl]);
  clearNotifications();
  resendConfirmationEl.hidden = true;
  loginFormEl.hidden = true;
  registerFormEl.hidden = true;
  loggedInEl.hidden = false;
  postRegistrationEl.hidden = true;
}

function showPostRegistrationState() {
  clearFields([registerEmailEl, registerPasswordEl]);
  resendConfirmationEl.hidden = true;
  loginFormEl.hidden = true;
  registerFormEl.hidden = true;
  loggedInEl.hidden = true;
  postRegistrationEl.hidden = false;
}

function setPostRegistrationState() {
  // Clear registration form inputs then hide the form
  clearFields([registerEmailEl, registerPasswordEl]);
  toggleHiddenElementById("create-a-user");
  return Promise.resolve();
}

$(document).ready(function() {

  $('#account').on('click', function(event) {
    event.preventDefault();
    $('.overlay').css('display', 'block');
    $('.accountback').animate({
      opacity: 1
    }, 100, 'swing');

    $('.menu-wrapper').animate({
      opacity: 1
    }, 100, 'swing');

    $('.overlay').animate({
      opacity: 0.3
    }, 100, 'swing');

    return false;

  });

  $('.overlay').on('click', function(event) {
    $('.overlay').animate({
      opacity: 0
    }, 100, 'swing', function() {
      $('.overlay').css('display', 'none');
    });

    $('.accountback').animate({
      opacity: 0
    }, 100, 'swing');

    $('.menu-wrapper').animate({
      opacity: 0
    }, 100, 'swing');
  });
});*/

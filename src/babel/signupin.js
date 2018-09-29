"use strict";


const {
  Stitch,
  UserPasswordAuthProviderClient,
  UserPasswordCredential
} = stitch;

const client = stitch.Stitch.initializeDefaultAppClient('hackers-uangn');
const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('hackers');
const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory);


// Register a new application user when the user submits their information
async function handleSignup() {
  const email = registerEmailEl.value;
  const password = registerPasswordEl.value;

  try {

    await emailPasswordClient.registerWithEmail(email, password)
    showPostRegistrationState()
    displaySuccess("Successfully registered. Check your inbox for a confirmation email.")

  } catch(e) {
    handleError(e)
  }
}

// Authenticate an application user based on the submitted information
async function handleLogin() {
  const email = loginEmailEl.value;
  const password = loginPasswordEl.value;
  const credential = new UserPasswordCredential(email, password);

  try {

    await stitchClient.auth.loginWithCredential(credential);
    const user = stitchClient.auth.user;
    showLoggedInState();
    displaySuccess(`Logged in as: ${user.profile.data.email}`)

  } catch(e) {
    handleError(e)
  }
}

async function handleLogout() {
  await stitchClient.auth.logout();
  showControlPanel();
}

async function handleResendConfirmation() {
  const email = resendConfirmationEmailEl.value;
  await emailPasswordClient.resendConfirmationEmail(email);
  showControlPanel();
}

// DOM Element Variables
const resendConfirmationEl = document.getElementById("resend-confirmation");
const controlPanelEl = document.getElementById("control-panel");
const registerFormEl = document.getElementById("create-a-user");
const loginFormEl = document.getElementById("login");
const registerEmailEl = document.getElementById("create-a-user-email");
const registerPasswordEl = document.getElementById("create-a-user-password");
const resendConfirmationEmailEl = document.getElementById("resend-confirmation-email");
const loginEmailEl = document.getElementById("login-email");
const loginPasswordEl = document.getElementById("login-password");
const notificationEl = document.getElementById("info");
const loggedInEl = document.getElementById("logged-in");
const postRegistrationEl = document.getElementById("finished-registration");

const successEl = document.getElementById("success");
const errorEl = document.getElementById("error");

// Notification Functions
function displayError(errorMessage) { clearNotifications(); errorEl.innerText = errorMessage; }
function displaySuccess(successMessage) { clearNotifications(); successEl.innerText = successMessage }
function clearNotifications() { [errorEl, successEl].forEach(el => el.innerText = "") }

// Helper Functions
function clearFields(fields) { fields.forEach(field => field.value = "") }
function toggleHiddenElementById(id) { document.getElementById(id).classList.toggle("hidden"); }

// UI State Transitions
function showRegistrationForm() {
  clearNotifications();
  resendConfirmationEl.hidden = true;
  controlPanelEl.hidden = true;
  registerFormEl.hidden = false;
  loggedInEl.hidden = true;
  postRegistrationEl.hidden = true;
}

function showLoginForm() {
  clearNotifications();
  resendConfirmationEl.hidden = true;
  controlPanelEl.hidden = true;
  loginFormEl.hidden = false;
  loggedInEl.hidden = true;
  postRegistrationEl.hidden = true;
}

function showControlPanel() {
  clearNotifications()
  resendConfirmationEl.hidden = true;
  controlPanelEl.hidden = false;
  loginFormEl.hidden = true;
  registerFormEl.hidden = true;
  loggedInEl.hidden = true;
  postRegistrationEl.hidden = true;
}
function showResendConfirmationForm() {
  clearNotifications()
  resendConfirmationEl.hidden = false;
  controlPanelEl.hidden = true;
  loginFormEl.hidden = true;
  registerFormEl.hidden = true;
  loggedInEl.hidden = true;
  postRegistrationEl.hidden = true;
}

function showLoggedInState() {
  clearFields([loginEmailEl, loginPasswordEl]);
  clearNotifications()
  resendConfirmationEl.hidden = true;
  controlPanelEl.hidden = true;
  loginFormEl.hidden = true;
  registerFormEl.hidden = true;
  loggedInEl.hidden = false;
  postRegistrationEl.hidden = true;
}

function showPostRegistrationState() {
  clearFields([registerEmailEl, registerPasswordEl]);
  resendConfirmationEl.hidden = true;
  controlPanelEl.hidden = true;
  loginFormEl.hidden = true;
  registerFormEl.hidden = true;
  loggedInEl.hidden = true;
  postRegistrationEl.hidden = false;
}

function setPostRegistrationState() {
  // Clear registration form inputs then hide the form
  clearFields([registerEmailEl, registerPasswordEl]);
  toggleHiddenElementById("create-a-user");
  return Promise.resolve()
}

function handleError(err) {
  console.error(err)
  const errType = err.message || "Error!"
  const msg = ({
    "invalid username/password": "Invalid username or password was entered. Please try again.",
    "name already in use": "An account already exists for that email."
  })[errType] || errType
  displayError(msg);
}


/*
$(document).ready(function{
	function signup(email, password){
		$('.signup').on('click', function(){
			var user = $('input[type=email]').value;
			var pass = $('input[type=password]').value;

			emailPassClient.registerWithEmail(user, pass)
		    .then(() => {
		       console.log("Successfully sent account confirmation email!");
		    })
		    .catch(err => {
		       console.log("Error registering new user:", err);
		    });
		});
		return null;
	}



	function signin(email, password){
		$('.signin').on('click', function(){
			var user = $('input[type=email]').value;
			var pass = $('input[type=password]').value;

			const credential = new UserPasswordCredential(user, password);

			Stitch.defaultAppClient.loginWithCredential(credential).then(authedId => {
			     console.log(`successfully logged in with id: ${authedId}`);
			  })
			    .catch(err => console.error(`login failed with error: ${err}`)
		});
		return null;
});*/

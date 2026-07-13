
const loginElement = document.querySelector('.loginForm');

// Check username and password with the credentials provided

loginElement.addEventListener('submit', function(event) {

  event.preventDefault(); 

  const username = loginElement.elements['username'].value;
  const password = loginElement.elements['password'].value;

  if(varifyLoginCredential(username,password)){
    window.location.href = '../resume/resume.html';
    }
    else{
        alert("Invalid Username Or Password!!!")
    }
});

function varifyLoginCredential(username,password) {

    const validUsername = localStorage.getItem('username');
    const validPassword = localStorage.getItem('password');

    if (username === validUsername && password === validPassword) {
        return true;
    } else {
      return false;
    }
}

// prevent browser to go back to the login page 

document.addEventListener('DOMContentLoaded', function() {
  history.pushState(null, null, document.URL);

  window.addEventListener('popstate', function() {
    history.pushState(null, null, document.URL);
  });
});

function preventback() { window.history.forward(); }
setTimeout("preventback()", 0);
window.onunload = function() { null };
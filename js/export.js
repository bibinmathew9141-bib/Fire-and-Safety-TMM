// Default credentials
if (!localStorage.getItem("user")) {
  localStorage.setItem("user", "Tamdeen");
  localStorage.setItem("pass", "T@mdeen123");
}

function login() {
  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;

  let storedUser = localStorage.getItem("user");
  let storedPass = localStorage.getItem("pass");

  if (u !== storedUser) {
    document.getElementById("error").innerText = "Wrong Username";
  } else if (p !== storedPass) {
    document.getElementById("error").innerText = "Wrong Password";
  } else {
    window.location.href = "dashboard.html";
  }
}

function changeCredentials() {
  let oldU = document.getElementById("oldUser").value;
  let oldP = document.getElementById("oldPass").value;

  if (
    oldU === localStorage.getItem("user") &&
    oldP === localStorage.getItem("pass")
  ) {
    localStorage.setItem("user", document.getElementById("newUser").value);
    localStorage.setItem("pass", document.getElementById("newPass").value);
    alert("Updated Successfully");
  } else {
    alert("Old credentials incorrect");
  }
}

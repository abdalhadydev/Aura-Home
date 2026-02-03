let email = document.querySelector("#email");
let subscribe = document.querySelector(".btn-subscribe");
let message = document.querySelector(".message");
let emailRegx = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
subscribe.addEventListener("click", function () {
  let emailValue = email.value.trim();
  if (emailValue === "" || !emailRegx.test(emailValue)) {
    message.textContent = "Invalid email! Please use a valid email";
    message.style.visibility = "visible";
    message.style.color = "red";
  } else {
    message.textContent = "Success! You are now subscribed";
    message.style.visibility = "visible";
    message.style.color = "green";
    email.value = "";
  }
});


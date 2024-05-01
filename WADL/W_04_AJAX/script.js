// script.js

document.addEventListener("DOMContentLoaded", () => {
  fetchData(); // Load data when the document is ready
});

let fetchData = () => {
  // Check if users data is already in localStorage
  let storedUsers = JSON.parse(localStorage.getItem("users"));
  if (storedUsers) {
    displayData(storedUsers); // If yes, display it
  } else {
    // If not, fetch from API
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users/");
    xhr.send();
    xhr.onload = () => {
      let res = JSON.parse(xhr.responseText);
      console.log(res);
      localStorage.setItem("users", JSON.stringify(res)); // Store in localStorage
      displayData(res);
    };
  }
};

let displayData = (users) => {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  users.forEach((user, idx) => {
    tbody.innerHTML += `
        <tr>
          <td> ${idx + 1} </td>
          <td> ${user.name} </td>
          <td> ${user.email} </td>
          <td> ${user.phone} </td>
        </tr>
      `;
  });
};

let btn = document.getElementById("btn-submit");
btn.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const number = document.getElementById("phone").value;

  let postObj = {
    name: name,
    email: email,
    phone: phone,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jsonplaceholder.typicode.com/users/");
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(postObj));

  xhr.onload = () => {
    if (xhr.status === 201) {
      let storedUsers = JSON.parse(localStorage.getItem("users"));
      storedUsers.unshift(postObj);
      localStorage.setItem("users", JSON.stringify(storedUsers));
      displayData(storedUsers);
    }
  };
});

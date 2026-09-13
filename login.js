document.getElementById("loginForm").addEventListener("submit", function(event) {

```
event.preventDefault();

var username = document.getElementById("username").value;
var password = document.getElementById("password").value;

if (username === "admin" && password === "password123") {

    window.location.href = "dashboard.html";

} else {

    document.getElementById("loginMessage").innerHTML =
        "Wrong username or password.";

}
```

});

// MenuItems UI
console.log("running");
var MenuItems = document.getElementById("MenuItems");

MenuItems.style.maxHeight = "0px";

function menutoggle(){
    if(MenuItems.style.maxHeight == "0px"){
        MenuItems.style.maxHeight = "400px";
    }else{
        MenuItems.style.maxHeight = "0px";
    }
}

// js for toggle form 
var loginForm = document.getElementById('loginForm');
var registrationForm = document.getElementById('registrationForm');
var indicator = document.getElementById('indicator');

function registerUI(){
    registrationForm.style.transform = "translateX(0px)";
    loginForm.style.transform = "translateX(0px)";
    indicator.style.transform = "translateX(100px)";
}

function loginUI(){
    registrationForm.style.transform =" translateX(300px)";
    loginForm.style.transform = "translateX(300px)";
    indicator.style.transform = "translateX(0px)";
}


var customer = {};

class Customer{
    constructor(){
        this.username = 'customer';
        this.password = 'customer';
    }
    add_customer(username, password){
        Object.assign(customer, {"username": username, "password": password});
        console.log("Customer has been added successfully!");
        console.log(JSON.stringify(customer));
    }
}

customerObj = new Customer();

function loginCheck(){
    console.log("loginCheck");

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    let bothInvalid = document.querySelector('.invalidBoth');
    let invalidUsername = document.querySelector('.invalidUsername');
    let invalidPassword = document.querySelector('.invalidPassword');

    console.log("Username: ",username," Password: ", password);
    if(username != "" && password == ""){
        invalidPassword.innerHTML = "<p class=invalidPassword>Invalid password!</p>";
    }
    if(username == "" && password != ""){
        invalidUsername.innerHTML = "<p class=invalidUsername>Invalid username!</p>";
    }
    if(username != "" && password !=""){
        alert("You have logged in successfully!");
        //customerLogin()
        return false;
    }
    if(username == "" && password == ""){
        bothInvalid.innerHTML = "<p class=invalidBoth>Please enter username and password!</p>";
    } 
    return false;
}

function registrationCheck(){
    console.log("registrationCheck()");

    let invalidUsername = document.querySelector('.invalidUsernameR');
    let invalidPassword = document.querySelector('.invalidPasswordR');
    let invalidEmail = document.querySelector('.invalidEmail');
    let invalidDetails = document.querySelector('.invalidDetails');
    var usernameR = document.getElementById('usernameR').value;
    var passwordR = document.getElementById('passwordR').value;
    var email = document.getElementById('email').value;

    console.log("Username: ",usernameR," Password: ", passwordR, "Email: ", email);
    //console.log(invalidDetails);
    
    if(usernameR == "" && passwordR == "" && email == "") {
        console.log("ALL NULL");
        invalidDetails.innerHTML = "<p class=invalidBoth>Please enter all the details!</p>";
        console.log(invalidDetails);
        return false;
    } 
    if(usernameR != "" && passwordR == "" && email == ""){
        invalidPassword.innerHTML = "<p class=invalidPassword>Invalid password!</p>";
        invalidEmail.innerHTML = "<p class=invalidEmail>Invalid email!</p>";
        return false;
    }
    if(usernameR != "" && passwordR != "" && email == ""){
        invalidEmail.innerHTML = "<p class=invalidEmail>Invalid email!</p>";        
        return false;
    }
    if(usernameR == ""){
        invalidUsername.innerHTML = "<p class=invalidUsername>Invalid username!</p>";
        return false;
    }
    if(passwordR == ""){
        invalidPassword.innerHTML = "<p class=invalidPassword>Invalid password!</p>";
        return false;
    }
    if(email == ""){
        invalidEmail.innerHTML = "<p class=invalidEmail>Invalid email!</p>";
        return false;
    }
    if(usernameR != "" || passwordR != "" || email != ""){
        console.log("NOT ALL NULL");
        //invalidDetails.innerHTML = "<p class=invalidBoth>Please fill all the details!</p>";
        //alert("You have registered successfully!");
        customerObj.add_customer(usernameR, passwordR);
        return false;
    }    
}




function checkLogin(evt) {
    let userName = document.querySelector("#inputUN");
    let psw = document.querySelector("#inputPassword");
    let msg = document.querySelector("#lblMsg");

    let strMsg = "";
    let blnValid = true;
    msg.innerHTML = strMsg;
    userName.style.border = "";
    psw.style.border = "";

    evt.preventDefault();

    if (userName.value.trim() == "") {
        userName.style.border = "4px solid red";
        strMsg += "<li>User name cannot be empty.</li>"
        blnValid = false;
    }

    if (psw.value.trim() == "") {
        psw.style.border = "4px solid red";
        strMsg += "<li>Password cannot be empty.</li>"
        blnValid = false;
    }

    if (blnValid) {
        let verifyPsw = (strUserID, strUserName, strPsw) => { //Function for callback
            if (strUserName === userName.value && strPsw === psw.value) {
                localStorage.clear();
                localStorage.setItem("UID", strUserID);
                window.location = "frmToDoList.html";
            } else {
                msg.innerHTML = "<li>Invalid username or password.</li>"
            }
        }
        try {
                Authenticate(verifyPsw);
               
        } catch {
            strMsg += "<li>Login failed.</li>"
        }
        
    }

    msg.innerHTML += strMsg;
}

function Authenticate(validateFn) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let strResponse = JSON.parse(this.responseText);
            validateFn(strResponse.userID, strResponse.userName, strResponse.psw);
        }
    }
    xhr.open('GET', '../scripts/users.json', true);
    xhr.send();
}
      


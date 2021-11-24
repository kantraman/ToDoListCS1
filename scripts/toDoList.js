document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.length !== 1)
        window.location = "index.html";
    else
        getToDoList();
})

var numChk = 0;

function getToDoList() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var arrResponse = JSON.parse(this.responseText);
            var strOutput = "";
            let i = 1;

            strOutput += "<table class='table-sm'>";
            arrResponse.forEach(item => {
                strOutput += "<tr><td>";
                if (item.completed === false) {
                    strOutput += `<input id ='chk${i}' type='checkbox' class='form-check-input' onchange='chkBoxChecked(this)'/></td><td>`;
                    strOutput += `<label for = 'chk${i}'>${item.title}</label></td></tr>`
                } else {
                    strOutput += `<input id ='chk${i}' type='checkbox' class='form-check-input' checked disabled/></td><td>`;
                    strOutput += `<label for = 'chk${i}' class='text-decoration-line-through text-danger' >${item.title}</label></td></tr>`
                }
                i += 1;
            });
            strOutput += "</table>"
            document.querySelector("#list").innerHTML = strOutput;
            numChk = 0;
        }
    }
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', true);
    xhr.send();
}

function logOut() {
    localStorage.clear();
    window.location = "index.html";
}

function chkBoxChecked(obj) {
    let label = obj.parentNode.nextSibling.firstChild;
    if (obj.checked) {
        numChk += 1;
        label.style.textDecoration = "line-through";
        label.style.color = "#dc2545";
        if (numChk === 5) {
            alert(" “Congrats!!! 5 Tasks have been Successfully Completed.");
            numChk = 0;
        }
    } else {
        if (numChk > 0)
            numChk -= 1;
        else
            numChk = 4;
        label.style.textDecoration = "none";
        label.style.color = "black";
    }
}
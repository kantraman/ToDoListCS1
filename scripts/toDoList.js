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
            let divCon = document.querySelector("#list");

            strOutput += "<table id = 'toDoList' class = 'table table-sm table-hover'>";
            arrResponse.forEach(item => {
                strOutput += "<tr><td>"; 
                if (item.completed === false) {
                    strOutput += `<input id ='chk${i}' type='checkbox' class='form-check-input' onchange='chkBoxChecked(this)'/></td><td>`;
                    strOutput += `<label for = 'chk${i}'>${item.title}</label></td>`
                } else {
                    strOutput += `<input id ='chk${i}' type='checkbox' class='form-check-input' checked disabled/></td><td>`;
                    strOutput += `<label for = 'chk${i}' class='text-decoration-line-through text-danger' >${item.title}</label></td>`
                }
                strOutput += "<td onclick='delItem(this)'><img src='./images/delIcon.png' width='20px' height='20px' alt='Del' /></td>"
                i += 1;
            });
            strOutput += "</table>"
            divCon.innerHTML = strOutput;
            divCon.scrollTop = 0;
            numChk = 0;
        }
    }
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', true);
    xhr.send();
}

function addItem() {
    let newItem = document.querySelector("#newItem");
    let listTable = document.getElementById("toDoList");
    let itemToAdd = newItem.value.replaceAll(">", "&gt;").replaceAll("<","&lt;").replaceAll("&","&amp;").trim();

    if (itemToAdd !== "") {
        let row = listTable.insertRow(0);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        
        cell1.innerHTML = `<input id ='chk${listTable.rows.length + 1}' type='checkbox' class='form-check-input' onchange='chkBoxChecked(this)'/>`;
        cell2.innerHTML = `<label for = 'chk${listTable.rows.length + 1}'>${itemToAdd}</label>`;
        cell3.innerHTML = "<img src='./images/delIcon.png' width='20px' height='20px' alt='Del' />";
        cell3.setAttribute("onclick", "delItem(this)");
        newItem.value = "";
        document.querySelector("#list").scrollTop = 0;
        window.alert("New item added at the top of list.");
    } 
}


function delItem(obj) {
    let blnContinue = window.confirm("Are you sure you want to delete the item?")
    if (blnContinue) {
        let i = obj.parentNode.rowIndex;
        document.getElementById("toDoList").deleteRow(i);
    }
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
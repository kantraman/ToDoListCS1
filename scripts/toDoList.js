document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.length !== 1)
        window.location = "index.html";
    else
        getToDoList();
})

function getToDoList() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var arrResponse = JSON.parse(this.responseText);
            var strOutput = "";
            
            strOutput += "<table class='table-sm table-hover'>";
            strOutput += "<tbody style='background-color:#f9f9cc;border: 1px solid #c9c999;'>"
            arrResponse.forEach(item => {
                strOutput += `<tr style='cursor: pointer;'><td class='text-end'> ${item.userId} </td>`;
                strOutput += `<td> ${item.id} </td>`;
                strOutput += `<td> ${item.title} </td>`;
                strOutput += `<td> ${item.completed} </td></tr>`;
            });
            strOutput += "</tbody></table>"
            document.querySelector("#list").innerHTML = strOutput;
           
        }
    }
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', true);
    xhr.send();
}

function logOut() {
    localStorage.clear();
    window.location = "index.html";
}
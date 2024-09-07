const apiUrl = "http://127.0.0.1:5001/";

var tableBody = document.querySelector('.table tbody');
const fullname = document.getElementById("fullname");
const phonenumber = document.getElementById("phonenumber");
const email = document.getElementById("email");
const address = document.getElementById("address");
const message = document.getElementById("message");

//---- LOAD
window.onload = function() {
    ShowData()
}
//---- EVENT

//--- FUNCION
async function ShowData() {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
    var resp
    const result = await fetch(`${apiUrl}api/contacts/getlist`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("id_user")
        }
    })
    .then(response => response.json())
    .then(data => { resp = data;})
    .catch(error => { console.error('Error:', error);});
    if (resp.success === true)
    {   
        for(let i =0; i< resp.contacts.length; i++ )
        {
            let newRow = document.createElement('tr');
            let cell1 = document.createElement('td');
            let cell2 = document.createElement('td');
            let cell3 = document.createElement('td');
            let cell4 = document.createElement('td');
            let cell5 = document.createElement('td');
            let detail = document.createElement('a');
            
            detail.href = '#editEmployeeModal'
            detail.className = 'edit'
            detail.setAttribute('data-toggle', 'modal')
            detail.innerHTML = '<i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>'
            cell1.appendChild(detail)
            detail.addEventListener("click", function(event) {
                event.preventDefault();
                window.sessionStorage.setItem("idcontact", resp.contacts[i]._id)
                AddDetail()
                //alert(window.sessionStorage.getItem("id_booktour"))
            
            });
            cell2.textContent = resp.contacts[i].fullname
            cell3.textContent =  resp.contacts[i].email
            cell4.textContent =  resp.contacts[i].address
            cell5.textContent =  resp.contacts[i].phonenumber
            // Thêm các ô cột vào dòng mới
            newRow.appendChild(cell1);
            newRow.appendChild(cell2);
            newRow.appendChild(cell3);
            newRow.appendChild(cell4);
            newRow.appendChild(cell5);

            // Thêm dòng mới vào tbody
            tableBody.appendChild(newRow);
        }
    } 
    
    
}

async function AddDetail()
{
    const data = {
        idcontact: window.sessionStorage.getItem("idcontact")
    }
    var resp
    const result = await fetch(`${apiUrl}api/contacts/getone`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("id_user")
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => { resp = data;})
    .catch(error => { console.error('Error:', error);});

    if (resp.success === true)
    {   
        fullname.value = resp.contacts[0].fullname
        phonenumber.value = resp.contacts[0].phonenumber
        email.value = resp.contacts[0].email
        address.value = resp.contacts[0].address
        message.value = resp.contacts[0].message
    }
}

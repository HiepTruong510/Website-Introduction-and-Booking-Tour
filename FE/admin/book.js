const apiUrl = "http://127.0.0.1:5001/";


var tableBody = document.querySelector('.table tbody');
const tourname = document.getElementById("tourname");
const price = document.getElementById("price");
const totalperson = document.getElementById("totalperson");
const tourday = document.getElementById("tourday");
const tourmonth = document.getElementById("tourmonth");
const touryear = document.getElementById("touryear");
const personnamebook = document.getElementById("personnamebook");
const personphonebook = document.getElementById("personphonebook");
const personemailbook = document.getElementById("personemailbook");



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
    const result = await fetch(`${apiUrl}api/booktours/getlist`, {
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
        for(let i =0; i< resp.booktours.length; i++ )
        {
            let newRow = document.createElement('tr');
            let cell1 = document.createElement('td');
            let cell2 = document.createElement('td');
            let cell3 = document.createElement('td');
            let cell4 = document.createElement('td');
            let cell5 = document.createElement('td');
            let cell6 = document.createElement('td');
            let cell7 = document.createElement('td');
            let detail = document.createElement('a');
            
            detail.href = '#editEmployeeModal'
            detail.className = 'edit'
            detail.setAttribute('data-toggle', 'modal')
            detail.innerHTML = '<i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>'
            cell1.appendChild(detail)
            detail.addEventListener("click", function(event) {
                event.preventDefault();
                window.sessionStorage.setItem("idbooktour", resp.booktours[i]._id)
                AddDetail()
                //alert(window.sessionStorage.getItem("id_booktour"))
            
            });
            cell2.textContent = resp.booktours[i].tourname
            cell3.textContent =  resp.booktours[i].personnamebook
            cell4.textContent =  resp.booktours[i].tourday
            cell5.textContent =  resp.booktours[i].tourmonth
            cell6.textContent =  resp.booktours[i].touryear
            cell7.textContent =  resp.booktours[i].totalpeson
            // Thêm các ô cột vào dòng mới
            newRow.appendChild(cell1);
            newRow.appendChild(cell2);
            newRow.appendChild(cell3);
            newRow.appendChild(cell4);
            newRow.appendChild(cell5);
            newRow.appendChild(cell6);
            newRow.appendChild(cell7);

            // Thêm dòng mới vào tbody
            tableBody.appendChild(newRow);
        }
    } 
    
    
}

async function AddDetail()
{
    const data = {
        idbooktour: window.sessionStorage.getItem("idbooktour")
    }
    const result = await fetch(`${apiUrl}api/booktours/getone`, {
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
        tourname.value = resp.booktours[0].tourname
        price.value = resp.booktours[0].price
        totalperson.value = resp.booktours[0].totalpeson
        tourday.value = resp.booktours[0].tourday
        tourmonth.value = resp.booktours[0].tourmonth
        touryear.value = resp.booktours[0].touryear
        personnamebook.value = resp.booktours[0].personnamebook
        personphonebook.value = resp.booktours[0].personphonebook
        personemailbook.value = resp.booktours[0].personemailbook
    }
}

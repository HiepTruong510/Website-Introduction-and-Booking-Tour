const apiUrl = "http://127.0.0.1:5001/";


const fullname = document.getElementById("fullname")
const phonenumber = document.getElementById("phonenumber")
const email = document.getElementById("email")
const address = document.getElementById("address")
const message = document.getElementById("message")
const btnsend = document.getElementById("btnsend")

//---- LOAD
window.onload = function() {
    if(!window.sessionStorage.getItem("id_user"))
    {
        // alert("rong")
        window.location = "http://127.0.0.1:5501/FE/login/login.html" 
    }
    else{
        ShowData()
    }
}

//--- EVENT
btnsend.addEventListener('click', GuiLienHe)
async function GuiLienHe(event){
    event.preventDefault()
    SaveData()

}

//--- FUNCION
//showdata
async function ShowData() {

    var resp1
    const result1 = await fetch(`${apiUrl}api/userinfos/get`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("id_user")
        }
    })
    .then(response => response.json())
    .then(data => { resp1 = data;})
    .catch(error => { console.error('Error:', error);});
    if (resp1.success === true)
        {   
            fullname.value = resp1.infos[0].fullname
            phonenumber.value = resp1.infos[0].phonenumber
            email.value = resp1.infos[0].email 
            address.value = resp1.infos[0].address 
        }    
}
//savedata
async function SaveData() {
    var resp
    const data = {
        fullname: fullname.value,
        phonenumber: phonenumber.value,
        email: email.value,
        address: address.value,
        message: message.value,
    };
    const result = await fetch(`${apiUrl}api/contacts/post`, {
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
        alert("Gửi Liên Hệ Thành Công")
        window.location = "http://127.0.0.1:5501/FE/home/index.html" 
    }          
    
          
}


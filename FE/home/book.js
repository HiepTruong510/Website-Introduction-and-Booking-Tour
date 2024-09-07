const apiUrl = "http://127.0.0.1:5001/";

const price = document.getElementById("price")
var pricebd 
const tourname = document.getElementById("tourname")
const totalpeson = document.getElementById("totalpeson")
const touryear = document.getElementById("touryear")
const tourmonth = document.getElementById("tourmonth")
const tourday = document.getElementById("tourday")
const btnbook = document.getElementById("btnbook")
var tour_id = ""
let personnamebook = ""
let personemailbook = ""
let personphonebook = ""
const btndauthang = document.getElementById("dauthang");
const btngiuathang = document.getElementById("giuathang");
const btncuoithang = document.getElementById("cuoithang");

//---- LOAD
window.onload = function() {
    ShowData()

}

//--- EVENT
btnbook.addEventListener('click', DatTour)
async function DatTour(event){
    event.preventDefault()
    SaveData()

}

totalpeson.addEventListener("blur", function(event) {
    event.preventDefault();
    const tp = parseInt(totalpeson.value)
    var gia = parseInt(pricebd.replace(/[^\d]/g, ""))
    gia = (gia*tp).toLocaleString('vi-VN') + ' VNĐ';
    //alert(gia)
    price.value = gia

});

btndauthang.addEventListener("click", function(event) {
    event.preventDefault();
    tourday.value = "Ngày 1 đến ngày 7"

});

btngiuathang.addEventListener("click", function(event) {
    event.preventDefault();
    tourday.value = "Ngày 10 đến ngày 17"

});

btncuoithang.addEventListener("click", function(event) {
    event.preventDefault();
    tourday.value = "Ngày 20 đến ngày 27"
});



//--- FUNCION
//showdata
async function ShowData() {
    const data = {
        tourname: window.sessionStorage.getItem("tourname")
      }
    var resp
    const result = await fetch(`${apiUrl}api/tours/get`, {
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
        price.value = resp.tours[0].price_B
        pricebd = price.value
        tourname.innerHTML = resp.tours[0].tourname
        tour_id = resp.tours[0]._id
        totalpeson.value = 1
        const currentDate = new Date();
        touryear.value = currentDate.getFullYear() + 1
        tourmonth.value = 1
        tourday.value = "Ngày 1 đến ngày 7"
    } 

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
            personnamebook = resp1.infos[0].fullname
            personphonebook = resp1.infos[0].phonenumber
            personemailbook = resp1.infos[0].email 
        }    
          
          
}
//savedata
async function SaveData() {
    var resp
    const data = {
        tourname: tourname.innerHTML,
        price: price.value,
        totalpeson: totalpeson.value,
        touryear: touryear.value,
        tourmonth: tourmonth.value,
        tourday: tourday.value,
        personnamebook: personnamebook,
        personemailbook: personemailbook,
        personphonebook: personphonebook,
        tour_id: tour_id
    };
    const result = await fetch(`${apiUrl}api/booktours/post`, {
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
        alert("Đặt Tour Du Lịch Thành Công")
        window.location = "http://127.0.0.1:5501/FE/home/tour.html" 
    }          
    
          
}


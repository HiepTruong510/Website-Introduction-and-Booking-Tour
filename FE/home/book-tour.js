const apiUrl = "http://127.0.0.1:5001/";

const giagoc = document.getElementById("giagoc")
const giaban = document.getElementById("giaban")
const tourname = document.getElementById("tourname")
const hreftour = document.getElementById("hreftour")
const imagetour = document.getElementById("imagetour")
const introtour = document.getElementById("infotour")
let pic
const hpic1 = document.getElementById("hpic1")
const ipic1 = document.getElementById("ipic1")
let pic1
const hpic2 = document.getElementById("hpic2")
const ipic2 = document.getElementById("ipic2")
let pic2
const hpic3 = document.getElementById("hpic3")
const ipic3 = document.getElementById("ipic3")
let pic3
const hpic4 = document.getElementById("hpic4")
const ipic4 = document.getElementById("ipic4")
let pic4

//---- LOAD
window.onload = function() {
    ShowData()
}
//--- FUNCION
async function ShowData() {
    const data = {
        tourname: window.sessionStorage.getItem("tourname")//tourname.value 
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
        giagoc.innerHTML = resp.tours[0].price_G
        giaban.innerHTML = resp.tours[0].price_B
        //Gán Tên
        tourname.innerHTML = resp.tours[0].tourname
        //Gán ảnh
        pic = resp.tours[0].pic
        hreftour.href = pic;
        imagetour.src = pic;
        pic1 = resp.tours[0].pic1
        hpic1.href = pic1;
        ipic1.src = pic1;
        pic2 = resp.tours[0].pic2
        hpic2.href = pic2;
        ipic2.src = pic2;
        pic3 = resp.tours[0].pic3
        hpic3.href = pic3;
        ipic3.src = pic3;
        pic4 = resp.tours[0].pic4
        hpic4.href = pic4;
        ipic4.src = pic4;
        //Gán Thông Tin 
        introtour.innerHTML = resp.tours[0].intro
    }        
          
}


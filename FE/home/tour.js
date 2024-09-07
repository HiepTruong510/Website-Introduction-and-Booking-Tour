const hagi = document.getElementById('hagi')
const hano = document.getElementById('hano')
const huee = document.getElementById('huee')
const dana = document.getElementById('dana')
const sago = document.getElementById('sago')
const phqu = document.getElementById('phqu')
//---- load
window.onload = function() {
   //alert("reload")
}

//----
hagi.addEventListener('click', hagiang)
async function hagiang(event){
    event.preventDefault()
    var a = window.sessionStorage.getItem("id_user")
    if(a == null)
    {
        window.location = "http://127.0.0.1:5501/FE/login/login.html"
    }
    else
    {
        window.sessionStorage.setItem("tourname", "Hà Giang Tour")
        //alert(a)
        window.location = "http://127.0.0.1:5501/FE/home/book-tour.html"   
    }      
}

hano.addEventListener('click', hanoi)
async function hanoi(event){
    event.preventDefault()
    var a = window.sessionStorage.getItem("id_user")
    if(a == null)
    {
        window.location = "http://127.0.0.1:5501/FE/login/login.html"
    }
    else
    {
        window.sessionStorage.setItem("tourname", "Hà Nội Tour")
        window.location = "http://127.0.0.1:5501/FE/home/book-tour.html"   
    }      
}

huee.addEventListener('click', hue)
async function hue(event){
    event.preventDefault()
    var a = window.sessionStorage.getItem("id_user")
    if(a == null)
    {
        window.location = "http://127.0.0.1:5501/FE/login/login.html"
    }
    else
    {
        window.sessionStorage.setItem("tourname", "Huế Tour")
        window.location = "http://127.0.0.1:5501/FE/home/book-tour.html"   
    }      
}

dana.addEventListener('click', danang)
async function danang(event){
    event.preventDefault()
    var a = window.sessionStorage.getItem("id_user")
    if(a == null)
    {
        window.location = "http://127.0.0.1:5501/FE/login/login.html"
    }
    else
    {
        window.sessionStorage.setItem("tourname", "Đà Nẵng Tour")
        window.location = "http://127.0.0.1:5501/FE/home/book-tour.html"   
    }      
}

sago.addEventListener('click', saigon)
async function saigon(event){
    event.preventDefault()
    var a = window.sessionStorage.getItem("id_user")
    if(a == null)
    {
        window.location = "http://127.0.0.1:5501/FE/login/login.html"
    }
    else
    {
        window.sessionStorage.setItem("tourname", "Sài Gòn Tour")
        window.location = "http://127.0.0.1:5501/FE/home/book-tour.html"   
    }      
}

phqu.addEventListener('click', phuquoc)
async function phuquoc(event){
    event.preventDefault()
    var a = window.sessionStorage.getItem("id_user")
    if(a == null)
    {
        window.location = "http://127.0.0.1:5501/FE/login/login.html"
    }
    else
    {
        window.sessionStorage.setItem("tourname", "Phú Quốc Tour")
        window.location = "http://127.0.0.1:5501/FE/home/book-tour.html"   
    }      
}
 //-------------------------
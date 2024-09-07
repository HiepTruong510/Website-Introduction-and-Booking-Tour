const apiUrl = "http://127.0.0.1:5001/";

var res
const fullname = document.getElementById('fullname')
const phonenumber = document.getElementById('phonenumber')
const email = document.getElementById('email')
const address = document.getElementById('address')
const save = document.getElementById("save")
const back = document.getElementById('back')
//---- load
window.onload = function() {
    
    if(window.sessionStorage.getItem("Info") !== "Put")
    {
        back.style.display = 'none';
    }
    ShowData()
};
//---- event
save.addEventListener('click', SaveData)
async function SaveData(event){
    event.preventDefault()
    SaveData()
}

//----------- show data
async function ShowData() {
    var resp
    const result = await fetch(`${apiUrl}api/userinfos/get`, {
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
            fullname.value = resp.infos[0].fullname
            phonenumber.value = resp.infos[0].phonenumber
            email.value = resp.infos[0].email
            address.value = resp.infos[0].address   
        }    
          
}
//----------- save data
async function SaveData() {
    //--Xử lý nhập liệu
    if (fullname.value === '') {
        alert('Họ và tên không được để trống');
        return false;
    }
    var nameRegex =  /^[\p{L}\s]+$/u;
    if (!nameRegex.test(fullname.value)) {
        alert('Họ và tên không hợp lệ');
        return false;
    }
    var phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phonenumber.value)) {
        alert('Số điện thoại không hợp lệ');
        return false;
    }
    if (phonenumber.value === '') {
        alert('Số điện thoại không được để trống');
        return false;
    }
    // Kiểm tra định dạng email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      alert('Địa chỉ email không hợp lệ');
      return false;
    }
    if (address.value === '') {
      alert('Địa chỉ không được để trống');
      return false;
    }
    var resp
    const data = {
        fullname: fullname.value,
        phonenumber: phonenumber.value,
        email: email.value,
        address: address.value 
      };
    if(window.sessionStorage.getItem("Info") !== "Put")
    {
        const result = await fetch(`${apiUrl}api/userinfos/post`, {
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
            window.sessionStorage.setItem("Info", "Put");
            window.sessionStorage.setItem("fullname", fullname.value);
            alert("Tạo Thông Tin Thành Công")
            back.style.display = 'inline-block';
           // window.location = "http://127.0.0.1:5501/FE/home/index.html"
        }      
    }
    else
    {
        const result = await fetch(`${apiUrl}api/userinfos/put`, {
            method: 'PUT',
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
            alert("Cập Nhật Thông Tin Thành Công")
            window.sessionStorage.setItem("fullname", fullname.value);
            //window.location = "http://127.0.0.1:5501/FE/home/index.html" 
        }      
    }
          
}
const apiUrl = "http://127.0.0.1:5001/";
// import { apiUrl } from "./environment.js";


const form = document.getElementById('reg-form')
form.addEventListener('submit', registerUser)
async function registerUser(event){
    event.preventDefault()
    const username = document.getElementById('username')
    const password = document.getElementById('password')
    // Xử lý nhập liệu
    // Ngăn chặn các ký tự đặc biệt có thể gây ra SQL Injection hoặc một số tấn công khác
    var regex = /['";\\]/
    if (regex.test(username.value)) {
        alert("Username không được chứa các ký tự cấm!")
        return
    }
    if (regex.test(password.value)) {
        alert("Password không được chứa các ký tự cấm!")
        return
    }
    const data = {
        username: username.value,
        password: password.value
      };
    var resp
    const result = await fetch(`${apiUrl}api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => { resp = data;})
    .catch(error => { console.error('Error:', error);});

    if (resp.success === true){
        username.value = ""
        password.value = ""
        alert("Đăng Ký Thành Công")
    }
}
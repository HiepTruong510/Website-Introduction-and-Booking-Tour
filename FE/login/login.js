const apiUrl = "http://127.0.0.1:5001/";
//console.log('Got the token1')
const form = document.getElementById('login-form-container')
form.addEventListener('submit', login)

//CRUD - Create Retrieve Update Delete - Post Get Put Delete
async function login(event){
    event.preventDefault()
    const username = document.getElementById('username')
    const password = document.getElementById('password')
    const data = {
        // Xử lý nhập liệu
        // Loại bỏ các ký tự đặc biệt có thể gây ra SQL Injection hoặc một số tấn công khác
        username: username.value.replace(/['";\\]/g, " "),
        password: password.value.replace(/['";\\]/g, " ")
      };
    var resp
    const result = await fetch(`${apiUrl}api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => { resp = data;})
    .catch(error => { console.error('Error:', error);});

    if (resp.success === true){
        window.sessionStorage.setItem("id_user", resp.accessToken);
        // lấy và ktra permission
        var resp1
        const result1 = await fetch(`${apiUrl}api/userinfos/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + resp.accessToken
            }
        })
        .then(response => response.json())
        .then(data => { resp1 = data;})
        .catch(error => { console.error('Error:', error);});

        if (resp1.success === true)
        {   
            try {
                if ((resp1.infos[0].permission).length !== 0)
                {
                   if(resp1.infos[0].permission === "quanly")
                   {
                        window.location = "http://127.0.0.1:5501/FE/admin/index.html"
                   }
                   else{
                        window.sessionStorage.setItem("permission", resp1.infos[0].permission);
                        window.sessionStorage.setItem("fullname", resp1.infos[0].fullname);
                        window.sessionStorage.setItem("Info", "Put");
                        window.location = "http://127.0.0.1:5501/FE/home/index.html"
                   }
                }
                else
                    window.location = "http://127.0.0.1:5501/FE/home/info-user.html"
            } catch (error) {
                window.location = "http://127.0.0.1:5501/FE/home/info-user.html"
            }
           
            
        }
    }
    else {
        //alert('Đăng nhập thất bại')
        document.getElementById('message').innerHTML = "Đăng nhập thất bại"
    }   
}   

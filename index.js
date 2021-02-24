const dashboardAlert = document.getElementById('dashboard__alert')
const emailInput = document.getElementById('email')  
const passInput = document.getElementById('password')
const logIn = document.getElementById('login')
const admin = 'umesh@admin.com'
const loginAuth = JSON.parse(localStorage.getItem('auth'))

dashboardAlert.style.display='none';

logIn.addEventListener('click', ()=>{
    let emailId = emailInput.value;
    let password = passInput.value;
    
    if(!emailId){
        dashboardAlert.innerHTML=`Admin Id : umesh@admin.com <br> Password : password not required`
        return dashboardAlert.style.display='block';
    }

    if(emailId==admin){
        open('./dashboard.html', '_self')
        return;
    }
    
    if(loginAuth===null){
        console.log('no data exist')
        dashboardAlert.innerHTML=`Admin Id : umesh@admin.com <br> Password : password not required`
        return dashboardAlert.style.display='block';
    }else{
        let arr = loginAuth.userId.email;
        let idx;
        for(let i=0; i<arr.length; i++){
            if(arr[i] === emailId) idx=i;
        }
        if(isNaN(idx)){
            console.log('emailid does not exist')
            dashboardAlert.innerHTML=`Error! Email Id does not exist`
            return dashboardAlert.style.display='block';
        };
        if(password==loginAuth.userId.pass[idx]){
            let username = loginAuth.userName[idx]
            localStorage.setItem('user', JSON.stringify(username))
            open('./voting.html', '_self');
        }
        dashboardAlert.innerHTML=`Error! password is incorrect`
        dashboardAlert.style.display='block';
    }
    // console.log(emailId, password,arr,idx, loginAuth)
    
})


const dashboardAlert = document.getElementById('dashboard__alert')
const addParty = document.getElementById('add__party')
const voterBtn = document.getElementById('voter__btn')
const partyList = document.getElementById('party__list')
const partyName = document.getElementById('party__name')
const voterEmail = document.getElementById('voter__email')
const voterName = document.getElementById('voter__name')
const winnerParty = document.getElementById('winner')
const resetBtn = document.getElementById('reset')

dashboardAlert.style.display = 'none';

const tableHeading = `<tr id='table__head' class="table-info">
                                <th scope="col">Sno</th>
                                <th scope="col">Name</th>
                                <th scope="col">Vote</th>
                                <th scope="col">Action</th>
                            </tr>`;

let store = {
    party: [],
    vote: []
};
let auth = {
    admin : 'umesh@admin.com',
    userId : {
        email: [],
        pass: []
    },
    userName : []
}

addParty.addEventListener('click', () => {
    let x = partyName.value.toUpperCase();
    if (!x) return;
    let storeLocal = JSON.parse(localStorage.getItem('store'));
    if (storeLocal === null) storeLocal = store;
    let len = storeLocal.party.length;
    let setArr = [...storeLocal.party, x]
    store.party = setArr.filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
    })
    console.log(store)
    localStorage.setItem('store', JSON.stringify(store))
    let lastEle = store.party[store.party.length - 1]
    let length = store.party.length
    if(length > len) {
        partyList.innerHTML +=
            `<td>${length}</td><td>${lastEle}</td><td class="counts" id="count">0</td><td><button type="button" id=${lastEle} onClick="removeParty(this.id)" class="btn btn-primary">REMOVE</button></td>`;
    }
    partyName.value = "";
    dashboardAlert.innerText = "New record created successfully"
    dashboardAlert.style.display = 'block';
})

const tableList = () => {
    let storeLocal = JSON.parse(localStorage.getItem('store'));
    console.log(storeLocal)
    if (storeLocal === null) return;
    const { party, vote } = storeLocal;
    party.forEach((ele, idx) => {
        partyList.innerHTML +=
        `<td>${idx + 1}</td><td>${ele}</td><td id='count'>0</td><td><button type="button" id=${ele} onClick="removeParty(this.id)" class="btn btn-primary">REMOVE</button></td>`;
    })
    
    if(!(typeof(vote[0])==='string')) return; 
    voteCount(vote)
}


const removeParty= (id) => {
    partyList.innerHTML = tableHeading;
    let store = JSON.parse(localStorage.getItem('store'));
    let index = store.party.indexOf(id)
    store.party.splice(index, 1)
    let b = store.vote.filter((ele) => {
        return ele !== id;
    } ) 
    store.vote = b
    localStorage.setItem('store', JSON.stringify(store))
    dashboardAlert.innerText="Party removed successfully"
    dashboardAlert.style.display='block';
    tableList();
};

resetBtn.addEventListener('click', ()=> {
    let store = JSON.parse(localStorage.getItem('store'));   
    if(store===null) return;
    store.vote = [];
    localStorage.setItem('store', JSON.stringify(store))
    let y = document.querySelectorAll('[id=count]');
    for(let i = 0; i < y.length; i++) {
        y[i].innerText = '0';
    }
    winnerParty.innerHTML= '';
    dashboardAlert.innerHTML= `voting counts are now reset`;
    dashboardAlert.style.display='block';
})

const voteCount = (array) => {
    let count = {};
    array.forEach(item => {
        if (count[item]){
            count[item] += 1;
            return
        } count[item] = 1
    })
    for(let prop in count){
        document.getElementById(`${prop}`).parentElement.previousElementSibling.innerText= count[prop]  
    }   
}

tableList();




function winner () {
    let storeLocal = JSON.parse(localStorage.getItem('store'));
    if (storeLocal === null) return;
    const { party, vote } = storeLocal;
    if (typeof(vote[0]) == 'undefined') return console.log('bye');
    let arr1 = vote;
    let mf = 1;
    let m = 0;
    let item;
    for(let i=0; i<arr1.length; i++ ) {
        for(let j=i; j<arr1.length; j++) {
            if(arr1[i]==arr1[j]) m++;
            if(mf<=m) {
                mf = m;
                item = arr1[i];
            }
        }
        m=0
    }
    winnerParty.innerHTML=`<h5>${item} ${mf} votes</h5>`
}

winner();



voterBtn.addEventListener('click', ()=>{
    let authLocal = JSON.parse(localStorage.getItem('auth'));
    if (authLocal === null) authLocal = auth;
    let password = ('' + Math.random()).substring(2, 6);
    let email = voterEmail.value;
    if(!email.includes('@')) {
        dashboardAlert.innerHTML= `Email not valid`;
        dashboardAlert.style.display='block';
        return
    }
    let name = voterName.value;
    let add = document.getElementById('add')
    let remove = document.getElementById('remove')
    let check;
    if(add.checked) check = 'add';
    if(remove.checked) check = 'remove';
    if (email=='' || name=='' || check === undefined ) {
        dashboardAlert.innerHTML= `To add/romove Voter <br/> All feilds of form are requried`;
        dashboardAlert.style.display='block';
        return
    }
 
    const eArr = authLocal.userId.email;
    console.log(eArr)

    let idx;
    for(let i=0; i<eArr.length; i++){
        if(eArr[i] === email) idx=i;
    }

    console.log(isNaN(idx))
    console.log(idx, email)
    if(check==='add'){
        if(!isNaN(idx)){
            dashboardAlert.innerHTML='voter already exist'
            dashboardAlert.style.display='block';
            return console.log('emailid exist')
        } 
        authLocal.userId.email.push(email);   
        authLocal.userId.pass.push(password);
        authLocal.userName.push(name);
        dashboardAlert.innerHTML= `New Voter added successfully <br/> And password is ${password}`;
        dashboardAlert.style.display='block';
    }
    
    if(check==='remove'){
        console.log(idx)
        if(isNaN(idx)){
            dashboardAlert.innerHTML='voter does not exist'
            dashboardAlert.style.display='block';
            return console.log('emailid does not exist');
        }
        authLocal.userId.email.splice(idx,1);
        authLocal.userId.pass.splice(idx,1);
        authLocal.userName.splice(idx,1);
        dashboardAlert.innerHTML= `Voter removed successfully`;
        dashboardAlert.style.display='block';
        console.log('emailid removed')
    }

    localStorage.setItem('auth', JSON.stringify(authLocal))
    console.log(email, password, name, check, authLocal);
})

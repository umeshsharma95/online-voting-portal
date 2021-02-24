const voteBtn = document.getElementById('vote')
const votingAlert = document.getElementById('voting__alert')
const votingOption = document.getElementById('voting__option')
const partyList = document.getElementById('party__list')
const voterName = document.getElementById('voter');
votingAlert.style.display = "none";

const user = JSON.parse(localStorage.getItem('user'))
let username = user
voterName.innerText= `Hi ${user}`

voteBtn.addEventListener('click', ()=>{
    votingAlert.style.display = "block";
    votingOption.style.display="none";
    let v = voting();
    let voteArr = [...data.vote, v];
    data.vote = voteArr
    localStorage.setItem('store', JSON.stringify(data))
});


const data = JSON.parse(localStorage.getItem('store'))
console.log(data);

if (data === null || (typeof(data.party[0]) == 'undefined')) {
    votingOption.style.display='none'
}

(data===null ) ? '' : data.party.forEach(ele => {
    partyList.innerHTML +=`<div class="form-check border-bottom p-3">
        <input class="form-check-input ms-2" type="radio" name="radio" value=${ele} id=${ele}>
        <label class="form-check-label" for=${ele}>
            ${ele}
        </label>
    </div>`
})

const voting = () => {
    let radio = document.getElementsByName('radio')
    for(let i = 0; i < radio.length; i++) { 
        if(radio[i].checked) return radio[i].value;            
    }
}
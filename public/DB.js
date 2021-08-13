
let DB;
let Budget;
//create db request
const request = window.indexedDB.open("budDb", Budget||1);
request.onupgradeneeded = function (event) {
    const {old} = event;
    const newV = event.newV || DB.version;
    DB = event.target.result
    DB.createObjectStore('new_transaction',{autoIncrament:true})
}
//handle request
request.onsuccess = function(event){
    DB = event.target.result;
    if(navigator.onLine){
        checkDatabase();
    }
}

//need to send data to backend
function saveRecord (record ){
    const transaction = db.transaction(["new_budget"], "readwrite")
    const budgetObjectS = transaction.objectStore("new_budget")
    budgetObjectS.add(record)
}
//need to open transaction
function openTransaction(){
    const transaction = db.transaction(["new_budget"], "readwrite")
    const budgetObjectS = transaction.objectStore("new_budget")
    const getAll = budgetObjectS.getAll();

    getAll.onsuccess = function(){
        if(getAll.result.length > 0){
            fetch('/api/transaction/bulk',{
                method:"POST",
                body: JSON.stringify(getAll.result),
                headers:{
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                }
            })
            .then(response => response.json())
            .then(serverResponse)



        }
    }
}
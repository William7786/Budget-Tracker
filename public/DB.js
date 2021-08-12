const { request } = require("express");

let DB;
let Budget;
//create db request
const req = window.indexedDB.open("budDb", Budget||1)
request.onupgradeneeded = (event){
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

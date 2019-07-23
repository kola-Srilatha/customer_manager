import config from "./config.js";
 
export function saveCustomer(post) {
 return fetch(`${config.endpoint}/customers`, {
 method: "POST",
 body: JSON.stringify(post),
 headers: {
 "Content-Type": "application/json"
 }
 }).then(res => res.json());
 }
 
 export function getCustomer() {
 fetch(`${config.endpoint}/customers`)
 .then(function (response) {
 return response.json();
 })
 .then(function (data) {
 addingData(data);
 });
 
  function addingData(data) {
 //extract the headers and save in col array
 if(data.length> 0 ){
 var col = [];
 if(data.length>=0){
 for (var i = 0; i < data.length; i++) {
 for (var key in data[i]) {
 if (col.indexOf(key) === -1) {
 col.push(key);
 }
 }
 }
}

 
 // to create dynamic table
 var table = document.createElement("table");
 table.setAttribute('id', 'table');
 
 // to create table header using col array
 
 var tr = table.insertRow(-1); 
 
  for (var i = 0; i < col.length; i++) {
 var th = document.createElement("th"); //for table header
 th.innerHTML = col[i];//adding col data to header
 tr.appendChild(th);}//addding header to row
 var th = document.createElement("th");
 th.innerHTML="DELETE";
 tr.appendChild(th);
  
 // adding json data to rows
 for (var i = 0; i < data.length; i++) {
 
 tr = table.insertRow(-1);
 
 for (var j = 0; j < col.length; j++) {
 var tabCell = tr.insertCell(-1);
 tabCell.innerHTML = data[i][col[j]];
 
 
 }
 var cell = tr.insertCell(-1);
 var btnRemove = document.createElement("input");
 btnRemove.type = "button";
 btnRemove.value = "DELETE";
 
 btnRemove.onclick= function() { //delete operation performing onclick
 var tab = document.getElementById('table');
console.log("printing"+this.parentNode.parentNode.rowIndex);
 var delval= this.parentNode.parentNode.rowIndex;
 
 console.log(data[delval-1].id)
 
 var delid=data[delval-1].id;//deleting data from database
 
 //console.log(data)
 
 
 tab.deleteRow(this.parentNode.parentNode.rowIndex); //deleting data from table
 console.log(`${config.endpoint}/customers/${delid}`)
 
 return fetch(`${config.endpoint}/customers/${delid}` , {
 method: 'delete'
 }) .then(r=> r.json())
 }
 cell.appendChild(btnRemove); 
 
}
 // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
 var divContainer = document.getElementById("Display");
 divContainer.innerHTML = "";
 divContainer.appendChild(table);
 }

else 
document.getElementById("Display").innerHTML = "No Data Available";
  alert("unavailable");

 }
}
let requests =
JSON.parse(
localStorage.getItem("requests")
) || [];

let adminRequests =
document.getElementById("adminRequests");

let total =
requests.length;

let pending =
requests.filter(
r => r.status === "Pending"
).length;

let completed =
requests.filter(
r => r.status === "Completed"
).length;


// Dashboard Numbers

document.getElementById("total")
.innerHTML = total;

document.getElementById("pending")
.innerHTML = pending;

document.getElementById("completed")
.innerHTML = completed;


// Efficiency

let efficiency = 0;

if(total > 0){

efficiency =
Math.round(
(completed / total) * 100
);

}

document.getElementById("efficiency")
.innerHTML =
efficiency + "%";


// AI Recommendation

let suggestion = "";

if(pending > 10){

suggestion =
"🚛 High request volume detected. Deploy extra collection vehicles.";

}

else if(pending > 5){

suggestion =
"📈 Moderate load. Increase collection frequency tomorrow.";

}

else if(pending > 0){

suggestion =
"✅ Current resources are sufficient for today's pickups.";

}

else{

suggestion =
"🎉 All pickup requests have been completed.";

}

document.getElementById(
"aiSuggestion"
).innerHTML =
suggestion;


// Display Requests

function loadRequests(){

adminRequests.innerHTML = "";

requests.forEach((request,index)=>{

let statusClass = "";

if(request.status === "Pending"){

statusClass = "pending";

}
else if(request.status === "In Progress"){

statusClass = "progress";

}
else{

statusClass = "completed";

}

adminRequests.innerHTML += `

<div class="request-card">

<h3>${request.name}</h3>

<p><b>House:</b> ${request.house}</p>

<p><b>Street:</b> ${request.street}</p>

<p><b>Waste:</b> ${request.waste}</p>

<p><b>Date:</b> ${request.date}</p>

<p class="${statusClass}">
Status: ${request.status}
</p>

<button onclick="startPickup(${index})">
🚛 Start Pickup
</button>

<br><br>

<button onclick="completePickup(${index})">
✅ Complete Pickup
</button>

</div>

`;

});

}

loadRequests();


// Start Pickup

function startPickup(index){

requests[index].status =
"In Progress";

localStorage.setItem(
"requests",
JSON.stringify(requests)
);

location.reload();

}


// Complete Pickup

function completePickup(index){

requests[index].status =
"Completed";

localStorage.setItem(
"requests",
JSON.stringify(requests)
);

location.reload();

}

function showError(message) {console.log(message);}
function getPersons(callback)
{
    fetch("http://localhost:8080/person", {
        headers: {
            "Content-Type": "application/json"},
        method: "get",
    }).then((response) => {
        if (response.status === 200) return response.json();
    }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("Admin get persons fail");
        callback(null, response.status, response);
    });
}

function insertPerson(user, callback)
{
    fetch("http://localhost:8080/person", {
        headers: {
            "Content-Type": "application/json"},
        method: "post",
        body: JSON.stringify({"username" : user.name, "userPassword": user.pass, "rol": user.rol})
    })
        .then((response) => {
            if (response.status === 201) return response.text();
        }).then((response) => {
        callback(response, response.status, null);
        }).catch((response)=>{
        showError("Admin insert persons fail");
        callback(null, response.status, response);
        });
}

function deletePerson(userId, callback)
{
    fetch("http://localhost:8080/person/" + userId, {
        headers: {
            "Content-Type": "application/json"},
        method: "delete",
    })
        .then((response) => {
            if (response.status === 200) return response.text();
        }).then((response) => {
        callback(response, response.status, null);
        }).catch((response)=>{
        showError("Admin delete persons fail");
        callback(null, response.status, response);
    });
}

function updatePerson(user, callback)
{
    fetch("http://localhost:8080/person/" + user.id, {
        headers: {
            "Content-Type": "application/json"},
        method: "put",
        body: JSON.stringify(user)
    })
        .then((response) => {
            if (response.status === 200) return response.text();
        }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("Admin update persons fail");
        callback(null, response.status, response);
    });
}

function getDevices(callback)
{
    fetch("http://localhost:8080/device", {
        headers: {
            "Content-Type": "application/json"},
        method: "get",
    }).then((response) => {
        if (response.status === 200) return response.json();
    }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("Admin get devices fail");
        callback(null, response.status, response);
    });
}

function insertDevice(device, callback)
{
    fetch("http://localhost:8080/device", {
        headers: {
            "Content-Type": "application/json"},
        method: "post",
        body: JSON.stringify({"person" : device.owner,
            "description": device.desc, "address": device.addr, "consumption": device.consume})
    })
        .then((response) => {
            if (response.status === 201) return response.text();
        }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("Add device fail");
        callback(null, response.status, response);
    });
}

function deleteDevice(deviceId, callback)
{
    fetch("http://localhost:8080/device/" + deviceId, {
        headers: {
            "Content-Type": "application/json"},
        method: "delete",
    })
        .then((response) => {
            if (response.status === 200) return response.text();
        }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("Admin delete device fail");
        callback(null, response.status, response);
    });
}

function updateDevice(device, callback)
{
    fetch("http://localhost:8080/device/" + device, {
        headers: {
            "Content-Type": "application/json"},
        method: "put",
        body: JSON.stringify(device)
    })
        .then((response) => {
            if (response.status === 200) return response.text();
        }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("Admin update delete fail");
        callback(null, response.status, response);
    });
}

export {
    getDevices,
    insertDevice,
    deletePerson,
    insertPerson,
    getPersons,
    deleteDevice,
    updatePerson,
    updateDevice
};
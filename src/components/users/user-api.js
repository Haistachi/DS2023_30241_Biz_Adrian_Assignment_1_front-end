function showError(message) {console.log(message);}

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
        showError("User get devices fail");
        callback(null, response.status, response);
    });
}

function findOwnerDevices(owner, callback)
{
    fetch("http://localhost:8080/device/" + owner, {
        headers: {
            "Content-Type": "application/json"},
        method: "get",
    }).then((response) => {
            if (response.status === 200) return response.json();
    }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("User get his devices fail");
        callback(null, response.status, response);
    });
}

function findDeviceActive(idDevice, date, callback)
{
    fetch("http://localhost:8080/active/" + idDevice + "/" + date.toISOString().split("T")[0], {
        headers: {
            "Content-Type": "application/json"},
        method: "get",
    }).then((response) => {
        if (response.status === 200) return response.text();
    }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("User get active fail");
        callback(null, response.status, response);
    });
}

export {
    getDevices,
    findOwnerDevices,
    findDeviceActive
};
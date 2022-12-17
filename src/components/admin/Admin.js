import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import table from "../../commons/tables/table";
import {
    deleteDevice,
    deletePerson,
    getDevices,
    getPersons,
    insertDevice,
    insertPerson, updateDevice,
    updatePerson
} from "./admin-api";
function Admin()
{
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [rol, setRol] = useState("");
    const [persons, setPersons] = useState([]);
    const [devices, setDevices] = useState([]);
    const [idPerson, setIdPerson] = useState("");
    const [pagePersons, setPagePersons]= useState(0);
    const [pageDevice, setPageDevice]= useState(0);
    const [idDevice, setIdDevice] = useState("");
    const [owner, setOwner] = useState("");
    const [desc, setDesc] = useState("");
    const [addr, setAddr] = useState("");
    const [consume, setConsume] = useState("");
    function createUser(){
        console.log(name, pass, rol);
        insertPerson({name, pass, rol}, (res, stat, err)=>{if(err) console.log(err);})
        getPersons((res, stat, err)=>{if(err) console.log(err);
        else
            setPersons(res);
        });
    }
    function deleteUser(){
        deletePerson(idPerson, (res, stat, err)=>{if(err) console.log(err);});
        getPersons((res, stat, err)=>{if(err) console.log(err);
        else
            setPersons(res);
        });
    }
    function updateUser(){
        console.log(idPerson);
        updatePerson({id: idPerson, username: name, userPassword: pass, rol: rol},
            (res, stat, err)=>{if(err) console.log(err);});
        getPersons((res, stat, err)=>{if(err) console.log(err);
        else
            setPersons(res);
        });
    }
    function createDevice(){
        console.log(owner, desc, addr, consume);
        insertDevice({owner, desc, addr, consume}, (res, stat, err)=>{if(err) console.log(err);})
        getDevices((res, stat, err)=>{if(err) console.log(err);
        else
            setDevices(res);
        });
    }
    function deleteDeviceB(){
        console.log(idDevice);
        deleteDevice(idDevice, (res, stat, err)=>{if(err) console.log(err);});
        getDevices((res, stat, err)=>{if(err) console.log(err);
        else
            setDevices(res);
        });
    }
    function updateDeviceB(){
        console.log(idDevice);
        updateDevice({id: idDevice, person: owner, description: desc, address: addr, consumption: consume},
            (res, stat, err)=>{if(err) console.log(err);});
        getDevices((res, stat, err)=>{if(err) console.log(err);
        else
            setDevices(res);
        });
    }
    function addOwner() {setOwner(idPerson);}
    function showError(message) {console.log(message); return(navigate("/error"));}
    function delog() { localStorage.clear(); return(navigate("/"));}
    const onBackPersons=()=>{setPagePersons(pagePersons -1 >-1 ? pagePersons-1:pagePersons)}
    const onNextPersons=()=>{setPagePersons(pagePersons +1 < persons.length/10 ? pagePersons+1:pagePersons)}
    const onBackDevice=()=>{setPageDevice(pageDevice -1 >-1 ? pageDevice-1:pageDevice)}
    const onNextDevice=()=>{setPageDevice(pageDevice +1 < devices.length/10 ? pageDevice+1:pageDevice)}
     useEffect(
        ()=>{
            if(localStorage.getItem("rol") !== "admin")
                return(showError("Only admin role allowed!"));

            getPersons((res, stat, err)=>{if(err) console.log(err);
            else setPersons(res);});
            getDevices((res, stat, err)=>{if(err) console.log(err);
            else setDevices(res);});
            }, [])

    return(<div><h1>Bine ai venit admin {localStorage.getItem("user")}</h1>
        <div>
            <h2>Users</h2>
            <div> <label htmlFor={"name"}>Name</label>
                <input value={name} type={"name"} placeholder={"your_name"} id={"name"} name={"name"} onChange={(e)=>setName(e.target.value)}></input>
                <label htmlFor={"pass"}>Pass</label>
                <input value={pass} type={"pass"} placeholder={"your_pass"} id={"pass"} name={"pass"} onChange={(e)=>setPass(e.target.value)}></input>
                <label htmlFor={"rol"}>Role</label>
                <input value={rol} type={"rol"} placeholder={"your_rol"} id={"rol"} name={"rol"} onChange={(e)=>setRol(e.target.value)}></input>
            </div>
            <div className="Button" ><button onClick={createUser}>Create</button></div>
            <div className="Button" ><button onClick={deleteUser}>Delete</button></div>
            <div className="Button" ><button onClick={updateUser}>Update</button></div>
        </div>
        {persons && <div style={{width: "50%", boxShadow: "3px 6px 3px #ccc"}}>
            <table cellSpacing={"0"}
                   style={{width: "100%", height: "auto", padding: "5px 10 px"}}>
            <thead><tr>
                <th>User</th>
                <th>Pass</th>
                <th>Rol</th>
            </tr></thead>
            <tbody>{persons.slice(10 * pagePersons, 10*pagePersons+10).map((person)=>{return(<tr key={person.id} onClick={()=>setIdPerson(person.id)}>
                <td>{person.username}</td>
                <td>{person.userPassword}</td>
                <td>{person.rol}</td>
            </tr>)})}</tbody>
            <tfoot><tr><td></td>
            <td style={{padding: "10px 0"}}>
                <button onClick={onBackPersons}>Back</button>
                <label style={{padding: "0 lem"}}>{pagePersons+1}</label>
                <button onClick={onNextPersons}>Next</button>
            </td></tr></tfoot>
        </table> </div>}

        <div>
            <h2>Devices</h2>
            <div> <label htmlFor={"owner"}>Owner</label>
                <input value={owner} type={"owner"} placeholder={"owner_id"} id={"owner"} name={"owner"} onChange={(e)=>setOwner(e.target.value)}></input>
                <label htmlFor={"desc"}>Description</label>
                <input value={desc} type={"desc"} placeholder={"desc_device"} id={"desc"} name={"desc"} onChange={(e)=>setDesc(e.target.value)}></input>
                <label htmlFor={"addr"}>Address</label>
                <input value={addr} type={"addr"} placeholder={"addr"} id={"addr"} name={"addr"} onChange={(e)=>setAddr(e.target.value)}></input>
                <label htmlFor={"consume"}>Consumption</label>
                <input value={consume} type={"consume"} placeholder={"consume"} id={"consume"} name={"consume"} onChange={(e)=>setConsume(e.target.value)}></input>
            </div>
            <div className="Button" ><button onClick={addOwner}>addOwner</button></div>
            <div className="Button" ><button onClick={createDevice}>Create</button></div>
            <div className="Button" ><button onClick={deleteDeviceB}>Delete</button></div>
            <div className="Button" ><button onClick={updateDeviceB}>Update</button></div>
        </div>
        {devices && <div style={{width: "50%", boxShadow: "3px 6px 3px #ccc"}}>  <table cellSpacing={"0"}
                                                                                        style={{width: "100%", height: "auto", padding: "5px 10 px"}}>
            <thead><tr>
                <th>Person</th>
                <th>Description</th>
                <th>Adress</th>
                <th>Consumption</th>
            </tr></thead>
            <tbody>{devices.slice(10 * pageDevice, 10*pageDevice+10).map((device)=>{return(<tr key={device.id} onClick={()=>setIdDevice(device.id)}>
                <td>{device.person}</td>
                <td>{device.description}</td>
                <td>{device.address}</td>
                <td>{device.consumption}</td>
            </tr>)})}</tbody>
            <tfoot>
            <tr><td></td>
                <td style={{padding: "10px 0"}}>
                    <button onClick={onBackDevice}>Back</button>
                    <label style={{padding: "0 lem"}}>{pageDevice+1}</label>
                    <button onClick={onNextDevice}>Next</button>
                </td></tr>
            </tfoot>

        </table> </div>}
        <div className="Button" ><button onClick={delog}>Delog</button></div>
    </div>);
}
export default Admin;
import React, { useEffect, useState } from 'react'
import toast from "../utils/toast";
import { useHistory } from 'react-router-dom';

function login() {
    const[email,setemail]=useState("");
    const[password,setpass]=useState("");

    const history=useHistory();
    useEffect(()=>{
        if(localStorage.getItem('set-infoo'))
        {
            history.push("/admin/dashboard");
        }
    },[])
    async function login()
    {
        if(email!="" && password!="")
        {
            let item={email,password};
            let result=await fetch("http://localhost:8000/api/login",{
                method:"POST",
                body:JSON.stringify(item),
                headers:{
                    "Content-Type":'application/json',
                    "Accept":'application/json'
                }
            })
             result=await result.json();
             console.log(result);
             if(result.error=="true")
             {

                toast.error(result.message);
             
             }
             else
             {
                toast.success("login Successfully");
                localStorage.setItem("set-infoo",JSON.stringify(result))
                history.push("/admin/dashboard");
                
             }
           
        }
        
    }
    return (
        <div>
            
            <div className="col-sm-6 offset-sm-3">
            <h1>Login Page</h1>
            <input  type="text" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="email" 
            className="form-control"/>
            <br/>
            <input  type="password" value={password} onChange={(e)=>setpass(e.target.value)} placeholder="password" 
            className="form-control"/>
            <br/>
            <button className="btn btn-primary" onClick={login}>Login</button>
        </div>
        </div>
    )
}

export default login

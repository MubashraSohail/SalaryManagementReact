import { post } from 'jquery';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import toast from "../utils/toast";
const register=()=>{
    const [name,setname]=useState("");
    const [password,setPass]=useState("");
    const [email,setemail]=useState("");
    const history=useHistory();
    async function signUp()
    {
        if(name!=""&&password!=""&&email!="")
        {
            let item={name,password,email};
            console.log(item);
            let result= await fetch("http://localhost:8000/api/register",{
                method:"POST",
                body:JSON.stringify(item),
                headers:{
                    "Content-Type":'application/json',
                    "Accept":'application/json'
                }
            })
            result=await result.json();
            if(result.error=="false")
            {
                toast.success(result.message);
            }
            else
            {
                toast.error(result.message);
            }
            console.log(result);
        }
    }
    return(
        <div className="col-sm-6 offset-sm-3">
        <h1>Register Page</h1>
        <input type="text" value={name} onChange={(e)=>setname(e.target.value)} className="form-control" 
        placeholder="name"/>
        <br/>
        <input type="text" vale={email} onChange={(e)=>setemail(e.target.value)} className="form-control" 
        placeholder="email"/>
          <br/>
         <input type="password" value={password} onChange={(e)=>setPass(e.target.value)} className="form-control" 
        placeholder="password"/>
              <br/>
        <button className="btn btn-primary" onClick={signUp}>Sign Up</button>
        {' '}
        <Link to="/login"><button className="btn btn-primary">Sign In</button></Link>
       <br/>
        </div>
    )
}
export default register;

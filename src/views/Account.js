import React, { useEffect, useState } from "react";
import toast from "../utils/toast";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useHistory,Link } from "react-router-dom";

function Account() {
  const [data,setdata]=useState([]);
  const history = useHistory();
  useEffect(()=>{
    fetch("http://localhost:8000/api/showbank")
    .then((response) =>{ response.json().then((resp)=>{
      setdata(resp)
    })})
  },[])
  function selectUser(id)
  {
    console.log(id);
    history.push(`/editbank/${id}`);
  }
  function addamount(id)
  {
    console.log(id);
    history.push(`/addAmount/${id}`);
  }
  async function deletebank(id)
  {
    let item={id};
    let result=await fetch("http://localhost:8000/api/deletebank",{
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
         window.location.reload();
     }
     else
     {
         toast.error(result.message);
     }
   console.log("result"+result.message);
  
  }

  console.log(data);
  
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">List of Banks</Card.Title>
                <Link to="/addBank"><Button className="btn btn-primary  offset-sm-10">Add Bank</Button></Link>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Bank Name</th>
                      <th className="border-0">Account no </th>
                      <th className="border-0">Bank Branch</th>
                      <th className="border-0">Total Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                  {data.map((item)=>
                  <tr>
                  <td>{item.bank_name}</td>
                  <td>{item.account_no}</td>
                  <td>{item.bank_branch}</td>
                  <td>{item.total_balance}</td>
                  <td><Button className="btn btn-success"  onClick={()=>selectUser(item.id)}>Edit</Button></td>
                  <td><Button className="btn btn-danger" onClick={()=>deletebank(item.id)}>Delete</Button></td>
                  <td><Button className="btn btn-primary" onClick={()=>addamount(item.id)}>Deposit Money</Button></td>
                </tr>
                  )}
                
    
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
    
        </Row>
      </Container>
   
    </>
  );
}

export default Account;

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

function TableList() {
  const [data,setdata]=useState([]);
  const history = useHistory();
  useEffect(()=>{
    fetch("http://localhost:8000/api/showEmployee")
    .then((response) =>{ response.json().then((resp)=>{
      setdata(resp)
    })})
  },[])
  function selectUser(id)
  {
    console.log(id);
    history.push(`/editEmployee/${id}`);
  }
  async function deleteUser(id)
  {
    let item={id};
    let result=await fetch("http://localhost:8000/api/delete",{
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
                <Card.Title as="h4">List of Employees</Card.Title>
                <Link to="/addEmployee"><Button className="btn btn-primary  offset-sm-10">Add Employee</Button></Link>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Name</th>
                      <th className="border-0">Last Name </th>
                      <th className="border-0">CNIC</th>
                      <th className="border-0">Postion</th>
                      <th className="border-0">City</th>
                      <th className="border-0">Address</th>
                    </tr>
                  </thead>
                  <tbody>
                  {data.map((item)=>
                  <tr>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.cnic}</td>
                  <td>{item.position}</td>
                  <td>{item.city}</td>
                  <td>{item.address}</td>
                  <td><Button className="btn btn-success"  onClick={()=>selectUser(item.id)}>Edit</Button></td>
                  <td><Button className="btn btn-danger" onClick={()=>deleteUser(item.id)}>Delete</Button></td>
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

export default TableList;

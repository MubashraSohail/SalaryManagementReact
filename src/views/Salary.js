import React, { useEffect, useState } from "react";
import { Checkbox } from "react-bootstrap";

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
  InputGroup,
  Form,
  Col,
} from "react-bootstrap";
import { useHistory,Link } from "react-router-dom";

function TableList() {
  const [data,setdata]=useState([]);
  const [employeeid,setemployeeid]=useState("");
  const history = useHistory();
  useEffect(()=>{
    fetch("http://localhost:8000/api/showEmployee")
    .then((response) =>{ response.json().then((resp)=>{
      setdata(resp)
    })})
  },[])
  function selectUser()
  {
    console.log(employeeid);
    history.push(`/salaryAccount/${employeeid}`);
  }

  
  
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Select Employee</Card.Title>
                <Link to="/salaryHistory"><Button className="btn btn-primary  offset-sm-10">Salary History</Button></Link>
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
                  <td><InputGroup className="mb-1">
    <InputGroup.Checkbox  onClick={()=>setemployeeid(item.id)} />
  </InputGroup></td>
                </tr>
                  )}
                
    
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
    
        </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={selectUser}
                  >
                    Next
                  </Button>
                  <div className="clearfix"></div>
      </Container>
    </>
  );
}

export default TableList;

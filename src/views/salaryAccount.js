import React, { useEffect, useState } from "react";

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
import toast from "../utils/toast";
import { useParams } from "react-router-dom";
import Sidebar from "components/Sidebar/Sidebar";
import sidebarImage from "assets/img/sidebar-3.jpg";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import routes from "routes.js";

function salaryAccount() {
    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [accontid,setaccontid]=useState("");
    const [hasImage, setHasImage] = React.useState(true);
    const mainPanel = React.useRef(null);
  const [data,setdata]=useState([]);
  const history = useHistory();
  const[salary,settotal]=useState("");
  let { id} = useParams();
  useEffect(()=>{
    fetch("http://localhost:8000/api/showbank")
    .then((response) =>{ response.json().then((resp)=>{
      setdata(resp)
    })})
  },[])


  async function payMoney(e)
  {
    e.preventDefault();
      let item={id,accontid,salary};
     let result=await fetch("http://localhost:8000/api/Salary",{
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

  console.log(data);
  
  return (
    <>
    <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Select Bank</Card.Title>
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
                  <td><InputGroup className="mb-0">
    <InputGroup.Checkbox  onClick={()=>setaccontid(item.id)} />
  </InputGroup></td>
                </tr>
                  )}
                
    
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
         
        </Row>
   
      </Container>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add Amount</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={(e)=>payMoney(e)}>
                  <Row>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Enter Salaray</label>
                        <Form.Control
                          placeholder="Total Balance"
                          type="text"
                          onChange={(e)=>settotal(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br/>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={payMoney}
                  >
                    Pay Salary
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          
        </Row>
   
                  <div className="clearfix"></div>   
      </Container>

      </div>
          <Footer />
        </div>
        </div>      
    </>
  );
}

export default salaryAccount;

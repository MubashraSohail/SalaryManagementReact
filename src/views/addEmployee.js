import React,{useState} from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Sidebar from "components/Sidebar/Sidebar";
import sidebarImage from "assets/img/sidebar-3.jpg";
import toast from "../utils/toast";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import { Link } from "react-router-dom";
import routes from "routes.js";

function User() {
    
    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);
    const mainPanel = React.useRef(null);

    const[fname,setfname]=useState("");
    const[lname,setlname]=useState("");
    const[address,setaddress]=useState("");
    const[city,setcity]=useState("");
    const[position,setposition]=useState("");
    const[cnic,setcnic]=useState("");

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainPanel.current.scrollTop = 0;
        if (
          window.innerWidth < 993 &&
          document.documentElement.className.indexOf("nav-open") !== -1
        ) {
          document.documentElement.classList.toggle("nav-open");
          var element = document.getElementById("bodyClick");
          element.parentNode.removeChild(element);
        }
      }, [location]);
     async function setEmployee(e)
     {
         e.preventDefault();
         console.log(fname,lname,address,city,position,cnic);
         let item={fname,lname,address,city,position,cnic};
        let result=await fetch("http://localhost:8000/api/addEmployee",{
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
  return (
    <>
     <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
          <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add Employee</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={(e)=>setEmployee(e)}>
                  <Row>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          placeholder="First Name"
                          type="text"
                          onChange={(e)=>setfname(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          placeholder="Last Name"
                          type="text"
                          onChange={(e)=>setlname(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          placeholder="Home Address"
                          type="text"
                          onChange={(e)=>setaddress(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          placeholder="City"
                          type="text"
                          onChange={(e)=>setcity(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Position</label>
                        <Form.Control
                          placeholder="Position"
                          type="text"
                          onChange={(e)=>setposition(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>CNIC</label>
                        <Form.Control
                          placeholder="CNIC"
                          type="text"
                          onChange={(e)=>setcnic(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br/>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={setEmployee}
                  >
                    Add Employee
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
         
        </Row>
      </Container>
          </div>
          <Footer />
        </div>
      </div>
    
      
    </>
  );
}

export default User;

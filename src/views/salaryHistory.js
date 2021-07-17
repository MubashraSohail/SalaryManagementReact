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
  Col,
} from "react-bootstrap";
import { useHistory,Link } from "react-router-dom";
import Sidebar from "components/Sidebar/Sidebar";
import sidebarImage from "assets/img/sidebar-3.jpg";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import routes from "routes.js";
import { useParams } from "react-router-dom";

function salaryHistory() {
    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);
    const [data,setdata]=useState([]);
    const mainPanel = React.useRef(null);
  const history = useHistory();
  useEffect(()=>{
    fetch("http://localhost:8000/api/showasalary")
    .then((response) =>{ response.json().then((resp)=>{
      setdata(resp)
    })})
  },[])


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
                <Card.Title as="h4">Salary History</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Employee Name</th>
                      <th className="border-0">Bank Name</th>
                      <th className="border-0">Account no</th>
                      <th className="border-0">Salary</th>
                      <th className="border-0">Date/Time</th>
                    </tr>
                  </thead>
                  <tbody>
                  {data.map((item)=>
                  <tr>
                  <td>{item.e_name}</td>
                  <td>{item.b_name}</td>
                  <td>{item.ac_no}</td>
                  <td>{item.salary}</td>
                  <td>{item.created_at}</td>
                </tr>
                  )}
                
    
                  </tbody>
                </Table>
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

export default salaryHistory;

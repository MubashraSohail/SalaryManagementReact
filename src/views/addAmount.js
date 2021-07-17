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
  Table
} from "react-bootstrap";
import Sidebar from "components/Sidebar/Sidebar";
import toast from "../utils/toast";
import sidebarImage from "assets/img/sidebar-3.jpg";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import { Link } from "react-router-dom";
import routes from "routes.js";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function addAmount() {
    
    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);
    const [data,setdata]=useState([]);
    const mainPanel = React.useRef(null);
    let history = useHistory();
    let { id} = useParams();
    console.log(id)

    const[price,settotal]=useState("");


    React.useEffect(() => {
      TransactionHistory();
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
     async function setbalance(e)
     {
        
         e.preventDefault();
         console.log(price)
         let item={id,price};
        let result=await fetch("http://localhost:8000/api/addAmount",{
            method:"POST",
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            }
        })
        result =await result.json();
        if(result.error=="false")
        {
            toast.success(result.message);
            window.location.reload();
        }
        else
        {
          console.log(id);
          
            toast.error(result.message);
           
          
        }
         console.log(result);
     }
     async function TransactionHistory()
     {
      let item={id};
      console.log(id);
      let result=await fetch("http://localhost:8000/api/TransactionHistory",{
          method:"POST",
          body:JSON.stringify(item),
          headers:{
              "Content-Type":'application/json',
              "Accept":'application/json'
          }
      })
      result =await result.json().then((resp)=>{setdata(resp)});
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
                <Card.Title as="h4">Add Amount</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={(e)=>setbalance(e)}>
                  <Row>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Total Balance</label>
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
                    onClick={setbalance}
                  >
                    Add Amount
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Deposit History</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Bank Name</th>
                      <th className="border-0">Account no </th>
                      <th className="border-0">Bank Branch</th>
                      <th className="border-0">Amount</th>
                      <th className="border-0">Date/Time</th>
                    </tr>
                  </thead>
                  <tbody>
                  {data.map((item)=>
                  <tr>
                  <td>{item.bank_name}</td>
                  <td>{item.account_no}</td>
                  <td>{item.bank_branch}</td>
                  <td>{item.amount}</td>
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

export default addAmount;

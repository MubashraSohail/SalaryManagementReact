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
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import { Link } from "react-router-dom";
import toast from "../utils/toast";
import { useParams } from "react-router-dom";
import routes from "routes.js";

function EditBank() {
    
    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);
    const mainPanel = React.useRef(null);

    const[bank_name,setbankname]=useState("");
    const[account_no,setaccno]=useState("");
    const[bank_branch,setbankbranch]=useState("");
    const[data,setdata]=useState([]);
    let { id} = useParams();
    console.log(id)

     async function getBankdata()
     {
         let item={id};
        let result=await fetch("http://localhost:8000/api/getbank",{
            method:"POST",
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            }
        })
         result=await result.json();
         setdata(result);
        console.log("result");
     }
     React.useEffect(() => {
        getBankdata();
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
      async function updatebank(e)
      {
        e.preventDefault();
        let item={id,bank_name,account_no,bank_branch};
        console.log(bank_name)
       let result=await fetch("http://localhost:8000/api/updatebank",{
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
                <Card.Title as="h4">Edit Bank</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={(e)=>updatebank(e)}>
            
                  <Row>
                  </Row>
                 
                  <Row>
                        <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Bank Name</label>
                        
                        <Form.Control
                          placeholder="Bank Name"
                          defaultValue={data.bank_name}
                          type="text"         
                          onChange={(e)=>setbankname(e.target.value)}
                        >

                        </Form.Control>
                 
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Account no</label>
                        <Form.Control
                          placeholder="Account no"
                          defaultValue={data.account_no}
                          type="text"
                          onChange={(e)=>setaccno(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>    
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Bank Branch</label>
                        <Form.Control
                          placeholder="Bank Branch"
                          defaultValue={data.bank_name}
                          type="text"
                          onChange={(e)=>setbankbranch(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                  </Row>
                  <br/>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={updatebank}
                  >
                    Edit Bank
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

export default EditBank;

/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import addEmployee from "views/addEmployee";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import register from "views/register";

import AdminLayout from "layouts/Admin.js";
import login from "views/login";
import editEmployee from "views/editEmployee";
import addBank from "views/addBank"
import editbank from "views/editbank"
import addAmount from "views/addAmount"
import salary from "views/Salary"
import salaryAccount from "views/salaryAccount"
import salaryHistory from "views/salaryHistory"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/register" component={register}/>
      <Route path="/salaryAccount/:id" component={salaryAccount}/>
      <Route path="/addAmount/:id" component={addAmount}    />
      <Route path="/addEmployee" component={addEmployee}/>
      <Route path="/addBank" component={addBank}/>
      <Route path="/salary" component={salary}/>
      <Route path="/login" component={login}/>
      <Route path="/salaryHistory" component={salaryHistory}/>
      <Route path="/editEmployee/:id" component={editEmployee}/>
      <Route path="/editbank/:id" component={editbank}/>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

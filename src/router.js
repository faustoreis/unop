import React from "react";
import { Switch, Route } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import Lista from "./views/lista";
import Formulario from "./views/formulario";

function Routes() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" exact component={Lista} />
        <Route path="/formulario/" component={Formulario} />
      </Switch>
    </Router>
  );
}

export default Routes;

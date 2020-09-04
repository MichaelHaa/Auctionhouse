import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { About } from "./about";
import Nav from './components/nav';
import {Home} from "./home";
import AddItem from "./addItem";
import {NotFound} from "./not_found";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <div className="App">
        <Nav />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/addItem" component={AddItem} />
            <Route path="/about" component={About} />
            <Route component={NotFound}/>
        </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

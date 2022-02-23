import React,{Component} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./helpers/history";
import { alertActions } from "./actions/alert.actions";
import Hook from "./components/Hook";
import Redux from "./components/Redux";
import "jquery/dist/jquery.min.js"; // Have to install and import jQuery because of bootstrap modal's dependency
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/js/bootstrap.js";
class App extends Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }
   

    render() {
        return (
      <div className="wrapper">
        <div>
        <Router history={history}>
            <Switch>
              <Route path="/redux" component={Redux} />
              <Route exact path="/" component={Hook} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
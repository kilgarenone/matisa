import { Router } from "@reach/router";
import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { getAccessTokenAction } from "../pages/SignIn/SignInState";
import SignUp from "../pages/SignUp/SignUpContainer";

class Root extends Component {
  componentDidMount() {
    this.props.getAccessTokenAction();
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          {/* <PortfolioReview path="/plan" /> */}
          {/* <Questionnaire path="/questionnaire" /> */}
          <SignUp path="signup/*" />
          {/* <Route exact path="/login" component={SignIn} /> */}
          {/* <App path="/" /> */}
          {/* <EnsureLoggedInContainer>
            <Switch>
              <Route exact path="/" component={App} />
            </Switch>
          </EnsureLoggedInContainer> */}
        </Router>
      </Provider>
    );
  }
}

export default connect(
  null,
  { getAccessTokenAction }
)(Root);

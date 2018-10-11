import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

// use rest operator to pass the rest of the props to Route (includes path and exact props if used)
export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  // spread out the rest of the props in Route - does not receive isAuthenticated or component: Component
  <Route {...rest}
    // define component on our own with conditional logic, pass props from Route to eventual component
    component={(props) => (
      isAuthenticated ? (
        // pass props to Component that Route typically does in AppRouter, things like history
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    )}
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);

import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

function PrivateRoute({ children, ...rest }) {
  const checkLogged = useSelector(state => state.checkLogged);
  const logged = sessionStorage.getItem('isAuthed');
  let isAuthed = checkLogged.isAuthed || logged;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthed ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute;

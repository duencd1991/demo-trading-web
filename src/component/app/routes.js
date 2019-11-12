import React, { Suspense } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Charting from '../screens/Charting';
import Desktop from "../screens/Desktop";
const NotFound = React.lazy(() => import("./../screens/NotFound"));
const SignInCallBack = React.lazy(() => import("./../screens/SignInCallBack"));
const SignIn = React.lazy(() => import("./../screens/SignIn"));

export default function(store) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Switch>
            <SignIn exact path="/" />
            {/*<Route exact path='/' component={SignIn}/>*/}
            <SignInCallBack exact path="/signin-callback" />
            {/*<Route exact path='/signin-callback' component={SignInCallBack}/>*/}
             <Desktop store={store} exact path="/desktop" />
            <Charting exact path="/charting" />
            {/*<Route exact path='/desktop' component={Pilot}/>*/}
            <NotFound exact status={404} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

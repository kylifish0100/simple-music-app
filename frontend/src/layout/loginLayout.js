import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { LoginPage } from '../login/Login'

const LoginLayout = (props) => {

      return(
            <div className="login">
                <Switch>
                    <Route 
                        exact path={`${match.path}`}
                        render={(props) => <LoginPage {...props} /> }
                    />
                </Switch>
            </div>
      )
   }



export default  LoginLayout
import { Router, Route, Set } from '@redwoodjs/router'
import AppLayout from 'src/layouts/AppLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={[AppLayout]}>
        <Route path="/sign-up" page={SignUpPage} name="signUp" />
        <Route path="/log-in" page={LogInPage} name="logIn" />
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

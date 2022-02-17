import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login'
import Register from './pages/Register'
import AddContact from './components/Contacts/AddContact'
import UpdateContact from './components/Contacts/UpdateContact'
import Header from './components/Header';
import { Component } from 'react';
import NumberGrid from './components/Numbers/NumberGrid'
import AddNumber from './components/Numbers/AddNumber'
import UpdateNumber from './components/Numbers/UpdateNumber'

class App extends Component {

  componentDidMount(){

  }

  render(){
    return (
      <Router>
        <Header />
        <Switch>
          <div className="App">
            
          <Route exact path='/'>
            <HomePage />
          </Route>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/register'>
            <Register />
          </Route>

          <Route path='/add-contact'>
            <AddContact />
          </Route>

          <Route path='/update-contact'>
            <UpdateContact />
          </Route>

          <Route path='/numbers'>
            <NumberGrid />
          </Route>

          <Route path='/add-number'>
            <AddNumber />
          </Route>

          <Route path='/update-number'>
            <UpdateNumber />
          </Route>

          </div>
        </Switch>
      </Router>
    );
  } 
}

export default App;

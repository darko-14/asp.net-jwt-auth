import './App.css';
import { BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom'
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

  constructor(){
    super();
    this.state={
      user: localStorage.getItem('User')
    }
  }

  componentDidMount(){
    
  }

  render(){
    return (
      <Router>
        <Header />
        <Switch>
          <div className="App">
            
          <Route exact path='/'>{
            this.state.user === null ? 
              <Login />
            :
              <HomePage user={this.state.user} />
            }</Route>
          
          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/register'>
            <Register />
          </Route>

          <Route path='/add-contact/'>
            <AddContact />
          </Route>

          <Route path='/update-contact/:id'>
            <UpdateContact />
          </Route>

          <Route path='/numbers'>
            <NumberGrid />
          </Route>

          <Route path='/add-number/:id'>
            <AddNumber />
          </Route>

          <Route path='/update-number/:id'>
            <UpdateNumber />
          </Route>

          </div>
        </Switch>
      </Router>
    );
  } 
}

export default App;

import logo from './logo.svg';
import './App.css';
import postPhoto from './services/post_photo';
import HomePage from './views/home_page';
import {
  BrowserRouter,
  Router,
  Switch,
  Route
} from "react-router-dom";
import {createBrowserHistory} from 'history'
import AddPhoto from './views/add_photo/add_photo';
import Photo from './views/photo_detay/photo';
function App() {
  const history = createBrowserHistory({forceRefresh:true})
  const getBasename = () => {
    return `/${process.env.PUBLIC_URL.split("/").pop()}`;
  };
  return (
    <BrowserRouter basename={getBasename()}>
          <Router history={history}>
            <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/addphoto" component={AddPhoto} exact />
            <Route path="/photo" component={Photo} exact />
            </Switch>
          </Router>
        </BrowserRouter>
   
  );
}

export default App;


import './App.css';
import Header from './Component/Header/Header';
import Home from "./Component/Home/Home"
import {BrowserRouter as Router} from "react-router-dom";
function App() {
  return (
    <Router>
      <Header/>
      {/* //add a search bar */}
      <Home/>
    </Router>
  );
}

export default App;

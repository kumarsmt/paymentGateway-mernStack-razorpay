import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Home} from './component/home';
import { Buy } from './component/buy';
import { Payment } from './component/payment';

function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/buy-now" exact element={<Buy/>}/>
                <Route path="/payment/:id" exact element={<Payment/>}/>
            </Routes>
        </Router>
      {/* <Home /> */}
      {/* <Buy /> */}
    </div>
  );
}

export default App;

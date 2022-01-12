import './App.css';
import { Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Shows from './pages/Shows'
import Account from './pages/Account'
import Error from "./pages/Error"
import OneShow from "./pages/OneShow"
import Admin from "./pages/Admin"

import Navbar from './components/Navbar'




function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/AllShows" element={<Shows />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Account" element={<Account />} />
        <Route exact path="/Admin" element={<Admin />}/>
        <Route path="/shows/:id" element={<OneShow />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;

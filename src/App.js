import './styles/Home.scss'
import { Routes, Route } from "react-router-dom";
import AddCard from "./pages/AddCard";
import Home from "./pages/Home";
import WebFont from 'webfontloader';
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Inconsolata']
      }
    });
   }, []);
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/addcard' element={<AddCard />}/> 
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Cards from "./pages/Cards";
import AddCard from "./pages/AddCard";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Cards />}/>
        <Route path='/addcard' element={<AddCard />}/> 
      </Routes>
    </div>
  );
}

export default App;

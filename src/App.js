import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dashboard } from "./components/Dashboard";
import { Auth } from "./components/Auth";

function App() {
  //const isAuth= Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App; 

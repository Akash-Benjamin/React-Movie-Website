import "./css/App.css";
import Home from "./pages/home.jsx"
import {Routes, Route} from "react-router-dom"
import NavBar from "./components/NavBar.jsx"
import Favorites from "./pages/Favorites";

function App() {
  return (
    <div>
      <NavBar/>
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
      </Routes>
    </main>
    </div>
  )
}

export default App;
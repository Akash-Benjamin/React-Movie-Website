import "./App.css";
import Home from "./pages/home.jsx"
import {Routes, Route} from "react-router-dom"
import NavBar from "./components/navbar.jsx"
import Favorites from "./pages/favorites.jsx";

function App() {
  return (
    <div>
      <NavBar/>
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/favorites" elemet={<Favorites/>}/>
      </Routes>
    </main>
    </div>
  )
}

export default App;
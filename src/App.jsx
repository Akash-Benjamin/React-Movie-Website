import "./css/App.css";
import Home from "./pages/home.jsx"
import {Routes, Route} from "react-router-dom"
import NavBar from "./components/NavBar.jsx"
import Favorites from "./pages/Favorites";
import {MovieProvider} from "./contexts/MovieContext";

function App() {
  return (
    <MovieProvider>
      <NavBar/>
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
      </Routes>
    </main>
    </MovieProvider>
  )
}

export default App;
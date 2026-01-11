import MovieCard from "../components/MovieCard";
import { useState } from "react";


function Home(){
  const [searchQuery, setSearchQuery] = useState("");

  const movies = [
    {id:1, title: "Inception",release_date: "2010"},
    {id:2, title: "Interstellar",release_date: "2014"},
    {id:3, title: "The Dark Knight",release_date: "2008"},
    {id:4, title: "Tenet",release_date: "2020"}
  ];
  const handleSearch = (e) => {
    e.preventDefault()
    alert(searchQuery)
    setSearchQuery("")
  }

return (
<div className="home">
  <form onSubmit={handleSearch} className="search-form">
    <input type="text"
     placeholder="Search Movies...."
     className="Search-input"
     value= {searchQuery}
     onChange={(e) =>setSearchQuery(e.target.value)}
     />
     <button className ="search-button " type="submit">search</button>
  </form>
    <div className="movies-grid">
        {movies.map((movie)=>( <MovieCard movie={movie} key={movie.id}/>  )
      )}
    </div>c
</div>
);
}

export default Home 
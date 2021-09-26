import axios from "axios";
import { useEffect, useState } from "react";
import { MovieCard } from "../moviecard";
import "../../..//App.css";

export function LatestMovies() {
  const [moviedata, setMovieData] = useState([
    { poster_path: "", overview: "", title: "", vote_average: "" },
  ]);

  useEffect(() => {
    apicall();
  }, []);

  return (
    <div className="container">
      {moviedata.map((x) => (
        <MovieCard
        poster_path={x.poster_path}
        overview={x.overview}
          title={x.title}
          vote_average={x.vote_average}
        />
      ))}
    </div>
  );
  async function apicall() {
    const url =
      "https://api.themoviedb.org/3/trending/movie/day?api_key=0a1077a32caee7ea5013bc3106d3b048";
    const response = await axios.get(url);
    const data = await response.data;
    setMovieData(data.results);
  }
}

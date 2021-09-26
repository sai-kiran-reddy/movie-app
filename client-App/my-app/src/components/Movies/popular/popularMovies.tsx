import axios from "axios";
import { useEffect, useState } from "react";
import { MovieCard } from "../moviecard";
import "../../..//App.css";

export function PopularMovies() {
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
      "https://api.themoviedb.org/3/discover/movie?api_key=0a1077a32caee7ea5013bc3106d3b048&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";
    const response = await axios.get(url);
    const data = await response.data;
    setMovieData(data.results);
  }
}

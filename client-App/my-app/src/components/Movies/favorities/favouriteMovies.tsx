import axios from "axios";
import { useEffect, useState } from "react";
import { MovieCard } from "../moviecard";
import "../../..//App.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function FavoritiesMovies() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [moviedata, setMovieData] = useState([
    { poster_path: "", overview: "", title: "", vote_average: "" },
  ]);
  const accessToken = useSelector(
    (state: RootState) => state.authorizationReducer.AccessToken
  );
  const login = useSelector(
    (state: RootState) => state.authorizationReducer.login
  );

  useEffect(() => {
    if(login)
    apicall();
  }, [login]);

  return (
    <>
      {!dataLoaded && login && (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress color="inherit" />
          </Box>
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            {" "}
            Your fav movies are coming up{" "}
          </h1>
        </>
      )}
      {dataLoaded && login && (
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
      )}
      {!dataLoaded && !login && (
       <h1 style={{ display: "flex", justifyContent: "center" } }> please login to access this page </h1>
      )}
    </>
  );
  async function apicall() {
    if(accessToken)
    {
    const response = await axios.get("/showFavoritiesMovies", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.data;
    if (data) {
      setDataLoaded(true);
    }
    setMovieData(data.favouriteMovies);
  }
}
}

import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { AuthenticationPage } from "./components/loginpage";
import { FavoritiesMovies } from "./components/Movies/favorities/favouriteMovies";
import { LatestMovies } from "./components/Movies/latest/latestMovies";
import { PopularMovies } from "./components/Movies/popular/popularMovies";
import {
  loginHomeAction,
  signupHomeAction,
  logoutAction
} from "./store/slices/authentication";
import { clearAction, loginAction } from "./store/slices/authorization";
import {
  popularAction,
  LatestAction,
  FavouriteAction,
} from "./store/slices/movietabslice";
import { RootState } from "./store/store";

function App() {
  const [isclose, setclose] = useState(false);
  const [variantpop, setvariantpop] = useState<"outlined" | "text" | "contained" | undefined>('contained');
  const [variantlat, setvariantlat] = useState<"outlined" | "text" | "contained" | undefined>('outlined');
  const [variantfav, setvariantfav] = useState<"outlined" | "text" | "contained" | undefined>('outlined');
  const popular = useSelector(
    (state: RootState) => state.movieTabReducer.popular
  );

  const login = useSelector(
    (state: RootState) => state.authorizationReducer.login
  );


  const latest = useSelector(
    (state: RootState) => state.movieTabReducer.Latest
  );
  const favourite = useSelector(
    (state: RootState) => state.movieTabReducer.Favourite
  );
  const didMount = useRef(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      dispatch(popularAction(true));
    }
  }, [dispatch, latest, popular]);
  return (
    <>
      <div>
        <div className="App-header">
          <ButtonGroup>
            <Button
            variant={variantpop}
              onClick={() => {
                dispatch(popularAction(true));
                dispatch(LatestAction(false));
                dispatch(FavouriteAction(false));
                setvariantpop('contained');
                setvariantfav('outlined');
                setvariantlat('outlined');
              }}
            >
              popular movies
            </Button>
            <Button
            variant={variantlat}
              onClick={() => {
                dispatch(LatestAction(true));
                dispatch(popularAction(false));
                dispatch(FavouriteAction(false));
                setvariantpop('outlined');
                setvariantfav('outlined');
                setvariantlat('contained');
              }}
            >
              Latest movies
            </Button>
            <Tooltip title="please login to access this TAB" disableHoverListener={login} >
  <Button
            variant={variantfav}
             disabled={!login}
              onClick={() => {
                dispatch(FavouriteAction(true));
                dispatch(LatestAction(false));
                dispatch(popularAction(false));
                setvariantfav('contained');
                setvariantpop('outlined');
                setvariantlat('outlined');
              }}
            >
              Favourite movies
            </Button>
</Tooltip>
            <div className="App-header-right">
              { !login &&
                <Button
                onClick={() => {
                  dispatch(loginHomeAction(true));
                  setclose(true);
                }}
              >
                login
              </Button>
              }

{login &&
                <Button
                onClick={() => {
                  dispatch(logoutAction());
                  dispatch(loginAction(false));
                  setclose(true);
                  dispatch(clearAction());
                }}
              >
                logout
              </Button>
              }
              {
                !login &&  
                <Button
                onClick={() => {
                  dispatch(signupHomeAction(true));
                  setclose(true);
                }}
              >
                Join
              </Button>
              }
             
            </div>
          </ButtonGroup>
        </div>
        <div></div>
        <div>
          <Dialog
            open={isclose && !login}
            onClose={() => {
              setclose(false);
            }}
          >
            <DialogTitle id="scroll-dialog-title">Authentication</DialogTitle>
            <DialogContent>
              <AuthenticationPage />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setclose(false);
                  dispatch(loginHomeAction(false));
                  dispatch(signupHomeAction(false));
                }}
              >
                close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          {popular && <PopularMovies />}
          {latest && <LatestMovies />}
          {favourite && <FavoritiesMovies />}
        </div>
      </div>
    </>
  );
}

export default App;

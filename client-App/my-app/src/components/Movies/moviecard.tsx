import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  Typography,
  
} from "@material-ui/core";
import { useState } from "react";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface ExternalProps {
 poster_path: string, overview: string, title: string, vote_average: string 
  
}

export function MovieCard(props: ExternalProps) {
  const TMDB_IMAGE_BASE_URL = (width = 300) =>
    `https://image.tmdb.org/t/p/w${width}`;
  const [cardclick, setcardclick] = useState(false);
  const [favbutton, setfavbutton] = useState(false);
  const [isremoved, setremoved] = useState(false);
  const accessToken = useSelector(
    (state: RootState) => state.authorizationReducer.AccessToken
  );
  const isFavourite = useSelector(
    (state: RootState) => state.movieTabReducer.Favourite  );

  return (
    <>{!isremoved && <Card style={{ width: 275, margin: 20 }}>
      <CardActionArea>
        <CardMedia
          style={{ height: 400 }}
          image={`${TMDB_IMAGE_BASE_URL(200)}${props.poster_path}`}
        />
        <CardContent>
          <Typography variant="h6">{props.title}</Typography>
          Rating:{props.vote_average}
        </CardContent>
      </CardActionArea>
     
       <div>
       { !isFavourite &&
        <Tooltip title="click to add to Favorite or double click to unselect">
       <Button
          onClick={() => {
            setfavbutton(true);
            addFavApicall();
          }}
          onDoubleClick={() => {
            setfavbutton(false);
            removeFavApicall();
          }}
        >
          {favbutton && <FavoriteSharpIcon color="warning"></FavoriteSharpIcon>}
          {!favbutton && (
            <FavoriteSharpIcon color="inherit"></FavoriteSharpIcon>
          )}
        </Button>
        </Tooltip>
}
        { isFavourite &&  <Button onClick={()=>{removeFavApicall();setremoved(true)}}variant="outlined" startIcon={<DeleteIcon />}>
        Remove from List
      </Button>}
       </div>
      <Button
        variant="text"
        onClick={() => {
          setcardclick(true);
        }}
      >
        overview
      </Button>
      <Dialog open={cardclick} onClose={() => setcardclick(false)}>
        <DialogTitle id="scroll-dialog-title">movie overview</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.overview}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setcardclick(false)}>close</Button>
        </DialogActions>
      </Dialog>
    </Card>
}
</>
  );

  function addFavApicall()
  {
    console.log('accessToken',accessToken);
      axios.post('/addFavorities',{favouriteMovies:props},
      {
        headers:
        {
          'Authorization': `Bearer ${accessToken}`
        }
      })
  }

  function removeFavApicall()
  {
      axios.post('/removeFavorities',{favouriteMovies:props},
      {
        headers:
        {
          'Authorization': `Bearer ${accessToken}`
        }
      })
  }

}

import React from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import imageNotAvailable from "../../assets/images/image_not_available.png";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    textAlign: 'center',
    padding: '7px',
    minWidth: '100px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    objectFit: 'cover'
  },
  backdrop: {
    background: 'rgba(255,255,255,0.2)',
  },
  content: {
    paddingTop: '5px',
    fontSize: '8px'
  },
}));

const Item = ({ data }) => {
  const classes = useStyles();
  let cardImage = imageNotAvailable;
  if (data.weather[0].icon) {
    cardImage = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
  }

  const itemImage = (
    <CardMedia
      image={cardImage}
      className={classes.media}
    />
  )

  return (
    <>
      <Grid item xs={12} sm={3} md={1} >
        <Card className={classes.card} >
          <Typography style={{ width: '100%', paddingTop: '10px', paddingBottom: '10px' }}>
            <strong>
              {data.date}
            </strong>
          </Typography>
          {itemImage}
          <CardContent>
            <Typography>
              {data.weather[0].description}
            </Typography>
            <Typography className={classes.content}>
              Avg temp: {Math.round(data.temp.day)}{'\u2103'}
            </Typography>
            <Typography className={classes.content}>
              Pressure: {data.pressure} mb
            </Typography>
            <Typography className={classes.content}>
              Wind: {Math.round(data.wind_speed)} m/s
            </Typography>
            <Typography className={classes.content}>
              Humidity: {data.humidity}%
            </Typography>
          </CardContent>
        </Card>
      </Grid >
    </>
  );
};

export default Item;
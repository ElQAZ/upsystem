import React, { useEffect, useState } from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, fetchWeatherForcast } from "../../store/actions/itemsActions";
import Item from "./Item";
import Loader from '../../components/UI/Loader';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
    alert: {
        marginTop: theme.spacing(3),
        width: '100%'
    },
}));

const Items = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const loading = useSelector(state => state.items.loading);
    const items = useSelector(state => state.items.items);

    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [citiesSelected, setCitiesSelected] = useState({});

    useEffect(() => {
        dispatch(fetchItems());
        const citiesSelectedCopy = JSON.parse(localStorage.getItem('citiesSelected'));
        setCitiesSelected(citiesSelectedCopy);
    }, [dispatch]);

    const deleteHandler = city => {
        const citiesSelectedCopy = { ...citiesSelected };
        delete citiesSelectedCopy[city];
        setCitiesSelected(citiesSelectedCopy);
        localStorage.setItem('citiesSelected', JSON.stringify(citiesSelectedCopy));
    };

    const setCountryValueHandler = (newValue) => {
        setCountry(newValue);
        setCity();
    };

    const setCityValueHandler = async (newValue) => {
        if (newValue === null || newValue === city) return;
        setCity(newValue);
        const citiesSelectedCopy = { ...citiesSelected };
        const result = await dispatch(fetchWeatherForcast(newValue));
        citiesSelectedCopy[newValue] = result;
        if (result) {
            setCitiesSelected(citiesSelectedCopy);
            localStorage.setItem('citiesSelected', JSON.stringify(citiesSelectedCopy));
        };
    };

    let listItems;

    if (citiesSelected) {
        listItems = Object.keys(citiesSelected).map((city, idx) => (
            <ListItem button key={idx}>
                <ListItemIcon style={{ margin: "0", padding: "0", minWidth: '35px' }} >
                    <IconButton
                        aria-label="delete"
                        style={{ margin: "0", padding: "0" }}
                        onClick={() => deleteHandler(city)}
                    >
                        <HighlightOffIcon />
                    </IconButton>
                </ListItemIcon>
                <ListItemText
                    primary={city}
                    style={{ margin: "0", padding: "0" }}
                />
            </ListItem>
        ))
    };

    return (
        <>
            {loading && <Loader />}
            <Grid container spacing={2}>
                {items && <>
                    <Grid item xs={12} md={6} >
                        <Autocomplete
                            key="country"
                            id="country"
                            value={country ? country : null}
                            onChange={(event, newValue) => setCountryValueHandler(newValue)}
                            options={Object.keys(items)}
                            getOptionLabel={(option) => option}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
                        />
                        <br />
                        <Autocomplete
                            key="city"
                            id="city"
                            value={city ? city : null}
                            onChange={(event, newValue) => setCityValueHandler(newValue)}
                            options={country ? items[country] : []}
                            disabled={country ? false : true}
                            getOptionLabel={(option) => option}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" className={classes.title}>
                            Selected cities
                        </Typography>
                        <div className={classes.demo}>
                            <List>
                                {listItems}
                            </List>
                        </div>
                    </Grid>
                    <hr />
                    {citiesSelected && Object.keys(citiesSelected).map(item => (
                        item && <Grid
                            item xs={12}
                            key={citiesSelected[item].name}
                            id={citiesSelected[item].name}
                        >
                            <hr />
                            <Typography variant="h6" className={classes.title}>
                                {citiesSelected[item].name}
                            </Typography>
                            <br />
                            <Grid item container direction="row" justify="space-between" alignContent="space-between" spacing={1}>
                                {citiesSelected[item].forcast && citiesSelected[item].forcast.length && citiesSelected[item].forcast.map(day => (
                                    day && <Item
                                        key={day.dt}
                                        id={day.dt}
                                        data={day}
                                    />
                                ))
                                }
                            </Grid>
                        </Grid>
                    ))}
                </>}
            </Grid>
        </>
    );
}
export default Items;
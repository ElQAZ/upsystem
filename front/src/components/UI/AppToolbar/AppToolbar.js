import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  staticToolbar: {
    marginBottom: theme.spacing(2)
  },
  toolbarTitle: {
    flexGrow: 1
  }
}));
const AppToolbar = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.toolbarTitle}>
            Weather Forcast
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.staticToolbar} />
    </>
  );
};
export default AppToolbar;
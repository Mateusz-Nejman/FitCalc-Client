import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import { addProgress } from "../../actions";
import { getToday } from "../../utlis/date-helper";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  }
}));

export const NewProgress= () => {
  const classes = useStyles();
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();

  const [mass, setMass] = React.useState(userData.bmr.mass);

  const submit = () => {
    dispatch(addProgress(getToday(),mass, true));
  };

  return (
    <Typography component="div" className={classes.root}>
      <TextField
        id="standard-mass"
        label="Masa"
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
        value={mass}
        onChange={event => {
          setMass(event.target.value);
        }}
      />
      <Button variant="contained" onClick={submit}>
        Dodaj
      </Button>
    </Typography>
  );
};

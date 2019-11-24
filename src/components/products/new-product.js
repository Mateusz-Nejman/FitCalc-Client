import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import { addProduct } from "../../actions";
import { getHash } from "../../utlis/hash-helper";

const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: "column",
    width: "100%"
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  }
}));

export const NewProduct = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  const [name, setName] = React.useState("Produkt "+products.length);
  const [protein, setProtein] = React.useState(0);
  const [carbo, setCarbo] = React.useState(0);
  const [fat, setFat] = React.useState(0);
  const [portion, setPortion] = React.useState(100);

  const submit = () => {
    dispatch(
      addProduct(name,protein,carbo, fat,portion, getHash(`${name};${protein};${carbo};${fat};${portion}`),true)
    );
  };

  return (
    <Typography component="div" className={classes.root}>
      <TextField
        id="standard-name"
        label="Nazwa"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
        value={name}
        onChange={event => {
          setName(event.target.value);
        }}
      />
      <TextField
        id="standard-protein"
        label="Białko(g)"
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
        value={protein}
        onChange={event => {
          setProtein(event.target.value);
        }}
      />
      <TextField
        id="standard-carbo"
        label="Węglowodany(g)"
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
        value={carbo}
        onChange={event => {
          setCarbo(event.target.value);
        }}
      />
      <TextField
        id="standard-fat"
        label="Tłuszcz(g)"
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
        value={fat}
        onChange={event => {
          setFat(event.target.value);
        }}
      />
      <TextField
        id="standard-carbo"
        label="Porcja(g)"
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
        value={portion}
        onChange={event => {
          setPortion(event.target.value);
        }}
      />
      <Button variant="contained" onClick={submit}>
        Dodaj
      </Button>
    </Typography>
  );
};

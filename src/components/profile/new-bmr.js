import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import { setBmr } from "../../actions";

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

const activities = [
  {
    value: 1.2,
    text: "Brak aktywności, praca siedząca"
  },
  {
    value: 1.3,
    text: "Niska aktywność (praca siedząca, 1-2 treningi w tygodniu)"
  },
  {
    value: 1.5,
    text: "Średnia aktywność (praca siedząca, 3-4 treningi w tygodniu)"
  },
  {
    value: 1.7,
    text: "Wysoka aktywność (praca fizyczna, 3-4 treningi w tygodniu)"
  },
  {
    value: 1.9,
    text:
      "Bardzo wysoka aktywność (zawodowi sportowcy, osoby codziennie trenujące"
  }
];

export const NewBmr = () => {
  const classes = useStyles();
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();

  const [gender, setGender] = React.useState(userData.bmr.gender);
  const [age, setAge] = React.useState(userData.bmr.age);
  const [mass, setMass] = React.useState(userData.bmr.mass);
  const [height, setHeight] = React.useState(userData.bmr.height);
  const [activity, setActivity] = React.useState(userData.bmr.activity);
  const [target, setTarget] = React.useState(userData.bmr.target);

  const submit = () => {
    dispatch(
      setBmr(
        {
          gender: parseInt(gender),
          age: parseInt(age),
          mass: parseInt(mass),
          height: parseInt(height),
          activity: parseFloat(activity),
          target: parseInt(target)
        },
        true
      )
    );
  };

  return (
    <Typography component="div" className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="gender">
          Płeć
        </InputLabel>
        <NativeSelect
          value={gender}
          onChange={event => {
            setGender(event.target.value);
          }}
          inputProps={{
            name: "gender",
            id: "gender"
          }}
        >
          <option value={5}>Mężczyzna</option>
          <option value={-161}>Kobieta</option>
        </NativeSelect>
      </FormControl>
      <TextField
        id="standard-age"
        label="Wiek"
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
        value={age}
        onChange={event => {
          setAge(event.target.value);
        }}
      />
      <TextField
        id="standard-height"
        label="Wzrost"
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
        value={height}
        onChange={event => {
          setHeight(event.target.value);
        }}
      />
      <TextField
        id="standard-age"
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
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="activity">
          Aktywność
        </InputLabel>
        <NativeSelect
          value={activity}
          onChange={event => {
            setActivity(event.target.value);
          }}
          inputProps={{
            name: "activity",
            id: "activity"
          }}
        >
          {activities.map(element => (
            <option value={element.value} key={element.value}>
              {element.text}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="target">
          Cel
        </InputLabel>
        <NativeSelect
          value={target}
          onChange={event => {
            setTarget(event.target.value);
          }}
          inputProps={{
            name: "target",
            id: "target"
          }}
        >
          <option value={-500}>Utrata masy</option>
          <option value={0}>Utrzymanie masy</option>
          <option value={500}>Przybranie masy</option>
        </NativeSelect>
      </FormControl>
      <Button variant="contained" onClick={submit}>
        Zmień
      </Button>
    </Typography>
  );
};

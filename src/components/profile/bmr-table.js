import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { calcKcal } from "../../utlis/calories-helper";

const useStyles = makeStyles(theme => ({
  tableHeader: {
    fontWeight: 700
  }
}));

const processActivity = value => {
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
  let returnValue = activities[0].text;
  activities.forEach(element => {
    if (element.value === value) returnValue = element.text;
  });

  return returnValue;
};

const processTarget = value => {
  let targets = [];
  targets[-500] = "Utrata masy";
  targets[0] = "Utrzymanie masy";
  targets[500] = "Przybranie masy";

  return targets[value];
};

export const BmrTable = () => {
  const classes = useStyles();
  const userData = useSelector(state => state.userData);

  return (
    <Table className={classes.table} aria-label="simple table">
      <TableBody>
        <TableRow>
          <TableCell component="th" scope="row">
            Płeć
          </TableCell>
          <TableCell align="right">
            {userData.bmr.gender === 5 ? "Mężczyzna" : "Kobieta"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Wiek
          </TableCell>
          <TableCell align="right">{userData.bmr.age}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Wzrost
          </TableCell>
          <TableCell align="right">{userData.bmr.height}cm</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Masa
          </TableCell>
          <TableCell align="right">{userData.bmr.mass}kg</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Aktywność
          </TableCell>
          <TableCell align="right">
            {processActivity(userData.bmr.activity)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Cel
          </TableCell>
          <TableCell align="right">
            {processTarget(userData.bmr.target)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Dzienne zapotrzebowanie
          </TableCell>
          <TableCell align="right">
            {calcKcal(
              userData.bmr.gender,
              userData.bmr.age,
              userData.bmr.height,
              userData.bmr.mass,
              userData.bmr.activity,
              userData.bmr.target
            )}
            kcal
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

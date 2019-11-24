import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../actions";
import { Chart } from "react-google-charts";
import { calcKcal } from "../utlis/calories-helper";

const useStyles = makeStyles(theme => ({
  component: {
    margin: theme.spacing(1)
  },
  header: {
    fontSize: 24,
    fontWeight: 700,
    margin: theme.spacing(1)
  },
  tableHeader: {
    fontWeight: 700
  },
  charts: {
    width: "100%",
    height: "200px",
    margin: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      width: "60%",
      height: "400px",
      margin: "auto"
    }
  },
  expansionHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export default function TodayPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);

  const [load, setLoad] = React.useState(false);

  const dailyKcal = calcKcal(
    userData.bmr.gender,
    userData.bmr.age,
    userData.bmr.height,
    userData.bmr.mass,
    userData.bmr.activity,
    userData.bmr.target
  );

  const dailyProtein = dailyKcal * 0.15;
  const dailyCarbo = dailyKcal * 0.55;
  const dailyFat = dailyKcal * 0.3;

  if (!load) {
    dispatch(setPage(1));
    setLoad(true);
  }

  return (
    <Typography component="div" className={classes.component}>
      <Typography variant="h1" className={classes.header}>
        Dzisiejsze spożycie
      </Typography>
      <Typography component="div" className={classes.charts}>
        <Chart
          width="100%"
          height="100%"
          chartType="ColumnChart"
          loader={<div>Ładowanie wykresy</div>}
          data={[
            ["", "Wymagane", "Zjedzone"],
            ["Białko", dailyProtein, userData.today.protein],
            ["Węglowodany", dailyCarbo, userData.today.carbo],
            ["Tłuszcze", dailyFat, userData.today.fat]
          ]}
          options={{
            title: "Spożyte kalorie",
            chartArea: { width: "60%" },
            vAxis: {
              title: "Kalorie(kcal)"
            }
          }}
          legendToggle
        />
      </Typography>
    </Typography>
  );
}

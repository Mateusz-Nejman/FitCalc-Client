import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../actions";
import { Chart } from "react-google-charts";

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


const HistoryChart = () => {
    const userData = useSelector(state => state.userData);
  
    let chart = <>Brak pomiarów</>;
  
    if (userData.history.length > 0)
      chart = (
        <Chart
          width={"100%"}
          height={"100%"}
          chartType="Line"
          loader={<div>Ładowanie wykresu</div>}
          data={[["Data","Kcal"], ...userData.history]}
          options={{
            legend: "none"
          }}
          rootProps={{ "data-testid": "3" }}
        />
      );
    return chart;
  };

export default function HistoryPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [load, setLoad] = React.useState(false);

  if (!load) {
    dispatch(setPage(2));
    setLoad(true);
  }

  return (
    <Typography component="div" className={classes.component}>
      <Typography variant="h1" className={classes.header}>
        Historia
      </Typography>
      <Typography component="div" className={classes.charts}>
        <HistoryChart/>
      </Typography>
    </Typography>
  );
}

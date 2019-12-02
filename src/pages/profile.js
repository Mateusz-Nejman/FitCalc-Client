import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { ProgressChart } from "../components/profile/progress-chart";
import { BmrTable } from "../components/profile/bmr-table";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { NewBmr } from "../components/profile/new-bmr";
import { NewProgress } from "../components/profile/new-progress";
import { setPage } from "../actions";

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
      height: "300px",
      margin: "auto"
    }
  },
  expansionHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function ProfilePage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [load, setLoad] = React.useState(false);

  if(!load)
  {
    dispatch(setPage(0));
    setLoad(true);
  }

  return (
    <Typography component="div" className={classes.component}>
      <Typography variant="h1" className={classes.header}>
        Profil
      </Typography>
      <BmrTable/>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.expansionHeading}>Nowe Dane</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <NewBmr/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Typography variant="h1" className={classes.header}>
          Postępy
      </Typography>
      <Typography component="div" className={classes.charts}>
        <ProgressChart />
      </Typography>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.expansionHeading}>Nowy postęp</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <NewProgress/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Typography>
  );
}

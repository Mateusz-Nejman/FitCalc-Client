import React from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, addProducts } from "../actions";
import Axios from "axios";

const url = "http://localhost:4000";
//const url = "https://fit-calc-server.herokuapp.com";

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
  },
  buttons: {
    margin: theme.spacing(1)
  }
}));

export default function SyncPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  const [sync, setSync] = React.useState(0);
  const [download, setDownload] = React.useState(0);

  const onSyncClick = event => {
    setSync(1);

    Axios({
        method: "POST",
        url: url+"/sync",
        responseType: "text",
        data: {
            data: products
        }
    }).then(response => {
        setSync(2);
    });
  };

  const onDownloadClick = event => {
    setDownload(1);
    Axios({
        method: "POST",
        url: url+"/download",
        responseType: "json",
        data: {
            data: products
        }
    }).then(response => {
        const newProducts = response.data.data;
        //dispatch(addProducts(newProducts,true));
        newProducts.forEach(element => {
            dispatch(addProduct(element.name,element.protein,element.carbo,element.fat,element.portion,element.hash,false));

            
        });
        dispatch(addProducts());
        setDownload(2);
    });
  };

  let syncButton = (
    <Button variant="contained" onClick={onSyncClick}>Wyślij produkty na serwer(po pomyślnej weryfikacji wysłane produkty będą dostępne dla wszystkich)</Button>
  );
  let downloadButton = <Button variant="contained" onClick={onDownloadClick}>Pobierz produkty</Button>;

  if (sync === 1) syncButton = "Trwa wysyłanie";
  else if (sync === 2) syncButton = "Wysłano";

  if (download === 1) downloadButton = "Trwa pobieranie";
  else if (download === 2) downloadButton = "Pobrano";

  return (
    <Typography component="div" className={classes.component}>
      <Typography variant="h1" className={classes.header}>
        Synchronizacja produktów
      </Typography>
      <Typography component="div" className={classes.buttons}>
        {syncButton}
      </Typography>
      <Typography component="div" className={classes.buttons}>
        {downloadButton}
      </Typography>
    </Typography>
  );
}

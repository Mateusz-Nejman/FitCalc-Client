import React from "react";
import { Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { setPage, addToday } from "../actions";
import MUIDataTable from "mui-datatables";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { NewProduct } from "../components/products/new-product";
import AddIcon from "@material-ui/icons/Add";

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

const options = {
  filter: true,
  filterType: null,
  responsive: "scrollFullHeight",
  selectableRows: "none",
  download: false,
  print: false,
  textLabels: {
    body: {
      noMatch: "Brak danych",
      toolTip: "Sortuj",
      columnHeaderTooltip: column => `Sortuj po ${column.label}`
    },
    pagination: {
      next: "Następny",
      previous: "Poprzedni",
      rowsPerPage: "Produktów na stronę:",
      displayRows: "z"
    },
    toolbar: {
      search: "Szukaj",
      downloadCsv: "Pobierz",
      print: "Drukuj",
      viewColumns: "Pokaż kolumny",
      filterTable: "Filtruj"
    },
    filter: {
      all: "Wszystkie",
      title: "Filtruj",
      reset: "Resetuj"
    },
    viewColumns: {
      title: "Pokaż kolumny",
      titleAria: "Pokaż kolumny"
    }
  }
};

export default function ProductsPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  const [load, setLoad] = React.useState(false);

  function handleEatClick(value, tableMeta) {
    console.log(value);
    const protein = tableMeta.rowData[1]*4.0;
    const carbo = tableMeta.rowData[2]*4.0;
    const fat = tableMeta.rowData[3]*9.0;

    let userPortion = prompt("Ilość(dopisz p jeśli wprowadzasz ilość porcjil przykład: 2p to 2 porcje)",tableMeta.rowData[4]+"g");

    if(userPortion != null)
    {
      userPortion.replace('g','');
      let mod = 0;
      if(userPortion.includes('p'))
      mod = parseFloat(userPortion);
      else
      mod = parseFloat(userPortion) / tableMeta.rowData[4];

      dispatch(addToday(protein*mod,carbo*mod,fat*mod));
    }

  }

  if (!load) {
    dispatch(setPage(3));
    setLoad(true);
  }
  return (
    <Typography component="div" className={classes.component}>
      <Typography variant="h1" className={classes.header}>
        Produkty
      </Typography>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.expansionHeading}>
            Dodaj produkt
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <NewProduct />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <MUIDataTable
        title={"Lista produktów"}
        data={products}
        columns={[
          {
            name: "Nazwa",
            options: {
              filter: true,
              sort: true
            }
          },
          {
            name: "Białko(g)",
            options: {
              filter: true,
              sort: true
            }
          },
          {
            name: "Węglowodany(g)",
            options: {
              filter: true,
              sort: true
            }
          },
          {
            name: "Tłuszcze(g)",
            options: {
              filter: true,
              sort: true
            }
          },
          {
            name: "Porcja(g)",
            options: {
              filter: true,
              sort: true
            }
          },
          {
            name: "Kalorie(kcal)",
            options: {
              filter: true,
              sort: true
            }
          },
          {
            name: "Zjedz",
            options: {
              filter: false,
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <IconButton onClick={() => handleEatClick(value, tableMeta)}>
                    <AddIcon />
                  </IconButton>
                );
              }
            }
          }
        ]}
        options={options}
      />
    </Typography>
  );
}

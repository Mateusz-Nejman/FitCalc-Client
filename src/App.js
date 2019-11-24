import React from "react";
import Layout from "./layout/layout";
import { Route, Switch } from "react-router"; // react-router v4/v5

import HistoryPage from "./pages/history";
import ProductsPage from "./pages/products";
import ProfilePage from "./pages/profile";
import SyncPage from "./pages/sync";
import TodayPage from "./pages/today";

import { useDispatch } from "react-redux";
import {
  addProductId,
  addProgress,
  addHistory,
  setBmr,
  setToday,
  initUserData
} from "./actions";
import { getToday } from "./utlis/date-helper";

function App() {
  const [load, setLoad] = React.useState(false);
  const dispatch = useDispatch();

  if (!load) {
    const productsString = localStorage.getItem("products");
    const userDataString = localStorage.getItem("user_data");

    if (productsString != null) {
      const productsArray = JSON.parse(productsString);
      productsArray.forEach(element => {
        dispatch(addProductId(element));
      });
    }

    if (userDataString != null) {
      const userData = JSON.parse(userDataString);

      userData.progress.forEach(element => {
        dispatch(addProgress(element[0], element[1], false));
      });

      userData.history.forEach(element => {
        dispatch(addHistory(element[0], element[1]), false);
      });

      dispatch(setBmr(userData.bmr, false));

      const nowDate = getToday();

      if (userData.today.date === nowDate || userData.today.date === "")
        dispatch(
          setToday(
            userData.today.protein,
            userData.today.carbo,
            userData.today.fat,
            nowDate,
            true
          )
        );
      else {
        dispatch(
          addHistory(
            userData.today.date,
            userData.today.protein * 4.0 +
              userData.today.carbo * 4.0 +
              userData.today.fat * 9.0,
            true
          )
        );
        dispatch(setToday(0, 0, 0, nowDate));
      }
    } else {
      dispatch(initUserData());
    }
    setLoad(true);
  }
  return (
    <Layout>
      <Switch>
        <Route path="/fitcalc/today">
          <TodayPage />
        </Route>
        <Route path="/fitcalc/history">
          <HistoryPage />
        </Route>
        <Route path="/fitcalc/products">
          <ProductsPage />
        </Route>
        <Route path="/fitcalc/sync">
          <SyncPage />
        </Route>
        <Route path="/fitcalc/">
          <ProfilePage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

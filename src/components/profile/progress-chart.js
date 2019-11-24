import React from "react";
import { useSelector } from "react-redux";
import { Chart } from "react-google-charts";

export const ProgressChart = () => {
  const userData = useSelector(state => state.userData);

  let chart = <>Brak pomiarów</>;

  if (userData.progress.length > 0)
    chart = (
      <Chart
        width={"100%"}
        height={"100%"}
        chartType="Line"
        loader={<div>Loading Chart</div>}
        data={[["Data","Masa"], ...userData.progress]}
        options={{
          legend: "none"
        }}
        rootProps={{ "data-testid": "3" }}
      />
    );
  return chart;
};

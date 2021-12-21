import React, { useRef, useEffect, useState } from "react";
import Chartjs from "chart.js";
import { historyOptions } from "../chartConfigs/chartConfigs";

const HistoryChart = ({ data }) => {
  const chartRef = useRef();
  const { day, week, year, detail } = data;
  const [timeFormat, setTimeFormat] = useState("24h");

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  useEffect(() => {


    if (chartRef && chartRef.current && detail) {

      if(window.chartInstance !== undefined){
        window.chartInstance.destroy();
      }
      
      window.chartInstance = new Chartjs(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: `${detail.name} price`,
              data: determineTimeFormat(),
              backgroundColor: "rgba(124, 86, 153, 0.4)",
              borderColor: "rgb(151, 103, 187)",
              pointRadius: 0,
            },
          ],
        },
        options: {
            scales: {
              yAxes:{
                display: false,
                color: '#FFFFFF'
              }
            },
          ...historyOptions,
        },
      });
    }
  });

  const renderPrice = () => {
    if (detail) {
      return (
        <>
          <p className="my-0">${detail.current_price.toFixed(2)}</p>
          <p
            className={
              detail.price_change_24h < 0
                ? "text-danger my-0"
                : "text-success my-0"
            }
          >
            {detail.price_change_percentage_24h.toFixed(2)}%
          </p>
        </>
      );
    }
  };
  return (
    <div className="my-auto rounded p-3 d-flex flex-column" style={{position: "relative", height: '90%', width: '100%', alignItems: 'center'}}>
      <div>{renderPrice()}</div>
      <div style={{position: 'relative', height: '70%', width: '100%'}}>
        <canvas ref={chartRef} id="myChart" style={{width: '80%', height: '80%'}}></canvas>
      </div>

      <div className="chart-button mt-3">
        <button
          onClick={() => setTimeFormat("24h")}
          className={timeFormat === '24h'? "btn px-3 mx-2 btn-outline-secondary btn-sm disabled" : "btn px-3  mx-2 btn-sm"}
          style={timeFormat === '24h'? {}:{backgroundColor: 'rgb(151, 103, 187)', color: 'white'}}
        >
          24h
        </button>
        <button
          onClick={() => setTimeFormat("7d")}
          className={timeFormat === '7d'? "btn px-3 mx-2 btn-outline-secondary btn-sm disabled" : "btn px-3  mx-2 btn-sm"}
          style={timeFormat === '7d'? {}:{backgroundColor: 'rgb(151, 103, 187)', color: 'white'}}
        >
          7d
        </button>
        <button
          onClick={() => setTimeFormat("1y")}
          className={timeFormat === '1y'? "btn px-3 mx-2 btn-outline-secondary btn-sm disabled" : "btn  px-3 mx-2 btn-sm"}
          style={timeFormat === '1y'? {}:{backgroundColor: 'rgb(151, 103, 187)', color: 'white'}}
        >
          1y
        </button>
      </div>
    </div>
  );
};

export default HistoryChart;

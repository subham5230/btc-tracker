import React, { useRef, useEffect, useState } from "react";
import Chartjs from "chart.js";
import { historyOptions } from "../chartConfigs/chartConfigs";
import coinGecko from "../apis/coinGecko";

const HistoryChart = ({ data }) => {
  const chartRef = useRef();
  const { day, week, year, detail } = data;
  const [range, setRange] = useState({});
  const [rangeData, setRangeData] = useState({});
  const [timeFormat, setTimeFormat] = useState("24h");

  let fromRangeDate = React.createRef();
  let toRangeDate = React.createRef();

  const formatData = (data) => {
    return data.map((el) => {
    return {
        t: el[0],
        y: el[1].toFixed(2),
    };
    });
  };


  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      case 'date': 
        return rangeData;
      default:
        return day;
    }
  };

  useEffect(() => {

    
    const fetchRangedData = async () => {

    if(Object.keys(range).length > 0){
        
        const dateRange = await
            coinGecko.get(`/coins/bitcoin/market_chart/range`, {
            params: {
                vs_currency: "usd",
                from: range.fromDate,
                to: range.toDate,
            },
            });

        console.log(formatData(dateRange.data.prices))

        setRangeData(formatData(dateRange.data.prices));
        setTimeFormat('date');
        
    }
    };

    fetchRangedData();
  }, [range]);

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
              borderWidth:'1.5',
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

  function handleRangeData(){
    let from = Number(Date.parse(fromRangeDate.current.value));
    from = String((from / 1000).toFixed(0));

    let to = Number(Date.parse(toRangeDate.current.value));
    to = String((to / 1000).toFixed(0));

    setRange({
        fromDate: from,
        toDate: to
    });

  }

  const renderPrice = () => {
    if (detail) {
      return (
        <>
          <p
            className={
              detail.price_change_24h < 0
                ? "text-danger my-0"
                : "text-success my-0"
            }

            style={{fontsize: '1.2vw'}}
          >
            {detail.price_change_percentage_24h.toFixed(2)}%
          </p>
        </>
      );
    }
  };
  return (
    <div className="my-auto rounded p-3 d-flex flex-column" style={{position: "relative", height: '100%', width: '100%', alignItems: 'center'}}>
      <div>{renderPrice()}</div>
      <div style={{position: 'relative', height: '60%', width: '100%'}}>
        <canvas ref={chartRef} id="myChart"></canvas>
      </div>

      <div className="chart-button mt-3" style={{fontSize: '1.2vw'}}>
        <button
          onClick={() => setTimeFormat("24h")}
          className={timeFormat === '24h'? "btn px-3 mx-2 btn-outline-secondary btn-sm disabled" : "btn px-3  mx-2 btn-sm"}
          style={timeFormat === '24h'? {fontSize: '0.8vw'}:{backgroundColor: 'rgb(151, 103, 187)', color: 'white', fontSize: '0.8vw'}}
        >
          24h
        </button>
        <button
          onClick={() => setTimeFormat("7d")}
          className={timeFormat === '7d'? "btn px-3 mx-2 btn-outline-secondary btn-sm disabled" : "btn px-3  mx-2 btn-sm"}
          style={timeFormat === '7d'? {fontSize: '0.8vw'}:{backgroundColor: 'rgb(151, 103, 187)', color: 'white',fontSize: '0.8vw'}}
        >
          7d
        </button>
        <button
          onClick={() => setTimeFormat("1y")}
          className={timeFormat === '1y'? "btn px-3 mx-2 btn-outline-secondary btn-sm disabled" : "btn  px-3 mx-2 btn-sm"}
          style={timeFormat === '1y'? {fontSize: '0.8vw'}:{backgroundColor: 'rgb(151, 103, 187)', color: 'white', fontSize: '0.8vw'}}
        >
          1y
        </button>
      </div>

      <div className='row d-flex justify-content-center' style={{position: 'relative', height: '20%', alignItems: 'center'}}>
              <div className='col-lg-6'>
                  <span className='text-light' style={{fontSize: '0.9vw'}}>From:&nbsp;</span>
                  <input className='px-2' type='date' ref={fromRangeDate} style={{background: 'rgba(255, 255, 255, 0.9)', border: '1px solid rgb(151, 103, 187)', borderRadius: '6px', width: '60%'}}/>
              </div>
              <div className='col-lg-6'>
                  <span className='text-light' style={{fontSize: '0.9vw'}}>To:&nbsp;</span>
                  <input className='px-2' type='date' ref={toRangeDate} style={{background: 'rgba(255, 255, 255, 0.9)', border: '1px solid rgb(151, 103, 187)', borderRadius: '6px', width: '60%'}}/>
              </div>

              <div className="row d-flex justify-content-center">
                  <button className='csv-btn p-1' onClick={handleRangeData} style={{background: 'rgba(124, 86, 153, 0.4)', color: 'white', borderRadius: '8px', border:'1px solid rgb(151, 103, 187)', maxWidth: '25%', fontSize: '0.9vw'}}>Filter Data</button>
              </div>
          
      </div>
      
    </div>
  );
};

export default HistoryChart;

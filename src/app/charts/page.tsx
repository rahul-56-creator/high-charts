"use client";
import { useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

export default function Page() {
  const sharedData = [
    { year: "2018", open: 50, high: 60, low: 40, close: 55, stock: 55 },
    { year: "2019", open: 60, high: 75, low: 50, close: 65, stock: 60 },
    { year: "2020", open: 65, high: 80, low: 60, close: 70, stock: 70 },
    { year: "2021", open: 70, high: 90, low: 65, close: 85, stock: 65 },
    { year: "2022", open: 80, high: 100, low: 70, close: 90, stock: 42 },
    { year: "2023", open: 85, high: 110, low: 75, close: 95, stock: 98 },
    { year: "2024", open: 90, high: 120, low: 80, close: 105, stock: 63 },
    { year: "2025", open: 95, high: 130, low: 85, close: 115, stock: 75 },
  ];

  const categories = sharedData.map((item) => item.year);

  const candlestickData = sharedData.map((item, index) => [
    index,  
    item.open,
    item.high,
    item.low,
    item.close,
  ]);

  const columnData = sharedData.map((item:any) => item.stock);

  const lineData = sharedData.map((item:any) => item.stock);

  const [chartType, setChartType] = useState<any>("");

  const handleChartTypeChange = (event:any) => {
    const selectedOption = event.target.value;
    setChartType((previous:any) => {
       return previous.includes(selectedOption)
        ? previous.filter((item:any) => item !== selectedOption)   
        : [...previous, selectedOption];  
    });
  };
  

  const options = {
    title: {
      text: "Seed Cotton Data with Multiple Chart Types",
      align: "left",
    },
    chart: {
      spacingTop: 20,
      spacingBottom: 25,
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      title: {
        text: "Quantity (MT)",
      },
    },
    tooltip: {
      split: true,
    },
    series: [
      {
        type: "column",
        name: "Stocks",
        data: columnData,
      },
      chartType.includes("line") && {
        type: "line",
        name: "Stocks Line",
        data: lineData,
        marker: {
          enabled: true,
          symbol: "circle",
          radius: 3,
        },
      },
      chartType.includes("candlestick") && {
        type: "candlestick",
        name: "Price Movement",
        data: candlestickData,
        upColor: "green",
        color: "red",
        tooltip: {
          pointFormat: `
            <span style="color:{series.color}">\u25CF</span> {series.name}: 
            <b>{point.open}</b> (Open), 
            <b>{point.high}</b> (High), 
            <b>{point.low}</b> (Low), 
            <b>{point.close}</b> (Close)<br/>
          `,
        },
      },
    ].filter(Boolean),  
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8 px-4">
    
       <div className="flex justify-center mb-6 w-full max-w-md">
       <select
  // multiple
  value={chartType}
  onChange={handleChartTypeChange}
  className="w-full px-4 py-2 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none resize-none overflow-auto"
>
  <option value="">Select Chart Type</option>
  <option
    value="line"
    className={chartType.includes("line") ? "hidden" : "inline-block"}
  >
    Line Chart
  </option>
  <option
    value="candlestick"
    className={chartType.includes("candlestick") ? "hidden" : "inline-block"}
  >
    Candlestick Chart
  </option>
</select>

      </div>

       <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}

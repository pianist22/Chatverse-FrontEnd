import React from 'react'
import {Line,Doughnut, Chart} from 'react-chartjs-2';
import { ArcElement, CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, scales, Tooltip,} from 'chart.js';
import { orange, orangeLight, purple, purpleLight } from '../constants/colors';
import { getLast7Days } from '../lib/features';

ChartJS.register(
    Tooltip,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Filler,
    ArcElement,
    Legend
);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend:{
      display:false,
    },
    title:{
      display:false,
    },
  },
  scales:{
    x:{
      grid:{
        display:false,
      },
    },
    y:{
      beginAtZero: true,
      grid:{
        display:false,
      },
    },
  },
};

const LineChart = ({value=[]}) => {
    const data = {
      labels:labels,
      datasets: [
        {
          data:value,
          label:"Messages",
          fill:true,
          backgroundColor:purpleLight,
          borderColor:purple,
        },
      ],
    };
  return (
    <Line data={data} options={lineChartOptions}/>
  )
};

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend:{
      display:false,
    },
    title:{
      display:false,
    },
  },
  cutout:80,
};

const DoughnutChart = ({value=[],labels=[]}) => {
  const data = {
    labels:labels,
    datasets: [
      {
        data:value,
        label:"Total Chats vs Group Chats",
        backgroundColor:[purpleLight,orangeLight],
        hoverBackgroundColor:[purple,orange],
        borderColor:[purple,orange],
        hoverBorderWidth: 1,
        offset:20,
      },
    ],
  };  
  return (
    <div style={{
      minWidth:"300px",
      minHeight:"300px",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
    }}>

      <Doughnut style={{zIndex:10, width: "300px", height: "300px" }} data={data} options={doughnutChartOptions}/>
    </div>
  )
};

export {LineChart,DoughnutChart}
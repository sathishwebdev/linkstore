import React from 'react'
import {Bar, Doughnut, Line} from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)

function Chart({insight}) {

    const months = ["January", "February","March", "April", "May","June","July","August","September","October","November","December"]
    const count = []
    for(let i = 0; i < 30; i++){
        count.push(0)
    }
    const insightDatas = insight.map(({date, counts})=> {
        let data = date.split('/')
        let day = data[0]
        let monthNum = data[1]
        let year = data[2]
        count[day] = counts

        return {
            day,
            month: months[monthNum-1],
            year,
        }
    })
    
    console.log(insight, insightDatas)
   
    const data=  {
        labels: count.map((a,i)=> i+1),
        datasets: [{
            label: 'Views',
            data: count,
            fill: {value: 8},
            backgroundColor: [
                'lightgreen'
            ],
            borderColor: [
                'green'
            ],
            borderWidth: 1
        }]
    }
    
    const options = {
        maintainAspectRatio : false,
        responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    filler: {
        propagate: true
    },
    title: {
      display: true,
      text: 'Profile Views',
    },
  },
  scales:{
      y: {
          beginAtZero : true
      }
  }
    }
     
      return(
        <Line
            data={data}
            height={400}
            width={600}
            options={options}
        />
      )
}

export default Chart
import React from 'react'
import { Line, Doughnut} from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LinearScale,
    PointElement,
    ArcElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)

function Chart({insight}) {
    
    const months = ["January", "February","March", "April", "May","June","July","August","September","October","November","December"]
    const thisMonth = months[new Date().getMonth()]
    let today = new Date().getDate()
    const count = []
            for(let i = today-10; i < today+5; i++){
                count.push(0)
            }
    let dataForDoughnut = months.map((a, i)=> 0)
    const insightDatas = insight.map(({date, counts},i)=> {
        let data = date.split('/')
        let day = data[0]
        let monthNum = data[1]
        let year = data[2]
        count[+day-1] = counts
        dataForDoughnut[monthNum-1]+= counts

        return{
                month : months[monthNum-1],
                year,
                count
            }
            
    })
    
   
    const lineData=  {
        labels: count.map((a,i)=> i+1),
        datasets: [
            {
                label: `Views in ${thisMonth} - ${'year'}`,
                data: count,
                backgroundColor: 'lightgreen',
                borderColor: 'green',
                borderWidth: 2,
                fillColor:"blue"
            }
        ]
    }




    const doughnutData = {
        labels: months,
        datasets: [
            {
                label: `Views in ${'month'} - ${'year'}`,
                data: dataForDoughnut,
                backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(255, 99, 142, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 96, 0.2)',
                    'rgba(75, 192, 200, 0.2)',
                    'rgba(54, 162, 255, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgba(255, 99, 142)',
                    'rgba(255, 159, 64)',
                    'rgba(255, 205, 96)',
                    'rgba(75, 192, 200)',
                    'rgba(54, 162, 255)'
                  ],
                borderWidth: 2,
                fillColor:"blue"
            }
        ]
    }
    
    const lineOptions = {
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
      text: `Profile Views as per Months`,
    },
  },
  scales:{
      y: {
          beginAtZero : true
      },
  }
    }

    const doughnutOptions = {
        maintainAspectRatio : false,
        responsive: true,
  plugins: {
    title: {
      display: true,
      text: `Profile Views for full year`,
    },
  }
    }
   
     
      return(
            <>
                <div style={{
                    width:"100%"
                }} >
                    <Line
                        data={lineData}
                        height={400}
                        width={600}
                        options={lineOptions}
                    />
                </div>
                <div style={{
                    width:"100%"
                }} >
                    <Doughnut
                        data={doughnutData}
                        height={400}
                        width={600}
                        options={doughnutOptions}
                    />
                </div>
            </>
      )
}

export default Chart
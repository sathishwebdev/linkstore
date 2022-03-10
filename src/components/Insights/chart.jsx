import React from 'react'
import { Bar,Line, Doughnut} from 'react-chartjs-2'
import { Chart as ChartJS, Filler, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement} from 'chart.js'

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
    Filler
)

function Chart({insight, links}) {
    
    const months = ["January", "February","March", "April", "May","June","July","August","September","October","November","December"]
    const thisMonth = months[new Date().getMonth()]
    let thisYear = new Date().getUTCFullYear()
    let today = new Date().getDate()
    const count = []
            for(let i = 0; i < today+5; i++){
                count.push(0)
            }
    let dataOfYears = {}
    //  generate skeleton 

    insight.forEach(({date, counts},i)=> {
        let year =  date.split('/')[2]
        dataOfYears[year] = months.map((a, i)=> 0)
    })

     insight.forEach(({date, counts},i)=> {
        let data = date.split('/')
        let day = data[0]
        let monthNum = data[1]
        let year = data[2]
        if(months[monthNum-1] === thisMonth && +year === thisYear){
            count[+day-1] = counts
        }
        
        dataOfYears[year][monthNum-1]+= counts            
    })
    
    // let peakProfileView = count.reduce((acc, data)=> acc > data ? acc : data)

   
    const lineData=  {
        labels: count.map((a,i)=> i+1),
        datasets: [
            {
                label: `Profile Views of last 7 days (${thisMonth} - ${new Date().getUTCFullYear()})`,
                data: count,
                fill: true,
                backgroundColor: 'rgba(130, 255, 134, 0.24)',
                borderColor: 'green',
                borderWidth: 2,
                tension: 0.5
            }
        ]
    }

    const  backgroundColor = [
        'rgba(255, 99, 132, 0.24)',
        'rgba(255, 159, 64, 0.24)',
        'rgba(255, 205, 86, 0.24)',
        'rgba(75, 192, 192, 0.24)',
        'rgba(54, 162, 235, 0.24)',
        'rgba(153, 102, 255, 0.24)',
        'rgba(201, 203, 207, 0.24)',
        'rgba(255, 99, 142, 0.24)',
        'rgba(255, 159, 64, 0.24)',
        'rgba(255, 205, 96, 0.24)',
        'rgba(75, 192, 200, 0.24)',
        'rgba(54, 162, 255, 0.24)'
      ],
      borderColor =[
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
      ]

    
 
let insightDataOfYears = []
for(let key in dataOfYears){
    insightDataOfYears.push({
        label: `Views in  ${key}`,
        data: dataOfYears[key]
    })
}


    const yearData = {
        labels: months,
        datasets: insightDataOfYears.map((item,i)=>{
            return {
                label : item.label,
                data : item.data,
                borderWidth : 2,
                borderColor : i === 0 ? borderColor[i] : backgroundColor[i],
                backgroundColor : i === 0 ? backgroundColor[i] :  borderColor[i],
                fill: true,
                tension: 0.5
            }
        })
    }
    
    const linksData = {
        labels : links.map(({link},i)=> `${link.split('/')[2]}`),
        datasets: [
            {
                data: links.map(({views})=> views),
                fill: true,
                borderColor : backgroundColor.reverse(),
                 backgroundColor : borderColor.reverse(),
                borderWidth: 2
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
          beginAtZero : true,
      },
      x : {
          max : today + 3,
          min : today - 4
      }
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
            <div className="d-flex justify-content-center align-items-center flex-wrap" style={{width:"100%"}}>
                <div style={{width:"100%"}} >
                    <Line
                        data={lineData}
                        height={400}
                        width={600}
                        options={lineOptions}
                    />
                </div>
                <div style={{width:"50%", minWidth:"400px"}} >
                    <Bar
                        data={yearData}
                        height={400}
                        width={600}
                        options={doughnutOptions}
                    />
                </div>
                <div style={{width:"50%", minWidth:"400px"}} >
                    <Doughnut
                        data={linksData}
                        height={400}
                        width={600}
                        options={{
                            maintainAspectRatio : false,
                            responsive: true,
                      plugins: {
                        title: {
                          display: true,
                          text: `Insight for Links`,
                        },
                      }
                        }}
                    />
                </div>
            </div>
      )
}

export default Chart
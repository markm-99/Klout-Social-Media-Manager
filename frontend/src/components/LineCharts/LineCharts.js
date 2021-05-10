import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getPlatformSnapshots, getSnapshot, getYoutubeData } from '../../apis/apis'
import { Line } from 'react-chartjs-2';
import { getPlatformsnap } from '../../apis/apis'
import { userContext } from '../../userContext';
import './LineCharts.css';

let weeks = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"]
let months = [ "Jan", "Feb", "March", "April", "May", "June",
"July", "Aug", "Sep", "Oct", "Nov", "Dec" ];
let years = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2019", "2020", "2021"]
let followData = {
    labels: months,
    datasets: [
      {
        label: 'Twitter Followers',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(29, 161, 242,1)',
        borderColor: 'rgba(0, 51, 102,1)',
        borderWidth: 2,
        data: []
        // data: [650, 800, 1200, 1100, 1300, 650, 800, 1200, 1100, 1300, 1350, 2366]
      },
      {
        label: 'Youtube Subscribers',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(255,0,0,1)',
        borderColor: 'rgba(160,82,45)',
        borderWidth: 2,
        data: []
        //[90, 300, 500, 430, 600, 1200, 1100, 1300, 650, 800, 1200, 1100]
      },
      {
        label: 'Instagram Followers',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(193,53,132,1)',
        borderColor: 'rgba(131,58,180)',
        borderWidth: 2,
        data: []
        //data: [1000, 1100, 1400, 1600, 600,200, 1100, 1300, 650, 800,1300, 1350 ]
      }
    ]
  }

const options =  {
    title:{
        display:true,
        text:'Social Media Statistics for the past year',
        fontSize:20
    },
    legend:{
        display:true,
        position:'right'
    },
    maintainAspectRatio: false  
}                   

const LineCharts = ({dataObj}) => {

  /*
    {
      twitter: {},
      youtube: {},
      instagram: {}
    }
  
  */
    const [platformData, setPlatformData] = useState({
      labels: [],
      data: []
      // "twitter":{},
      // "youtube":{},
      // "instagram": {}
    })

    useEffect(() => {
      let newPlatformData = {
        labels: [],
        data: []
        // "twitter":{},
        // "youtube":{},
        // "instagram": {}
      }
      

      let graphReqObj = {
        // url: `${getPlatformsnap}/`,
        url: `http://localhost:5000/db/snapshot/get/twitter/elonmusk`,
        method: 'GET'
      }
    
      sendRequest(graphReqObj).then((data) => {
          console.log(data, "data in charts")
          // let labels = []
          // //let months = Object.keys(data).map((month) => new Date(time*1000).getMonth())

          // let twitterArr = Object.keys(data).sort().map((time) => {
          //     let realtime = new Date(time*1000)
          //     labels.push(realtime.getMonth())
          //     return data[time].followerss
          // })
          let newLabels = []
          let newData = []

          let sortedKeys = Object.keys(data)
          sortedKeys.sort()
          console.log(sortedKeys)
          sortedKeys.forEach((date) => {
              let currDate = new Date(date*1000)
              newLabels.push(currDate.toLocaleDateString())
              newData.push(data[date].subscribers)
          })
          console.log(newData, "newdata")
          let newPlatformData = {labels: newLabels, data: newData}
          setPlatformData(newPlatformData)
      })
    }, [])

    followData.labels = platformData.labels
    followData.datasets[0].data = platformData.data

    return (
        <div className="LineCharts">
            <Line
                data={followData}
                options={options}
                height={null}
                width={null}
            />
        </div>
    )
}

export default LineCharts ;
import React, { useState, useEffect } from 'react'
import { useParams}  from "react-router-dom";

export default function SeriesInfo() {
    let { id }: any = useParams()
    const [data, setData]: any = useState([])
    const [bingeTime, setBingeTime]: any = useState([])
 
    function calculateBingeTime(dataObj: any): any {
        let runTime;
        if(dataObj.episode_run_time.length > 1) {
            let tmpVal = 0;
            for(let i = 0; i < dataObj.episode_run_time.length; i++) {
                tmpVal += dataObj.episode_run_time[i]
            }
            runTime = tmpVal / dataObj.episode_run_time.length
        }
        else
            runTime = parseInt(dataObj.episode_run_time)
        const ep = parseInt(dataObj.number_of_episodes)
        const time = runTime * ep
        let timeInHours = Math.floor(time / 60)
        let timeInMins = time - (timeInHours * 60)
        const timeInDays = Math.floor(timeInHours / 24)
        timeInHours = timeInHours - (timeInDays * 24)
        setBingeTime({Name: dataObj.name, Days: timeInDays, Hours: timeInHours, Minutes: timeInMins})
        //return {Days: timeInDays, Hours: timeInHours, Minutes: timeInMins};

    };

    useEffect(() => {
        fetch(process.env.REACT_APP_API_HOST + "/3/tv/" + id + "?api_key="
                + process.env.REACT_APP_API_KEY, {
            "method": "GET",
        })
        .then(response => response.json())
        .then(async results =>  {
            calculateBingeTime(results)
        })
        .catch(err => {
            console.error(err);
        });
    }, [])


    return (
        <div>
            <h1>{data.Title}</h1>
            <h4>{data.Runtime}</h4>
            <div className="bingeTime">
                <h1 className="bingeTime-title">Time to complete</h1>
                <h1 className="bingeTime-title">{bingeTime.Name}</h1>
                <div className="bingeTime-elem">
                    <h1 className="bingeTime-elem-text">{bingeTime.Days}</h1>
                    <p>Days</p>
                </div>
                <div className="bingeTime-elem">
                    <h1 className="bingeTime-elem-text">{bingeTime.Hours}</h1>
                    <p>Hours</p>
                </div>
                <div className="bingeTime-elem">
                    <h1 className="bingeTime-elem-text">{bingeTime.Minutes}</h1>
                    <p>Minutes</p>
                </div>
            </div>
        </div>
    )
}

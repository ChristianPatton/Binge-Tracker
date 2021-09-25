import React from 'react';

export default function Series(data: any) {
    const series = data.data
    const isImg = series.posterImg
    return (
        <li>
            <div className="series-box">
                {isImg ? (<img src={series.posterImg} />) : (<p>image unavaliable</p>)}
                <h3>{series.title}</h3>
            </div>
        </li>
    );
}

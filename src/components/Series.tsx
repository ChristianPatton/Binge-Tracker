import React from 'react';
import { Link}  from "react-router-dom";

export default function Series(data: any) {
    const series = data.data
    const isImg = series.posterImg

    return (
        <Link to={"/series/" + series.id}>
            <li>
                <div className="series-box">
                    {isImg ? (<img src={"https://www.themoviedb.org/t/p/w300_and_h450_bestv2/" + series.posterImg} />) : (<p className="unavaliable-txt">Image Unavaliable</p>)}
                    <div>
                        <h3 className="bingeTime-listing-title">{series.title}</h3>
                        <p>{series.overview}</p>
                    </div>
                </div>
            </li>
        </Link>
    );
}

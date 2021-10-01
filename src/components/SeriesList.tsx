import * as React from 'react';
import Series from './Series';

export default function SeriesList({seriesData}: any) {
    return (
        <div>
            <ul className="seriesList">
                {seriesData.map((series: any) => {
                    return <Series key={series.imdbID} data={series}/>
                })}
            </ul>
        </div>
    );
}

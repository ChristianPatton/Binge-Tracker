import * as React from 'react';
import Series from './Series';

export default function SeriesList({seriesData}: any) {
    return (
        <div>
            <ul>
                {seriesData.map((series: any) => {
                    return <Series key={series.imdbID} data={series}/>
                })}
            </ul>
        </div>
    );
}

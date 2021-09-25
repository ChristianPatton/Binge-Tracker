import * as React from "react";
import SeriesList from './components/SeriesList';
import './App.css';

function App() {

  let [searchVal, setSearchVal] = React.useState("")
  const [series, setSeries]: any = React.useState([])

  const getSeriesInfo = (searchKeywords: string) => {
    if(searchKeywords) {
      fetch("https://" + process.env.REACT_APP_RAPID_API_HOST + "/?s=" + searchKeywords, {
          "method": "GET",
          "headers": {
              "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST!,
              "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY!
          }
      })
      .then(response => response.json())
      .then(results => {
        results = results.Search
        for(let i = 0; i < results.length; i++) {
          let data = results[i]
          setSeries((series: any) => [...series, {imdbID: data.imdbID, title: data.Title, posterImg: data.Poster !== "N/A" ? data.Poster : undefined}])
        }
        console.log(series)
      })
      .catch(err => {
          console.error(err);
      });
    }
  }

    const updateVal = (event: React.FormEvent<HTMLInputElement>) => {
      const newVal: string = event.currentTarget.value
      setSearchVal(newVal)
    }

    const onSearch = () => {
      const search: string = searchVal
      getSeriesInfo(search)
    }

  return (
    <div className="container">
      <div>
        <h1 id="heading">Binge Tracker</h1>
        <input id="search-bar" type="text" onChange={updateVal} placeholder="Search Title" />
        <button onClick={onSearch}>Search</button>
        <SeriesList seriesData={series}/>
      </div>
    </div>
  );
}

export default App;

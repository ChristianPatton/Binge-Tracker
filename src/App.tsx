import * as React from "react";
import SeriesList from './components/SeriesList';
import SeriesRoute from './routes/SeriesInfo'
import { BrowserRouter as Router, Switch, Route}  from "react-router-dom";
import './App.css';

function App() {

  let [searchVal, setSearchVal] = React.useState("")
  const [series, setSeries]: any = React.useState([])

  const getSeriesInfo = (searchKeywords: string) => {
    if(searchKeywords) {
      fetch(process.env.REACT_APP_API_HOST + "/3/search/tv?api_key="
           + process.env.REACT_APP_API_KEY +  "&query=" + searchKeywords, {
          "method": "GET",
      })
      .then(response => response.json())
      .then(results => {
        results = results.results
        setSeries([])
        for(let i = 0; i < results.length; i++) {
          let data = results[i]
          setSeries((series: any) => [...series, {id: data.id, title: data.name, overview: data.overview, posterImg: data.poster_path !== null ? data.poster_path : undefined}])
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
    <Router>
      <Switch>
        <Route path="/" exact>
          <div className="container">
              <h1 id="heading">Binge Tracker</h1>
              <div className="content">
                <input id="search-bar" type="text" onChange={updateVal} placeholder="Search Title" />
                <button onClick={onSearch}>Search</button>
              </div>
              <SeriesList seriesData={series}/>
          </div>
        </Route>
        <Route path="/series/:id" component={SeriesRoute}/>
      </Switch>
    </Router>
  );
}

export default App;

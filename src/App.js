import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News'
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


const App = () => {
  const [progress, setProgress] = useState(0)
  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar
          color='#f11946'
          height={3}
          progress={progress}
        />
        <Switch>
          <Route exact path="/sports">
            <News setProgress={setProgress} key="sports" pageSize={5} country="in" category="sports" />
          </Route>
          <Route exact path="/business">
            <News setProgress={setProgress} key="business" pageSize={5} country="in" category="business" />
          </Route>
          <Route exact path="/technology">
            <News setProgress={setProgress} key="technology" pageSize={5} country="in" category="technology" />
          </Route>
          <Route exact path="/science">
            <News setProgress={setProgress} key="science" pageSize={5} country="in" category="science" />
          </Route>
          <Route exact path="/entertainment">
            <News setProgress={setProgress} key="entertainment" pageSize={5} country="in" category="entertainment" />
          </Route>
          <Route exact path="/health">
            <News setProgress={setProgress} key="health" pageSize={5} country="in" category="health" />
          </Route>
          <Route exact path="/">
            <News setProgress={setProgress} key="general" pageSize={5} country="in" category="general" />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
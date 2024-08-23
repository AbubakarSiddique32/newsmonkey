import "./App.css";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import About from "./Components/Pages/about";
import LoadingBar from "react-top-loading-bar";

import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  pageSize = 6;
  country = "in";
  apikey = "process.env.REACT_APP_NEWS_API";
  state = { progress: 0 };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color="#f11946" progress={this.state.progress} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="General"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="General"
                />
              }
            />
            <Route
              exact
              path="/about"
              element={<About key="about" />} // Using the About component for the /about route
            />
            <Route
              exact
              path="/Business"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="Business"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="Business"
                />
              }
            />
            <Route
              exact
              path="/Entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="Entertainment"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="Entertainment"
                />
              }
            />
            <Route
              exact
              path="/General"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="General"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="General"
                />
              }
            />
            <Route
              exact
              path="/Health"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="Health"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="Health"
                />
              }
            />
            <Route
              exact
              path="/Science"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="Science"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="Science"
                />
              }
            />
            <Route
              exact
              path="/Sports"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="Sports"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="Sports"
                />
              }
            />
            <Route
              exact
              path="/Technology"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="Technology"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="Technology"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

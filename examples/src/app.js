import React from "react";
import ReactDOM from "react-dom";
import Slideshow from "../../src/components/Slideshow";
import sampleData from "./sample-data";

const App = () => <Slideshow slides={sampleData} />;

ReactDOM.render(<App />, document.getElementById("app"));

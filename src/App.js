
import './App.css';

import {MovieTable} from "./components/list/List";
import Header from "./components/header/Header";
import {Route, Routes} from "react-router-dom";
import Details from "./components/details/Details";

function App() {

  return (
    <div className="App">
      <Header/>
    <Routes>
        <Route path="/" element={<MovieTable />}/>
        <Route path='/movie/:id' element={<Details />} />
    </Routes>
    </div>
  );
}

export default App;

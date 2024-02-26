
import './App.css';

import {MovieTable} from "./components/list/List";
import Header from "./components/header/Header";
import {Route, Routes} from "react-router-dom";
import Details from "./components/details/Details";
import Error from "./components/error/Error";

function App() {

  return (
    <div className="App">
      <Header/>
    <Routes>
        <Route path="/" element={<MovieTable />}/>
        <Route path='/movie/:id' element={<Details />} />
        <Route path="error" element={<Error />} />
    </Routes>
    </div>
  );
}

export default App;

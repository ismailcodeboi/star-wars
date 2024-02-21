
import './App.css';

import Table from "./components/Table";
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Details from "./components/Details";

function App() {

  return (
    <div className="App">
      <Header/>
    <Routes>
        <Route path="/" element={<Table />}/>
        <Route path='/movie/:id' element={<Details />} />
    </Routes>
    </div>
  );
}

export default App;

import {Route, Routes} from 'react-router-dom'

import Navbar from './Components/Navbar';
import LandingPage from "./Pages/LandingPage"
import { CreateNewEmployee } from './Pages/CreateNewEmployee';
import UpdateEmployee from "./Pages/UpdateEmployee"
import ViewChart from './Pages/ViewChart';

function App() {
  return (
    <div className="App">
    
     <Navbar/>
     <Routes>
      <Route path="/" element={<LandingPage/>}/> 
      <Route path="/create" element={<CreateNewEmployee/>}/> 
      <Route path="/update/:eid" element={<UpdateEmployee/>}/> 
      <Route path="/view-chart" element={<ViewChart/>}/> 
      {/*now routes always look for exact matches  */}
     </Routes>

    </div>
  );
}

export default App;

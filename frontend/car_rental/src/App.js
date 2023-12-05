import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Import your Register component here
import Register from './Register';
import Login from './Login';
import SuccessfulLogin from './SuccessfulLogin';
import FrontPage from './FrontPage';
import MangerRegister from './MangerRegister';
import MangerAddStore from './ManagerAddStore';
import ViewStores from './ViewStores';
import MangerAddVehicle from './ManagerAddVehicle';
import ViewVehicles from './ViewVehicles';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<FrontPage />} />
        <Route path='/success' element={<SuccessfulLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/manager_register' element={<MangerRegister/>} />
        
        <Route path='/view_stores/:role/:id' element={<ViewStores />} />
        <Route path='/view_stores' element={<ViewStores />} />

        <Route path='/view_vehicles/:role/:store_id/:id' element={<ViewVehicles />} />
        <Route path='/view_vehicles/:role/:store_id' element={<ViewVehicles />} />

        <Route path='/add_store/:role/:id' element={<MangerAddStore />} />
        <Route path='/add_vehicle/:role/:store_id/:id' element={<MangerAddVehicle />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
};

export default App;

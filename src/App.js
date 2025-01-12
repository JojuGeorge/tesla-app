import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Shop from "./pages/Shop";
import VehicleDetails from "./pages/VehicleDetails";
import NavBar from "./components/NavBar";
import Render from "./util/Render";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" index element={<LandingPage />} />
        <Route path="Shop" element={<Shop />} />
        <Route path="VehicleDetails/:vehicleId" element={<VehicleDetails />} />
      </Routes>
    </div>
  );
}

export default App;

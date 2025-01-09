import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProductList from "./pages/ProductList";
import CarDetails from "./pages/CarDetails";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" index element={<LandingPage />} />
        <Route path="ProductList" element={<ProductList />} />
        <Route path="CarDetails" element={<CarDetails />} />
      </Routes>
    </div>
  );
}

export default App;

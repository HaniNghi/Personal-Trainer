import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import NavigationBar from "./components/NavigationBar";
import SideBar from "./components/SideBar";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CustomerList from "./pages/CustomerList";
import TrainingList from "./pages/TrainingList";
import TrainingCalendar from "./pages/TrainingCalendar";
import Chart from "./pages/Chart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Container maxWidth={false}>
      <div className="layout">
        <SideBar openMenu={openMenu} />
        <div className={`main-content ${openMenu ? "shifted" : ""}`}>
          <NavigationBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <ToastContainer/>
          <Routes>
            <Route path="/" element={<CustomerList />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/trainings" element={<TrainingList />} />
            <Route path="/calendar" element={<TrainingCalendar />} />
            <Route path="/statistics" element={<Chart />} />
          </Routes>
        </div>
      </div>

      <CssBaseline />
    </Container>
  );
}

export default App;

import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import NavigationBar from "./components/NavigationBar";
import SideBar from "./components/SideBar";
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";

function App() {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <Container
      maxWidth={false}
    >
      <NavigationBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      {openMenu && <SideBar />}
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/trainings" element={<TrainingList />} />
        <Route path="/calendar" element={<div>Calendar Page</div>} />
        <Route path="/statistics" element={<div>Statistics Page</div>} />
      </Routes>
      <CssBaseline />
    </Container>
  );
}

export default App;

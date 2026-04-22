import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import NavigationBar from "./components/NavigationBar";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import CustomerList from "./pages/CustomerList";
import TrainingList from "./pages/TrainingList";
import TrainingCalendar from "./pages/TrainingCalendar";
import Chart from "./pages/Chart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { ColorModeContext } from "./components/ColorModeContext";
function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = {
    toggleColorMode: () => {
      setMode((prev) => (prev === "light" ? "dark" : "light"));
    },
  };

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Container maxWidth={false}>
          <div className="layout">
            <SideBar openMenu={openMenu} />
            <div className={`main-content ${openMenu ? "shifted" : ""}`}>
              <NavigationBar mode={mode} openMenu={openMenu} setOpenMenu={setOpenMenu} />
              <ToastContainer />
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
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

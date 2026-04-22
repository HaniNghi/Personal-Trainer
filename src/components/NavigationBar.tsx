import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useContext } from "react";
import { ColorModeContext } from "../components/ColorModeContext";

type NavigationBarProps = {
  openMenu: boolean;
  mode: "dark" | "light",
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavigationBar(props: NavigationBarProps) {
  const colorMode = useContext(ColorModeContext);

  const handleMenuPress = () => {
    props.setOpenMenu(!props.openMenu);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#9CD5FF", color: "black" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuPress}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personal Trainer
          </Typography>
          <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
            {props.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

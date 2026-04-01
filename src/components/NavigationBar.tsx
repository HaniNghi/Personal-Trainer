import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

type NavigationBarProps = {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavigationBar(props: NavigationBarProps) {
  const handleMenuPress = () => {
    props.setOpenMenu(!props.openMenu);
  };

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" >
        <Toolbar sx={{backgroundColor: "#9CD5FF", color: "black"}}>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}

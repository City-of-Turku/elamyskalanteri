import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  title: {
    color: "dark", 
    fontWeight: '900'
  },
  customizeToolbar: {
    minHeight: 50
  }
});

const Nav = () => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleMenuClick = (pageURL: string) => {
    history.push(pageURL);
  };

  const handleButtonClick = (pageURL: any) => {
    history.push(pageURL);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = [
    {
      menuTitle: "Tapahtumat",
      pageURL: "/",
    },
    {
      menuTitle: "Harrastukset",
      pageURL: "/hobbies",
    },
    {
      menuTitle: "Koulutukset",
      pageURL: "/educations",
    },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters className={classes.customizeToolbar}>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", md: "block", fontWeight: 'bold', fontStyle:' italic', letterSpacing: 2} }}
          >
            VINK
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => {
                const { menuTitle, pageURL } = page;
                return (
                  <MenuItem onClick={() => handleMenuClick(pageURL)}>
                    {menuTitle}
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <Button
              sx={{ color: "primary.dark", fontWeight: '900', fontSize: '18px', lineHeight: '19px' }}
              onClick={() => handleButtonClick("/")}
            >
              Tapahtumat
            </Button>
            <Button
              sx={{ color: "primary.dark", fontWeight: '900', fontSize: '18px' }}
              onClick={() => handleButtonClick("/hobbies")}
            >
              Harrastukset
            </Button>
            <Button
              sx={{ color: "primary.dark", fontWeight: '900',fontSize: '18px' }}
              onClick={() => handleButtonClick("/educations")}
            >
              Koulutukset
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;

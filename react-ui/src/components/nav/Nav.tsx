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
import {makeStyles, useTheme} from "@mui/styles";
import {useTranslation} from "react-i18next";
import styles from "./Nav.module.css"


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

  const { i18n } = useTranslation()
  const theme: any = useTheme()

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
    <AppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className={classes.customizeToolbar} style={{height: '140px'}}>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", md: "block", fontWeight: 'bold', fontStyle:' italic', letterSpacing: 2, color: "#ffffff"} }}
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
              className={styles.navBtn}
              sx={{ color: "primary.dark" }}
              onClick={() => handleButtonClick("/")}
            >
              Tapahtumat
            </Button>
            <Button
              className={styles.navBtn}
              sx={{ color: "primary.dark" }}
              onClick={() => handleButtonClick("/hobbies")}
            >
              Harrastukset
            </Button>
            <Button
              className={styles.navBtn}
              sx={{ color: "primary.dark" }}
              onClick={() => handleButtonClick("/educations")}
            >
              Koulutukset
            </Button>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <div style={{ backgroundColor: theme.palette.primary.dark, padding: "4px", clipPath: "polygon(9px 0, 100% 0, calc(100% - 9px) 100%, 0 100%)"}}>
              <Button
                className={styles.languageBtn}
                sx={{
                  color: theme.palette.primary.dark,
                  borderRadius: 0,
                  backgroundColor: i18n.language === 'fi' ? "#ffffff" : "primary.main"
                }}
                onClick={() => i18n.changeLanguage("fi")}
              >
                Fi
              </Button>
            </div>

            <div style={{ backgroundColor: theme.palette.primary.dark, padding: "4px", clipPath: "polygon(9px 0, 100% 0, calc(100% - 9px) 100%, 0 100%)"}}>
            <Button
              className={styles.languageBtn}
              sx={{
                color: theme.palette.primary.dark,
                borderRadius: 0,
                backgroundColor: i18n.language === 'sv' ? "#ffffff" : "primary.main"
              }}
              onClick={() => i18n.changeLanguage("sv")}
            >
              Sv
            </Button>
            </div>
            <div style={{ backgroundColor: theme.palette.primary.dark, padding: "4px", clipPath: "polygon(9px 0, 100% 0, calc(100% - 9px) 100%, 0 100%)"}}>
            <Button
              sx={{
                color: "primary.dark",
                borderRadius: 0,
                backgroundColor: i18n.language === 'en' ? "#ffffff" : "primary.main"
              }}
              className={styles.languageBtn}
              onClick={() => i18n.changeLanguage("en")}
            >
              En
            </Button>
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;

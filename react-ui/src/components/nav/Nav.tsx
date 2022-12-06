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
import { makeStyles, useTheme } from "@mui/styles";
import { useTranslation } from "react-i18next";
import styles from "./Nav.module.css";
import vinkLogo from "../../svg/vinkLogo1.svg";

const useStyles = makeStyles({
  logo: {
    width: 195,
    height: 100,
    clipPath: "polygon(5px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
    backgroundColor: "#fff",
    padding: "1px 25px 1px 25px",
    transform: "rotate(-9.28deg)",
  },
});

const Nav = () => {
  const theme: any = useTheme();
  const { t, i18n } = useTranslation();
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
    <div className={styles.customizeToolbar}>
      <AppBar position="static" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar style={{ height: 240 }}>
            <Typography
              component="div"
              sx={{ flexGrow: 2, display: { xs: "none", lg: "flex", md: "flex"  } }}
            >
              <a href={"/"}>
                <img className={classes.logo} src={vinkLogo} alt="Vink logo" />
              </a>
            </Typography>
            <Box sx={{ flexGrow: 2, display: { xs: "flex", md: "none" } }}>
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
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "flex", md: "flex" } }}
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
                display: { xs: "none", lg: "flex", md: "block" },
                alignItems: "center",
              }}
            >
              <Button
                sx={{ color: "secondary.main", fontSize: '1.2vw' }}
                onClick={() => handleButtonClick("/")}
              >
                {`${t("events")}`}
              </Button>
              <Button
                sx={{ color: "secondary.main", fontSize: '1.2vw' }}
                onClick={() => handleButtonClick("/hobbies")}
              >
                {`${t("hobbies")}`}
              </Button>
              <Button
                sx={{ color: "secondary.main", fontSize: '1.2vw' }}
                onClick={() => handleButtonClick("/educations")}
              >
                {`${t("educations")}`}
              </Button>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "flex" },
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: theme.palette.secondary.main,
                  padding: "4px",
                  clipPath:
                    "polygon(9px 0, 100% 0, calc(100% - 9px) 100%, 0 100%)",
                }}
              >
                <Button
                  className={styles.languageBtn}
                  sx={{
                    fontSize: '1vw',
                    borderRadius: 0,
                    backgroundColor:
                      i18n.language === "fi" ? "#fff" : "primary.main",
                    color: i18n.language === "fi" ? "primary.main" : "#ffff",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      backgroundColor: "#fff",
                    },
                  }}
                  onClick={() => i18n.changeLanguage("fi")}
                >
                  Fi
                </Button>
              </div>

              <div
                style={{
                  backgroundColor: theme.palette.secondary.main,
                  padding: "4px",
                  clipPath:
                    "polygon(9px 0, 100% 0, calc(100% - 9px) 100%, 0 100%)",
                }}
              >
                <Button
                  className={styles.languageBtn}
                  sx={{
                    fontSize: '1vw',
                    borderRadius: 0,
                    backgroundColor:
                      i18n.language === "sv" ? "#ffffff" : "primary.main",
                    color: i18n.language === "sv" ? "primary.main" : "#ffff",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      backgroundColor: "#fff",
                    },
                  }}
                  onClick={() => i18n.changeLanguage("sv")}
                >
                  Sv
                </Button>
              </div>
              <div
                style={{
                  backgroundColor: theme.palette.secondary.main,
                  padding: "4px",
                  clipPath:
                    "polygon(9px 0, 100% 0, calc(100% - 9px) 100%, 0 100%)",
                }}
              >
                <Button
                  sx={{
                    fontSize: '1vw',
                    borderRadius: 0,
                    backgroundColor:
                      i18n.language === "en" ? "#ffffff" : "primary.main",
                    color: i18n.language === "en" ? "primary.main" : "#ffff",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      backgroundColor: "#fff",
                    },
                  }}
                  className={styles.languageBtn}
                  onClick={() => i18n.changeLanguage("en")}
                >
                  En
                </Button>
              </div>
            </Box>
          </Toolbar>
          <Box
            sx={{
              pb: 4,
              display: { xs: "none", md: "block" },
              alignItems: "center",
              fontSize: 32,
              fontFamily: "halogen",
              fontWeight: 900,
              whiteSpace: "nowrap",
              wordWrap: "break-word",
            }}
            style={{ textAlign: "center" }}
          >
            <span style={{ color: "#fffff" }}>Vink </span>
            <span style={{ color: theme.palette.primary.dark }}>
              - ja löydä tekemistä
            </span>
          </Box>
          <Box>
     
          </Box>
        </Container>
      </AppBar>
    </div>
  );
};

export default Nav;

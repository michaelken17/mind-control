import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import Image from "next/image";
import styles from "styles/Layout.module.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: "500" });
const pages = [
  { title: "Mental Health Check", path: "/MentalHealthCheck" },
  { title: "Daily Health Check", path: "/DailyHealthCheck" },
  { title: "Mental Illness Test", path: "/MentalIllnessTest" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = () => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = () => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <AppBar className={styles.navbar}>
        <Container maxWidth="" sx={{ backgroundColor: "white" }}>
          <Toolbar>
            <Typography
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 750,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link href="/home">
                <img
                  src="/image/MCIcon.png"
                  width="130"
                  height="65"
                  alt="Mind Control"
                  style={{ margin: 15 }}
                />
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="black"
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
                sx={{ mt: "45px", display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem
                    component="a"
                    key={page.title}
                    onClick={handleCloseNavMenu}
                    // linkButton={true}
                    // href={page.path}
                  >
                    <Link href={page.path} className={montserrat.className}>
                      {page.title}
                    </Link>
                    {/* <Typography textAlign="center">{page.title}</Typography> */}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />  */}
            <Typography
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link href="/home">
                <img
                  src="/image/MCIcon.png"
                  width="160"
                  height="80"
                  alt="Mind Control"
                  style={{ margin: 15 }}
                />
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Box key={page.title}>
                  <Button
                    // href={page.path}
                    sx={{
                      mx: 2,
                      py: 4,
                      color: "#42493A",
                      display: "block",
                      borderBottom: "4px solid white",
                      "&:hover": {
                        color: "gray",
                        backgroundColor: "white",
                        borderBottom: "4px solid #FFAACF",
                      },
                      fontSize: 15,
                      textTransform: "none",
                    }}
                    className={montserrat.className}
                  >
                    <Link href={page.path}>{page.title}</Link>
                  </Button>
                </Box>
              ))}
            </Box>

            {/* <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center"  className={montserrat.className}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}
            <Button
              variant="outlined"
              sx={{
                color: "#FFAACF",
                borderColor: "#FFAACF",
                "&:hover": {
                  color: "#EA8FEA",
                  backgroundColor: "white",
                  borderColor: "#EA8FEA",
                },
              }}
            >
              <Link href="/login">Log In</Link>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

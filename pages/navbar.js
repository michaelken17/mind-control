import * as React from "react";
import { useState } from "react";
import MUIAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Link from "next/link";
import Image from "next/image";
import styles from "styles/Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  montserratBold,
  glacial,
  cooperHewitt,
  montserrat,
} from "../public/fonts";
import { AnimatedLineProgressBar, LineProgressBar } from "@frogress/line";
import { MenuItem } from "@mui/material";
import { Montserrat, Open_Sans } from "next/font/google";
import { useRouter } from "next/router";
import { loginActions } from "@/redux/slices/loginSlice";
import Swal from "sweetalert2";
// const montserratBold = Montserrat({ subsets: ["latin"], weight: "500"});
// const montserrat = Montserrat({ subsets: ["latin"], weight: "400", });

const pages = [
  { title: "Mental Health Check", path: "/MentalHealthCheck/Start" },
  { title: "Daily Health Check", path: "/DailyHealthCheck/Start" },
  { title: "Mental Illness Test", path: "/MentalIllnessTest/Home  " },
];
const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MUIAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export default function Navbar() {
  const [isLoaded, setIsLoad] = useState(false);
  const [MHP, setMHP] = useState(40);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAvatar = Boolean(anchorEl);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen;
  };

  const handleLogout = () => {
    dispatch(loginActions.logout());

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
    });

    Toast.fire({
      icon: "success",
      title: "Log out successfully.",
    });

    router.push("/Login");
    setAnchorEl(null);
    setOpen;
  };
  const handleMyAccount = () => {
    setAnchorEl(null);
    setOpen;
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setIsLoad(true);
  }, []);

  const login = useSelector((state) => state.persistedReducer.login);
  const mentalIllnessData = useSelector(
    (x) => x.persistedReducer.app.mentalIllnessData
  );

  return (
    <div>
      <AppBar position="fixed" open={open}>
        <Container maxWidth="" sx={{ backgroundColor: "white" }}>
          {/* <CssBaseline /> */}
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
              <Link href="/Home">
                <img
                  src="/image/MCIcon.png"
                  width="160"
                  height="80"
                  alt="Mind Control"
                  style={{ margin: 15 }}
                />
              </Link>
            </Typography>

            <IconButton
              color="black"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                mr: 2,
                ...(open && { display: "none" }),
                display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Side Menu  */}
            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            ></Box>

            {/* MC Icon */}
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

            {/* Nav bar options*/}

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) =>
                page.title == "Mental Illness Test"  &&
                login?.authorized !== false ? (
                  // MENTAL ILLNESS DROPDOWN MENU
                  <Box key={page.title}>
                    <HtmlTooltip
                      interactive="true"
                      open={showTooltip}
                      onOpen={() => setShowTooltip(true)}
                      onClose={() => setShowTooltip(false)}
                      title={
                        <Typography>
                          {mentalIllnessData.map((item) => {
                            return (
                              <MenuItem
                                key={item.title}
                                className={montserrat.className}
                                sx={{ padding: "10px", fontSize: "15px" }}
                              >
                                <Link href={item.link}>{item.title}</Link>
                              </MenuItem>
                            );
                          })}
                        </Typography>
                      }
                    >
                      <Link href={page.path}>
                        <Button
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
                          className={montserratBold.className}
                        >
                          {page.title}
                        </Button>
                      </Link>
                    </HtmlTooltip>
                  </Box>
                ) : login?.authorized !== false ? (
                  <Box key={page.title}>
                    <Link href={page.path} legacyBehavior passHref>
                      <Button
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
                        className={montserratBold.className}
                      >
                        {page.title}
                      </Button>
                    </Link>
                  </Box>
                ) : (
                  <Box></Box>
                )
              )}
            </Box>

            {/* Mental Health Bar */}
            {isLoaded && login?.authorized != false && (
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography className={montserrat.className}>
                      Mental Health Points
                    </Typography>
                    <a>MHP: 50</a>
                  </React.Fragment>
                }
              >
                <Box
                  sx={{
                    display: { xs: "none", sm: "none", md: "none", lg: "flex" },
                  }}
                >
                  <LineProgressBar
                    rounded={36}
                    height={20}
                    width={300}
                    percent={40}
                    transition={{ easing: "linear" }}
                    progressColor="linear-gradient(to right, #FF6962, #FF7974, #FF8986, #FF9997, #FFA9A9)"
                  />
                </Box>
              </HtmlTooltip>
            )}

            {/* Profile Avatar */}
            {isLoaded && login?.authorized != false && (
              <Box sx={{ ml: "30px" }}>
                <IconButton
                  id="basic-button"
                  aria-controls={openAvatar ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openAvatar ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Avatar />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={openAvatar}
                  onClose={handleClose}
                >
                  <Typography
                    className={montserrat.className}
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Michael Ken
                  </Typography>
                  <MenuItem onClick={handleMyAccount}>
                    <Typography
                      className={montserrat.className}
                      sx={{ textAlign: "center" }}
                    >
                      My Account
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography
                      className={montserrat.className}
                      sx={{ textAlign: "center" }}
                    >
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}

            {/* Login Button */}
            {isLoaded && login?.authorized == false && (
              <Link href="/Login" legacyBehavior passHref>
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
                  Log In
                </Button>
              </Link>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Side Bar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Box
          sx={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LineProgressBar
            rounded={36}
            height={20}
            width={210}
            percent={40}
            transition={{ easing: "linear" }}
            progressColor="linear-gradient(to right, #F38181 , #FCE38A,#D6F7AD, #95E1D3 )"
          />
        </Box>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: "13px",
            paddingY: "5px",
          }}
          className={montserrat.className}
        >
          Mental Health Point
        </Typography>
        <Divider />

        <List>
          {pages.map((text) => (
            <ListItem key={text.title} disablePadding>
              <ListItemButton sx={{ padding: "12px" }}>
                <Link href={text.path}>
                  <Typography className={montserrat.className}>
                    {text.title}
                  </Typography>
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </div>
  );
}

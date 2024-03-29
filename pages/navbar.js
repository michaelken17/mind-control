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
import { montserratBold, glacial, cooperHewitt, montserrat } from "fonts";
import { AnimatedLineProgressBar, LineProgressBar } from "@frogress/line";
import { Grid, MenuItem, createTheme } from "@mui/material";
import { Montserrat, Open_Sans } from "next/font/google";
import { useRouter } from "next/router";
import { loginActions } from "@/redux/slices/loginSlice";
import Swal from "sweetalert2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { isDoneActions } from "@/redux/slices/isDoneSlice";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Breadcrumbs from "nextjs-breadcrumbs";
import Fade from "@mui/material/Fade";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import { Logout } from "@mui/icons-material";
import { ThemeProvider } from "@emotion/react";
import { loginConsultantAction } from "@/redux/slices/loginConsultantSlice";
import InfoIcon from "@mui/icons-material/Info";
const pages = [
  {
    title: "Mental Health Check",
    path: "/MentalHealthCheck/Start",
    actor: "patient",
  },
  {
    title: "Daily Health Check",
    path: "/DailyHealthCheck/Start",
    actor: "patient",
  },
  {
    title: "Mental Illness Test",
    path: "/MentalIllnessTest/Home ",
    actor: "patient",
  },
  {
    title: "Konsultasi Online",
    path: "/KonsultasiOnline/Home",
    actor: "patient",
  },
  {
    title: "Set Availability",
    path: "/Consultant/SetAvailability",
    actor: "consultant",
  },
  {
    title: "Patient List",
    path: "/Consultant/PatientList",
    actor: "consultant",
  },
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
const theme = createTheme({
  typography: {
    fontFamily: montserrat,
  },
  button: {
    fontFamily: montserrat,
  },
});
export default function Navbar() {
  const [isLoaded, setIsLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openAvatar = Boolean(anchorEl);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipMHC, setShowTooltipMHC] = useState(false);
  const [showTooltipKO, setShowTooltipKO] = useState(false);
  const [showTooltipDHC, setShowTooltipDHC] = useState(false);
  const axios = require("axios");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen;
  };
  const handleLogout = () => {
    dispatch(loginActions.logout());
    dispatch(
      isDoneActions.isDone({
        isDoneMHC: false,
        isDoneDpr: false,
        isDoneAnx: false,
        isDoneOcd: false,
        isDoneSd: false,
        isDoneDHC: false,
      })
    );

    dispatch(loginConsultantAction.logoutConsultant());

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
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const claimConsultationHandler = () => {
    axios
      .put(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          "/api/Consultant/UpdateFreeConsultation?UserID=" +
          login.userid +
          "&opr=add"
      )
      .then((resp) => {
        Swal.fire({
          icon: "success",
          title: "Konsultasi gratis telah di klaim!",
          showDenyButton: false,
          showConfirmButton: false,
          timer: 3500,
          timerProgressBar: true,
        });
        dispatch(
          loginActions.login({
            isDoneMHC: resp.data.data,
            email: resp.data.email,
            fullname: resp.data.fullName,
            MHpoints: resp.data.healthPoint,
            password: resp.data.password,
            consultant: false,
            userid: resp.data.userId,
            freeConsultation: resp.data.freeConsultation,
            username: resp.data.username,
          })
        );
      });
  };

  const MHCData = useSelector((x) => x.persistedReducer.app.MHCdata);
  const login = useSelector((state) => state.persistedReducer.login);
  const loginConsultant = useSelector(
    (state) => state.persistedReducer.loginConsultant
  );
  const isDone = useSelector((state) => state.persistedReducer.isDone);
  React.useEffect(() => {
    setIsLoad(true);
    console.log(loginConsultant);
  }, [loginConsultant]);

  return (
    <ThemeProvider theme={theme}>
      <div style={{}}>
        <AppBar position="fixed" open={open}>
          <Container maxWidth="" sx={{ backgroundColor: "white", pr: "20px" }}>
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
                {isLoaded && loginConsultant?.authorized == true ? (
                  <Link
                    legacyBehavior
                    href="/HomeConsultant"
                    sx={{ cursor: "pointer" }}
                  >
                    <Image
                      width={150}
                      height={80}
                      // component="img"
                      style={{
                        // width: "160px",
                        // height: "80px",
                        // alt: "Mind Control",
                        margin: "15px",
                        cursor: "pointer",
                      }}
                      alt=""
                      src="/image/MCIconConsultant.png"
                    />
                  </Link>
                ) : (
                  <Link legacyBehavior href="/Home" sx={{ cursor: "pointer" }}>
                    <Image
                      width={160}
                      height={80}
                      // component="img"
                      style={{
                        cursor: "pointer",
                        margin: "20px",
                      }}
                      alt=""
                      src="/image/MCIcon.png"
                    />
                  </Link>
                )}
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
                  cursor: "pointer",
                  zIndex: "5",
                }}
              >
                {isLoaded && loginConsultant?.authorized == true ? (
                  <Link
                    legacyBehavior
                    href="/HomeConsultant"
                    sx={{ cursor: "pointer" }}
                  >
                    <Image
                      src="/image/MCIconConsultant.png"
                      width={160}
                      height={80}
                      alt="Mind Control"
                      style={{ margin: 15 }}
                    />
                  </Link>
                ) : isLoaded ? (
                  <Link legacyBehavior href="/Home" sx={{ cursor: "pointer" }}>
                    <Image
                      src="/image/MCIcon.png"
                      width={160}
                      height={80}
                      alt="Mind Control"
                      style={{ margin: 15 }}
                    />
                  </Link>
                ) : (
                  <></>
                )}
              </Typography>

              {/* Nav bar options*/}
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {isLoaded &&
                  pages.map((page) =>
                    page.title == "Mental Illness Test" &&
                    login?.authorized !== false &&
                    isDone.isDoneMHC == true ? (
                      // MENTAL ILLNESS DROPDOWN MENU
                      <Box key={page.title}>
                        <HtmlTooltip
                          interactive="true"
                          open={showTooltip}
                          onOpen={() => setShowTooltip(true)}
                          onClose={() => setShowTooltip(false)}
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 300 }}
                          title={
                            <Typography>
                              {MHCData.map((item, index) => {
                                if (item.severity >= 2)
                                  return (
                                    <Link
                                      legacyBehavior
                                      href={item.link}
                                      key={item.title}
                                    >
                                      <MenuItem
                                        className={montserrat.className}
                                        sx={{
                                          padding: "10px",
                                          fontSize: "15px",
                                          px: "30px",
                                        }}
                                      >
                                        {item.title}
                                      </MenuItem>
                                    </Link>
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
                                borderBottom: window.location.pathname.includes(
                                  "MentalIllness"
                                )
                                  ? "4px solid #FFAACF"
                                  : "4px solid white",
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
                              <Grid container columns={12}>
                                <Grid item xl={11}>
                                  {page.title}
                                </Grid>
                                <Grid item xl={1}>
                                  {showTooltip ? (
                                    <ArrowDropUpIcon sx={{ mt: 0 }} />
                                  ) : (
                                    <ArrowDropDownIcon sx={{ mt: 0 }} />
                                  )}
                                </Grid>
                              </Grid>
                            </Button>
                          </Link>
                        </HtmlTooltip>
                      </Box>
                    ) : // MENTAL HEALTH CHECK
                    page.title == "Mental Health Check" &&
                      login?.authorized == true &&
                      isDone.isDoneMHC == true ? (
                      <Box key={page.title}>
                        <HtmlTooltip
                          interactive="true"
                          open={showTooltipMHC}
                          onOpen={() => setShowTooltipMHC(true)}
                          onClose={() => setShowTooltipMHC(false)}
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 300 }}
                          title={
                            <Link
                              legacyBehavior
                              href={"/MentalHealthCheck/Result"}
                            >
                              <Typography>
                                <MenuItem
                                  className={montserrat.className}
                                  sx={{ px: "50px", fontSize: "15px" }}
                                >
                                  Hasil Tes
                                </MenuItem>
                              </Typography>
                            </Link>
                          }
                        >
                          <Link href={page.path}>
                            <Button
                              sx={{
                                mx: 2,
                                py: 4,
                                color: "#42493A",
                                display: "block",
                                // background:"gray"
                                borderBottom: window.location.pathname.includes(
                                  "MentalHealthCheck"
                                )
                                  ? "4px solid #FFAACF"
                                  : "4px solid white",
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
                              <Grid container columns={12}>
                                <Grid item xl={11}>
                                  {page.title}
                                </Grid>
                                <Grid item xl={1}>
                                  {showTooltipKO ? (
                                    <ArrowDropUpIcon sx={{ mt: 0 }} />
                                  ) : (
                                    <ArrowDropDownIcon sx={{ mt: 0 }} />
                                  )}
                                </Grid>
                              </Grid>
                            </Button>
                          </Link>
                        </HtmlTooltip>
                      </Box>
                    ) : // DAILY HEALTH CHECK
                    page.title == "Daily Health Check" &&
                      login?.authorized !== false &&
                      isDone.isDoneMHC == true ? (
                      <Box key={page.title}>
                        <HtmlTooltip
                          interactive="true"
                          open={showTooltipDHC}
                          onOpen={() => setShowTooltipDHC(true)}
                          onClose={() => setShowTooltipDHC(false)}
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 300 }}
                          title={
                            <Box>
                              <Link
                                legacyBehavior
                                href={"/DailyHealthCheck/RekomendasiKegiatan"}
                              >
                                <Typography>
                                  <MenuItem
                                    className={montserrat.className}
                                    sx={{ padding: "10px", fontSize: "15px" }}
                                  >
                                    Rekomendasi Kegiatan
                                  </MenuItem>
                                </Typography>
                              </Link>
                              <Link
                                legacyBehavior
                                href={"/DailyHealthCheck/Test"}
                              >
                                <Typography>
                                  <MenuItem
                                    className={montserrat.className}
                                    sx={{ padding: "10px", fontSize: "15px" }}
                                  >
                                    Daily Health Test
                                  </MenuItem>
                                </Typography>
                              </Link>
                            </Box>
                          }
                        >
                          <Link href={page.path}>
                            <Button
                              sx={{
                                mx: 2,
                                py: 4,
                                color: "#42493A",
                                display: "block",
                                borderBottom: window.location.pathname.includes(
                                  "DailyHealthCheck"
                                )
                                  ? "4px solid #FFAACF"
                                  : "4px solid white",
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
                              <Grid container columns={12}>
                                <Grid item xl={11}>
                                  {page.title}
                                </Grid>
                                <Grid item xl={1}>
                                  {showTooltipDHC ? (
                                    <ArrowDropUpIcon sx={{ mt: 0 }} />
                                  ) : (
                                    <ArrowDropDownIcon sx={{ mt: 0 }} />
                                  )}
                                </Grid>
                              </Grid>
                            </Button>
                          </Link>
                        </HtmlTooltip>
                      </Box>
                    ) : // KONSULTASI ONLINE
                    page.title == "Konsultasi Online" &&
                      login?.authorized !== false &&
                      isDone.isDoneMHC == true ? (
                      <Box key={page.title}>
                        <HtmlTooltip
                          interactive="true"
                          open={showTooltipKO}
                          onOpen={() => setShowTooltipKO(true)}
                          onClose={() => setShowTooltipKO(false)}
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 300 }}
                          title={
                            <Box>
                              <Link
                                legacyBehavior
                                href={"/KonsultasiOnline/PemesananKonsultasi"}
                              >
                                <Typography>
                                  <MenuItem
                                    className={montserrat.className}
                                    sx={{ padding: "10px", fontSize: "15px" }}
                                  >
                                    Pemesanan Konsultasi
                                  </MenuItem>
                                </Typography>
                              </Link>
                              <Link
                                legacyBehavior
                                href={"/KonsultasiOnline/ListKonsultasi"}
                              >
                                <Typography>
                                  <MenuItem
                                    className={montserrat.className}
                                    sx={{ padding: "10px", fontSize: "15px" }}
                                  >
                                    Jadwal Konsultasi
                                  </MenuItem>
                                </Typography>
                              </Link>
                            </Box>
                          }
                        >
                          <Link href={page.path}>
                            <Button
                              sx={{
                                mx: 2,
                                py: 4,
                                color: "#42493A",
                                display: "block",
                                borderBottom: window.location.pathname.includes(
                                  "KonsultasiOnline"
                                )
                                  ? "4px solid #FFAACF"
                                  : "4px solid white",
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
                              <Grid container columns={12}>
                                <Grid item xl={11}>
                                  {page.title}
                                </Grid>
                                <Grid item xl={1}>
                                  {showTooltipKO ? (
                                    <ArrowDropUpIcon sx={{ mt: 0 }} />
                                  ) : (
                                    <ArrowDropDownIcon sx={{ mt: 0 }} />
                                  )}
                                </Grid>
                              </Grid>
                            </Button>
                          </Link>
                        </HtmlTooltip>
                      </Box>
                    ) : // SET AVAILABILITY
                    page.title == "Set Availability" &&
                      loginConsultant?.authorized == true ? (
                      <Box key={page.title}>
                        <Link href={page.path}>
                          <Button
                            sx={{
                              mx: 2,
                              py: 4,
                              color: "#42493A",
                              display: "block",
                              borderBottom: window.location.pathname.includes(
                                "SetAvailability"
                              )
                                ? "4px solid #FFAACF"
                                : "4px solid white",
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
                    ) : // SET AVAILABILITY
                    page.title == "Patient List" &&
                      loginConsultant?.authorized == true ? (
                      <Box key={page.title}>
                        <Link href={page.path}>
                          <Button
                            sx={{
                              mx: 2,
                              py: 4,
                              color: "#42493A",
                              display: "block",
                              borderBottom: window.location.pathname.includes(
                                "PatientList"
                              )
                                ? "4px solid #FFAACF"
                                : "4px solid white",
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
                      <Box key={page.title}></Box>
                    )
                  )}
              </Box>

              {/* Mental Health Bar */}
              {isLoaded &&
                login?.authorized == true &&
                login?.consultant == false && (
                  <HtmlTooltip
                    sx={{
                      [`& .${tooltipClasses.tooltip}`]: {
                        maxWidth: 400,
                      },
                    }}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 400 }}
                    title={
                      <Box>
                        <Typography className={montserrat.className}>
                          Mental Health Points: {login?.MHpoints}
                        </Typography>

                        {login?.MHpoints == 100 ? (
                          <Box sx={{}}>
                            <Typography
                              className={montserrat.className}
                              sx={{ fontSize: "13px" }}
                            >
                              <b style={{ color: "black" }}>
                                Mental Health Points anda sudah mencapai 100!
                              </b>
                              <br />
                              Silahkan mengklaim konsultasi gratis anda dibawah
                              ini!
                            </Typography>
                            <Box sx={{ textAlign: "center", mt: "5px" }}>
                              <Button
                                className={montserrat.className}
                                sx={{
                                  textTransform: "none",
                                  color: "white",
                                  bgcolor: "#3DB388",
                                  textAlign: "center",
                                  width: "100%",
                                  "&:hover": {
                                    bgcolor: "#8AEC9F",
                                    color: "black",
                                  },
                                }}
                                onClick={claimConsultationHandler}
                              >
                                Klaim Konsultasi Gratis
                              </Button>
                            </Box>
                          </Box>
                        ) : (
                          <Typography
                            className={montserrat.className}
                            sx={{ fontSize: "13px" }}
                          >
                            <b style={{ color: "black" }}>
                              Setiap Daily Health Test yang dilakukan secara
                              berturut akan menambahkan 20 poin.
                            </b>
                            <br />
                            <br />
                            Saat poin mencapai 100, Anda akan mendapatkan sesi
                            konsultasi <b style={{ color: "red" }}>
                              GRATIS
                            </b>{" "}
                            <br />
                            <br />
                            Poin akan menjadi 0 lagi ketika sudah mengklaim
                            konsultasi gratis atau <i>streak</i> Daily Health
                            Test berakhir
                          </Typography>
                        )}
                      </Box>
                    }
                  >
                    <Box
                      sx={{
                        marginBottom: "14px",
                        display: {
                          xs: "none",
                          sm: "none",
                          md: "none",
                          lg: "flex",
                        },
                      }}
                    >
                      <FavoriteIcon
                        sx={{
                          color: "red",
                          marginRight: "10px",
                          marginTop: "17px",
                        }}
                      />
                      <Box sx={{ marginTop: "0px  " }}>
                        <Typography
                          sx={{ color: "black", fontSize: "13px" }}
                          className={montserrat.className}
                        >
                          Mental Health Bar
                        </Typography>
                        {login?.MHpoints == 100 ? (
                          <LineProgressBar
                            rounded={36}
                            height={20}
                            width={300}
                            percent={login?.MHpoints}
                            transition={{ easing: "linear" }}
                            progressColor="linear-gradient(to left, #A3FFA6,#8AEC9F,#70D997,#57C690 )"
                          />
                        ) : (
                          <LineProgressBar
                            rounded={36}
                            height={20}
                            width={300}
                            percent={login?.MHpoints}
                            transition={{ easing: "linear" }}
                            progressColor="linear-gradient(to right, #FF6962, #FF7974, #FF8986, #FF9997, #FFA9A9)"
                          />
                        )}
                      </Box>
                    </Box>
                  </HtmlTooltip>
                )}

              {/* Profile Avatar */}
              {isLoaded &&
                (login?.authorized == true ||
                  loginConsultant?.authorized == true) && (
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
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      {login?.authorized == true ? (
                        <Typography
                          className={montserrat.className}
                          style={{
                            textAlign: "center",
                            padding: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {login.fullname}
                        </Typography>
                      ) : loginConsultant?.authorized == true ? (
                        <Typography
                          className={montserrat.className}
                          style={{
                            textAlign: "center",
                            padding: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {loginConsultant.fullname}
                        </Typography>
                      ) : (
                        <Typography></Typography>
                      )}
                      {login?.authorized && (
                        <Link href="/TransactionHistory">
                          <MenuItem>
                            <HistoryIcon sx={{ fontSize: "18px", mr: "7px" }} />
                            <Typography
                              className={montserrat.className}
                              sx={{ textAlign: "center" }}
                            >
                              Transaction History
                            </Typography>
                          </MenuItem>
                        </Link>
                      )}

                      <MenuItem onClick={handleLogout}>
                        <LogoutIcon sx={{ fontSize: "18px", mr: "7px" }} />
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
              {isLoaded &&
                login?.authorized == false &&
                loginConsultant?.authorized == false && (
                  <Link legacyBehavior href="/Login">
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

          {isLoaded &&
            login?.authorized != false &&
            login?.consultant == false && (
              <Box
                sx={{
                  py: "10px",
                  alignContent: "center",
                  margin: "0 auto",
                  textAlign: "center",
                  display: {
                    lg: "flex",
                  },
                }}
              >
                <Typography
                  className={montserrat.className}
                  sx={{ fontSize: "15px" }}
                >
                  Mental Health Points: {login?.MHpoints}
                </Typography>

                <Box
                  sx={{
                    display: {
                      lg: "flex",
                      xs: "flex",
                    },
                    justifyContent: "center",
                  }}
                >
                  <FavoriteIcon
                    sx={{
                      color: "red",
                      marginRight: "5px",
                    }}
                  />
                  <Box sx={{ marginTop: "2px  " }}>
                    {login?.MHpoints == 100 ? (
                      <LineProgressBar
                        rounded={36}
                        height={20}
                        width={200}
                        percent={login?.MHpoints}
                        transition={{ easing: "linear" }}
                        progressColor="linear-gradient(to left, #A3FFA6,#8AEC9F,#70D997,#57C690 )"
                      />
                    ) : (
                      <LineProgressBar
                        rounded={36}
                        height={20}
                        width={200}
                        percent={login?.MHpoints}
                        transition={{ easing: "linear" }}
                        progressColor="linear-gradient(to right, #FF6962, #FF7974, #FF8986, #FF9997, #FFA9A9)"
                      />
                    )}
                  </Box>
                </Box>
                {/* <IconButton>
                  <InfoIcon />
                </IconButton> */}

                <Box sx={{ p: "10px" }}>
                  {login?.MHpoints == 100 ? (
                    <Box sx={{}}>
                      <Typography
                        className={montserrat.className}
                        sx={{ fontSize: "13px" }}
                      >
                        <b style={{ color: "black" }}>
                          Mental Health Points anda sudah mencapai 100!
                        </b>
                        <br />
                        Silahkan mengklaim konsultasi gratis anda dibawah ini!
                      </Typography>
                      <Box sx={{ textAlign: "center", mt: "5px" }}>
                        <Button
                          className={montserrat.className}
                          sx={{
                            textTransform: "none",
                            color: "white",
                            bgcolor: "#3DB388",
                            textAlign: "center",
                            width: "100%",
                            "&:hover": {
                              bgcolor: "#8AEC9F",
                              color: "black",
                            },
                          }}
                          onClick={claimConsultationHandler}
                        >
                          Klaim Konsultasi Gratis
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Typography
                      className={montserrat.className}
                      sx={{ fontSize: "13px" }}
                    >
                      <b style={{ color: "black" }}>
                        Setiap Daily Health Test yang dilakukan secara berturut
                        akan menambahkan 20 poin.
                      </b>
                      <br />
                      <br />
                      Saat poin mencapai 100, Anda akan mendapatkan sesi
                      konsultasi <b style={{ color: "red" }}>GRATIS</b> <br />
                    </Typography>
                  )}
                </Box>

                <Divider />
                <Box sx={{ textAlign: "center" }}>
                  {isLoaded &&
                    pages.map((page) =>
                      login?.authorized == true &&
                      isDone.isDoneMHC == true &&
                      page.actor == "patient" ? (
                        <Box
                          sx={{
                            px: "10px",
                            display: "flex",
                            justifyContent: "left",
                          }}
                          key={page.title}
                        >
                          <Link href={page.path}>
                            <Button
                              sx={{
                                color: "#42493A",
                                width: "100%",
                                fontSize: 15,
                                textAlign: "left",
                                textTransform: "none",
                                "&:hover": {
                                  color: "green",
                                  backgroundColor: "black",
                                },
                              }}
                              className={montserratBold.className}
                              onClick={() => setOpen(false)}
                            >
                              {page.title}
                            </Button>
                          </Link>
                        </Box>
                      ) : page.title == "Set Availability" &&
                        loginConsultant?.authorized == true &&
                        page.actor == "consultant" ? (
                        <Box key={page.title}>
                          <Link href={page.path}>
                            <Button
                              sx={{
                                mx: 2,
                                py: 4,
                                color: "#42493A",
                                display: "block",
                                borderBottom: window.location.pathname.includes(
                                  "SetAvailability"
                                )
                                  ? "4px solid #FFAACF"
                                  : "4px solid white",
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
                      ) : page.title == "Patient List" &&
                        loginConsultant?.authorized == true &&
                        page.actor == "consultant" ? (
                        <Box key={page.title}>
                          <Link href={page.path}>
                            <Button
                              sx={{
                                mx: 2,
                                py: 4,
                                color: "#42493A",
                                display: "block",
                                borderBottom: window.location.pathname.includes(
                                  "PatientList"
                                )
                                  ? "4px solid #FFAACF"
                                  : "4px solid white",
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
                        <Box key={page.title}></Box>
                      )
                    )}
                </Box>
              </Box>
            )}
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
        </Main>

        {/* BreadCrumbs */}
        {/* <Breadcrumbs omitRootLabel containerStyle={{}} /> */}
      </div>
    </ThemeProvider>
  );
}

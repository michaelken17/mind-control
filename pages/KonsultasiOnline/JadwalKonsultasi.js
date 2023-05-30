import { Montserrat } from "next/font/google";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  circularProgressClasses,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import styles from "styles/Quiz.module.css";
import Link from "next/link";
import { container, item } from "/animation";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { forwardRef, useEffect, useState } from "react";
import {
  montserrat,
  glacial,
  cooperHewitt,
  montserratExtraBold,
  montserratLight,
  montserratBold,
} from "../../public/fonts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import Slide from "@mui/material/Slide";
import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const theme = createTheme({
  typography: {
    fontFamily: montserrat,
  },
  button: {
    fontFamily: montserrat,
  },
  link: {
    fontFamily: montserrat,
  },
});

// Day JS initialization
const maxDate = dayjs().add(5, "day");
const today = dayjs().format("YYYY-MM-DD");

var timeAvailable = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "19:00",
  "20:00",
];

// Daftar Psikolog
export default function JadwalKonsultasi() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  //   const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const [datePicked, setdatePicked] = useState(dayjs());
  const [timePicked, settimePicked] = useState("");
  var updateLocale = require("dayjs/plugin/updateLocale");
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    months: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
  });
  dayjs.updateLocale("en", {
    weekdays: [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ],
  });
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // console.log("Time: " + dayjs().format("HH:mm:ss"));
    // console.log(datePicked.format("dddd, DD MMMM"));
    settimePicked("");
  }, [datePicked]);

  const timePickerHandler = (event, next) => {
    settimePicked(next);
    // console.log(next);
    console.log(
      dayjs(datePicked.format("YYYY-MM-DD") + " " + next).diff(
        dayjs(),
        "minutes"
      )
    );
    // console.log(dayjs().diff(dayjs(today + " " + next), "minutes"));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{}}>
        {isLoaded && (
          <motion.div
            style={{
              padding: "0px",
              borderRadius: 10,
              fontSize: 20,
              height: "100%",
              //   border: "10px solid",
              textAlign: "center",
              justifyItems: "center",
              color: "black",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0,
            }}
            exit={{ opacity: 0 }}
          >
            <Box
              sx={{
                background: "white",
                padding: "20px",
              }}
            >
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  className={montserratExtraBold.className}
                  sx={{ fontSize: "20px" }}
                >
                  Jennie Kim, M.Psi, Psikolog
                </Typography>
                <Typography
                  className={montserrat.className}
                  sx={{ fontSize: "17px" }}
                >
                  Psikolog Klinis
                </Typography>
                <Typography
                  className={montserratExtraBold.className}
                  sx={{ fontSize: "17px", color: "black" }}
                >
                  Rp. 50.000,00
                </Typography>
              </Box>

              <Grid container columns={2} maxWidth={800}>
                <Grid
                  item
                  xl={1}
                  md={1}
                  sx={{
                    justifyContent: "left",
                    marginLeft: { xl: "-60px", md: "-65px", sm: "-20px" },
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      className={montserratBold.className}
                      showDaysOutsideCurrentMonth
                      minDate={dayjs()}
                      maxDate={maxDate}
                      value={datePicked}
                      onChange={(x) => setdatePicked(x)}
                      views={["day"]}
                      sx={{
                        fontFamily: montserrat.className,
                        "&.MuiDayCalendar-header": {
                          padding: "0px",
                        },
                        "& .MuiPickersCalendarHeader-label": {
                          fontSize: "17px",
                        },

                        "& .MuiPickersDay-root": {
                          "&:hover": {
                            bgcolor: "rgba(0,0,0,0.05)",
                            color: "black",
                            fontWeight: "bold",
                          },
                          "&:focus": {
                            bgcolor: "#FFAACF",
                            color: "black",
                            fontWeight: "bold",
                          },
                          "&.Mui-selected": {
                            bgcolor: "#FFAACF",
                            color: "black",
                            fontWeight: "bold",
                            "&:hover": {
                              bgcolor: "rgba(255, 170, 207, 0.5)",
                              color: "black",
                              fontWeight: "bold",
                            },
                            "&:focused": {
                              bgcolor: "#FFAACF",
                              color: "black",
                              fontWeight: "bold",
                            },
                          },
                        },
                        ".css-qa7bje-MuiButtonBase-root-MuiPickersDay-root:focus.Mui-selected":
                          {
                            "&:focus": {
                              bgcolor: "#FFAACF",
                              color: "black",
                              fontWeight: "bold",
                            },
                            "&:hover": {
                              bgcolor: "rgba(255, 170, 207, 0.5)",
                              color: "black",
                              fontWeight: "bold",
                            },
                          },
                        ".css-1jsy6pn-MuiButtonBase-root-MuiPickersDay-root:focus.Mui-selected":
                          {
                            border: "1px solid black",

                            "&:focus": {
                              bgcolor: "#FFAACF",
                              color: "black",
                              fontWeight: "bold",
                              border: "1px solid black",
                            },
                            "&:hover": {
                              bgcolor: "rgba(255, 170, 207, 0.5)",
                              color: "black",
                            },
                          },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xl={1} md={1}>
                  <Grid
                    container
                    columns={2}
                    sx={{ mt: "18px", justifyContent: "left" }}
                  >
                    <Typography
                      className={montserrat.className}
                      sx={{ width: "100%", textAlign: "left" }}
                    >
                      {datePicked.format("dddd, DD MMMM") + " " + timePicked} 
                    </Typography>
                    <ToggleButtonGroup
                      orientation="vertical"
                      value={timePicked}
                      onChange={timePickerHandler}
                      exclusive
                    >
                      {timeAvailable.map((x) => {
                        if (
                          dayjs(datePicked.format("YYYY-MM-DD") + " " + x).diff(
                            dayjs(),
                            "minutes"
                          ) > 30
                        )
                          return (
                            //   <Grid
                            //     item
                            //     xl={2}
                            //     key={x}
                            //     sx={{
                            //       mt: "0px",
                            //       justifyContent: { xl: "left", xs: "center" },
                            //       textAlign: { xl: "left", xs: "center" },
                            //     }}
                            //   >
                            <ToggleButton
                              key={x}
                              value={x}
                              className={montserrat.className}
                              sx={{
                                borderRadius: 0,
                                textTransform: "none",
                                color: "black",
                                // color: "white",
                                bgcolor: "#FFAACF",
                                py: "8px",
                                my: "9px",
                                width: "180px",
                                // border: "1px solid black",
                                "&:hover": {
                                  // color: "#5A5A5A",
                                  // backgroundColor: "#EA8FEA",
                                  backgroundColor: "rgba(255, 170, 207, 0.6)",
                                },
                                "&.Mui-selected": {
                                  backgroundColor: "rgba(234, 143, 234)",
                                  "&:hover": {
                                    // color: "#5A5A5A",
                                    // backgroundColor: "#EA8FEA",
                                    backgroundColor: "rgba(234, 143, 234, 0.6)",
                                  },
                                },
                              }}
                            >
                              {x}
                            </ToggleButton>
                            //   </Grid>
                          );
                      })}
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ textAlign: "left", px: "20px" }}>
              <Button
                className={montserrat.className}
                sx={{
                  textTransform: "none",
                  color: "black",
                  // color: "white",
                  bgcolor: "#FFAACF",
                  margin: "10px",
                  px: "20px",
                  // border: "1px solid black",
                  "&:hover": {
                    // color: "#5A5A5A",
                    // backgroundColor: "#EA8FEA",
                    backgroundColor: "rgba(255, 170, 207, 0.4)",
                  },
                  margin: "0 auto",
                }}
                onClick={handleClose}
                autoFocus
              >
                Pesan
              </Button>
            </Box>
          </motion.div>
        )}
      </Container>
    </ThemeProvider>
  );
}

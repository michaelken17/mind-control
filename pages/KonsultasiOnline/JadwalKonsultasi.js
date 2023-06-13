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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { consultantActions } from "@/redux/slices/consultantSlice";

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

// Daftar Psikolog
export default function JadwalKonsultasi(val) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [datePicked, setdatePicked] = useState(dayjs());
  const [timePicked, settimePicked] = useState("");
  const [availability, setAvailability] = useState([]);
  const [timeAvailable, settimeAvailable] = useState([]);
  const [dateTime, setdateTime] = useState("");
  const axios = require("axios");
  const dispatch = useDispatch();
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
    weekdays: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
  });

  const timePickerHandler = (event, next) => {
    settimePicked(next);
    setdateTime(datePicked.format("dddd, DD MMMM") + " " + timePicked);
  };

  useEffect(() => {
    setIsLoaded(true);
    axios
      .get(
        "https://localhost:7184/api/Consultant/GetConsultantAvailability?ConsultantID=" +
          val.consultantData.consultantID
      )
      .then((resp) => {
        setAvailability(resp.data);
      });

    settimeAvailable;
  }, []);

  useEffect(() => {
    // console.log(
    //   availability
    //     .filter((x) => x.hariPertemuan === datePicked.format("dddd"))
    //     .map(({ hariPertemuan, jamPertemuan }) => {
    //       return { hariPertemuan, jamPertemuan };
    //     })
    // );
    console.log(timeAvailable.length);
  }, [timeAvailable]);

  useEffect(() => {
    // console.log("Time: " + dayjs().format("HH:mm:ss"));
    // console.log(datePicked.format("dddd, DD MMMM"));
    settimePicked("");
    settimeAvailable(
      availability
        .filter((x) => x.hariPertemuan === datePicked.format("dddd"))
        .map(({ hariPertemuan, jamPertemuan }) => {
          return { hariPertemuan, jamPertemuan };
        })
    );
  }, [datePicked]);

  useEffect(() => {
    setdateTime(datePicked.format("dddd, DD MMMM") + " " + timePicked);
  }, [timePicked]);

  useEffect(() => {
    console.log(datePicked.format("dddd, DD MMMM"));
    console.log(timePicked);
    dispatch(consultantActions.dateTime({}));
    dispatch(
      consultantActions.dateTime({
        date: datePicked.format("dddd, DD MMMM"),
        time: timePicked,
        datetime: datePicked.format("YYYY-MM-DD") +"T"+timePicked
      })
    );
    console.log(datePicked.format("YYYY-MM-DD") +"T"+timePicked)
  }, [dateTime]);

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
                py: "20px",
              }}
            >
              <Box sx={{ textAlign: "left" }}>
                <Box>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Typography
                      className={montserratExtraBold.className}
                      sx={{ fontSize: "20px" }}
                    >
                      {val.consultantData.fullName}, {val.consultantData.gelar}
                    </Typography>
                    {/* <Box sx={{ flex: "1 1 auto" }} /> */}
                    <Typography
                      className={montserratLight.className}
                      sx={{ fontSize: "20px", ml: "20px" }}
                    >
                      <Grid container>
                        <Grid sx={{ mt: "0px" }}>
                          {val.consultantData.rating.toFixed(1)}
                        </Grid>
                        <Grid>
                          <FavoriteIcon
                            sx={{ mt: "3px", ml: "3px", color: "#FFAACF" }}
                          />
                        </Grid>
                      </Grid>
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  className={montserrat.className}
                  sx={{ fontSize: "17px" }}
                >
                  {val.consultantData.pendidikan}
                </Typography>
                <Typography
                  className={montserrat.className}
                  sx={{ fontSize: "17px", mt: "10px" }}
                >
                  Spesialisasi : {val.consultantData.spesialisasi}
                </Typography>
                <Typography
                  className={montserrat.className}
                  sx={{ fontSize: "17px" }}
                >
                  Pengalaman : {val.consultantData.pengalaman}
                </Typography>
                <Typography
                  className={montserratExtraBold.className}
                  sx={{ fontSize: "17px", color: "black", mt: "10px" }}
                >
                  Rp. {val.consultantData.harga.toLocaleString("id")},00
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <Grid container columns={10} maxWidth={500}>
                  <Grid
                    item
                    xl={7}
                    md={7}
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

                  <Grid item xl={4} md={4}>
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
                      {timeAvailable.length != 0 ? (
                        <ToggleButtonGroup
                          orientation="vertical"
                          value={timePicked}
                          onChange={timePickerHandler}
                          exclusive
                        >
                          {timeAvailable.map((x) => {
                            if (
                              dayjs(
                                datePicked.format("YYYY-MM-DD") +
                                  " " +
                                  x.jamPertemuan
                              ).diff(dayjs(), "minutes") > 30
                            )
                              return (
                                <ToggleButton
                                  key={x.jamPertemuan}
                                  value={x.jamPertemuan}
                                  className={montserrat.className}
                                  sx={{
                                    borderRadius: 0,
                                    textTransform: "none",
                                    color: "black",

                                    bgcolor: "#FFAACF",
                                    py: "8px",
                                    my: "9px",
                                    width: "180px",

                                    "&:hover": {
                                      backgroundColor:
                                        "rgba(255, 170, 207, 0.6)",
                                    },
                                    "&.Mui-selected": {
                                      backgroundColor: "rgba(234, 143, 234)",
                                      "&:hover": {
                                        backgroundColor:
                                          "rgba(234, 143, 234, 0.6)",
                                      },
                                    },
                                  }}
                                >
                                  {x.jamPertemuan}
                                </ToggleButton>
                                //   </Grid>
                              );
                          })}
                        </ToggleButtonGroup>
                      ) : (
                        <Typography
                          className={montserratExtraBold.className}
                          sx={{ width: "100%", textAlign: "left", fontSize:"15px", my:"15px"}}
                          >
                          Jadwal tidak tersedia, mohon mencari hari lain
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </motion.div>
        )}
      </Container>
    </ThemeProvider>
  );
}

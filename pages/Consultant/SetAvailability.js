import { Montserrat } from "next/font/google";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  Tab,
  Tabs,
  Typography,
  circularProgressClasses,
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
import { useEffect, useState } from "react";
import {
  montserrat,
  glacial,
  cooperHewitt,
  montserratBold,
  montserratExtraBold,
} from "../../public/fonts";
import { depressionSeverity } from "../../public/ShortFormConversionTable";
import { rekomendasiDepression } from "../../public/RekomendasiKegiatan";
import CircleIcon from "@mui/icons-material/Circle";
import ErrorIcon from "@mui/icons-material/Error";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Switch from "@mui/material/Switch";
import dayjs from "dayjs";

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

const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export default function SetAvailability() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [value, setValue] = useState("Senin");
  const MHCData = useSelector((x) => x.persistedReducer.app.MHCdata);
  const axios = require("axios");
  const [availableTime, setavailableTime] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [waktu, setWaktu] = useState([
    { time: "09:00", available: false },
    { time: "10:00", available: false },
    { time: "11:00", available: false },
    { time: "12:00", available: false },
    { time: "13:00", available: false },
    { time: "14:00", available: false },
    { time: "15:00", available: false },
    { time: "16:00", available: false },
    { time: "17:00", available: false },
  ]);
  var updateLocale = require("dayjs/plugin/updateLocale");
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekdays: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
  });
  const loginConsultant = useSelector(
    (state) => state.persistedReducer.loginConsultant
  );
  const availabilityChangeHandler = (val) => {
    console.log(val);
    console.log(waktu);
    axios
      .put(
        "https://localhost:7184/api/Consultant/UpdateConsultantAvailability",
        {
          day: value,
          time: val.time,
          available: val.available,
          consultantID: loginConsultant.consultantid,
        }
      )
      .then((resp) => {
        axios
          .get(
            "https://localhost:7184/api/Consultant/GetConsultantAvailability?ConsultantID=" +
              loginConsultant.consultantid
          )
          .then((respGet) => {
            setAvailability(respGet.data);
            console.log(respGet.data);
          });
        if (val.available == true) {
          for (var i = 0; i < waktu.length; i++) {
            if (availableTime.includes(waktu[i].time)) {
              let newArr = [...waktu];
              newArr[i].available = false;
              setWaktu(newArr);
            }
          }
        }
      });
  };

  // Get existing availability
  useEffect(() => {
    let ignore = false;
    console.log(waktu);
    if (!ignore) {
      axios
        .get(
          "https://localhost:7184/api/Consultant/GetConsultantAvailability?ConsultantID=" +
            loginConsultant.consultantid
        )
        .then((resp) => {
          setIsLoaded(true);
          setAvailability(resp.data);
        });
    }
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      setavailableTime(
        availability
          .filter((x) => x.hariPertemuan === value)
          .map(({ hariPertemuan, jamPertemuan }) => {
            return jamPertemuan;
          })
      );
    }
    return () => {
      ignore = true;
    };
  }, [availability]);

  useEffect(() => {
    for (var i = 0; i < waktu.length; i++) {
      if (availableTime.includes(waktu[i].time)) {
        let newArr = [...waktu];
        newArr[i].available = true;
        setWaktu(newArr);
      }
    }
  }, [availableTime]);

  useEffect(() => {
    setWaktu([
      { time: "09:00", available: false },
      { time: "10:00", available: false },
      { time: "11:00", available: false },
      { time: "12:00", available: false },
      { time: "13:00", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "16:00", available: false },
      { time: "17:00", available: false },
    ]);
    setavailableTime(
      availability
        .filter((x) => x.hariPertemuan === value)
        .map(({ hariPertemuan, jamPertemuan }) => {
          return jamPertemuan;
        })
    );

    console.log(value);
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{}}>
        {isLoaded && (
          <Box
            sx={{
              padding: "10px",
              height: "100%",
              border: "0px solid",
              borderColor: "black",
              textAlign: "center",
              justifyItems: "center",
            }}
          >
            <Box
              sx={{
                background: "white",
                padding: "20px",
                // overflow: "auto",
              }}
            >
              <Box sx={{ overflow: "auto" }}>
                <Box sx={{ width: "100%" }}>
                  <TabContext value={value} scrollButtons="auto">
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                      }}
                    >
                      <TabList
                        TabIndicatorProps={{
                          sx: {
                            backgroundColor: "black",
                          },
                        }}
                        onChange={handleChange}
                        variant="scrollable"
                        allowScrollButtonsMobile={true}
                      >
                        {hari.map((val, index) => {
                          return (
                            <Tab
                              key={val}
                              label={val}
                              value={val}
                              className={montserrat.className}
                              sx={{
                                textTransform: "none",
                                "&.Mui-selected": {
                                  color: "black",
                                },
                              }}
                            />
                          );
                        })}
                      </TabList>
                    </Box>
                    {hari.map((val) => {
                      return (
                        <TabPanel value={val} key={val}>
                          <Box>
                            <Typography
                              sx={{
                                fontSize: {
                                  lg: "17px",
                                  xl: "17px",
                                  md: "15px",
                                  sm: "15px",
                                  xs: "13px",
                                },
                                color: "black",
                                textAlign: "left",
                              }}
                              className={montserratBold.className}
                            >
                              Atur ketersediaan anda!
                            </Typography>

                            <Grid container spacing={2} columns={15}>
                              {waktu.map((x, index) => (
                                <Grid item xl={4} md={4} key={index}>
                                  <Box
                                    sx={{
                                      borderRadius: "10px",
                                      marginTop: "10px",
                                      color: "white",
                                      textAlign: "center",
                                      backgroundColor: "white",
                                      border: "1px solid black",
                                      pt: "10px",
                                    }}
                                    className={montserrat.className}
                                  >
                                    <Typography
                                      sx={{ color: "black" }}
                                      className={montserratExtraBold.className}
                                    >
                                      {value}, Jam {x.time}
                                    </Typography>
                                    <FormControlLabel
                                      value="bottom"
                                      control={
                                        <Switch
                                          sx={{
                                            ".css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked": {
                                              color: "#FFAACF",
                                            },
                                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                              {
                                                backgroundColor: "#FFAACF",
                                              },
                                          }}
                                          color="primary"
                                        />
                                      }
                                      label={
                                        x.available == true ? (
                                          <Typography
                                            sx={{ color: "black" }}
                                            className={montserratBold.className}
                                          >
                                            Available
                                          </Typography>
                                        ) : (
                                          <Typography sx={{ color: "black" }}>
                                            Not Available
                                          </Typography>
                                        )
                                      }
                                      labelPlacement="end"
                                      checked={x.available}
                                      onChange={() =>
                                        availabilityChangeHandler(x)
                                      }
                                    />
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        </TabPanel>
                      );
                    })}
                  </TabContext>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

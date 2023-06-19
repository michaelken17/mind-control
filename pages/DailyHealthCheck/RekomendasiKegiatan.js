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
} from "../../public/fonts";
import { depressionSeverity } from "../../public/ShortFormConversionTable";
import { rekomendasiDepression } from "../../public/RekomendasiKegiatan";
import CircleIcon from "@mui/icons-material/Circle";
import ErrorIcon from "@mui/icons-material/Error";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

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

//DEPRESSION
export default function RekomendasiKegiatan() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [value, setValue] = useState("Anxiety");
  const [depressionSolutions, setdepressionSolutions] = useState([]);
  const [anxietySolutions, setanxietySolutions] = useState([]);
  const [OCDSolutions, setOCDSolutions] = useState([]);
  const [SDSolutions, setSDSolutions] = useState([]);
  const MHCData = useSelector((x) => x.persistedReducer.app.MHCdata);
  const datePicked = useSelector((x) => x.persistedReducer.consultant.dateTime);
  const axios = require("axios");
  // const depressionSolutions = useSelector(
  //   (x) => x.persistedReducer.app.depressionSolutions
  // );
  // const anxietySolutions = useSelector(
  //   (x) => x.persistedReducer.app.anxietySolutions
  // );
  // const OCDSolutions = useSelector((x) => x.persistedReducer.app.OCDSolutions);
  // const SDSolutions = useSelector((x) => x.persistedReducer.app.SDSolutions);

  useEffect(() => {
      axios
      .get("https://localhost:7184/api/MI/GetSolutions?MDID=" + 1)
      .then((resp) => {
        setdepressionSolutions(resp.data)
      });
      axios
      .get("https://localhost:7184/api/MI/GetSolutions?MDID=" + 2)
      .then((resp) => {
        setanxietySolutions(resp.data)
      });
      axios
      .get("https://localhost:7184/api/MI/GetSolutions?MDID=" + 3)
      .then((resp) => {
        setOCDSolutions(resp.data)
      });
      axios
      .get("https://localhost:7184/api/MI/GetSolutions?MDID=" + 4)
      .then((resp) => {
        setSDSolutions(resp.data)
      });
  }, []);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setIsLoaded(true);
    console.log(MHCData);

    for (var i = 0; i < MHCData.length; i++) {
      if (MHCData[i].severity > 2) {
        setValue(MHCData[i].title);
        break;
      }
    }
  }, [MHCData]);

  useEffect(() => {
    console.log(value);
  }, [value]);

  useEffect(() => {
    console.log(depressionSolutions);
    console.log(anxietySolutions);
    console.log(OCDSolutions);
    console.log(SDSolutions);
  }, [depressionSolutions, anxietySolutions, OCDSolutions, SDSolutions]);

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
            <Typography
              className={cooperHewitt.className}
              sx={{
                color: "#393939",
                fontSize: {
                  lg: "50px",
                  md: "40px",
                  sm: "30px",
                  xs: "30px",
                },
              }}
            >
              BERBAGAI CARA UNTUK MENINGKATKAN KESEHATAN MENTAL
            </Typography>

            <Box
              sx={{
                background: "white",
                padding: "20px",
                // overflow: "auto",
              }}
            >
              <Box sx={{ overflow: "auto" }}>
                {/* LIST SOLUSI */}

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
                        {MHCData.map((val, index) => {
                          if (val.severity >= 2)
                            return (
                              <Tab
                                key={val.title}
                                label={val.title}
                                value={val.title}
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
                    <TabPanel value={"Depression"}>
                      <Box>
                        <Grid container spacing={1} columns={16}>
                          {depressionSolutions.map((x, index) => (
                            <Grid
                              key={index}
                              item
                              lg={8}
                              md={8}
                              sm={8}
                              xl={8}
                              sx={{
                                justifyContent: "center",
                                textAlign: "center",
                              }}
                            >
                              <Box
                                component="img"
                                sx={{
                                  maxHeight: { xs: 230, md: 230, lg: 250 },
                                  maxWidth: { xs: 290, md: 290, lg: 300 },
                                }}
                                alt=""
                                src={x.imagePath}
                              />
                              <Typography
                                sx={{
                                  fontSize: {
                                    lg: "17px",
                                    md: "15px",
                                    sm: "15px",
                                    xs: "13px",
                                  },
                                  color: "black",
                                  textAlign: "center",
                                }}
                                className={montserrat.className}
                              >
                                {/* <CircleIcon sx={{ paddingTop: "11px" }} />{" "} */}
                                {x.dailyRecommendationName}
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </TabPanel>
                    <TabPanel value={"Anxiety"}>
                      <Box>
                        <Grid container spacing={1} columns={16}>
                          {anxietySolutions.map((x, index) => (
                            <Grid
                              key={index}
                              item
                              lg={8}
                              md={8}
                              sm={8}
                              xl={8}
                              sx={{
                                justifyContent: "center",
                                textAlign: "center",
                              }}
                            >
                              <Box
                                component="img"
                                sx={{
                                  maxHeight: { xs: 230, md: 230, lg: 250 },
                                  maxWidth: { xs: 290, md: 290, lg: 300 },
                                }}
                                alt=""
                                src={x.imagePath}
                              />
                              <Typography
                                sx={{
                                  fontSize: {
                                    lg: "17px",
                                    md: "15px",
                                    sm: "15px",
                                    xs: "13px",
                                  },
                                  color: "black",
                                  textAlign: "center",
                                }}
                                className={montserrat.className}
                              >
                                {/* <CircleIcon sx={{ paddingTop: "11px" }} />{" "} */}
                                {x.dailyRecommendationName}
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </TabPanel>
                    <TabPanel value={"OCD"}>
                      <Box>
                        <Grid container spacing={1} columns={16}>
                          {OCDSolutions.map((x, index) => (
                            <Grid
                              key={index}
                              item
                              lg={8}
                              md={8}
                              sm={8}
                              xl={8}
                              sx={{
                                justifyContent: "center",
                                textAlign: "center",
                              }}
                            >
                              <Box
                                component="img"
                                sx={{
                                  maxHeight: { xs: 230, md: 230, lg: 300 },
                                  maxWidth: { xs: 290, md: 290, lg: 300 },
                                }}
                                alt=""
                                src={x.imagePath}
                              />
                              <Typography
                                sx={{
                                  fontSize: {
                                    lg: "17px",
                                    md: "15px",
                                    sm: "15px",
                                    xs: "13px",
                                  },
                                  color: "black",
                                  textAlign: "center",
                                }}
                                className={montserrat.className}
                              >
                                {/* <CircleIcon sx={{ paddingTop: "11px" }} />{" "} */}
                                {x.dailyRecommendationName}
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </TabPanel>
                    <TabPanel value={"Sleep Disorder"}>
                      <Box>
                        <Grid container spacing={1} columns={16}>
                          {SDSolutions.map((x, index) => (
                            <Grid
                              key={index}
                              item
                              lg={8}
                              md={8}
                              sm={8}
                              xl={8}
                              sx={{
                                justifyContent: "center",
                                textAlign: "center",
                              }}
                            >
                              <Box
                                component="img"
                                sx={{
                                  maxHeight: { xs: 230, md: 230, lg: 300 },
                                  maxWidth: { xs: 290, md: 290, lg: 300 },
                                }}
                                alt=""
                                src={x.imagePath}
                              />
                              <Typography
                                sx={{
                                  fontSize: {
                                    lg: "17px",
                                    md: "15px",
                                    sm: "15px",
                                    xs: "13px",
                                  },
                                  color: "black",
                                  textAlign: "center",
                                }}
                                className={montserrat.className}
                              >
                                {/* <CircleIcon sx={{ paddingTop: "11px" }} />{" "} */}
                                {x.dailyRecommendationName}
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </TabPanel>
                  </TabContext>
                </Box>

                <Box sx={{ display: "flex", marginTop: "50px" }}>
                  <ErrorIcon
                    fontSize="17px"
                    sx={{
                      marginTop: "3px",
                      marginRight: "5px",
                      color: "orange",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: {
                        lg: "17px",
                        md: "16px",
                        sm: "15px",
                        xs: "16px",
                      },
                      color: "#5d5d5d",
                      textAlign: "justify",
                      marginBottom: "15px",
                    }}
                    className={glacial.className}
                  >
                    Isilah tes Daily Health Check untuk memantau kesehatan
                    mental Anda hari ini!
                  </Typography>
                </Box>
                {/* Button for daily health check */}
                <motion.div style={{ textAlign: "left" }}>
                  <Link href="Test">
                    <button
                      style={{
                        borderRadius: 10,
                        padding: "15px",
                        marginLeft: "20px",
                        marginRight: "20px",
                        fontSize: "20px",
                        border: "0px ",
                        backgroundColor: "#FF4E9B",
                        cursor: "pointer",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: { xs: "14px", xl: "18px" } }}
                        className={montserratBold.className}
                      >
                        Lakukan Daily Health Check Hari ini!
                      </Typography>
                    </button>
                  </Link>
                </motion.div>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

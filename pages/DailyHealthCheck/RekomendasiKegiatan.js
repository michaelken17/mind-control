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
import { depressionSeverity } from "../ShortFormConversionTable";
import { rekomendasiDepression } from "../RekomendasiKegiatan";
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
  const [value, setValue] = useState("1");
  const MHCData = useSelector((x) => x.persistedReducer.app.MHCdata);
  const depressionSolutions = useSelector(
    (x) => x.persistedReducer.app.depressionSolutions
  );
  const anxietySolutions = useSelector(
    (x) => x.persistedReducer.app.anxietySolutions
  );
  const OCDSolutions = useSelector((x) => x.persistedReducer.app.OCDSolutions);
  const SDSolutions = useSelector((x) => x.persistedReducer.app.SDSolutions);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setIsLoaded(true);
    console.log(MHCData);
  }, []);

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
                          style: {
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
                                label={val.title}
                                value={(index + 1).toString()}
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
                    <TabPanel value="1">
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
                                src={x.image}
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
                                {x.solution}
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </TabPanel>
                    <TabPanel value="2">
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
                                src={x.image}
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
                                {x.solution}
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </TabPanel>
                    <TabPanel value="3">
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
                                src={x.image}
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
                                {x.solution}
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </TabPanel>
                    <TabPanel value="4">
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
                                src={x.image}
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
                                {x.solution}
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
                <motion.div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      borderRadius: 10,
                      padding: "15px",
                      marginLeft: "20px",
                      marginRight: "20px",
                      fontSize: "20px",
                      border: "0px ",
                      backgroundColor: "#FF4E9B",
                    }}
                  >
                    <Link href="Test">
                      <Typography
                        sx={{ fontSize: { xs: "14px", xl: "18px" } }}
                        className={montserratBold.className}
                      >
                        Lakukan Daily Health Check Hari ini!
                      </Typography>{" "}
                    </Link>
                  </button>
                </motion.div>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

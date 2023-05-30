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
import { montserrat, glacial, cooperHewitt } from "../../public/fonts";
import { depressionSeverity } from "../ShortFormConversionTable";
import { rekomendasiDepression } from "../RekomendasiKegiatan";
import CircleIcon from "@mui/icons-material/Circle";
import ErrorIcon from "@mui/icons-material/Error";

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
  const depressionSolutions = useSelector(
    (x) => x.persistedReducer.app.depressionSolutions
  );
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{}}>
        {isLoaded && (
          <div
            style={{
              padding: 10,
              fontSize: 20,
              borderRadius: 10,
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

            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: 10,
                // overflow: "auto",
              }}
            >
              <div style={{ overflow: "auto" }}>
                {/* LIST SOLUSI */}
                <Grid container spacing={1} columns={16}>
                  {depressionSolutions
                    .filter((item, index) => index < 5)
                    .map((x, index) => (
                      <Grid item lg={8} md={8} sm={8}>
                        <Box
                          component="img"
                          sx={{
                            height: 233,
                            width: 350,
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
                            textAlign: "left",
                          }}
                          className={montserrat.className}
                        >
                          {/* <CircleIcon sx={{ paddingTop: "11px" }} />{" "} */}
                          {x.solution}
                        </Typography>
                      </Grid>
                    ))}
                  {depressionSolutions
                    .filter((item, index) => index >= 5)
                    .map((x, index) => (
                      <Grid item lg={8} md={8} sm={8}>
                        <Box
                          component="img"
                          sx={{
                            height: 350,
                            width: 300,
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
                            textAlign: "left",
                          }}
                          className={montserrat.className}
                        >
                          {/* <CircleIcon sx={{ paddingTop: "11px" }} />{" "} */}
                          {x.solution}
                        </Typography>
                      </Grid>
                    ))}
                </Grid>
                <div style={{ display: "flex", marginTop: "50px" }}>
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
                    Isilah tes Daily Health Check untuk
                    memantau kesehatan mental Anda hari ini!
                  </Typography>
                </div>
                {/* Button for daily health check */}
                <motion.div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      borderRadius: 10,
                      padding: 20,
                      marginLeft: "20px",
                      marginRight: "20px",
                      fontSize: "20px",
                      border: "0px ",
                      backgroundColor: "#FF4E9B",
                    }}
                  >
                    <Link href="Test" legacyBehavior>Lakukan Daily Health Check Hari ini!</Link>
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </ThemeProvider>
  );
}

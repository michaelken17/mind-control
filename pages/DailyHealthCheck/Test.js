import { Montserrat } from "next/font/google";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  ToggleButton,
  ToggleButtonGroup,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceAngry,
  faFaceGrinBeam,
  faFaceMeh,
  faFaceSmile,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";

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

export default function DHCTest() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [alignment, setAlignment] = useState("biasa");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

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
              PEMERIKSAAN KESEHATAN MENTAL HARIAN
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
                  <Grid item lg={8} md={8} sm={8}>
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
                      <ToggleButtonGroup
                        onChange={handleChange}
                        value={alignment}
                        exclusive
                        sx={{
                          selected: {
                            "&&": {
                              backgroundColor: "green",
                              color: theme.palette.secondary.main,
                            },
                          },
                        }}
                      >
                        <ToggleButton
                          className={montserrat.className}
                          value="buruk"
                          sx={{
                            textTransform: "none",
                            color: "black",
                            p: "20px",
                          }}
                        >
                          <Grid>
                            <FontAwesomeIcon
                              icon={faFaceAngry}
                              style={{ fontSize: "40px", color: "#EB5353" }}
                            />
                            <Typography>Buruk</Typography>
                          </Grid>
                        </ToggleButton>
                        <ToggleButton
                          className={montserrat.className}
                          sx={{
                            textTransform: "none",
                            color: "black",
                            p: "20px",
                          }}
                          value="kurang"
                        >
                          <Grid>
                            <FontAwesomeIcon
                              icon={faFaceFrown}
                              style={{ fontSize: "40px", color: "#ffa700" }}
                            />
                            <Typography>Kurang</Typography>
                          </Grid>
                        </ToggleButton>
                        <ToggleButton
                          className={montserrat.className}
                          sx={{
                            textTransform: "none",
                            color: "black",
                            p: "20px",
                          }}
                          value="biasa"
                        >
                          <Grid>
                            <FontAwesomeIcon
                              icon={faFaceMeh}
                              style={{ fontSize: "40px", color: "#fff400" }}
                            />
                            <Typography>Biasa</Typography>
                          </Grid>
                        </ToggleButton>
                        <ToggleButton
                          className={montserrat.className}
                          sx={{
                            textTransform: "none",
                            color: "black",
                            p: "20px",
                          }}
                          value="lumayan"
                        >
                          <Grid>
                            <FontAwesomeIcon
                              icon={faFaceSmile}
                              style={{ fontSize: "40px", color: "#b0cdff" }}
                            />
                            <Typography>Lumayan</Typography>
                          </Grid>
                        </ToggleButton>
                        <ToggleButton
                          className={montserrat.className}
                          sx={{
                            textTransform: "none",
                            color: "black",
                            p: "20px",
                          }}
                          value="baik"
                        >
                          <Grid>
                            <FontAwesomeIcon
                              icon={faFaceGrinBeam}
                              style={{ fontSize: "40px", color: "#59CE8F" }}
                            />
                            <Typography>Baik</Typography>
                          </Grid>
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Typography>
                  </Grid>
                </Grid>
                {/* Button submit */}
                <motion.div style={{ textAlign: "left" }}>
                  <button
                    style={{
                      borderRadius: 10,
                      padding: "15px",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      marginTop: "20px",
                      fontSize: "20px",
                      border: "0px ",
                      backgroundColor: "#FFAACF",
                    }}
                  >
                    <Link href="/">Submit</Link>
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

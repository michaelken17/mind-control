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
  ImageListItem,
  ImageListItemBar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  Typography,
  circularProgressClasses,
  createTheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "styles/Quiz.module.css";
import dayjs from "dayjs";
import {
  montserrat,
  glacial,
  cooperHewitt,
  montserratExtraBold,
  montserratLight,
  montserratBold,
} from "fonts";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import ErrorIcon from "@mui/icons-material/Error";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventIcon from "@mui/icons-material/Event";
import { ThemeProvider } from "@emotion/react";
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
const theme = createTheme({
  typography: {
    fontFamily: montserrat,
  },
  button: {
    fontFamily: montserrat,
  },
});

export default function HomeConsultant() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [consultantData, setconsultantData] = useState([]);
  const [listPatient, setlistPatient] = useState([]);
  const axios = require("axios");
  const [doneConsult, setdoneConsult] = useState(false);
  const [timeDiff, setTimeDiff] = useState(0);
  const loginConsultant = useSelector(
    (state) => state.persistedReducer.loginConsultant
  );
  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          "/api/Consultant/GetListPatientForConsultant?ConsultantID=" +
          loginConsultant.consultantid
      )
      .then((resp) => {
        // setlistPatient(resp.data.filter((x) => x.isActived === true));
        // console.log(resp.data.filter((x) => x.isActived === true));
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {" "}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        style={{ textAlign: "center" }}
        exit={{ opacity: 0 }}
      >
        {/* MindControl Logo */}
        <Box>
          <Container>
            <Box>
              <Box
                component="img"
                sx={{
                  height: { xs: 160, sm: 220, md: 220, lg: 280 },
                  width: { xs: 290, sm: 400, md: 400, lg: 500 },
                }}
                alt="bg"
                src="/image/MCFullLogo.png"
              />
              <Box style={{ marginTop: "1px" }}>
                <Typography
                  sx={{
                    fontSize: { xs: "19px", md: "20px", xl: "24px" },
                    color: "#FFAACF",
                  }}
                  className={cooperHewitt.className}
                >
                  {"FOR CONSULTANT"}
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>

        <Container>
          <Box
            sx={{
              // bgcolor: "gray",
              marginTop: "20px",
              textAlign: {
                xs: "justify",
                sm: "center",
                md: "center",
                xl: "center",
              },
              display: {},
            }}
          >
            {/* <Typography
          className={montserratExtraBold.className}
          sx={{
            fontSize: { xs: "19px", md: "22px" },
            color: "black",
          }}
        >
          Daftar Konsultasi Online
        </Typography>

        <Typography
          className={montserrat.className}
          sx={{ fontSize: { xs: "15px", md: "17px" }, color: "black" }}
        >
          Berikut adalah daftar konsultasi online bersama pasien yang sudah
          terjadwalkan
        </Typography> */}
          </Box>
        </Container>

        <motion.div
          style={{
            // padding: "10px",
            borderRadius: 10,
            fontSize: 20,
            height: "100%",
            //  border: "1px solid",
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
              borderRadius: 10,
              // overflow: "auto",
            }}
          >
            <Box
              className={styles.quizDiv}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                paddingTop: "30px",
                paddingBottom: "20px",
                marginTop: "30px",
                px: "50px",
              }}
            >
              <Grid
                container
                columns={2}
                spacing={4}
                sx={{ width: "50%" }}
                justifyContent="center"
              >
                <Grid
                  item
                  xl={1}
                  xs={4}
                  lg={1}
                  sm={2}
                  sx={{
                    justifyItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <Link legacyBehavior href="/Consultant/SetAvailability">
                    <ImageListItem
                      sx={{
                        borderRadius: "20px",
                        margin: "0 auto",
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        // height: { xs: 250, sm: 220, md: 220, lg: 270 },
                        width: { xs: 300, sm: 300, md: 400, lg: 300 },
                      }}
                    >
                      <Box
                        sx={{
                          borderRadius: "20px",
                          color: "black",
                          height: { xs: 250, sm: 250, md: 300, lg: 250 },
                          width: { xs: 300, sm: 300, md: 400, lg: 300 },
                        }}
                      >
                        <EventIcon
                          sx={{
                            marginTop: "50px",
                            fontSize: "100px",
                            color: "rgba(1, 1, 1, 0.5)",
                          }}
                        />
                      </Box>
                      <ImageListItemBar
                        sx={{
                          borderBottomLeftRadius: "20px",
                          borderBottomRightRadius: "20px",
                        }}
                        title={
                          <Typography
                            sx={{ fontSize: "20px" }}
                            className={glacial.className}
                          >
                            Set Availability
                          </Typography>
                        }
                      />
                    </ImageListItem>
                  </Link>
                </Grid>

                <Grid
                  item
                  xl={1}
                  xs={4}
                  lg={1}
                  sm={2}
                  sx={{
                    justifyItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <Link legacyBehavior href="/Consultant/PatientList">
                    <ImageListItem
                      sx={{
                        borderRadius: "20px",
                        margin: "0 auto",
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        // height: { xs: 250, sm: 220, md: 220, lg: 270 },
                        width: { xs: 300, sm: 300, md: 400, lg: 300 },
                      }}
                    >
                      <Box
                        sx={{
                          borderRadius: "20px",
                          color: "black",
                          height: { xs: 250, sm: 250, md: 300, lg: 250 },
                          width: { xs: 300, sm: 300, md: 400, lg: 300 },
                        }}
                      >
                        <LocalHospitalIcon
                          sx={{
                            marginTop: "50px",
                            fontSize: "100px",
                            color: "rgba(1, 1, 1, 0.5)",
                          }}
                        />
                      </Box>
                      <ImageListItemBar
                        sx={{
                          borderBottomLeftRadius: "20px",
                          borderBottomRightRadius: "20px",
                        }}
                        className={glacial.className}
                        title={
                          <Typography
                            sx={{ fontSize: "20px" }}
                            className={glacial.className}
                          >
                            Patient List
                          </Typography>
                        }
                      />
                    </ImageListItem>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </motion.div>
        {/* Fitur Lainnya */}

        {/* <Container sx={{ marginTop: "30px" }}>
      <Typography
        className={montserratLight.className}
        sx={{ textAlign: "left", color: "gray", marginBottom: "10px" }}
      >
        Fitur-fitur lainnya...
      </Typography>
      <Grid container columns={{ xs: 4, sm: 8, xl: 12 }} spacing={{ xl: 17 }}>
        <Grid item xl={6}>
          <Box
            sx={{
              // bgcolor: "gray",
              textAlign: "justify",
            }}
          >
            <Typography
              className={montserratExtraBold.className}
              sx={{
                fontSize: { xs: "19px", md: "22px" },
                color: "#FFAACF",
              }}
            >
              <i>Mental Illness Test</i>
            </Typography>
            <Typography
              className={montserrat.className}
              sx={{
                fontSize: { xs: "19px", md: "18px" },
                color: "#EA8FEA",
              }}
            >
              Tes Penilaian Diri Penyakit Kesehatan Mental
            </Typography>
            <Typography
              className={montserrat.className}
              sx={{ fontSize: { xs: "15px", md: "17px" }, color: "black" }}
            >
              Pengecekan penyakit mental berfungsi sebagai tes penilaian diri
              yang dapat mengidentifikasi tingkat keparahan penyakit mental
              yang dialami secara spesifik. Tes akan membantu memberikan
              solusi dan rekomendasi untuk meningkatkan kesehatan mental dan
              juga membantu menentukan apakah harus mencari bantuan dari
              psikolog untuk mengatasi masalah kesehatan mental.
            </Typography>
            <br />
          </Box>
        </Grid>

        <Grid item xl={6}>
          <Box
            sx={{
              textAlign: "justify",
            }}
          >
            <Typography
              className={montserratExtraBold.className}
              sx={{
                fontSize: { xs: "19px", md: "22px" },
                color: "#FFAACF",
              }}
            >
              <i>Daily Health Check</i>
            </Typography>
            <Typography
              className={montserrat.className}
              sx={{
                fontSize: { xs: "19px", md: "18px" },
                color: "#EA8FEA",
              }}
            >
              Pemeriksaan Kesehatan Mental Harian
            </Typography>
            <Typography
              className={montserrat.className}
              sx={{
                fontSize: { xs: "15px", md: "17px" },
                color: "black",
                textAlign: "justify",
              }}
            >
              Pengecekan kesehatan mental harian dapat membuat anda tetap
              terkendali dan mengingatkan tentang waktu untuk perawatan diri
              dan kebahagiaan. Kita seringkali mengabaikannya kebahagiaan diri
              sendiri dan menjadikan diri sendiri sebagai prioritas terakhir.
              Pertanyaan harian kesehatan mental ini dapat membantu
              mempertahankan keadaan pikiran dan emosi anda.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container> */}

        {/* Footer
    <Box
      className={styles.quizDiv}
      sx={{
        p: "10px",
        textAlign: "center",
        justifyContent: "center",
        display: { xs: "none", xl: "block" },
        marginTop: "30px",
      }}
    ></Box> */}
      </motion.div>
    </ThemeProvider>
  );
}

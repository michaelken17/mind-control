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
} from "../../public/fonts";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import ErrorIcon from "@mui/icons-material/Error";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventIcon from "@mui/icons-material/Event";
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

export default function PatientList() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();
  const [listPatientData, setlistPatientData] = useState([]);
  const [timeDiff, setTimeDiff] = useState(0);
  const login = useSelector((state) => state.persistedReducer.login);
  const axios = require("axios");
  const [readMore, setReadMore] = useState(false);
  const [doneConsult, setdoneConsult] = useState(false);
  const loginConsultant = useSelector(
    (state) => state.persistedReducer.loginConsultant
  );

  useEffect(() => {
    axios
      .get(
        "https://localhost:7184/api/Consultant/GetListPatientForConsultant?ConsultantID=" +
          loginConsultant.consultantid
      )
      .then((resp) => {
        console.log(resp.data);
        setlistPatientData(resp.data);
        setIsLoaded(true);
      });
  }, []);

  return (
    <Container component="main" maxWidth="lg" sx={{}}>
      {isLoaded && (
        <motion.div
          style={{
            // padding: "10px",
            borderRadius: 10,
            fontSize: 20,
            height: "100%",
            marginTop: "15px",
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
              padding: "20px",
              borderRadius: 10,
              // overflow: "auto",
            }}
          >
            {listPatientData.fullNamePatient != null ? (
              <Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xl: "20px", md: "19px", xs: "17px" },
                      color: "black",
                      textAlign: "left",
                    }}
                    className={montserratExtraBold.className}
                  >
                    Jadwal Konsultasi
                  </Typography>
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
                    className={montserrat.className}
                  >
                    Berikut adalah jadwal konsultasi bersama pasien
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                    marginTop: "30px",
                  }}
                >
                  <Card
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      borderRadius: "10px",
                    }}
                  >
                    <CardHeader
                      sx={{ padding: "20px" }}
                      avatar={
                        <Avatar sx={{ bgcolor: "#FFAACF" }}>
                          <Typography
                            className={montserratExtraBold.className}
                            sx={{ fontSize: "20px" }}
                          >
                            {listPatientData.fullNamePatient.charAt(0)}
                          </Typography>
                        </Avatar>
                      }
                      // action={
                      //   <Box sx={{ display: "flex" }}>
                      //     <Typography
                      //       sx={{ marginRight: "5px" }}
                      //       className={montserratBold.className}
                      //     >
                      //       rating
                      //     </Typography>
                      //     <FavoriteIcon sx={{ color: "#FFAACF" }} />
                      //   </Box>
                      // }
                      title={
                        <Typography className={montserratExtraBold.className}>
                          {listPatientData.fullNamePatient}
                        </Typography>
                      }
                      subheader={
                        <Box>
                          <Grid container>
                            <Grid>
                              <AccessTimeFilledIcon
                                sx={{
                                  fontSize: "17px",
                                  mt: "4px",
                                  mr: "5px",
                                  color: "black",
                                }}
                              />
                            </Grid>
                            <Grid>
                              <Typography
                                className={montserratBold.className}
                                sx={{
                                  fontSize: "16px",
                                  mb: "5px",
                                  color: "black",
                                }}
                              >
                                {dayjs(listPatientData.tanggalPertemuan).format(
                                  "dddd, DD MMMM HH:mm"
                                )}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      }
                    />
                    <Divider />
                    <CardContent sx={{ pt: "10px", pb: "0px" }}></CardContent>
                    <CardActions
                      sx={{
                        justifyContent: "space-between",
                        pl: "16px",
                        pt: "0px",
                      }}
                    >
                      <Typography
                        className={montserratExtraBold.className}
                        sx={{ fontSize: "16px" }}
                      >
                        Rp. {listPatientData.harga.toLocaleString("id")},00 (
                        {listPatientData.tipePembayaran})
                      </Typography>{" "}
                      {doneConsult == false ? (
                        <Button
                          sx={{
                            textTransform: "none",
                            color: "white",
                            backgroundColor: "#FFAACF",
                            "&:hover": {
                              color: "white",
                              backgroundColor: "#EA8FEA",
                            },
                            "&:disabled": {
                              color: "black",
                              backgroundColor: "#EEEEEE",
                            },
                          }}
                          disabled={
                            (timeDiff >= 0 && timeDiff < 30) ||
                            doneConsult == true
                              ? false
                              : true
                          }
                        >
                          {timeDiff >= 0 && timeDiff < 30 ? (
                            <Typography
                              className={montserratBold.className}
                              sx={{ fontSize: "14px", px: "10px" }}
                              //   onClick={startMeetingHandler}
                            >
                              Mulai
                            </Typography>
                          ) : timeDiff >= 30 ? (
                            <Typography
                              className={montserratBold.className}
                              sx={{ fontSize: "14px", px: "10px" }}
                            >
                              Sudah melewati jadwal. Mohon melakukan booking
                              ulang.
                            </Typography>
                          ) : (
                            <Typography
                              className={montserratBold.className}
                              sx={{ fontSize: "14px", px: "10px" }}
                            >
                              Belum waktunya
                            </Typography>
                          )}
                        </Button>
                      ) : (
                        <Typography
                          className={montserratBold.className}
                          sx={{ fontSize: "15px", px: "10px" }}
                        >
                          Konsultasi sedang berlangsung
                        </Typography>
                      )}
                    </CardActions>
                  </Card>
                </Box>
              </Box>
            ) : (
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  sx={{
                    mt: "30px",
                    fontSize: { xl: "17px", md: "16px", xs: "14px" },
                    color: "black",
                    textAlign: "left",
                  }}
                  className={montserratExtraBold.className}
                >
                  Anda tidak memiliki jadwal konsultasi.
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xl: "17px", md: "16px", xs: "14px" },
                    color: "black",
                    textAlign: "left",
                  }}
                  className={montserratBold.className}
                >
                  Mohon mengunjungi halaman Pemesanan Konsultasi untuk booking
                  konsultasi
                </Typography>
                <Button
                  sx={{
                    borderRadius: "10px",
                    padding: "10px",
                    paddingLeft: "30px",
                    textTransform: "none",
                    paddingRight: "30px",
                    marginTop: "20px",
                    color: "white",
                    fontSize: "17px",
                    backgroundColor: "#FFAACF",
                    "&:hover": {
                      color: "white",
                      backgroundColor: "#EA8FEA",
                    },
                  }}
                  className={montserrat.className}
                >
                  <Link
                    legacyBehavior
                    href="/KonsultasiOnline/PemesananKonsultasi"
                  >
                    Pemesanan Konsultasi
                  </Link>
                </Button>
              </Box>
            )}
          </Box>
        </motion.div>
      )}
    </Container>
  );
}

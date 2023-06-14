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
import { Fragment, forwardRef, useEffect, useState } from "react";
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
import ErrorIcon from "@mui/icons-material/Error";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

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
const today = dayjs();

// List Konsultasi
export default function ListKonsultasi() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();
  const [listPatientData, setlistPatientData] = useState([]);
  const [timeDiff, setTimeDiff] = useState(0);
  const login = useSelector((state) => state.persistedReducer.login);
  const axios = require("axios");
  const [readMore, setReadMore] = useState(false);
  const [doneConsult, setdoneConsult] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://localhost:7184/api/Consultant/GetListPatientForPatient?UserID=" +
          login.userid
      )
      .then((resp) => {
        setlistPatientData(resp.data);
        setIsLoaded(true);
        if (resp.data.status == "ongoing") {
          setdoneConsult(true);
        }
      });
  }, []);

  useEffect(() => {
    setTimeDiff(today.diff(dayjs(listPatientData.tanggalPertemuan), "minute"));
    console.log(listPatientData);
  }, [listPatientData]);

  const startMeetingHandler = () => {
    Swal.fire({
      title: "Mulai Konsultasi Online?",
      icon: "warning",
      showDenyButton: true,
      showConfirmButton: true,
      allowOutsideClick: false,

      // html: "<a>Berikut adalah Zoom Meeting untuk Konsultasi Online:</a> <br/>  <a target='_blank'>https://binus.zoom.us/j/99515710879</a>",
      html: "<a>Menekan tombol Mulai akan membuka Zoom Meeting untuk Konsultasi Online</a>",
      background: "white",
      confirmButtonText: `<a>Mulai</a>`,
      confirmButtonColor: "#59CE8F",
      denyButtonColor: "#EB5353",
      denyButtonText: `<a>Cancel</a>`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log("true");

        axios
          .put(
            "https://localhost:7184/api/Consultant/UpdateStatusListPatient?UserID=" +
              login.userid +
              "&status=ongoing"
          )
          .then((respUpdate) => {
            console.log(respUpdate);
            setdoneConsult(true);
          });
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
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
              {listPatientData.fullNameConsultant != null ? (
                <Fragment>
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
                      Berikut adalah jadwal konsultasi anda
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: "gray",
                        textAlign: "left",
                        cursor: "pointer",
                        fontSize: "15px",
                        marginTop: "12px",
                        textDecoration: "underline",
                      }}
                      onClick={() => {
                        if (readMore == true) setReadMore(false);
                        else setReadMore(true);
                      }}
                      className={montserrat.className}
                    >
                      {readMore == true
                        ? "Baca lebih sedikit..."
                        : "Baca disclaimer!"}
                    </Typography>
                    {readMore && (
                      <Box sx={{ display: "flex", marginTop: "5px" }}>
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
                              xl: "15px",
                              lg: "15px",
                              md: "14px",
                              sm: "14px",
                              xs: "13px",
                            },
                            color: "black",
                            textAlign: "justify",
                            marginBottom: "15px",
                          }}
                          className={montserratBold.className}
                        >
                          Mohon masuk ke dalam Konsultasi Online tepat waktu.{" "}
                          <br />
                          Psikolog hanya akan menunggu selama 30 menit setelah
                          jadwal yang ditentukan.
                          <br />
                          Jika Anda gagal bergabung dalam Konsultasi Online
                          tepat waktu, maka pembayaran akan hangus.
                          <br />
                        </Typography>
                      </Box>
                    )}
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
                              {listPatientData.fullNameConsultant.charAt(0)}
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
                            {listPatientData.fullNameConsultant},{" "}
                            {listPatientData.gelar}
                          </Typography>
                        }
                        subheader={
                          <Box>
                            <Typography
                              className={montserrat.className}
                              sx={{ fontSize: "16px" }}
                            >
                              {listPatientData.pendidikan}
                            </Typography>
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
                                  {dayjs(
                                    listPatientData.tanggalPertemuan
                                  ).format("dddd, DD MMMM HH:mm")}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        }
                      />
                      <Divider />
                      <CardContent sx={{ pt: "10px", pb: "0px" }}>
                        <Typography
                          className={montserratBold.className}
                          sx={{ fontSize: "16px", mb: "0px" }}
                        >
                          {listPatientData.spesialisasi}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            paddingLeft: "5px",
                            // bgcolor: "rgba(0,0,0,0.5)",
                            width: "130px",
                            borderRadius: "5px",
                            justifyContent: "center",
                          }}
                        >
                          <Grid container columns={8} sx={{ padding: 0 }}>
                            <Grid item xl={1} sx={{ pt: "5px" }}>
                              <WorkHistoryIcon
                                sx={{
                                  fontSize: "22px",
                                  color: "black",
                                }}
                              />
                            </Grid>

                            <Grid item xl={6} sx={{ paddingLeft: "5px" }}>
                              <Typography
                                className={montserratBold.className}
                                sx={{
                                  pt: "6px",
                                  fontSize: "15px",
                                  color: "black",
                                  textAlign: "center",
                                }}
                              >
                                {listPatientData.pengalaman}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
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
                          Rp. {listPatientData.harga.toLocaleString("id")},00
                          ({listPatientData.tipePembayaran})
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
                                onClick={startMeetingHandler}
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
                </Fragment>
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
    </ThemeProvider>
  );
}

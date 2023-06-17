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
import { Fragment, useState } from "react";
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
import PersonIcon from "@mui/icons-material/Person";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Chart,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
  Title,
  SubTitle,
  ArcElement,
  BarElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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

Chart.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
  Title,
  SubTitle,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);
const today = dayjs();
export default function PatientList() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();
  const [listPatientData, setlistPatientData] = useState([]);
  const [timeDiff, setTimeDiff] = useState(0);
  const [timeDiffArr, setTimeDiffArr] = useState([]);
  const login = useSelector((state) => state.persistedReducer.login);
  const axios = require("axios");
  const [severityArr, setseverityArr] = useState([]);
  const loginConsultant = useSelector(
    (state) => state.persistedReducer.loginConsultant
  );

  const MentalIllnessList = [
    {
      img: "/image/Mental Illness Illustration/4.png",
      title: "Depression",
      author: "Gangguan Depresi",
      link: "/MentalIllness/Depression/Panduan",
      severity: 1,
    },
    {
      img: "/image/Mental Illness Illustration/1.png",
      title: "Anxiety",
      author: "Gangguan Kecemasan",
      link: "/MentalIllness/Anxiety/Panduan",
      severity: 2,
    },
    {
      img: "/image/Mental Illness Illustration/3.png",
      title: "OCD",
      author: "Obsessive-Compulsive Disorder",
      link: "/MentalIllness/OCD/Panduan",
      severity: 3,
    },
    {
      img: "/image/Mental Illness Illustration/5.png",
      title: "Sleep Disorder",
      author: "Gangguan Tidur",
      link: "/MentalIllness/SleepDisorder/Panduan",
      severity: 4,
    },
  ];

  const data = {
    labels: MentalIllnessList.map((x) => x.title + " (" + x.author + ")"),
    datasets: [
      {
        label: "Tingkat Keparahan",
        data: severityArr,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderColor: "black",
        borderWidth: 1,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 6,
      },
    ],
  };

  const optionsBar = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: ["#b0cdff", "#59CE8F", "#fff400", "#ffa700", "#EB5353"],
          borderWidth: "5px",
          circular: true,
          lineWidth: 3,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, ticks) {
            if (value == "0") return value + " (Tidak ada)";
            else if (value == "1") return value + " (Sedikit)";
            else if (value == "2") return value + " (Ringan)";
            else if (value == "3") return value + " (Sedang)";
            else if (value == "4") return value + " (Berat)";
          },
        },
      },
      y: {
        // grid: {
        //   color: "black",
        //   borderWidth: "5px",
        //   circular: true,
        //   lineWidth: 1,
        // },
      },
    },
    scale: {
      min: 0,
      max: 4,
      ticks: {
        beginAtZero: false,
        stepSize: 1,
        font: {
          size: 15,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 10,
          },
        },
      },
    },
  };

  const mhcDataHandler = (val) => {
    axios
      .get(
        "https://localhost:7184/api/Consultant/GetMHCSeverity?userID=" +
          val.userID
      )
      .then((resp) => {
        // console.log(resp.data);
        setseverityArr(resp.data);
        setIsLoaded(true);
      });

    // console.log(val);
  };

  const startMeetingHandler = (val) => {
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
              val.userID +
              "&status=ongoing"
          )
          .then((respUpdate) => {
            console.log(respUpdate);
          });

        router.reload(window.location.pathname);
      }
    });
  };

  const endMeetingHandler = (val) => {
    Swal.fire({
      title: "Selesaikan Konsultasi Online?",
      icon: "warning",
      showDenyButton: true,
      showConfirmButton: true,
      allowOutsideClick: false,

      // html: "<a>Berikut adalah Zoom Meeting untuk Konsultasi Online:</a> <br/>  <a target='_blank'>https://binus.zoom.us/j/99515710879</a>",
      html: "<a>Apakah sesi konsultasi anda bersama pasien sudah selesai?</a>",
      background: "white",
      confirmButtonText: `<a>Ya</a>`,
      confirmButtonColor: "#59CE8F",
      denyButtonColor: "#EB5353",
      denyButtonText: `<a>Tidak</a>`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log("true");

        axios
          .put(
            "https://localhost:7184/api/Consultant/UpdateStatusListPatient?UserID=" +
              val.userID +
              "&status=done"
          )
          .then((respUpdate) => {
            console.log(respUpdate);
          });

        axios.put(
          "https://localhost:7184/api/Consultant/UpdateIsActiveListPatient?UserID=" +
            login.userid
        );

        router.reload(window.location.pathname);
      }
    });
  };

  useEffect(() => {
    axios
      .get(
        "https://localhost:7184/api/Consultant/GetListPatientForConsultant?ConsultantID=" +
          loginConsultant.consultantid
      )
      .then((resp) => {
        setlistPatientData(resp.data);
        setIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    console.log(listPatientData.tanggalPertemuan);
    // setTimeDiff();
    for (var i = 0; i < listPatientData.length; i++) {
      let newtimediff = today.diff(
        dayjs(listPatientData[i].tanggalPertemuan),
        "minute"
      );
      setTimeDiffArr((oldArr) => [...oldArr, newtimediff]);
    }
    // setTimeDiff(today.diff(dayjs(listPatientData.tanggalPertemuan), "minute"));
    // console.log(today.diff(dayjs(listPatientData.tanggalPertemuan), "minute"))
  }, [listPatientData]);

  useEffect(() => {
    console.log(timeDiffArr);
  }, [timeDiffArr]);

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
              {listPatientData.map((val, index) => (
                <Box
                  key={val.fullNamePatient}
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
                    raised
                  >
                    <CardHeader
                      sx={{ padding: "10px" }}
                      title={
                        <Box sx={{ display: "flex" }}>
                          <PersonIcon
                            sx={{
                              fontSize: "17px",
                              mt: "2px",
                              mr: "5px",
                              ml: "10px",
                              color: "black",
                            }}
                          />
                          <Typography className={montserratExtraBold.className}>
                            Nama pasien:
                          </Typography>
                          <Typography
                            className={montserrat.className}
                            sx={{ ml: "7px" }}
                          >
                            {val.fullNamePatient}
                          </Typography>
                        </Box>
                      }
                      subheader={
                        <Fragment>
                          <Box sx={{ display: "flex" }}>
                            <AccessTimeFilledIcon
                              sx={{
                                fontSize: "17px",
                                mt: "2px",
                                mr: "5px",
                                ml: "10px",
                                color: "black",
                              }}
                            />
                            <Typography
                              className={montserratExtraBold.className}
                              sx={{ color: "black" }}
                            >
                              Jadwal konseling:
                            </Typography>

                            <Typography
                              className={montserrat.className}
                              sx={{
                                fontSize: "16px",
                                mb: "5px",
                                color: "black",
                                ml: "10px",
                              }}
                            >
                              {dayjs(val.tanggalPertemuan).format(
                                "dddd, DD MMMM HH:mm"
                              )}{" "}
                              -{" "}
                              {dayjs(val.tanggalPertemuan)
                                .add(1, "hour")
                                .format("HH:mm")}
                            </Typography>
                          </Box>
                          <Box>
                            <Accordion onChange={(x) => mhcDataHandler(val)}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography className={montserrat.className}>
                                  Hasil Mental Health Check
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography
                                  sx={{
                                    fontSize: "15px",
                                    color: "black",
                                    textAlign: "center",
                                  }}
                                  className={montserrat.className}
                                >
                                  Grafik Tingkat Keparahan Mental Illness
                                </Typography>

                                {/* GRAPH */}
                                <Grid
                                  container
                                  sx={{
                                    textAlign: "center",
                                    justifyContent: "center",
                                  }}
                                  column={2}
                                >
                                  <Bar
                                    className={montserrat.className}
                                    data={data}
                                    options={optionsBar}
                                    style={{
                                      // display: "block",
                                      // marginLeft: "auto",
                                      // marginRight: "auto",
                                      width: "500px",
                                    }}
                                  ></Bar>
                                </Grid>

                                <div
                                  style={{ marginTop: "10px", display: "flex" }}
                                >
                                  <ErrorIcon
                                    fontSize="15px"
                                    sx={{
                                      marginTop: "5px",
                                      marginRight: "5px",
                                      color: "orange",
                                    }}
                                  />
                                  <Typography
                                    sx={{
                                      fontSize: "16px",
                                      color: "#5d5d5d",
                                      textAlign: "justify",
                                    }}
                                    className={glacial.className}
                                  >
                                    Tes Mental Health Check diadaptasi dari
                                    <i>
                                      DSM-5-TR Self-Rated Level 1 Cross-Cutting
                                      Symptom Measure—Adult
                                    </i>
                                  </Typography>
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          </Box>
                        </Fragment>
                      }
                    />
                    {/* <Divider /> */}
                    <CardContent sx={{ pt: "10px", pb: "0px" }}></CardContent>
                    <CardActions
                      sx={{
                        justifyContent: "right",
                        pl: "16px",
                        pt: "0px",
                      }}
                    >
                      <Box>
                        {val.status == "waiting" ? (
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
                              timeDiffArr[index] >= 0 &&
                              timeDiffArr[index] <= 30
                                ? false
                                : true
                            }
                            onClick={() => startMeetingHandler(val)}
                          >
                            {timeDiffArr[index] >= 0 &&
                            timeDiffArr[index] <= 30 ? (
                              <Typography
                                className={montserratBold.className}
                                sx={{ fontSize: "14px", px: "10px" }}
                                //   onClick={startMeetingHandler}
                              >
                                Mulai Konseling
                              </Typography>
                            ) : timeDiffArr[index] >= 30 ? (
                              <Typography
                                className={montserratBold.className}
                                sx={{ fontSize: "14px", px: "10px" }}
                              >
                                Sudah melewati jadwal
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
                        ) : val.status == "ongoing" ? (
                          <Box sx={{ textAlign: "right" }}>
                            <Typography
                              className={montserratBold.className}
                              sx={{ fontSize: "15px", py: "5px" }}
                            >
                              Konsultasi sedang berlangsung
                            </Typography>
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
                                timeDiffArr[index] <= -30 ? false : true
                              }
                              onClick={() => endMeetingHandler(val)}
                            >
                              <Typography
                                className={montserratBold.className}
                                sx={{ fontSize: "15px", px: "10px" }}
                              >
                                End Meeting
                              </Typography>
                            </Button>
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
                                ml: "10px",
                              }}
                              className={montserratBold.className}
                              href="https://binus.zoom.us/j/99515710879"
                            >
                              Meet Link
                            </Button>
                          </Box>
                        ) : val.status == "done" ? (
                          <Typography
                            className={montserratBold.className}
                            sx={{ fontSize: "15px", py: "5px" }}
                          >
                            Konsultasi sudah selesai.
                          </Typography>
                        ) : (
                          <Typography>lol no</Typography>
                        )}
                      </Box>
                    </CardActions>
                  </Card>
                </Box>
              ))}
            </Box>
            {/* {listPatientData.fullNamePatient != null ? (
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
            )} */}
          </Box>
        </motion.div>
      )}
    </Container>
  );
}

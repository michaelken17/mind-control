import { PolarArea, Radar, Bar } from "react-chartjs-2";
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

import { ThemeProvider } from "@emotion/react";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  createTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import styles from "styles/Quiz.module.css";
import Link from "next/link";
import { container, item } from "/animation";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import ArticleIcon from "@mui/icons-material/Article";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { montserratBold, montserrat, openSans } from "../../public/fonts";
import { current } from "@reduxjs/toolkit";

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

export default function MHCResult() {
  const MIData = useSelector((x) => x.persistedReducer.app.mentalIllnessData);
  const MHCAnswer = useSelector((x) => x.persistedReducer.app.MHCanswer);
  const depressionSeverity = Math.max(
    MHCAnswer[0].jawaban,
    MHCAnswer[1].jawaban
  );
  const anxietySeverity = Math.max(
    MHCAnswer[2].jawaban,
    MHCAnswer[3].jawaban,
    MHCAnswer[4].jawaban
  );
  const OCDSeverity = Math.max(MHCAnswer[5].jawaban, MHCAnswer[6].jawaban);
  const sleepDisorderSeverity = MHCAnswer[7].jawaban;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBad, setIsBad] = useState(false);

  const MentalIllnessList = [
    {
      judul: "Depression Test",
      desc: "Tes Gangguan Depresi",
      url: "/MentalIllness/Depression/Panduan",
      severity: depressionSeverity,
    },
    {
      judul: "Anxiety Test",
      desc: "Tes Gangguan Kecemasan",
      url: "/MentalIllness/Anxiety/Panduan",
      severity: anxietySeverity,
    },
    {
      judul: "OCD Test",
      desc: "Tes Gangguan Obsesif Kompulsif",
      url: "/MentalIllness/OCD/Panduan",
      severity: OCDSeverity,
    },
    {
      judul: "Sleep Disorder Test",
      desc: "Tes Gangguan Tdiur",
      url: "/MentalIllness/SleepDisorder/Panduan",
      severity: sleepDisorderSeverity,
    },
  ];

  const data = {
    labels: MIData.map((x) => x.title + " (" + x.author + ")"),
    datasets: [
      {
        label: "Tingkat Keparahan",
        data: [depressionSeverity, anxietySeverity, OCDSeverity, sleepDisorderSeverity],
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderColor: "black",
        borderWidth: 1,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 6,
      },
    ],
  };

  // const optionsRadar = {
  //   indexAxis: 'y',
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   scales: {
  //     r: {
  //       pointLabels: {
  //         font: {
  //           size: 15,
  //         },
  //         color: "black",
  //       },
  //       angleLines: {
  //         color: "black",
  //       },
  //       grid: {
  //         color: [, "#b0cdff", "#a7ffcc", "#ffe39f", "#ffa5a5"],
  //         borderWidth: "5px",
  //         circular: true,
  //         lineWidth: 3,
  //       },
  //       ticks: {
  //         color: "black",
  //       },
  //     },
  //   },
  //   scale: {
  //     min: 0,
  //     max: 4,
  //     // backgroundColor: "radial-gradient(circle, rgba(255,165,165,1) 15%, rgba(255,227,159,1) 35%, rgba(254,255,182,1) 53%, rgba(167,255,204,1) 72%, rgba(176,205,255,1) 89%);",
  //     // backgroundColor: "black",
  //     ticks: {
  //       beginAtZero: false,
  //       stepSize: 1,
  //       font: {
  //         size: 16,
  //       },
  //     },
  //   },
  //   plugins: {
  //     dataLabels: {
  //       font: {
  //         size: 100,
  //       },
  //     },
  //     //   title: {
  //     //     display: true,
  //     //     text: "Title",
  //     //     font: {
  //     //       size: 15,
  //     //       weight: "normal",
  //     //     },
  //     //   },
  //     //   subtitle: {
  //     //     display: true,
  //     //     text: "Chart Subtitle",
  //     //     color: "blue",
  //     //     font: {
  //     //       size: 12,
  //     //       family: "tahoma",
  //     //       weight: "normal",
  //     //       style: "italic",
  //     //     },
  //     //     padding: {
  //     //       bottom: 10,
  //     //     },
  //     //   },
  //     legend: {
  //       position: "bottom",
  //       labels: {
  //         boxWidth: 20,
  //         padding: 20,
  //         font: {
  //           size: 12,
  //         },
  //       },
  //     },
  //     datalabels: {
  //       color: "#223388",
  //       font: {
  //         size: 20,
  //       },
  //     },
  //   },
  // };

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

  useEffect(() => {
    setIsLoaded(true);

    if (
      Math.max(
        depressionSeverity,
        anxietySeverity,
        OCDSeverity,
        sleepDisorderSeverity
      ) >= 2
    ) {
      setIsBad(true);
    }
    
  }, []);

  useEffect(() => {
    console.log(isBad);
  }, [isBad]);

  useEffect(() => {
    console.log(MentalIllnessList);
  }, [MentalIllnessList]);


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{ background: "" }}>
        {isLoaded && (
          <motion.div
            // className={styles.quizDiv}
            style={{
              backgroundColor: "black",
              padding: 0,
              borderRadius: 10,
              fontSize: 20,
              height: "100%",
              border: "0px ",
              textAlign: "center",
              justifyItems: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0,
            }}
            exit={{ opacity: 0 }}
          >
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: 10,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "black",
                  textAlign: "center",
                  paddingBottom: 2,
                }}
                className={montserratBold.className}
              >
                Grafik Tingkat Keparahan Mental Illness
              </Typography>

              {/* GRAPH */}
              <Grid
                container
                sx={{ textAlign: "center", justifyContent: "center" }}
                column={12}
              >
                <Grid item xs={12} md={12} lg={7}>
                  <Bar
                    className={montserrat.className}
                    data={data}
                    options={optionsBar}
                    style={{
                      // display: "block",
                      // marginLeft: "auto",
                      // marginRight: "auto",
                      width: "100%",
                    }}
                  ></Bar>
                </Grid>
              </Grid>

              {/* <Radar
                  className={montserrat.className}
                  data={data}
                  options={options}
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%",
                  }}
                ></Radar> */}

              {/* <PolarArea data={dataPolar} options={options}></PolarArea> */}

              {/* INFO */}
              <Grid
                container
                sx={{ textAlign: "center", justifyContent: "center" }}
              >
                <Grid item xs={12} md={9}>
                  {isBad == true ? (
                    <Typography
                      sx={{
                        // paddingX: "100px",
                        marginTop: "10px",
                        fontSize: "16px",
                        color: "black",
                        textAlign: "justify",
                      }}
                      className={openSans.className}
                    >
                      Berdasarkan hasil screening, kondisi kesehatan mental anda
                      <b> kurang baik</b>. Hasil tes menunjukkan bahwa anda
                      memiliki gejala penyakit mental yang sudah mencapai
                      tingkat keparahan <b>ringan keatas</b>.
                      <br />
                      <br />
                      Berikut adalah rekomendasi tes yang dapat dilakukan
                      selanjutnya untuk menentukan tingkat keparahan penyakit
                      mental tersebut secara spesifik:
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        // paddingX: "100px",
                        marginTop: "10px",
                        fontSize: "16px",
                        color: "black",
                        textAlign: "justify",
                      }}
                      className={openSans.className}
                    >
                      Berdasarkan hasil screening, kondisi kesehatan mental anda
                      <b> cukup stabil</b>. Hasil tes menunjukkan gejala
                      penyakit mental dengan tingkat keparahan 
                      <b> sedikit atau tidak ada</b>. Pertahankanlah kesehatan mental anda!
                      <br />
                    </Typography>
                  )}
                </Grid>
              </Grid>

              <Grid container sx={{ justifyContent: "center" }}>
                <Grid item xs={12} md={9}>
                  {isLoaded &&
                    MentalIllnessList.map((value, index) => {
                      if (value.severity >= 2)
                        return (
                          <List dense={true} key={index}>
                            <Link href={value.url} passHref>
                              <ListItemButton
                                sx={{
                                  border: "1px solid black",
                                  width: "100%",
                                  borderRadius: "10px",
                                }}
                              >
                                <ListItemIcon>
                                  <ArticleIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary={value.judul}
                                  secondary={value.desc}
                                />
                              </ListItemButton>
                            </Link>
                          </List>
                        );
                    })}
                </Grid>
              </Grid>
            </div>
          </motion.div>
        )}
      </Container>
    </ThemeProvider>
  );
}

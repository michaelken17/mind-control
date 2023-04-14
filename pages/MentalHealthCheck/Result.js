import { Radar, defaults } from "react-chartjs-2";
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
} from "chart.js";

import { ThemeProvider } from "@emotion/react";
import { Container, Typography, createTheme } from "@mui/material";
import { motion } from "framer-motion";
import styles from "styles/Quiz.module.css";
import Link from "next/link";
import { container, item } from "/animation";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { montserratBold, montserrat, cooperHewitt } from "../fonts";

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
  SubTitle
);
export default function MHCResult() {
  const MIData = useSelector((x) => x.persistedReducer.app.mentalIllnessData);
  const [isLoaded, setIsLoaded] = useState(false);

  const data = {
    labels: MIData.map((x) => x.title + " (" + x.author + ")"),
    fontSize: 20,
    datasets: [
      {
        label: "Tingkat Keparahan",
        data: [4, 3, 2, 2],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "#EA8FEA",
        borderWidth: 1,
        fill: true,

        pointRadius: 5,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        pointLabels: {
          font: {
            size: 15,
          },
        },
      },
    },
    scale: {
      min: 0,
      max: 4,
      ticks: {
        beginAtZero: false,
        stepSize: 1,
        font: {
          size: 16,
        },
      },
    },
    r: {},
    plugins: {
      dataLabels: {
        font: {
          size: 100,
        },
      },
      //   title: {
      //     display: true,
      //     text: "Title",
      //     font: {
      //       size: 15,
      //       weight: "normal",
      //     },
      //   },
      //   subtitle: {
      //     display: true,
      //     text: "Chart Subtitle",
      //     color: "blue",
      //     font: {
      //       size: 12,
      //       family: "tahoma",
      //       weight: "normal",
      //       style: "italic",
      //     },
      //     padding: {
      //       bottom: 10,
      //     },
      //   },
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 20,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      datalabels: {
        color: "#223388",
        font: {
          size: 20,
        },
      },
    },
  };
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{ background: "" }}>
        {isLoaded && (
          <motion.div
            className={styles.quizDiv}
            style={{
              padding: 20,
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
                // overflow: "auto",
              }}
            >
              <Typography
                sx={{
                  fontSize: "17px",
                  color: "gray",
                  textAlign: "center",
                  paddingBottom: 2,
                }}
                className={montserratBold.className}
              >
                Tabel Tingkat Keparahan Mental Illness
              </Typography>

              {/* RADAR GRAPH */}
              <div
                style={{
                  position: "relative",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <Radar
                  className={montserrat.className}
                  data={data}
                  options={options}
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%",
                  }}
                ></Radar>
              </div>

              <Typography
                sx={{
                  fontSize: "16px",
                  color: "gray",
                  textAlign: "justify",
                }}
                className={montserrat.className}
              >
                where is this
              </Typography>
            </div>
          </motion.div>
        )}
      </Container>
    </ThemeProvider>
  );
}

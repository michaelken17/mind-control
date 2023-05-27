import { Montserrat } from "next/font/google";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControlLabel,
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
import { montserrat, glacial, cooperHewitt } from "../../../public/fonts";
import { SDSeverity } from "../../ShortFormConversionTable";
import { rekomendasiSD } from "../../RekomendasiKegiatan";
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

function borderClassname(severity) {
  switch (severity) {
    case "Tidak ada atau sedikit":
      return styles.resultNone;
    case "Ringan":
      return styles.resultMild;
    case "Sedang":
      return styles.resultModerate;
    case "Berat":
      return styles.resultSevere;
  }
}

// SLEEP DISORDER
export default function ResultSleepDisorder() {
  const router = useRouter();
  const SDAnswer = useSelector((x) => x.persistedReducer.app.SDAns);
  const [isLoaded, setIsLoaded] = useState(false);
  const [severity, setSeverity] = useState(0);

  let ansArray = SDAnswer.map((x) => x.jawaban);
  let rawScore = ansArray.reduce((a, b) => a + b, 0);

  useEffect(() => {
    setIsLoaded(true);
    setSeverity(SDSeverity(rawScore));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" sx={{}}>
        {isLoaded && (
          <motion.div
            className={borderClassname(rekomendasiSD[severity].severity)}
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
              <div style={{ overflow: "auto" }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    color: "black",
                    textAlign: "left",
                  }}
                  className={montserrat.className}
                >
                  <h2>{rekomendasiSD[severity].header}</h2>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "black",
                    textAlign: "left",
                    mb: 2,
                  }}
                  className={montserrat.className}
                >
                  Hasil tes menunjukkan tingkat keparahan gangguan tidur anda
                  adalah <b>{rekomendasiSD[severity].severity}</b>.
                </Typography>
                <div
                  width="100%"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      width: "70%",
                      backgroundColor: "",
                      verticalAlign: "top",
                      display: "inline-block",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        maxHeight: { xs: 210, md: 240, lg: 300 },
                        maxWidth: { xs: 200, md: 240, lg: 300 },
                        borderRadius: 10,
                      }}
                      alt=""
                      src={
                        rekomendasiSD[severity].severity ==
                        "Tidak ada atau sedikit"
                          ? "/image/Mental Illness Illustration/happy.jpg"
                          : "/image/Mental Illness Illustration/confused.jpg"
                      }
                    />

                    <a
                      href="https://www.freepik.com/author/stories"
                      style={{
                        fontSize: "10px",
                        textAlign: "center",
                        display: "block",
                        paddingBottom: "10px",
                      }}
                    >
                      Image by storyset on Freepik
                    </a>
                  </div>
                </div>

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
                    Untuk selanjutnya, Anda dapat menggunakan fitur{" "}
                    <i>Daily Health Check</i> yang tersedia dibawah ini untuk
                    memantau kesehatan mental Anda tiap harinya dan mendapatkan
                    rekomendasi kegiatan yang berguna demi meningkatkan
                    kesehatan mental.
                  </Typography>
                </div>
                {/* Button for daily health check */}
                <motion.div style={{ textAlign: "center" }}>
                  <Link href="../../DailyHealthCheck/Start">
                    <button
                      style={{
                        borderRadius: 10,
                        padding: 10,
                        marginTop: "0px",
                        fontSize: 20,
                        border: "0px ",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "18px",
                          color: "white",
                          textAlign: "center",
                        }}
                        className={glacial.className}
                      >
                        Daily Health Check
                      </Typography>
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </Container>
    </ThemeProvider>
  );
}

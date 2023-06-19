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
import { rekomendasiOCD } from "../../../public/RekomendasiKegiatan";
import { OCDSeverity } from "../../../public/ShortFormConversionTable";
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

export default function OCDResult() {
  const router = useRouter();
  const OCDAnswer = useSelector((x) => x.persistedReducer.app.OCDAns);
  const [isLoaded, setIsLoaded] = useState(false);
  const [severity, setSeverity] = useState(0);

  let ansArray = OCDAnswer.map((x) => x.jawaban);
  let rawScore = ansArray.reduce((a, b) => a + b, 0);

  useEffect(() => {
    setIsLoaded(true);
    setSeverity(OCDSeverity(rawScore));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" sx={{}}>
        {isLoaded && (
          <motion.div
            className={borderClassname(rekomendasiOCD[severity].severity)}
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
                  <h2>{rekomendasiOCD[severity].header}</h2>
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
                  Hasil tes menunjukkan tingkat keparahan OCD anda adalah{" "}
                  <b>{rekomendasiOCD[severity].severity}</b>.
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
                        width: "70%",
                        borderRadius: 10,
                      }}
                      alt=""
                      src={
                        rekomendasiOCD[severity].severity ==
                        "Tidak ada atau sedikit"
                          ? "/image/Mental Illness Illustration/happy.jpg"
                          : "/image/Mental Illness Illustration/confused.jpg"
                      }
                    />
                    {/* <img
                      src={
                        rekomendasiOCD[severity].severity ==
                        "Tidak ada atau sedikit"
                          ? "/image/Mental Illness Illustration/happy.jpg"
                          : "/image/Mental Illness Illustration/confused.jpg"
                      }
                      width="70%"
                      style={{ borderRadius: 10 }}
                    /> */}

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

                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "black",
                    textAlign: "justify",
                  }}
                  className={montserrat.className}
                >
                  {rekomendasiOCD[severity].text}
                </Typography>
              </div>
            </div>
          </motion.div>
        )}
      </Container>
    </ThemeProvider>
  );
}

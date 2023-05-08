import * as React from "react";

import { Button, Container, Typography } from "@mui/material";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { montserrat, glacial, cooperHewitt } from "../../public/fonts";
import styles from "styles/Quiz.module.css";
import Link from "next/link";
import ErrorIcon from "@mui/icons-material/Error";

const theme = createTheme({
  typography: {
    fontFamily: montserrat,
  },
  button: {
    fontFamily: montserrat,
  },
});

export default function MentalHealthCheck() {
  const [readMore, setReadMore] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit={{ opacity: 0, scale: 0.2 }}
      >
        <Container component="main" maxWidth="md" sx={{}}>
          <img
            src="/image/MentalHealthCheck.png"
            style={{
              width: "100%",
            }}
          ></img>
          <div style={{ marginTop: "15px" }}>
            <Typography
              sx={{ fontSize: "22px", color: "black", textAlign: "center" }}
              className={glacial.className}
            >
              Mental Health Check membantu anda untuk mengetahui kondisi
              kesehatan mental pribadi dan mengidentifikasi tingkat keparahan
              penyakit mental yang di derita.
            </Typography>
            {readMore && (
              <div style={{ marginTop: "10px", display:"flex" }} >
                <ErrorIcon
                  fontSize="15px"
                  sx={{ marginTop: "5px", marginRight: "5px", color: "orange" }}
                />
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#5d5d5d",
                    textAlign: "justify",
                  }}
                  className={glacial.className}
                >
                  Tes skrining ini ditujukan untuk usia{" "}
                  <b style={{ color: "red" }}>18 tahun ke atas</b> yang terdiri
                  dari pertanyaan yang membantu mengidentifikasi potensi gejala
                  gangguan jiwa yang Anda alami. Mental Health Check di adaptasi
                  dari buku{" "}
                  <i>
                    DSM-5-TR Self-Rated Level 1 Cross-Cutting Symptom
                    Measure—Adult
                  </i>
                </Typography>
              </div>
            )}
            <Typography
              sx={{
                color: "gray",
                textAlign: "center",
                fontSize: "15px",
                marginTop: "12px",
              }}
              onClick={() => {
                if (readMore == true) setReadMore(false);
                else setReadMore(true);
              }}
            >
              {readMore == true
                ? "Baca lebih sedikit..."
                : "Baca selengkapnya..."}
            </Typography>
          </div>

          <motion.div style={{ textAlign: "center" }}>
            <Link href="Panduan">
              <motion.button
                className={styles.button}
                whileHover={{ scale: 1.1 }}
                style={{
                  borderRadius: 10,
                  padding: 20,
                  marginTop: 30,
                  marginBottom: 30,
                  fontSize: 20,
                  border: "0px ",
                }}
                transition={{
                  duration: 1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  bounce: 1,
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "white",
                    textAlign: "center",
                  }}
                  className={glacial.className}
                >
                  Take Your Mental Health Check
                </Typography>
              </motion.button>
            </Link>
          </motion.div>
        </Container>
      </motion.div>
    </ThemeProvider>
  );
}

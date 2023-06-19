import * as React from "react";

import { Box, Button, Container, Typography } from "@mui/material";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { montserrat, glacial, cooperHewitt } from "../../public/fonts";
import styles from "styles/Quiz.module.css";
import Link from "next/link";
import ErrorIcon from "@mui/icons-material/Error";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { isDoneActions } from "@/redux/slices/isDoneSlice";
import Image from "next/image";

const theme = createTheme({
  typography: {
    fontFamily: montserrat,
  },
  button: {
    fontFamily: montserrat,
  },
});

export default function MHCStart() {
  const [readMore, setReadMore] = React.useState(false);
  const router = useRouter();
  const login = useSelector((state) => state.persistedReducer.login);
  const isDone = useSelector((state) => state.persistedReducer.isDone);

  const mhcStartHandler = () => {
    const newRecord = true;

    if (isDone.isDoneMHC == false) {
      router.push("Panduan");
    } else {
      Swal.fire({
        icon: "warning",
        title: "Anda sudah pernah melakukan tes ini!",
        text: "Memulai ulang tes akan mengreset data!",
        showDenyButton: true,
        //   showCancelButton: true,
        background: "white",
        confirmButtonText: `<h2 color:"black">Tes ulang</h2>`,
        confirmButtonColor: "#FFAACF",
        denyButtonColor: "#EA8FEA",
        denyButtonText: `<h2 color:"black">Cancel</h2>`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          router.push("Panduan");
        }
      });
    }
  };

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
          <Box
            component="img"
            sx={{
              width: "100%",
            }}
            alt=""
            src="/image/mentalhealthcheck.png"
          />
          {/* <Image
            src="/image/MentalHealthCheck.png"
            style={{
              width: "100%",
            }}
          /> */}
          <div style={{ marginTop: "15px" }}>
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "19px", lg: "22px" },
                color: "black",
                textAlign: "center",
              }}
              className={glacial.className}
            >
              Mental Health Check membantu anda untuk mengetahui kondisi
              kesehatan mental pribadi dan mengidentifikasi tingkat keparahan
              penyakit mental yang diderita.
            </Typography>
            {readMore && (
              <div style={{ marginTop: "10px", display: "flex" }}>
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
                cursor: "pointer",
                fontSize: "15px",
                marginTop: "12px",
                textDecoration: "underline",
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
                cursor: "pointer",
              }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 300,
                damping: 20,
                bounce: 1,
              }}
              whileTap={{ scale: 0.9 }}
              onClick={mhcStartHandler}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "white",
                  textAlign: "center",
                }}
                className={glacial.className}
              >
                Lakukan Mental Health Check!
              </Typography>
            </motion.button>
          </motion.div>
        </Container>
      </motion.div>
    </ThemeProvider>
  );
}

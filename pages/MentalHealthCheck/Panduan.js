import { Montserrat } from "next/font/google";
import { Button, Container, List, ListItem, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import styles from "styles/Quiz.module.css";
import Link from "next/link";
import { container, item } from "/animation";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import {montserrat, glacial, cooperHewitt} from "../fonts";
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

export default function PanduanMentalHealthTest() {
  const router = useRouter();

  const startHandler = (event) => {
    event.preventDefault();

    Swal.fire({
      title: "Apakah anda yakin untuk memulai tes?",
      showDenyButton: true,
      //   showCancelButton: true,
      background: "white",
      confirmButtonText: `<h2 color:"black">Ya</h2>`,
      confirmButtonColor: "#FFAACF",
      denyButtonColor: "#EA8FEA",
      denyButtonText: `<h2 color:"black">Tidak</h2>`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        router.push("Test");
      }
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" sx={{}}>
        <motion.div
          // className={styles.quizDiv}
          style={{
            textAlign: "center",
            borderRadius: 10,
            fontSize: 20,
            height: "100%",
            border: "0px ",
            justifyItems: "center",
          }}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: "0%" }}
          transition={{
            duration: 1,
            delay: 0,
          }}
          exit={{ y: "100%" }}
        >
          <a
            className={cooperHewitt.className}
            style={{ color: "#393939", fontSize: "50px" }}
          >
            PANDUAN PENGISIAN <br />
            MENTAL HEALTH CHECK
          </a>
          <div
            width="100%"
            style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
          >
            <div
              style={{
                width: "45%",
                backgroundColor: "",
                verticalAlign: "top",
                display: "inline-block",
                textAlign: "center",
              }}
            >
              <img
                src="../image/mentalhealthillust.jpg"
                width="70%"
                style={{ borderRadius: 10 }}
              />

              <a
                href="http://www.freepik.com"
                style={{
                  fontSize: "10px",
                  textAlign: "center",
                  display: "block",
                  paddingBottom: 5,
                }}
              >
                Designed by Freepik
              </a>
            </div>
          </div>
          <div
            style={{
              background: "rgba(255, 255, 255,0.3)",
              paddingBottom: 20,
            }}
          >
            <motion.div>
              <motion.ul
                style={{
                  fontSize: "17px",
                  listStyleType: "none",
                  display: "inline-block",
                  textAlign: "left",
                  margin: 20,
                  color: "#393939",
                }}
                variants={container}
                initial="hidden"
                animate="show"
              >
                {/* <div style={{ overflow: "hidden" }}>
                  <motion.li
                    style={{ fontWeight: "bold", fontSize: "20px" }}
                    variants={item}
                  >
                    Panduan Pengisian
                  </motion.li>
                </div> */}
                <div style={{ overflow: "hidden" }}>
                  <motion.li
                    variants={item}
                    style={{
                      paddingBottom: 6,
                      paddingTop: 10,
                      overflow: "hidden",
                    }}
                  >
                    1. Pertanyaan-pertanyaan ini menanyakan tentang hal-hal yang
                    mungkin mengganggu Anda.
                  </motion.li>
                </div>

                <div style={{ overflow: "hidden" }}>
                  <motion.li
                    variants={item}
                    style={{
                      paddingBottom: 6,
                      paddingTop: 10,
                      overflow: "hidden",
                    }}
                  >
                    2. Pilihlah jawaban yang paling menggambarkan seberapa
                    banyak (atau seberapa sering) Anda terganggu oleh setiap
                    masalah selama{" "}
                    <b style={{ color: "red" }}> 2 minggu terakhir.</b>
                  </motion.li>
                </div>
                <div style={{ overflow: "hidden" }}>
                  <motion.li
                    variants={item}
                    style={{
                      paddingBottom: 6,
                      paddingTop: 10,
                      overflow: "hidden",
                    }}
                  >
                    3. Kerjakanlah di tempat yang nyaman dan kondusif agar lebih
                    fokus
                  </motion.li>
                </div>
                <div style={{ overflow: "hidden" }}>
                  <motion.li
                    variants={item}
                    style={{
                      paddingBottom: 6,
                      paddingTop: 10,
                      overflow: "hidden",
                    }}
                  >
                    4. Jika keluar di tengah test, maka jawaban tidak tersimpan
                  </motion.li>
                </div>
                <div style={{ overflow: "hidden" }}>
                  <motion.li
                    variants={item}
                    style={{
                      paddingBottom: 6,
                      paddingTop: 10,
                      overflow: "hidden",
                    }}
                  >
                    5. Hasil tes didapatkan setelah mengisi semua pertanyaan
                  </motion.li>
                </div>
              </motion.ul>
            </motion.div>

            <motion.button
              className={styles.testbutton}
              animate={{}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              style={{
                borderRadius: 10,
                padding: 20,
                paddingLeft: 50,
                paddingRight: 50,
                fontSize: 20,
                border: "0px ",
              }}
              onClick={startHandler}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
                bounce: 5,
                ease: "easeInOut",
              }}
            >
              Mulai Test
            </motion.button>
          </div>
        </motion.div>
      </Container>
    </ThemeProvider>
  );
}
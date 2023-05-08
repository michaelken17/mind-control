import { Button, Container, List, ListItem, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import styles from "styles/Quiz.module.css";
import Link from "next/link";
import { container, item } from "/animation";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import {montserrat, glacial, cooperHewitt} from "../../../public/fonts";

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

// ANXIETY
export default function PanduanOCD() {
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
        router.push("OCDTest");
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" sx={{}}>
        <motion.div
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
          exit={{ opacity: 0}}
        >
          <a
            className={cooperHewitt.className}
            style={{ color: "black", fontSize: "50px" }}
          >
            PANDUAN PENGISIAN <br />
            OCD TEST
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
                src="/image/Mental Illness Illustration/ocdIll.jpg"
                width="80%"
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
              background: "rgba(255, 255, 255,0.5)",
              paddingBottom: 20,
            }}
          >
            <motion.div>
              <motion.ul
                style={{
                  fontSize: "18px",
                  listStyleType: "none",
                  display: "inline-block",
                  textAlign: "justify",
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
                    - Pertanyaan-pertanyaan ini menanyakan tentang perasaan OCD secara lebih rinci 
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
                    - Untuk setiap pertanyaan, pilihlah yang paling menggambarkan seberapa 
                    sering Anda diganggu oleh daftar gejala selama <b style={{ color: "red" }}>7 hari terakhir. </b>
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
                    - Kerjakanlah di tempat yang nyaman dan kondusif agar lebih
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
                    - Jika keluar di tengah test, maka jawaban tidak tersimpan
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
                    - Hasil tes didapatkan setelah mengisi semua pertanyaan
                  </motion.li>
                </div>
              </motion.ul>
            </motion.div>

            <motion.button
              // className={styles.testbutton}
              animate={{}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              style={{
                borderRadius: 0,
                padding: 15,
                paddingLeft: 60,
                paddingRight: 60,
                fontSize: 20,
                border: "0px ",
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
                bounce: 5,
                ease: "easeInOut",
              }}
              onClick={startHandler}
            >
              <Link href="">Mulai Test</Link>
            </motion.button>
          </div>
        </motion.div>
      </Container>
    </ThemeProvider>
  );
}

import {
  Box,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "styles/Quiz.module.css";
import {montserrat, glacial, cooperHewitt} from "../public/fonts";

export default function Home() {
  const mentalIllnessData = useSelector(
    (x) => x.persistedReducer.app.mentalIllnessData
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* MindControl Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        style={{ textAlign: "center" }}
        exit={{ opacity: 0, scale: 0.2 }}
      >
        <Container>
          <div>
            <div style={{ alignContent: "center", textAlign: "center" }}>
              <img src="/image/MCFullLogo.png" alt="bg" width="70%"></img>
            </div>

            <div style={{ marginTop: "15px" }}>
              <Typography
                sx={{ fontSize: "25px", color: "black" }}
                className={glacial.className}
              >
                It's Okay Not To Be Okay.
              </Typography>
            </div>
          </div>
          <div
            style={{
              marginTop: "50px",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          ></div>
        </Container>
      </motion.div>

      {/* Mental Ilness Check */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        exit={{ x: "100%" }}
      >
        <Box
          className={styles.quizDiv}
          sx={{
            paddingTop: "20px",
            paddingBottom: "10px",
            px: "50px",
            textAlign: "center",
            justifyContent: "center",
            display: { xs: "none", md: "block" },
          }}
        >
          <a style={{ fontSize: "25px", color: "white" }}>
            Take a Mental Illness Check
          </a>
          <motion.div style={{ display: "flex", justifyContent: "center" }}>
            <ImageList
              sx={{ width: "80%", height: "100%", padding: "20px" }}
              cols={4}
            >
              {isLoaded &&
                mentalIllnessData.map((item) => (
                  <Link href={item.link} key={item.img}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      style={{
                        borderRadius: "20px",
                        margin: 5,
                      }}
                      transition={{
                        duration: 5,
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                        bounce: 1,
                      }}
                    >
                      <ImageListItem sx={{}}>
                        <motion.img
                          style={{
                            borderRadius: "20px",
                            width: "100%",
                            height: "100%",
                          }}
                          src={item.img}
                          alt={item.title}
                          loading="eager"
                        />

                        <ImageListItemBar
                          sx={{
                            borderBottomLeftRadius: "20px",
                            borderBottomRightRadius: "20px",
                          }}
                          className={glacial.className}
                          title={<h2>{item.title}</h2>}
                          subtitle={
                            <a style={{ fontSize: 14 }}> {item.author}</a>
                          }
                        />
                      </ImageListItem>
                    </motion.div>
                  </Link>
                ))}
            </ImageList>
          </motion.div>
          <div>
            <a
              href="https://www.freepik.com/author/stories"
              style={{ fontSize: "11px", color: "white" }}
            >
              Images by storyset on Freepik
            </a>
          </div>
        </Box>
      </motion.div>

      {/* Tulisan */}
      <Container>
        <div
          style={{
            marginTop: "50px",
            width: "100%",
            backgroundColor: "white",
            height: "100%",
            overflow: "auto",
          }}
        >
          <div
            style={{
              float: "left",
            }}
          >
            <Box
              sx={{
                width: "35vw",
                height: "100%",
                // bgcolor: "gray",
                textAlign: "left",
                display: { xs: "none", md: "block" },
              }}
            >
              <Typography
                className={cooperHewitt.className}
                sx={{
                  fontSize: "30px",
                  color: "#FFAACF",
                  "&:hover": {
                    color: "#EA8FEA",
                  },
                }}
              >
                <Link href="/PanduanMentalHealthTest">
                  Take a Mental Health Check
                </Link>
              </Typography>

              <Typography
                className={glacial.className}
                sx={{ fontSize: "20px", color: "black" }}
              >
                Mental Health Check membantu anda untuk mengetahui kondisi
                kesehatan mental pribadi dan mempersiapkan untuk langkah
                selanjutnya
              </Typography>
              <br />
            </Box>
          </div>
        </div>

        <div
          style={{
            marginTop: "0px",
            width: "100%",
            backgroundColor: "white",
            height: "100%",
            overflow: "auto",
          }}
        >
          <div
            style={{
              float: "right",
            }}
          >
            <Box
              sx={{
                width: "35vw",
                height: "100%",
                // bgcolor: "gray",
                textAlign: "right",
                display: { xs: "none", md: "block" },
              }}
            >
              <Typography
                className={cooperHewitt.className}
                sx={{
                  fontSize: "30px",
                  color: "#FFAACF",
                  "&:hover": {
                    color: "#EA8FEA",
                  },
                }}
              >
                <Link href="/PanduanMentalHealthTest">
                  Do your Daily Mental Health Check!
                </Link>
              </Typography>

              <Typography
                className={glacial.className}
                sx={{
                  fontSize: "20px",
                  color: "black",
                  textAlign: "justify",
                }}
              >
                Pengecekan kesehatan mental harian dapat membuat anda tetap
                terkendali dan mengingatkan tentang waktu untuk perawatan diri
                dan kebahagiaan. Kita seringkali mengabaikannya kebahagiaan diri
                sendiri dan menjadikan diri sendiri sebagai prioritas terakhir.
                Pertanyaan harian kesehatan mental ini dapat membantu
                mempertahankan keadaan pikiran dan emosi anda.
              </Typography>
              <br />
            </Box>
          </div>
        </div>
      </Container>

      {/* Footer */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1, ease: "easeOut" }}
        exit={{ x: "100%" }}
        style={{ paddingTop: "20px" }}
      >
        <Box
          className={styles.quizDiv}
          sx={{
            p: "10px",
            textAlign: "center",
            justifyContent: "center",
            display: { xs: "none", md: "block" },
          }}
        >
          <Link style={{ fontSize: "25px", color: "white" }} href="/AboutUs">
            About Us
          </Link>
        </Box>
      </motion.div>
    </div>
  );
}

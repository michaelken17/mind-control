import {
  Box,
  Button,
  Container,
  Grid,
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
import {
  montserrat,
  glacial,
  cooperHewitt,
  montserratExtraBold,
  montserratLight,
} from "../public/fonts";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function Home() {
  const mentalIllnessData = useSelector(
    (x) => x.persistedReducer.app.mentalIllnessData
  );
  const login = useSelector((state) => state.persistedReducer.login);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const startHandler = (event) => {
    event.preventDefault();

    if (login?.authorized == false) {
      Swal.fire({
        icon: "warning",
        title: "Mohon <b>Log In</b> terlebih dahulu!",
        showDenyButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      router.push("MentalHealthCheck/Start");
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        delay: 0,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      style={{ textAlign: "center" }}
      exit={{ opacity: 0 }}
    >
      {/* MindControl Logo */}
      <div>
        <Container>
          <div>
            {/* <div style={{ alignContent: "center", textAlign: "center" }}>
              <img src="/image/MCFullLogo.png" alt="bg" width="50%"></img>
            </div> */}
            <Box
              component="img"
              sx={{
                height: { xs: 160, sm: 220, md: 220, lg: 280 },
                width: { xs: 290, sm: 400, md: 400, lg: 500 },
              }}
              alt="bg"
              src="/image/MCFullLogo.png"
            />
            <div style={{ marginTop: "1px" }}>
              <Typography
                sx={{
                  fontSize: { xs: "19px", md: "20px", xl: "20px" },
                  color: "gray",
                }}
                className={glacial.className}
              >
                it's okay not to be okay.
              </Typography>
            </div>
          </div>
        </Container>
      </div>

      {/* Mental Ilness Check */}
      {/* <div>
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
      </div> */}

      {/* Mental Health Check */}
      <Container>
        <Box
          sx={{
            // bgcolor: "gray",
            marginTop: "20px",
            textAlign: {
              xs: "justify",
              sm: "center",
              md: "center",
              xl: "center",
            },
            display: {},
          }}
        >
          <Typography
            className={montserratExtraBold.className}
            sx={{
              fontSize: { xs: "19px", md: "22px" },
              color: "#FFAACF",
            }}
          >
            Lakukan Mental Health Check?
          </Typography>

          <Typography
            className={montserrat.className}
            sx={{ fontSize: { xs: "15px", md: "17px" }, color: "black" }}
          >
            Mental Health Check berfungsi sebagai tes penilaian diri yang
            membantu Anda untuk mengetahui kondisi kesehatan mental pribadi dan
            mempersiapkan untuk langkah selanjutnya.
          </Typography>
          <br />
        </Box>
      </Container>

      {/* MHC button */}

      <Button
        className={styles.testbutton}
        sx={{
          borderRadius: "10px",
          fontSize: "20px",
          px: "50px",
          py: "12px",
          border: "0px ",
          textTransform: "none",
          color: "white",
        }}
        onClick={startHandler}
      >
        <Typography className={montserrat.className}>Mulai Tes</Typography>
      </Button>

      {/* Fitur Lainnya */}

      <Container sx={{ marginTop: "30px" }}>
        <Typography
          className={montserratLight.className}
          sx={{ textAlign: "left", color: "gray", marginBottom: "10px" }}
        >
          Fitur-fitur lainnya...
        </Typography>
        <Grid container columns={{ xs: 4, sm: 8, xl: 12 }} spacing={{ xl: 17 }}>
          <Grid item xl={6}>
            <Box
              sx={{
                // bgcolor: "gray",
                textAlign: "justify",
              }}
            >
              <Typography
                className={montserratExtraBold.className}
                sx={{
                  fontSize: { xs: "19px", md: "22px" },
                  color: "#FFAACF",
                }}
              >
                <i>Mental Illness Test</i>
              </Typography>
              <Typography
                className={montserrat.className}
                sx={{
                  fontSize: { xs: "19px", md: "18px" },
                  color: "#EA8FEA",
                }}
              >
                Tes Penilaian Diri Penyakit Kesehatan Mental
              </Typography>
              <Typography
                className={montserrat.className}
                sx={{ fontSize: { xs: "15px", md: "17px" }, color: "black" }}
              >
                Pengecekan penyakit mental berfungsi sebagai tes penilaian diri
                yang dapat mengidentifikasi tingkat keparahan penyakit mental
                yang dialami secara spesifik. Tes akan membantu memberikan
                solusi dan rekomendasi untuk meningkatkan kesehatan mental dan
                juga membantu menentukan apakah harus mencari bantuan dari
                psikolog untuk mengatasi masalah kesehatan mental.
              </Typography>
              <br />
            </Box>
          </Grid>

          <Grid item xl={6}>
            <Box
              sx={{
                textAlign: "justify",
              }}
            >
              <Typography
                className={montserratExtraBold.className}
                sx={{
                  fontSize: { xs: "19px", md: "22px" },
                  color: "#FFAACF",
                }}
              >
                <i>Daily Health Check</i>
              </Typography>
              <Typography
                className={montserrat.className}
                sx={{
                  fontSize: { xs: "19px", md: "18px" },
                  color: "#EA8FEA",
                }}
              >
                Pemeriksaan Kesehatan Mental Harian
              </Typography>
              <Typography
                className={montserrat.className}
                sx={{
                  fontSize: { xs: "15px", md: "17px" },
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
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        className={styles.quizDiv}
        sx={{
          p: "10px",
          textAlign: "center",
          justifyContent: "center",
          display: { xs: "none", xl: "block" },
          marginTop: "30px",
        }}
      ></Box>
    </motion.div>
  );
}

import * as React from "react";
import { Button, Container, Grid } from "@mui/material";
import { montserrat, glacial, cooperHewitt } from "../../public/fonts";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import styles from "styles/Quiz.module.css";
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Typography,
} from "@mui/material";

import localFont from "next/font/local";
import Link from "next/link";
import { useSelector } from "react-redux";

const theme = createTheme({
  typography: {
    fontFamily: montserrat,
  },
  button: {
    fontFamily: montserrat,
  },
});

export default function MentalIllnessTest() {
  const mentalIllnessData = useSelector(
    (x) => x.persistedReducer.app.mentalIllnessData
  );
  const MHCData = useSelector((x) => x.persistedReducer.app.MHCdata);

  const [isLoaded, setIsLoaded] = React.useState(false);

  const axios = require("axios");

  React.useEffect(() => {
    setIsLoaded(true);
    console.log(MHCData);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit={{ opacity: 0 }}
        style={{ marginTop: 20, marginBottom: "20px" }}
      >
        <Container component="main" maxWidth="md" sx={{ textAlign: "center" }}>
          <img
            src="/image/MentalIllnessTest.png"
            style={{
              width: "100%",
            }}
          ></img>
          <div style={{ marginTop: "15px" }}>
            <Typography
              sx={{
                fontSize: { xs: "15px", md: "17px", xl: "20px", lg: "18px" },
                color: "black",
              }}
              className={glacial.className}
            >
              Mental Illness Test akan membantu memberikan solusi dan
              rekomendasi untuk meningkatkan kesehatan mental dan juga membantu
              menentukan apakah harus mencari bantuan dari psikolog untuk
              mengatasi masalah kesehatan mental.
            </Typography>
          </div>
        </Container>
      </motion.div>

      {/* Mental Ilness Check */}

      <Box
        className={styles.quizDiv}
        sx={{
          paddingTop: "10px",
          paddingBottom: "10px",
          textAlign: "center",
          justifyContent: "center",
          display: { xs: "block", md: "block" },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "15px", md: "17px", xl: "20px" },
            color: "white",
            marginBottom: "10px",
          }}
        >
          Lakukan Mental Illness Test!
        </Typography>
        <Grid container columns={4} spacing={2} sx={{}}>
          {/* <ImageList
            // sx={{ width: "80%", height: "100%", padding: "20px" }}
            // cols={4}
            > */}
          {isLoaded &&
            MHCData.map((item) => {
              if (item.severity >= 2)
                return (
                  <Grid
                  key={item.img}
                    item
                    xl={1}
                    xs={4}
                    lg={1}
                    sm={2}
                    sx={{ justifyItems: "center" }}
                  >
                    <Link legacyBehavior href={item.link} key={item.img}>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        style={{
                          borderRadius: "20px",
                          justifyContent: "center",
                          justifyItems: "center",
                          textAlign: "center",
                        }}
                        transition={{
                          duration: 5,
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                          bounce: 1,
                        }}
                      >
                        <ImageListItem
                          sx={{
                            borderRadius: "20px",
                            margin: "0 auto",
                            // height: { xs: 250, sm: 220, md: 220, lg: 270 },
                            width: { xs: 300, sm: 300, md: 400, lg: 300 },
                          }}
                        >
                          <Box
                            component="img"
                            sx={{
                              borderRadius: "20px",
                              height: { xs: 250, sm: 250, md: 300, lg: 280 },
                              width: { xs: 300, sm: 300, md: 400, lg: 300 },
                            }}
                            alt={item.title}
                            src={item.img}
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
                  </Grid>
                );
            })}
          {/* </ImageList> */}
        </Grid>
        <div>
          <a
            href="https://www.freepik.com/author/stories"
            style={{ fontSize: "11px", color: "white" }}
          >
            Images by storyset on Freepik
          </a>
        </div>
      </Box>
    </ThemeProvider>
  );
}

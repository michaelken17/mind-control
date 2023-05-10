import * as React from "react";
import { Button, Container } from "@mui/material";
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
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit={{ opacity: 0 }}
        style={{ marginTop: 20, marginBottom: 50 }}
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
              sx={{ fontSize: "22px", color: "black" }}
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
      <div
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
          <div style={{ display: "flex", justifyContent: "center" }}>
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
          </div>
          <div>
            <a
              href="https://www.freepik.com/author/stories"
              style={{ fontSize: "11px", color: "white" }}
            >
              Images by storyset on Freepik
            </a>
          </div>
        </Box>
      </div>
    </ThemeProvider>
  );
}

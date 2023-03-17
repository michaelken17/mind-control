import * as React from "react";

import { Button, Container } from "@mui/material";
import { Montserrat } from "next/font/google";
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

const itemData = [
  {
    img: "/image/Mental Illness Illustration/anxietyIll.jpg",
    title: "Anxiety",
    author: "Start Test",
    link: "/Anxiety",
  },
  {
    img: "/image/Mental Illness Illustration/depressionIll.jpg",
    title: "Depression",
    author: "Start Test",
    link: "/Depression",
  },
  {
    img: "/image/Mental Illness Illustration/bipolarIll.jpg",
    title: "Bipolar Disorder",
    author: "Start Test",
    link: "/BipolarDisorder",
  },
  {
    img: "/image/Mental Illness Illustration/ptsdIll.jpg",
    title: "PTSD",
    author: "Start Test",
    link: "/PTSD",
  },
  {
    img: "/image/Mental Illness Illustration/anorexiaIll.jpg",
    title: "Eating Disorders",
    author: "Start Test",
    link: "/EatingDisorders",
  },

  {
    img: "/image/Mental Illness Illustration/schizo.jpg",
    title: "Schizophrenia",
    author: "Start Test",
    link: "/Schizophrenia",
  },
];
const cooperHewitt = localFont({ src: "../public/CooperHewitt-Heavy.otf" });
const glacial = localFont({ src: "../public/GlacialIndifference-Regular.otf" });
const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });

const theme = createTheme({
  typography: {
    fontFamily: montserrat,
  },
  button: {
    fontFamily: montserrat,
  },
});

export default function MentalIllnessTest() {
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
        style={{ marginTop: 20, marginBottom:50 }}
      >
        <Container component="main" maxWidth="md" sx={{}}>
          <img
            src="/image/MentalIllnessTest.png"
            style={{
              width: "100%",
            }}
          ></img>
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
              sx={{ width: "1000px", height: "100%", padding: "20px" }}
              cols={3}
            >
              {itemData.map((item) => (
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
                          height: "250px",
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
    </ThemeProvider>
  );
}

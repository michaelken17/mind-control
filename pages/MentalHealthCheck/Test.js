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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { montserrat, glacial, cooperHewitt } from "../../public/fonts";
import appSlice, { appActions, submitMHC } from "@/redux/slices/appSlice";

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

// MENTAL HEALTH CHECK
export default function MHCTest() {
  const router = useRouter();
  const MHCQuestions = useSelector((x) => x.persistedReducer.app.MHCQuestions);
  const MHCChoices = useSelector((x) => x.persistedReducer.app.MHCChoices);
  const [isAnswered, setisAnswered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const dispatch = useDispatch();

  const [MHCdata, setMHCdata] = useState([
    { no: 1, jawaban: 0 },
    { no: 2, jawaban: 0 },
    { no: 3, jawaban: 0 },
    { no: 4, jawaban: 0 },
    { no: 5, jawaban: 0 },
    { no: 6, jawaban: 0 },
    { no: 7, jawaban: 0 },
    { no: 8, jawaban: 0 },
    { no: 9, jawaban: 0 },
  ]);

  const toggleHandler = (value) => () => {
    setSelectedIndex(value);
    setisAnswered(true);

    const updateData = [...MHCdata];
    const x = updateData.find((a) => a.no === currentQuestion + 1);

    x.jawaban = value.score;
    setMHCdata(updateData);
  };

  const nextHandler = () => {
    if (currentQuestion + 1 != MHCQuestions.length) {
      setcurrentQuestion(currentQuestion + 1);
      setisAnswered(false);
      setSelectedIndex(0);
    } else {
      dispatch(appActions.submitMHC({}));
      dispatch(appActions.submitMHC(MHCdata));
      router.push("Result");
    }
  };

  useEffect(() => {
    // console.log(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    console.log(MHCdata);
  }, [MHCdata]);

  useEffect(() => {
    setIsLoaded(true);
    // console.log(MHCChoices);
    // console.log(MHCQuestions);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" sx={{}}>
        <motion.div
          className={styles.quizDiv}
          style={{
            padding: 10,
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
              padding: 5,
              borderRadius: 10,
              // overflow: "auto",
            }}
          >
            <div style={{ overflow: "auto" }}>
              <Typography
                sx={{
                  fontSize: "17px",
                  color: "black",
                  mx: 2,
                  mt: 2,
                  textAlign: "left",
                }}
                className={montserrat.className}
              >
                Selama 2 Minggu terakhir, seberapa sering Anda terganggu
                oleh masalah berikut?
                {isLoaded && (
                  <Box sx={{ position: "relative", float: "right" }}>
                    <CircularProgress
                      variant="determinate"
                      sx={{
                        color: (theme) =>
                          theme.palette.grey[
                            theme.palette.mode === "light" ? 200 : 800
                          ],
                      }}
                      size={40}
                      thickness={4}
                      value={100}
                    />
                    <CircularProgress
                      variant="determinate"
                      // disableShrink
                      sx={{
                        color: "#FFAACF",
                        position: "absolute",
                        left: 0,
                        [`& .${circularProgressClasses.circle}`]: {
                          strokeLinecap: "round",
                        },
                      }}
                      value={currentQuestion * 14}
                      size={40}
                      thickness={4}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 5,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                      >
                        {currentQuestion + 1}/{MHCQuestions.length}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "black",
                  mx: 2,
                  textAlign: "left",
                }}
                className={montserrat.className}
              >
                <b>
                  {/* {currentQuestion + 1} */}
                  {MHCQuestions[currentQuestion].question}
                </b>
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "black",
                  mx: 2,
                  textAlign: "left",
                }}
                className={montserrat.className}
              >
                <i>{MHCQuestions[currentQuestion].english}</i>
              </Typography>
            </div>

            <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
              <List>
                {isLoaded &&
                  MHCChoices.map((value) => (
                    <ListItemButton
                      key={value.score}
                      button
                      onClick={toggleHandler(value)}
                      selected={selectedIndex === value}
                      sx={{
                        border: "1px solid black",
                        my: 1,
                        width: "100%",
                        borderRadius: "10px",

                        "&.Mui-selected": {
                          background: "rgb(234, 143, 234,0.275)",
                          "&:hover": {
                            background: "rgb(234, 143, 234,0.275)",
                            "&:before": {
                              background: "rgb(234, 143, 234,0.275)",
                            },
                          },
                        },
                      }}
                    >
                      <ListItemText
                        // primary={<b>{value.name}</b>}
                        // secondary={
                        //   <b>{value.desc}</b>
                        // }
                        primary={value.name}
                        secondary={value.desc}
                      />
                    </ListItemButton>
                  ))}
              </List>
            </div>

            {isAnswered && (
              <motion.button
                animate={{}}
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  borderRadius: 5,
                  padding: 10,
                  paddingLeft: 30,
                  paddingRight: 30,
                  fontSize: 20,
                  border: "0px ",
                  backgroundColor: "#FFAACF",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                  bounce: 5,
                  ease: "easeInOut",
                }}
                onClick={() => nextHandler()}
              >
                {currentQuestion + 1 == MHCQuestions.length ? (
                  <Typography>End Test</Typography>
                ) : (
                  <Typography>Next</Typography>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>
      </Container>
    </ThemeProvider>
  );
}

import {
  Box,
  Button,
  Checkbox,
  colors,
  createTheme,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Montserrat } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import localFont from "next/font/local";
import { motion } from "framer-motion";
import { VisibilityOff } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "@/redux/slices/loginSlice";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Link from "next/link";
import { montserrat, glacial, cooperHewitt } from "fonts";
import { appActions } from "@/redux/slices/appSlice";
import { isDoneActions } from "@/redux/slices/isDoneSlice";
import Breadcrumbs from "nextjs-breadcrumbs";
import Image from "next/image";
import dayjs from "dayjs";
import { ThemeProvider } from "@emotion/react";
const theme = createTheme({
  typography: {
    fontFamily: montserrat,
  },
  button: {
    fontFamily: montserrat,
  },
});
const today = dayjs();

const SignInPage = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const axios = require("axios");

  const loginHandler = (event) => {
    event.preventDefault();
    console.log("LOGIN BUTTOn");
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (username == "" || password == "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Mohon mengisi semua data!",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      axios
        .get(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            "/api/Users/GetData?Username=" +
            username
        )
        .then((resp) => {
          console.log(resp.data[0]);

          if (resp.data[0] === undefined) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Username tidak terdaftar!",
              timer: 2000,
              showConfirmButton: false,
            });
          } else {
            axios
              .get(
                process.env.NEXT_PUBLIC_BACKEND_URL +
                  "/api/Users/CheckPassword?username=" +
                  username +
                  "&password=" +
                  password
              )
              .then((respCheck) => {
                console.log(respCheck);
                if (respCheck.data == "False") {
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Password tidak sesuai!",
                    timer: 2000,
                    showConfirmButton: false,
                  });
                } else {
                  // Check if user has done MHC
                  axios
                    .get(
                      process.env.NEXT_PUBLIC_BACKEND_URL +
                        "/api/MHCheck/CheckUserMhCheckHeaderExit?userId=" +
                        resp.data[0].userId
                    )
                    .then((respcheckMHC) => {
                      console.log(respcheckMHC.data);
                      // respcheckMHC.data == "False" ? setisDoneMHC(false) : setisDoneMHC(true);

                      if (respcheckMHC.data == "True") {
                        axios
                          .get(
                            process.env.NEXT_PUBLIC_BACKEND_URL +
                              "/api/MHCheck/GetSeverity?userId=" +
                              resp.data[0].userId
                          )
                          .then((respSeverity) => {
                            console.log(respSeverity.data);
                            const MentalIllnessList = [
                              {
                                img: "/image/Mental Illness Illustration/4.png",
                                title: "Depression",
                                author: "Gangguan Depresi",
                                link: "/MentalIllness/Depression/Panduan",
                                severity: respSeverity.data.anxSeverity,
                              },
                              {
                                img: "/image/Mental Illness Illustration/1.png",
                                title: "Anxiety",
                                author: "Gangguan Kecemasan",
                                link: "/MentalIllness/Anxiety/Panduan",
                                severity: respSeverity.data.dprSeverity,
                              },
                              {
                                img: "/image/Mental Illness Illustration/3.png",
                                title: "OCD",
                                author: "Obsessive-Compulsive Disorder",
                                link: "/MentalIllness/OCD/Panduan",
                                severity: respSeverity.data.ocdSeverity,
                              },
                              {
                                img: "/image/Mental Illness Illustration/5.png",
                                title: "Sleep Disorder",
                                author: "Gangguan Tidur",
                                link: "/MentalIllness/SleepDisorder/Panduan",
                                severity: respSeverity.data.sdSeverity,
                              },
                            ];
                            dispatch(appActions.MHCData(MentalIllnessList));
                          });

                        dispatch(
                          isDoneActions.isDone({
                            isDoneMHC: true,
                            isDoneDpr: false,
                            isDoneAnx: false,
                            isDoneOcd: false,
                            isDoneSd: false,
                            isDoneDHC: false,
                          })
                        );
                      }

                      dispatch(
                        loginActions.login({
                          isDoneMHC: respcheckMHC.data,
                          email: resp.data[0].email,
                          fullname: resp.data[0].fullName,
                          MHpoints: resp.data[0].healthPoint,
                          password: password,
                          consultant: false,
                          freeConsultation: resp.data[0].freeConsultation,
                          userid: resp.data[0].userId,
                          username: username,
                        })
                      );

                      const Toast = Swal.mixin({
                        toast: true,
                        position: "bottom-end",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: false,
                      });

                      Toast.fire({
                        icon: "success",
                        title: "Sign In berhasil!",
                      });

                      router.push("/Home");
                    });

                  // CHECK DHC STREAK (if streak broken, set MHP back to 0)
                  axios
                    .get(
                      process.env.NEXT_PUBLIC_BACKEND_URL +
                        "/api/Users/GetDHCData?UserID=" +
                        resp.data[0].userId
                    )
                    .then((respDHCData) => {
                      let dayDiff = today.diff(
                        dayjs(respDHCData.data.creationDate),
                        "day"
                      );

                      if (dayDiff > 1) {
                        axios
                          .put(
                            process.env.NEXT_PUBLIC_BACKEND_URL +
                              "/api/DHC/UpdateMHCPoint?UserID=" +
                              resp.data[0].userId +
                              "&opr=reset"
                          )
                          .then((respUpdate) => {
                            Swal.fire({
                              title: "Daily Health Check streak anda berakhir!",
                              icon: "warning",
                              showDenyButton: false,
                              showConfirmButton: true,
                              allowOutsideClick: false,
                              html: "<a>Mental Health Point anda di reset menjadi 0</a>",
                              background: "white",
                            });

                            dispatch(
                              loginActions.login({
                                email: resp.data[0].email,
                                fullname: resp.data[0].fullName,
                                MHpoints: 0,
                                password: password,
                                consultant: false,
                                freeConsultation: resp.data[0].freeConsultation,
                                userid: resp.data[0].userId,
                                username: username,
                              })
                            );
                          });
                      }
                    });
                }
              });
          }
        });
    }
  };

  //Press Enter key to login
  useEffect(() => {
    const keyDownHandler = (event) => {
      // console.log("User pressed: ", event.key);

      if (event.key === "Enter") {
        event.preventDefault();
        // 👇️ call submit function here
        loginHandler(event);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {" "}
      <Grid xs={12} sm={12} md={7} lg={6} xl={7} item={true}>
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "65vh",
            // boxShadow: `0 0 5 px black`,
            borderRadius: {
              xs: "30px",
              sm: "30px",
              md: "30px 0 0 30px",
              lg: "30px 0 0 30px",
              xl: "30px 0 0 30px",
            },
          }}
        >
          <Box width="70%">
            <Box display="flex" flexDirection="column" alignItems="center">
              {/* LOGO */}
              <Box
                sx={{
                  width: "40%",
                  height: "40%",
                  //  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    maxHeight: 150,
                    maxWidth: 150,
                    borderRadius: 10,
                  }}
                  alt=""
                  src="image/mcwebicon.png"
                />
              </Box>
              {/* LOGO END */}

              <Typography
                color="#FFAACF"
                className={cooperHewitt.className}
                sx={{
                  textAlign: "center",
                  marginTop: 0,
                  marginBottom: 0,
                  fontSize: "20px",
                  letterSpacing: "1px",
                }}
                mt={7}
                mb={1}
              >
                SIGN IN TO <a style={{ color: "#EA8FEA" }}>MINDCONTROL</a>
              </Typography>
            </Box>

            {/* INPUTS */}
            <div style={{ marginTop: "20px" }}>
              <Box
                display="flex"
                flexDirection="column"
                alignContent="center"
                justifyContent="flex-start"
                mb={2}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                >
                  <Typography
                    color="#2f4858"
                    pb={1}
                    className={montserrat.className}
                  >
                    Username
                  </Typography>

                  <Paper
                    sx={{
                      width: "100%",
                    }}
                  >
                    <InputBase
                      className={montserrat.className}
                      placeholder="Tulis username anda..."
                      fullWidth
                      sx={{
                        bgcolor: "white",
                        p: 1,
                        borderRadius: "5px",
                      }}
                      inputRef={usernameRef}
                    />
                  </Paper>
                </Box>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                alignContent="center"
                justifyContent="flex-start"
                mb={1}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                >
                  <Typography
                    color="#2f4858"
                    pb={1}
                    className={montserrat.className}
                  >
                    Password
                  </Typography>

                  <Paper
                    sx={{
                      width: "100%",
                    }}
                  >
                    <InputBase
                      className={montserrat.className}
                      placeholder="Tulis password anda..."
                      fullWidth
                      sx={{
                        bgcolor: "white",
                        p: 1,
                        borderRadius: "5px",
                      }}
                      type="password"
                      inputRef={passwordRef}
                    />
                  </Paper>
                </Box>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                alignContent="center"
                justifyContent="flex-start"
                mb={2}
              ></Box>
            </div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                className={montserrat.className}
                fullWidth
                sx={{
                  mt: {xl:"30px", md:"30px"},
                  boxShadow: `0 0 10px #FFAACF`,
                  color: "white",
                  bgcolor: "#FFAACF",
                  "&:hover": {
                    backgroundColor: "#FFAACF",
                  },
                }}
                onClick={loginHandler}
              >
                Login
              </Button>
            </motion.div>
          </Box>
          <Link legacyBehavior href="Login/SignUpPage">
            <Typography
              sx={{
                mt: 1,
                fontSize: 13,
                textDecoration: "underline",
                color: "gray",
                cursor: "pointer",
              }}
            >
              Sign Up
            </Typography>
          </Link>

          <Link legacyBehavior href="Login/LoginConsultant">
            <Typography
              sx={{
                mt: 1,
                fontSize: 13,
                color: "#FFAACF",
                cursor: "pointer",
              }}
              className={montserrat.className}
            >
              Login sebagai Konsultan
            </Typography>
          </Link>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default SignInPage;

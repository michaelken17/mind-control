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
import { loginConsultantAction } from "@/redux/slices/loginConsultantSlice";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Link from "next/link";
import { montserrat, glacial, cooperHewitt } from "../../public/fonts";
import { appActions } from "@/redux/slices/appSlice";
import { isDoneActions } from "@/redux/slices/isDoneSlice";
import Breadcrumbs from "nextjs-breadcrumbs";
import Image from "next/image";

const SignInConsultant = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const axios = require("axios");
  const loginHandler = (event) => {
    event.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (username == "" || password == "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter your username and password!",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      axios
      .get(
        "https://localhost:7184/api/Consultant/GetConsultantData?username=1" +
          username
      )
      axios
        .get(
          "https://localhost:7184/api/Consultant/GetConsultantData?username=" +
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
                "https://localhost:7184/api/Consultant/CheckPasswordConsultant?username=" +
                  username +
                  "&password=" +
                  password
              )
              .then((respCheck) => {
                console.log(respCheck);
                if (respCheck.data == false) {
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Password tidak sesuai!",
                    timer: 2000,
                    showConfirmButton: false,
                  });
                } else {
                  dispatch(
                    loginConsultantAction.loginConsultant({
                      username: resp.data[0].username,
                      fullname: resp.data[0].fullName,
                      gelar: resp.data[0].gelar,
                      pendidikan: resp.data[0].pendidikan,
                      spesialisasi: resp.data[0].spesialisasi,
                      pengalaman: resp.data[0].pengalaman,
                      consultantid: resp.data[0].consultantID,
                      tempatpraktek: resp.data[0].tempatPraktek,
                      harga: resp.data[0].harga,
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

                  router.push("/HomeConsultant");
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
        // router.push("/Login/LoginConsultant");
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
                  width: "100%",
                  borderRadius: 10,
                }}
                alt=""
                src="../image/mcwebicon.png"
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
              SIGN IN AS CONSULTANT TO{" "}
              <a style={{ color: "#EA8FEA" }}>MINDCONTROL</a>
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
                mt: 4,
                mn: 4,
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
        <Link legacyBehavior href="SignUpConsultant">
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
      </Box>
    </Grid>
  );
};

export default SignInConsultant;

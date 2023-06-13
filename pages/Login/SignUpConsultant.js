import {
  Box,
  Button,
  Card,
  InputBase,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "@/redux/slices/loginSlice";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { montserrat, glacial, cooperHewitt } from "../../public/fonts";
import Image from "next/image";

const SignUpConsultant = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const loginHandler = (event) => {
    event.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    // if (username == "" || password == "") {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Error",
    //     text: "Please enter your username and password!",
    //     timer: 2000,
    //     showConfirmButton: false,
    //   });
    // } else {
    //   dispatch(
    //     loginActions.login({
    //       username: username,
    //       email: "emailtest@gmail.com",
    //       password: password,
    //     })
    //   );

    //   const Toast = Swal.mixin({
    //     toast: true,
    //     position: "top-end",
    //     showConfirmButton: false,
    //     timer: 2000,
    //     timerProgressBar: true,
    //     // didOpen: (toast) => {
    //     //   toast.addEventListener("mouseenter", Swal.stopTimer);
    //     //   toast.addEventListener("mouseleave", Swal.resumeTimer);
    //     // },
    //   });

    //   Toast.fire({
    //     icon: "success",
    //     title: "User has been registered!",
    //   });

    //   router.push("/LoginConsultant");
    // }
    router.push("LoginConsultant");
  };

  //Press Enter key to signup
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        loginHandler(event);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          padding: "20px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "100%", sm: "70%", lg: "50%", xl: "50%" },
        }}
      >
        <Box sx={{ bgcolor: "white" }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            {/* LOGO */}
            <Box
              sx={{
                //  borderRadius: "12px",
                width: { xs: "40%", xl: "20%" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                sx={{
                  width: "100%",borderRadius: 10
                }}
                alt=""
                src="/image/mcwebicon.png"
              />
              {/* <Image
                src="/image/mcwebicon.png"
                width="100%"
                style={{ borderRadius: 10 }}
              /> */}
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
              DAFTAR SEBAGAI <a style={{ color: "#EA8FEA" }}>KONSULTAN</a>
            </Typography>
          </Box>

          <Grid
            container
            columns={12}
            spacing={2}
            sx={{ marginTop: "20px", bgcolor: "white" }}
          >
            {/* Full Name */}
            <Grid item xl={6} md={6} sm={12} xs={12}>
              <Box
                display="flex"
                flexDirection="column"
                alignContent="center"
                justifyContent="flex-start"
                mb={2}
              >
                <Typography
                  color="#2f4858"
                  pb={1}
                  className={montserrat.className}
                >
                  Full Name
                </Typography>

                <Paper
                  sx={{
                    width: "100%",
                  }}
                >
                  <InputBase
                    className={montserrat.className}
                    placeholder="Masukkan nama lengkap anda..."
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
            </Grid>

            {/* Bidang Keahlian */}
            <Grid item xl={6} md={6} sm={12} xs={12}>
              <Box
                display="flex"
                flexDirection="column"
                alignContent="center"
                justifyContent="flex-start"
                mb={2}
              >
                <Typography
                  color="#2f4858"
                  pb={1}
                  className={montserrat.className}
                >
                  Bidang Keahlian
                </Typography>

                <Paper
                  sx={{
                    width: "100%",
                  }}
                >
                  <InputBase
                    className={montserrat.className}
                    placeholder="Masukkan Bidang Keahlian anda..."
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
            </Grid>

            {/* Email */}
            <Grid item xl={6} md={6} sm={12} xs={12}>
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
                    Email
                  </Typography>

                  <Paper
                    sx={{
                      width: "100%",
                    }}
                  >
                    <InputBase
                      className={montserrat.className}
                      placeholder="Masukkan Email anda..."
                      fullWidth
                      sx={{
                        bgcolor: "white",
                        p: 1,
                        borderRadius: "5px",
                      }}
                      inputRef={passwordRef}
                    />
                  </Paper>
                </Box>
              </Box>
            </Grid>

            {/* Tempat Praktik */}
            <Grid item xl={6} md={6} sm={12} xs={12}>
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
                    Tempat Praktik
                  </Typography>

                  <Paper
                    sx={{
                      width: "100%",
                    }}
                  >
                    <InputBase
                      className={montserrat.className}
                      placeholder="Masukkan Tempat Praktik anda..."
                      fullWidth
                      sx={{
                        bgcolor: "white",
                        p: 1,
                        borderRadius: "5px",
                      }}
                      inputRef={passwordRef}
                    />
                  </Paper>
                </Box>
              </Box>
            </Grid>

            {/* Password */}
            <Grid item xl={6} md={6} sm={12} xs={12}>
              <Box
                display="flex"
                flexDirection="column"
                alignContent="center"
                justifyContent="flex-start"
                mb={2}
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
                    placeholder="Masukkan password anda..."
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
            </Grid>

            {/* Pengalaman */}
            <Grid item xl={6} md={6} sm={12} xs={12}>
              <Box
                display="flex"
                flexDirection="column"
                alignContent="center"
                justifyContent="flex-start"
                mb={2}
              >
                <Typography
                  color="#2f4858"
                  pb={1}
                  className={montserrat.className}
                >
                  Pengalaman
                </Typography>

                <Paper
                  sx={{
                    width: "100%",
                  }}
                >
                  <InputBase
                    className={montserrat.className}
                    placeholder="cnth: 10 tahun"
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
            </Grid>

            {/* Pendidikan */}
            <Grid item xl={6} md={6} sm={12} xs={12}>
              <Box
                display="flex"
                flexDirection="column"
                alignContent="center"
                justifyContent="flex-start"
                mb={2}
              >
                <Typography
                  color="#2f4858"
                  pb={1}
                  className={montserrat.className}
                >
                  Pendidikan
                </Typography>

                <Paper
                  sx={{
                    width: "100%",
                  }}
                >
                  <InputBase
                    className={montserrat.className}
                    placeholder="Masukkan Pendidikan anda..."
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
            </Grid>

            {/* Gender */}
            <Grid item xl={6} md={6} sm={12} xs={12}>
              <FormControl>
                <Typography
                  color="#2f4858"
                  pb={1}
                  className={montserrat.className}
                >
                  Gender
                </Typography>
                <RadioGroup row>
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label={
                      <Typography className={montserrat.className}>
                        Female
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label={
                      <Typography className={montserrat.className}>
                        Male
                      </Typography>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Login Btn */}
            <Grid item xl={12} md={12} sm={12} xs={12}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  className={montserrat.className}
                  fullWidth
                  sx={{
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
                  Sign Up
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpConsultant;

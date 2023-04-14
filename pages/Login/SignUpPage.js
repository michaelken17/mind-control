import {
  Box,
  Button,
  InputBase,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Montserrat } from "next/font/google";
import { useEffect, useRef } from "react";
import localFont from "next/font/local";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "@/redux/slices/loginSlice";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });
const cooperHewitt = localFont({ src: "../public/CooperHewitt-Heavy.otf" });

const SignUpPage = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

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
      dispatch(
        loginActions.login({
          username: username,
          email: "emailtest@gmail.com",
          password: password,
        })
      );

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        // didOpen: (toast) => {
        //   toast.addEventListener("mouseenter", Swal.stopTimer);
        //   toast.addEventListener("mouseleave", Swal.resumeTimer);
        // },
      });

      Toast.fire({
        icon: "success",
        title: "User has been registered!",
      });

      router.push("/login");
    }
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Box
        sx={{
        mt:10,
          bgcolor: "white",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            width: "50%",
          }}
        >
          <Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              {/* LOGO */}
              <Box
                sx={{
                  width: "50%",
                  height: "50%",
                  //  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="image/mcwebicon.png"
                  width="100%"
                  style={{ borderRadius: 10 }}
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
                  letterSpacing:"1px"
                }}
                mt={7}
                mb={1}
              >
                SIGN UP TO <a style={{ color: "#EA8FEA" }}>MINDCONTROL</a>
              </Typography>
            </Box>

            {/* INPUTS */}
            <div style={{ marginTop: "20px" }}>
              {/* Full Name */}
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
                    Full Name
                  </Typography>

                  <Paper
                    sx={{
                      width: "100%",
                    }}
                  >
                    <InputBase
                      className={montserrat.className}
                      placeholder="Enter your Full Name..."
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

              {/* Email */}
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
                      placeholder="Enter your Email..."
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

              {/* Password */}
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
                      placeholder="Enter your Password..."
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

              {/* Gender */}
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
                Sign Up
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default SignUpPage;

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
  import { useEffect, useRef } from "react";
  import localFont from "next/font/local";
  import { motion } from "framer-motion";
  import { VisibilityOff } from "@mui/icons-material";
  import { useSelector, useDispatch } from "react-redux";
  import { loginActions } from "@/redux/slices/loginSlice";
  import { useRouter } from "next/router";
  import Swal from "sweetalert2";
  import Link from "next/link";
  import { montserrat, glacial, cooperHewitt } from "../../public/fonts";
  
  const SignInConsultant = () => {
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
            consultant: true
          })
        );
  
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: false,
          // didOpen: (toast) => {
          //   toast.addEventListener("mouseenter", Swal.stopTimer);
          //   toast.addEventListener("mouseleave", Swal.resumeTimer);
          // },
        });
  
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
  
        router.push("/HomeConsultant");
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
                <img
                  src="../image/mcwebicon.png"
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
                  letterSpacing: "1px",
                }}
                mt={7}
                mb={1}
              >
                SIGN IN AS CONSULTANT TO <a style={{ color: "#EA8FEA" }}>MINDCONTROL</a>
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
          <Link href="SignUpConsultant" legacyBehavior>
            <Typography
              sx={{
                mt: 1,
                fontSize: 13,
                textDecoration: "underline",
                color: "gray",
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
  
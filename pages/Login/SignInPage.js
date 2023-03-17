import {
  Box,
  Button,
  Checkbox,
  colors,
  createTheme,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Montserrat } from "next/font/google";
import React from "react";
import CustomInput from "./CustomInput";
import localFont from "next/font/local";
import { motion } from "framer-motion";

const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });
const cooperHewitt = localFont({ src: "../../public/CooperHewitt-Heavy.otf" });

const SigninPage = () => {
  return (
    <Grid xs={12} sm={12} md={6} lg={7} xl={7}>
      <Box
        sx={{
          padding:"20px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
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
        <Box width="50%">
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
              }}
              mt={7}
              mb={1}
            >
              Sign In to <a style={{ color: "#EA8FEA" }}>MindControl</a>
            </Typography>
          </Box>

          {/* INPUTS */}
          <div style={{ marginTop: "20px" }}>
            <CustomInput
              label="Login"
              placeholder="Enter your Email..."
              isIconActive={false}
            />
            <CustomInput
              label="Password"
              placeholder="Enter your Password..."
              isIconActive={true}
            />
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
            >
              Login
            </Button>
          </motion.div>
        </Box>
      </Box>
    </Grid>
  );
};

export default SigninPage;

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { motion } from "framer-motion";
import {
  montserrat,
  glacial,
  cooperHewitt,
  montserratExtraBold,
  montserratLight,
  montserratBold,
} from "../../public/fonts";
import DaftarPsikolog from "./DaftarPsikolog";

const steps = [
  "Pilih psikolog yang diinginkan",
  "Jadwalkan konsultasi online",
  "Pembayaran",
];

export default function PemesananKonsultasi() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  useEffect(() => {
    setIsLoaded(true);

    axios
      .get("https://localhost:7184/api/Consultant/GetAllConsultantData")
      .then((resp) => {
        console.log(resp.data);
      });
  }, []);
  useEffect(() => {
    console.log(activeStep);
  }, [activeStep]);

  return (
    <Container component="main" maxWidth="lg" sx={{ padding: "20px" }}>
      {isLoaded && (
        <motion.div
          style={{
            padding: "0px",
            borderRadius: 10,
            fontSize: 20,
            height: "100%",
            //   border: "10px solid",
            textAlign: "center",
            justifyItems: "center",
            color: "black",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0,
          }}
          exit={{ opacity: 0 }}
        >
          {/* Pemesanan Konsultasi Online */}
          <Typography
            sx={{
              fontSize: { xl: "30px", xs: "25px" },
              color: "black",
              textAlign: "left",
            }}
            className={montserratExtraBold.className}
          >
            Pemesanan Konsultasi Online
          </Typography>
          <Typography
            sx={{
              fontSize: {
                lg: "17px",
                md: "15px",
                sm: "15px",
                xs: "13px",
              },
              color: "black",
              textAlign: "left",
              mb: 2,
            }}
            className={montserrat.className}
          >
            Langkah-langkah untuk memesan konsultasi online bersama psikolog
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : activeStep === 0 ? (
              <React.Fragment>
                <DaftarPsikolog />
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            ) : activeStep === 1 ? (
              <Box>
                <Typography>hello</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography>wot</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </motion.div>
      )}
    </Container>
  );
}

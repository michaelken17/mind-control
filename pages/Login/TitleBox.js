import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const TitleBox = () => {
  return (
    <Grid xs={0} sm={0} md={6} lg={6} xl={6} minHeight={550}>
      <Box
        sx={{
          // boxShadow: `0px 0px 5px black`,
          backgroundImage: `linear-gradient(50deg, rgb(255, 170, 207, 0.7) , rgb(234, 143, 234, 0.7))`,
          padding: "20px",
          display: {
            xs: 'none',
            sm: 'none',
            md: 'flex',
            lg: 'flex', 
            xl: 'flex'
          },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          borderRadius: "0px 30px 30px 0",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Typography variant="h4" fontWeight="bold" color="whitesmoke" mb={3}>
            Join Our <br /> Community
          </Typography>
          <Typography variant="body1" fontWeight="" color="whitesmoke">
            A healthy mind is the greatest treasure to find
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default TitleBox;
import { Box, ThemeProvider } from "@mui/material";
import styles from "styles/Quiz.module.css";
import { motion } from "framer-motion";

const MainLayout = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{opacity:0}}
      transition={{ duration: 0.5 }}
    >
      <Box
        className={styles.quizDiv}
        sx={{
          bgcolor: "black",
          display:"flex",
          paddingTop: "100px",
          height: "100vh",
          justifyContent:"center",
        }}
      >
        {children}
      </Box>
    </motion.div>
  );
};

export default MainLayout;

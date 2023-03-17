import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import {
  Box,
  TextField,
  Card,
  Stack,
  Button,
  IconButton,
  Tooltip,
  List,
  ListItem,
  Grid,
  Typography,
  ListItemText,
  Alert,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 5,
  width: 20,
  height: 20,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#7CC443",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 20,
    height: 20,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#7CC443",
  },
});

function BpCheckbox(props) {
  return (
    <Checkbox
      sx={{
        "&:hover": { bgcolor: "#F5F0BB" },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
}

export default function ToDoList() {
  const [getNewTask, setNewTask] = useState("");
  const [taskArray, setTaskArray] = useState([]);
  const [value, setValue] = useState("");

  const newTaskHandler = (event) => {
    setNewTask(event.target.value);
  };

  const getTasks = async () => {
    await axios
      .get("http://127.0.0.1:8090/api/collections/todolist/records")
      .then((response) => {
        // console.log(response.data.items);

        // let tasks = response.data.map((data) => {
        //   const today =  data.created;
        //   const dateNow = new Intl.DateTimeFormat("en-UK", {
        //     year: "numeric",
        //     month: "2-digit",
        //     day: "2-digit",
        //   }).format(today)

        //   return {
        //     task: data.tasks,
        //     date:  dateNow,
        //   };
        // });
        let tasks = [];
        Object.values(response.data.items).map((data) => {
          var date = Date.parse(data.created);
          var formattedDate = format(date, "dd/MM/yyyy");

          tasks.push({
            id: data.id,
            task: data.tasks,
            isDone: data.isDone,
            date: formattedDate,
          });
        });

        setTaskArray(tasks);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const submitNewTask = async () => {
    // const today = Date.now();
    // const dateNow = new Intl.DateTimeFormat("en-UK", {
    //   year: "numeric",
    //   month: "2-digit",
    //   day: "2-digit",
    // }).format(today);

    // setTaskArray((tasks) => [
    //   {
    //     id: taskArray.length == 0 ? 1 : taskArray[0].id + 1,
    //     task: getNewTask,
    //     date: dateNow.toString(),
    //   },
    //   ...tasks,
    // ]);
    // this.setState(this.getDefaultState())

    await axios.post("http://127.0.0.1:8090/api/collections/todolist/records", {
      tasks: getNewTask,
      isDone: false,
    });
    getTasks();
  };

  function handleKeyPress(e) {
    var key = e.key;

    if (key == "Enter") {
      submitNewTask(e);
      setNewTask("");
    }
  }

  const deleteTask = async (value, id) => {
    // setTaskArray((taskArray) => taskArray.filter((x) => x.id !== id));
    await axios.delete(
      "http://127.0.0.1:8090/api/collections/todolist/records/" + id
    );
    getTasks();
  };

  function checkBoxChange(value, id) {
    // console.log(id);
    axios
      .get(`http://127.0.0.1:8090/api/collections/todolist/records/${id}`)
      .then((response) => {
        doneBool = response.data.isDone;
        var boolChange = doneBool === true ? false : true;
        var doneBool;
        axios.patch(
          `http://127.0.0.1:8090/api/collections/todolist/records/${id}`,
          { isDone: boolChange }
        );
      });
  }

  useEffect(() => {
    // console.log(taskArray);
    setTaskArray(taskArray);
    getTasks();
  }, [taskArray]);

  //  useEffect(() => {
  //     console.log(getNewTask)
  //   }, [getNewTask])

  return (
    <Container sx={{ width: "100%" }}>
      <Paper
        elevation={3}
        sx={{
          mx: 30,
          height: "76vh",
          backgroundColor: "#73A9AD",
          //   border: 1,
          //   borderColor: "black",
          //   borderRadius: 5,
          position: "relative",
          justifyContent: "center",
          py: 2,
        }}
      >
        <Stack
          direction="row"
          sx={{ color: "#F5F0BB", mx: 3, justifyContent: "center" }}
        >
          <ListAltIcon sx={{ fontSize: 40, pt: 0 }} />
          <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
            Tasks
          </Typography>
        </Stack>

        <Box sx={{ paddingTop: 2, width: "100%", px: 3 }}>
          <Grid container spacing={1}>
            <Grid item sx={{ width: "100%" }}>
              <List sx={{ height: "60vh", overflow: "auto" }}>
                {taskArray.map((task) => (
                  <Card key={task.id} sx={{ mb: 1, bgcolor: "#C4DFAA" }}>
                    <ListItem
                      sx={{
                        padding: 0.5,
                        "&:hover": {
                          backgroundColor: "#90C8AC",
                          color: "white",
                          "& .MuiListItemIcon-root": {
                            color: "white",
                          },
                        },
                      }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={(e) => deleteTask(e, task.id)}
                        >
                          <DeleteIcon sx={{ color: "#DD5353" }} />
                        </IconButton>
                      }
                    >
                      <BpCheckbox
                        checked={task.isDone === true ? true : false}
                        onChange={(e) => checkBoxChange(e, task.id)}
                      />
                      <ListItemText
                        sx={{
                          mx: 2,
                          ...(task.isDone === true && {
                            textDecorationLine: "line-through",
                          }),
                        }}
                        primary={task.task}
                        secondary={task.date}
                      />
                    </ListItem>
                  </Card>
                ))}
              </List>
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Card
                sx={{
                  width: "100%",
                  bottom: 0,
                  mb: 2,
                  backgroundColor: "white",
                }}
              >
                <Stack direction="row" spacing={1}>
                  <TextField
                    id="standard"
                    placeholder="Add New Task"
                    sx={{
                      width: "100%",
                      bgcolor: "white",
                      padding: 1,
                    }}
                    defaultValue={value}
                    variant="standard"
                    onChange={newTaskHandler}
                    onKeyPress={(e) => handleKeyPress(e)}
                  />

                  <IconButton
                    sx={{ fontSize: 25, color: "#7CC443" }}
                    onClick={(e) => submitNewTask(e)}
                  >
                    <Tooltip title="Add New Task">
                      <AddCircleIcon sx={{ fontSize: 25 }} />
                    </Tooltip>
                  </IconButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Box>
        {/* <Alert sx={{m: 1}} severity="success">This is a success alert — check it out!</Alert> */}
      </Paper>
    </Container>
  );
}

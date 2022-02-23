import * as mui from "@mui/material"; 

const Button = mui.styled(mui.Button)(({ theme }) => ({
    color: theme.palette.getContrastText(mui.colors.purple[500]),
    backgroundColor: "#",
    margin: "3%",
    fontFamily: "hussor-bold",
  
    "&:hover": {
      backgroundColor: "",
      color: "white",
      textShadow: "0px 0px 20px 1px #0f0f0f",
    },
    "&:focus": {
      border: "none",
      boxShadow: "none",
      outline: "none",
    },
  }));

  const PrimaryButton = mui.styled(mui.Button)(({ theme }) => ({
    color: theme.palette.getContrastText(mui.colors.purple[500]),
    backgroundColor: "#17d88b",
    margin: "3%",
    fontFamily: "hussor-bold",
    borderRadius:"25px",
    padding:"10px",
  
    "&:hover": {
      backgroundColor: "#25d88b",
      color: "white",
      boxShadow: "0px 0px 20px 1px #0f0f0f",
    },
    "&:focus": {
      border: "none",
      boxShadow: "none",
      outline: "none",
    },
  }));
  const SecondaryButton = mui.styled(mui.Button)(({ theme }) => ({
   color: theme.palette.getContrastText(mui.colors.purple[500]),
  backgroundColor: "#6745dc",
  fontFamily: "hussor-bold",
  padding:"10px",
  margin: "3%",
  '&:hover': {
    backgroundColor: "#7345ef",
    boxShadow: "0px 0px 20px 1px #0f0f0f",
  },
  }));
  export default Button

  export{
    PrimaryButton,
    SecondaryButton
  }
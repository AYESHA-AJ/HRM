import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Talent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 
  return (
    <Box m="20px">
      <Header
        title="Employee Recruitment"
        subtitle="List of Cvs"
      />
     
    </Box>
  );
};

export default Talent;
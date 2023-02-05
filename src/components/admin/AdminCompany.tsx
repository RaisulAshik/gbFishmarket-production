import * as React from "react";
import { Box, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AddCompany from "./nestedComponents/Company/AddCompany";
import AboutUs from "./nestedComponents/Company/AboutUs";
import History from "./nestedComponents/Company/AddHistory";
import CEOMessage from "./nestedComponents/Company/CEOMessage";
import Mission from "./nestedComponents/Company/Mission";

const AdminCompany = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h5">Company Profile Customaization</Typography>
      <Typography variant="h6" className="py-4">
        Add edit Company Profile and Team
      </Typography>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Company Profile" value="1" />
              <Tab label="About Us" value="2" />
              <Tab label="History" value="3" />
              <Tab label="Message From CEO" value="4" />
              <Tab label="Mission & Vision" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1"><AddCompany/></TabPanel>
          <TabPanel value="2"><AboutUs/></TabPanel>
          <TabPanel value="3"><History/></TabPanel>
          <TabPanel value="4"><CEOMessage/></TabPanel>
          <TabPanel value="5"><Mission/></TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};
export default AdminCompany;

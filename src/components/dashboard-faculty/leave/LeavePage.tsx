import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Button, FormControl, FormLabel, Input, Sheet, Stack } from "@mui/joy";
import StudentSelect from "./StudentSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Ensure styles are imported
import { CreateLeave } from "../../../types/types";
import { createLeave } from "../../../services/leave.services";

export default function LeavePage() {
  const today = new Date();
  const [formData, setFormData] = React.useState<CreateLeave>({
    studentId: "",
    mailTo: "",
    startDate: today,
    endDate: today,
    title: "",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle date changes
  const handleDateChange = (name: "startDate" | "endDate", date: Date | null) => {
    if (date) {
      setFormData((prev) => ({ ...prev, [name]: date }));
    }
  };

  // Form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    createLeave(formData)
    // createLeave(formData); // Uncomment when integrating API
  };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: { xs: 2, md: 3 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
          }}
        >
          <Header />

          <Typography
            sx={{
              mt: 2,
              mb: 1,
              fontWeight: "bold",
              fontSize: { xs: "h4", sm: "h3" },
            }}
            level="h3"
          >
            Create Leave
          </Typography>
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
              marginX: "auto",
              position: "relative",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Enter Student Registration Number</FormLabel>
                  <StudentSelect
                    value={formData.studentId}
                    onChange={(value) => setFormData({ ...formData, studentId: value })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Mail To</FormLabel>
                  <Input type="email" name="mailTo" value={formData.mailTo} onChange={handleInputChange} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Start Date</FormLabel>
                  <DatePicker
                    name="startDate"
                    selected={formData.startDate}
                    onChange={(date) => handleDateChange("startDate", date)}
                    dateFormat="dd/MM/yyyy"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>End Date</FormLabel>
                  <DatePicker
                    name="endDate"
                    selected={formData.endDate}
                    onChange={(date) => handleDateChange("endDate", date)}
                    dateFormat="dd/MM/yyyy"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input name="title" value={formData.title} onChange={handleInputChange} required />
                </FormControl>
              </Stack>
              <Button type="submit" size="md" sx={{ my: 2, fontSize: "1rem" }}>
                Submit
              </Button>
            </form>
          </Sheet>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

const Header = () => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="small" />}
          sx={{ pl: 0 }}
        >
          <Link underline="none" color="neutral" href="#some-link" aria-label="Home">
            <HomeRoundedIcon />
          </Link>
          <Link underline="hover" color="neutral" href="#some-link" sx={{ fontSize: 12, fontWeight: 500 }}>
            Dashboard
          </Link>
          <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
            Leave
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          Leave
        </Typography>
      </Box>
    </>
  );
};

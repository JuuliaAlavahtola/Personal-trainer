import "./index.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CssBaseline, Container, AppBar, Toolbar, Typography } from "@mui/material";

function App() {
  const location = useLocation();

  const getTitle = (): string => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/customerlist":
        return "Customers";
      case "/traininglist":
        return "Trainings";
      default:
        return "Personal Trainer";
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {getTitle()}
          </Typography>
          <nav style={{ display: "flex", gap: "16px" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
            <Link
              to="/customerlist"
              style={{ color: "white", textDecoration: "none" }}
            >
              Customers
            </Link>
            <Link
              to="/traininglist"
              style={{ color: "white", textDecoration: "none" }}
            >
              Trainings
            </Link>
          </nav>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;

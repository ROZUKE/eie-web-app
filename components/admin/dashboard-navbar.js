import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Image from "next/image";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle as UserCircleIcon } from "@mui/icons-material";
import eieiLogo from "../../public/image/eie-logo.png";
const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
              color: "white",
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Image src={eieiLogo} height={45} width={45} />

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", flexFlow: "column" }}>
            <Typography variant="body2">Natali Lizarasu</Typography>
            <Typography variant="caption">administrator</Typography>
          </Box>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
            }}
            src="/static/images/avatars/avatar_1.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};

import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import logo from "../../images/shopple_icon.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: "auto",
    display: "block",
    height: "30px",
    width: "auto",
  },
  search: {
    position: "relative",
    border: "1px solid #cbcbcb",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#cbcbcb", 0.1),
    "&:hover": {
      backgroundColor: fade("#cbcbcb", 0.2),
    },
    width: "100%",
    float: "none",
    [theme.breakpoints.up("xs")]: {
      width: "auto",
      float: "none",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create("width"),
    width: "400px",
    "&:focus": {
      backgroundColor: fade("#cbcbcb", 0.1),
    },
    color: "#000000",
    textAlign: "center",
  },
  accountButton: {
    marginLeft: "auto",
    color: "#333333",
  },
  appBar: {
    backgroundColor: "#ffffff",
    boxShadow: "none",
    borderBottom: "1px solid #cbcbcb",
  },
}));

/* Component for main App Bar */

export default function CustomAppBar(props) {
  const classes = useStyles();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccount = () => {
    handleClose();
  };

  const handleSettings = () => {
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e) => {
    props.searchSales(e.target.value);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <img className={classes.title} src={logo} alt="Shopple" />

          <div className={classes.search}>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </div>
          {auth && (
            <div className={classes.accountButton}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleAccount}>Account</MenuItem>
                <MenuItem onClick={handleSettings}>Settings</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

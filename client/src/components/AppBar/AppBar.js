import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import HelpIcon from "@material-ui/icons/Help";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import logo from "../../images/shopple_icon.png";
import kevinImage from "../../images/kevin.jpg";
import jayImage from "../../images/jay.jpg";
import { Link } from "@material-ui/core";

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
  aboutButton: {
    marginLeft: "auto",
    color: "#333333",
  },
  appBar: {
    backgroundColor: "#ffffff",
    boxShadow: "none",
    borderBottom: "1px solid #cbcbcb",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 3,
    maxWidth: "40vw",
    minWidth: "300px",
  },
  developerFlex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "24px",
  },
  developerImage: {
    position: "relative",
    width: 140,
    height: 140,
    backgroundSize: "cover",
    backgroundRepeat: "none",
    borderRadius: "50%",
    boxShadow: "1px 1px 4px grey",
    marginRight: "12px",
    marginLeft: "12px",
  },
  developerImageOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    backgroundColor: "#000000",
    opacity: "0%",
    textAlign: "center",
    color: "white",
    transition: theme.transitions.create(
      ["background", "background-color", "box-shadow", "opacity"],
      {
        duration: 100,
      }
    ),
    "&:hover": {
      opacity: "65%",
      boxShadow: "2px 2px 4px 2px grey",
    },
  },
  developerImageOverlayText: {
    marginTop: "40%",
  },
}));

/* Component for main App Bar */

export default function CustomAppBar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
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

          <div className={classes.aboutButton}>
            <IconButton
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <HelpIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">About Us</h2>
            <p id="transition-modal-description">
              Shopple is a wep-app that automatically tracks and catalogues
              sales data from various brands. We are currently working on
              developing infrastrucuture to support more brands in the future.
            </p>
            <Link
              href="https://github.com/jayhomn/shopple"
              target="_blank"
              rel="noopener noreferrer"
            >
              Repo Link
            </Link>
            <h4>Developers:</h4>
            <div className={classes.developerFlex}>
              <Link
                href="https://kevinetpeng.github.io/Personal-Portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.developerImage}
                style={{ backgroundImage: `url(${kevinImage})` }}
              >
                <div className={classes.developerImageOverlay}>
                  <p className={classes.developerImageOverlayText}>
                    Kevin Peng
                  </p>
                </div>
              </Link>
              <Link
                href="https://jayhomn.github.io/pages/code.html"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.developerImage}
                style={{ backgroundImage: `url(${jayImage})` }}
              >
                <div className={classes.developerImageOverlay}>
                  <p className={classes.developerImageOverlayText}>Jay Ho</p>
                </div>
              </Link>
            </div>
            <h4 style={{ marginBottom: 0 }}>Tech Stack:</h4>
            <ul>
              <li>
                <Link
                  href="https://reactjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.mongodb.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MongoDB
                </Link>
              </li>
              <li>
                <Link
                  href="https://nodejs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Node.js
                </Link>
              </li>
              <li>
                <Link
                  href="https://expressjs.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Express.js
                </Link>
              </li>
              <li>
                <Link
                  href="https://material-ui.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Material UI
                </Link>
              </li>
              <li>
                <Link
                  href="https://developers.google.com/gmail/api"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gmail API
                </Link>
              </li>
            </ul>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

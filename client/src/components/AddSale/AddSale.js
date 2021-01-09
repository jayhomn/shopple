import React from "react";
import { makeStyles, styled } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import InputAdornment from "@material-ui/core/InputAdornment";
import Axios from "axios";

// This component is the floating action button in charge of the add sale functionality.

const styles = makeStyles({
  addButton: {
    margin: "2px 2px 2px 2px",
    position: "fixed",
    bottom: 30,
    right: 30,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
});

const FormTextField = styled(TextField)({
  padding: "12px 0",
});

function AddSale(props) {
  const classes = styles();

  //useState hook for the dialog box state.
  //expected state is a boolean
  const [dialogState, setDialogState] = React.useState(false);

  //useState hook for the company name state
  //expected state is a string
  const [companyNameState, setCompanyNameState] = React.useState("");

  //useState hook for the sale description state
  //expected state is a string
  const [saleDescriptionState, setSaleDescriptionState] = React.useState("");

  //useState hook for the sale description state
  //expected state is an int
  const [saleAmountState, setSaleAmountState] = React.useState();

  //useState hook for the success snackbar state
  //expected state is a boolean
  const [successState, setSuccessState] = React.useState(false);

  //useState hook for the fail snackbar state
  //expected state is a boolean
  const [failState, setFailState] = React.useState(false);

  //useState hook for the error snackbar state
  //expected state is a boolean
  const [errorState, setErrorState] = React.useState(false);

  //useState hook for error message
  //expected state is a string
  const [errorMessage, setErrorMessage] = React.useState("");

  //handle FAB click to open dialog
  const handleClick = () => {
    //reset states for input fields
    setSaleAmountState();
    setSaleDescriptionState("");
    setCompanyNameState("");
    //open dialog
    setDialogState(true);
  };

  //handle dialog close and set dialog state to false
  const handleDialogClose = () => {
    setDialogState(false);
  };

  //handle sale data entry
  const handleEnterSale = () => {
    Axios.post(
      process.env.PUBLIC_URL +
        "/companies/" +
        companyNameState.replaceAll(" ", "_") +
        "/sales",
      {
        amount: parseInt(saleAmountState),
        description: saleDescriptionState,
      }
    )
      .then((res) => {
        console.log(res);
        //Open success snackbar
        setSuccessState(true);
        //Close Dialog
        handleDialogClose();
        //Update App.js
        props.updateFunction();
      })
      .catch((err) => {
        console.log(err.response);

        if (
          err.response.data === "Company does not exist" ||
          err.response.status === 404
        ) {
          //Open failure snackbar
          setFailState(true);
          //Update App.js
          props.updateFunction();
        } else {
          //Set error message
          setErrorMessage(err.response.data._message);
          //Open error snackbar
          setErrorState(true);
          //Update App.js
          props.updateFunction();
        }
      });
  };

  //handle data entries
  const onChangeCompanyName = (e) => {
    setCompanyNameState(e.target.value);
  };

  const onChangeSaleDescription = (e) => {
    setSaleDescriptionState(e.target.value);
  };

  const onChangeSaleAmount = (e) => {
    setSaleAmountState(parseInt(e.target.value));
  };

  //handle success snackbar close
  const handleCloseSuccessSnackbar = () => {
    setSuccessState(false);
  };

  //handle success snackbar close
  const handleCloseFailSnackbar = () => {
    setFailState(false);
  };

  //handle success snackbar close
  const handleCloseErrorSnackbar = () => {
    setErrorState(false);
  };

  return (
    <>
      <Fab
        aria-label="addSale"
        onClick={handleClick}
        className={classes.addButton}
        color="primary"
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={dialogState}
        onClose={handleDialogClose}
        aria-label="Add Sale Dialog"
      >
        <DialogTitle>Add Sale</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Don't see an ongoing sale in our catalog and wanna share it? Add
            here!
          </DialogContentText>
          <form className={classes.form}>
            <FormTextField
              label="Company Name"
              onChange={onChangeCompanyName}
              helperText="Required"
            />
            <FormTextField
              label="Sale Description"
              onChange={onChangeSaleDescription}
              helperText="Required"
              multiline
            />
            <FormTextField
              label="Sale Amount"
              type="number"
              InputProps={{
                inputProps: {
                  max: 100,
                  min: 0,
                },
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
              onChange={onChangeSaleAmount}
              helperText="Required"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEnterSale} color="primary">
            Enter
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={successState}
        autoHideDuration={10000}
        onClose={handleCloseSuccessSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSuccessSnackbar}
          severity="success"
          elevation={6}
          variant="filled"
        >
          Successfully added the sale for {companyNameState}!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={failState}
        autoHideDuration={10000}
        onClose={handleCloseFailSnackbar}
      >
        <MuiAlert
          onClose={handleCloseFailSnackbar}
          severity="warning"
          elevation={6}
          variant="filled"
        >
          Failed to add "{companyNameState}", as it is currently not supported
          by our servers :(
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={errorState}
        autoHideDuration={10000}
        onClose={handleCloseErrorSnackbar}
      >
        <MuiAlert
          onClose={handleCloseErrorSnackbar}
          severity="error"
          elevation={6}
          variant="filled"
        >
          Error: {errorMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default AddSale;

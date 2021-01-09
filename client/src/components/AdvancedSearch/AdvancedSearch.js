import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles({
  box: {
    width: 200,
    height: "fit-content",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    marginTop: 16,
    border: "1px solid #DDE3E6",
    boxShadow: "1px 1px 2px  rgba(150, 150, 150, 0.15)",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "#1B1B1E",
  },
  expansionHeading: {
    fontSize: 16,
    textAlign: "left",
  },
  subHeading: {
    fontSize: 13,
    color: "#323235",
    marginTop: 5,
  },
  scrollDiv: {
    overflowY: "auto",
    maxWidth: 200,
    width: "fit-content",
    height: 300,
  },
  formControl: {
    margin: 8,
    minWidth: 190,
  },
  expansionPanel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  selectToggle: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 12,
  },
  buttonGroup: {
    margin: "auto",
  },
  checkLabel: {
    textAlign: "left",
  },
});

/* Component for advance search */

function AdvancedSearch(props) {
  const classes = useStyles();

  //Hardcoded companyList for now, but later should be routed from backend as a list of supported companies
  const companyList = [
    "A&F",
    "Adidas",
    "Aritzia",
    "Banana Republic",
    "Gap",
    "H&M",
    "Hollister",
    "Nike",
  ];

  //using the array of supported companies, create the state object to pass to React.useState(...);
  //also create a state object with all values to be the compliment of the initial state
  var companyObjectTrue = {};
  var companyObjectFalse = {};
  for (var i = 0; i < companyList.length; i++) {
    companyObjectTrue[companyList[i]] = true;
    companyObjectFalse[companyList[i]] = false;
  }

  //useState Hooks START
  //useState for company filter object... ex. {nike: true, adidas: false, ...}
  const [companyFilter, setCompanyFilter] = React.useState(companyObjectTrue);

  //useState for sort type from selection dropdown... ex. 'Recent', 'Rating - High to Low, etc.
  const [sortType, setSortType] = React.useState("Recently Added");

  //handle functions START
  //change handler for sortType: sets the sortType state to the MenuItem value selected
  const handleChangeSortType = (event) => {
    setSortType(event.target.value);
  };

  //change handler for companyFilter: sets the company boolean using the Checkbox change event
  const handleChangeCompanyFilter = (event) => {
    setCompanyFilter({
      ...companyFilter,
      [event.target.name]: event.target.checked,
    });
  };

  //handleSelectAll changes state of all items in companyFilter to true
  const handleSelectAll = () => {
    setCompanyFilter(companyObjectTrue);
  };

  //handleSelectNone changes state of all items in companyFilter to false
  const handleSelectNone = () => {
    setCompanyFilter(companyObjectFalse);
  };

  //Create JSX elements in a companyFilterList array to insert into the React return statement for the filter list part of the component
  const companyFilterList = companyList.map((company) => {
    return (
      <FormGroup row key={company}>
        <FormControlLabel
          className={classes.checkLabel}
          control={
            <Checkbox
              checked={companyFilter[company]}
              onChange={handleChangeCompanyFilter}
              name={company}
              color="primary"
            />
          }
          label={company}
        />
      </FormGroup>
    );
  });

  //Start React return
  return (
    <Box className={classes.box}>
      <Typography className={classes.title}>Advanced Search</Typography>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="select-label">Sort By</InputLabel>
          <Select
            className={classes.expansionHeading}
            labelId="select-label"
            id="simple-select"
            value={sortType}
            onChange={handleChangeSortType}
          >
            <MenuItem value={"Recently Added"}>Recently Added</MenuItem>
            <MenuItem value={"Rating - High to Low"}>
              Rating - High to Low
            </MenuItem>
            <MenuItem value={"Rating - Low to High"}>
              Rating - Low to High
            </MenuItem>
            <MenuItem value={"Price - High to Low"}>
              Price - High to Low
            </MenuItem>
            <MenuItem value={"Price - Low to High"}>
              Price - Low to High
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panelCompanyFilter-content"
            id="panelCompanyFilter-header"
          >
            <Typography className={classes.expansionHeading}>
              Filter Companies
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionPanel}>
            <div className={classes.selectToggle}>
              <Typography className={classes.subHeading}>Select:</Typography>
              <ButtonGroup
                size="small"
                aria-label="select toggle"
                className={classes.buttonGroup}
              >
                <Button onClick={handleSelectAll}>All</Button>
                <Button onClick={handleSelectNone}>None</Button>
              </ButtonGroup>
            </div>
            <div className={classes.scrollDiv}>{companyFilterList}</div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </Box>
  );
}

export default AdvancedSearch;

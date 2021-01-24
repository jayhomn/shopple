import React from "react";
import "./App.css";
import CustomAppBar from "./components/AppBar/AppBar";
import SaleCardContainer from "./components/SaleCardContainer/SaleCardContainer";
import AdvancedSearch from "./components/AdvancedSearch/AdvancedSearch";
import AddSale from "./components/AddSale/AddSale";
import ToggleView from "./components/ToggleView/ToggleView";
import Fade from "@material-ui/core/Fade";
import NormalSaleCard from "./components/NormalSaleCard/NormalSaleCard";
import ThinSaleCard from "./components/ThinSaleCard/ThinSaleCard";
import Axios from "axios";

/* Main component that renders the app */

function App(props) {
  //list view state
  const [showListView, setShowListView] = React.useState(false);

  //function used to update App component
  const [update, updateState] = React.useState(0);

  //search string
  const [search, setSearch] = React.useState("");

  //filter by company array
  const [companyFilter, setCompanyFilter] = React.useState([]);

  //state for raw sale list from get request to backend/sales
  const [saleList, setSaleList] = React.useState([]);

  //state for input list passed to the sale container component
  const [inputList, setInputList] = React.useState([]);

  const serverURL = process.env.REACT_APP_BACKEND_URL || process.env.PUBLIC_URL;

  //useEffect to make get request to backend to retreive list of sales objects
  React.useEffect(() => {
    Axios.get(serverURL + "/sales")
      .then((response) => {
        setSaleList(response.data);
      })
      .catch((err) => {
        setSaleList([]);
        console.log(err);
      });
  }, [update, serverURL]);

  React.useEffect(() => {
    setInputList(saleList);
  }, [saleList]);

  //toggle list view callback function
  const toggleViewCallback = (childListViewState) => {
    setShowListView(childListViewState);
  };

  //Refresh App component
  const updateFunction = () => {
    updateState((x) => x + 1);
  };

  //update search string state from searchbar (callback for AppBar.js)
  const updateSaleList = (substring) => {
    //console.log(substring);
    setSearch(substring);
  };

  //update company filter state from filter inputs from advanced search (callback for AdvancedSearch.js)
  const updateFilterArray = (filterState) => {
    //console.log(filterState);
    setCompanyFilter(filterState);
  };

  React.useEffect(() => {
    //declare temporary sale list for search phase
    let searchSaleList = [];

    //filter sale list based on if the search string is present in the company name or description of the sale
    for (let sale of saleList) {
      if (
        sale.company.toLowerCase().includes(search.toLowerCase()) ||
        sale.description.toLowerCase().includes(search.toLowerCase())
      ) {
        searchSaleList.push(sale);
      }
    }

    //declare temporary sale list for company filter phase
    let companyFilterSaleList = [];

    //filter sale list based on if the company name matches the company filter
    //reverse list so that companyFilterSaleList is by default sorted by most recent
    for (var i = searchSaleList.length - 1; i >= 0; i--) {
      const company = searchSaleList[i].company.replaceAll("_", " ");

      if (companyFilter[company]) {
        companyFilterSaleList.push(searchSaleList[i]);
      }
    }

    console.log(companyFilterSaleList);
    setInputList(companyFilterSaleList);
  }, [saleList, search, companyFilter]);

  return (
    <>
      <CustomAppBar searchSales={updateSaleList} />
      <div className="app-parent">
        <div className="app">
          <AdvancedSearch filterUpdate={updateFilterArray} />
          <div className="space-left" />
          {!showListView && (
            <Fade in={!showListView} timeout={500}>
              <SaleCardContainer
                sales={inputList}
                key="NormalView"
                search={search}
              >
                <NormalSaleCard />
              </SaleCardContainer>
            </Fade>
          )}
          {showListView && (
            <Fade in={showListView} timeout={500}>
              <SaleCardContainer
                sales={inputList}
                key="ThinView"
                search={search}
              >
                <ThinSaleCard />
              </SaleCardContainer>
            </Fade>
          )}
          <div className="space-left" />
          <ToggleView parentCallback={toggleViewCallback} />
          <div className="space-right" />
        </div>
        <AddSale updateFunction={updateFunction} />
      </div>
    </>
  );
}

export default App;

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

  //sort order
  const [sortOrder, setSortOrder] = React.useState("");

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

  //update sort order state from sort type in advanced search (callback for AdvancedSearch.js)
  const udpateSort = (sort) => {
    setSortOrder(sort);
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

    //sort the sale list base on the sort order
    let sortedSales = sortSales(companyFilterSaleList, sortOrder);

    console.log(sortedSales);
    setInputList(sortedSales);
  }, [saleList, search, companyFilter, sortOrder]);

  return (
    <>
      <CustomAppBar searchSales={updateSaleList} />
      <div className="app-parent">
        <div className="app">
          <AdvancedSearch
            filterUpdate={updateFilterArray}
            sortUpdate={udpateSort}
          />
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

//Custom mergesort algorithm for sorting sales list acending/decending
const sortSales = (array, sortType) => {
  //base case when array is length 1 or lower or if the sortType is not supported
  if (
    (array.length <= 1) ||
    (sortType !== "Discount - Low to High" &&
    sortType !== "Discount - High to Low")
  ) {
    return array;
  }

  //determine midpoint
  let midpoint = Math.floor(array.length / 2);

  //split array into two even sections
  let leftArr = array.slice(0, midpoint);
  let rightArr = array.slice(midpoint, array.length);

  return mergeSales(
    sortSales(leftArr, sortType),
    sortSales(rightArr, sortType),
    sortType
  );
};

const mergeSales = (left, right, sortType) => {
  let returnArr = [];
  let iLeft = 0;
  let iRight = 0;

  if (sortType === "Discount - High to Low") {
    while (iLeft < left.length && iRight < right.length) {
      if (left[iLeft].amount >= right[iRight].amount) {
        returnArr.push(left[iLeft]);
        iLeft++;
      } else {
        returnArr.push(right[iRight]);
        iRight++;
      }
    }

    //concat rest of the array
    return returnArr.concat(left.slice(iLeft)).concat(right.slice(iRight));
  } 
  else if (sortType === "Discount - Low to High") {
    while (iLeft < left.length && iRight < right.length) {
      if (left[iLeft].amount <= right[iRight].amount) {
        returnArr.push(left[iLeft]);
        iLeft++;
      } else {
        returnArr.push(right[iRight]);
        iRight++;
      }
    }

    //concat rest of the array
    return returnArr.concat(left.slice(iLeft)).concat(right.slice(iRight));
  }
};

export default App;

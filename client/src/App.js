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
  const [showListView, setShowListView] = React.useState(false);
  const [saleList, setSaleList] = React.useState([]);
  const [update, updateState] = React.useState(0);
  const [search, setSearch] = React.useState("");
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
  }, [update]);

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

  //update input sale list based on search substring (callback for AppBar.js)
  const updateSaleList = (substring) => {
    //console.log(substring);
    setSearch(substring);

    let tempSaleList = [];

    for (let sale of saleList) {
      if (
        sale.company.toLowerCase().includes(substring.toLowerCase()) ||
        sale.description.toLowerCase().includes(substring.toLowerCase())
      ) {
        tempSaleList.push(sale);
      }
    }
    console.log(tempSaleList);
    setInputList(tempSaleList);
  };

  return (
    <>
      <CustomAppBar searchSales={updateSaleList} />
      <div className="app-parent">
        <div className="app">
          <AdvancedSearch />
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

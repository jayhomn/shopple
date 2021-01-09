import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  root: {
    paddingInlineStart: 0,
    width: "fit-content",
    height: "89vh",
    overflowY: "auto",
    overflowX: "hidden",
    paddingRight: 16,
  },

  noSalesCard: {
    marginBottom: 12,
    marginRight: 12,
    width: 790,
    height: "auto",
    borderRadius: 4,
    border: "1px solid #DDE3E6",
    boxShadow: "1px 1px 2px  rgba(150, 150, 250, 0.15)",
    padding: 32,
    paddingTop: 16,
    paddingBottom: 8,
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },

  align_left: {
    textAlign: "left",
    marginLeft: 18,
    marginTop: 8,
  },
});


/* Scrollable container used to contain normal sale cards and thin sale cards */

function SaleCardContainer(props) {
  const classes = useStyles();
  const sales = props.sales;
  const listItems = sales.map((sale) => (
    <React.Fragment key={sale._id}>
      {React.cloneElement(props.children, {
        companyName: sale.company,
        saleDescript: sale.description,
        saleAmount: sale.amount,
      })}
    </React.Fragment>
  ));
  return (
    <ul {...props} className={classes.root}>
      {listItems}
      {(sales.length === 0) && (<Card className={classes.noSalesCard}>
        <Typography className={classes.align_left}>
          Your search of "{props.search}" did not match any sales we have catalogued.
        </Typography>
        <Typography className={classes.align_left}>
          Suggestions:
        </Typography>
        <Typography className={classes.align_left}>
          <ul>
            <li>Make sure that all words are spelled correctly.</li>
            <li>Try different keywords.</li>
            <li>Try fewer keywords.</li>
          </ul>
        </Typography>
      </Card>)}
    </ul>
  );
}

export default SaleCardContainer;

import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  root: {
    marginBottom: 12,
    marginRight: 12,
    width: 790,
    height: 140,
    borderRadius: 4,
    border: "1px solid #DDE3E6",
    boxShadow: "1px 1px 2px  rgba(150, 150, 250, 0.15)",
    padding: 32,
    paddingTop: 16,
    paddingBottom: 8,
    display: "flex",
    flexDirection: "row",
    "&:hover": {
      boxShadow: "1px 1px 2px  rgba(150, 150, 250, 0.35)",
      border: "1px solid #b8b8b8",
    },
    cursor: "pointer",
    position: "relative",
  },
  companyPic: {
    width: 230,
    marginRight: 10,
    backgroundRepeat: "none",
    backgroundSize: "contain",
    flexShrink: 0,
  },
  companyName: {
    color: "#444444",
  },
  saleAmount: {
    fontSize: 22,
    position: "absolute",
    bottom: 4
  },
});

/* Component for a normal sized sale card */

function NormalSaleCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.companyPic}
        image={process.env.PUBLIC_URL + "/logos/" + props.companyName + ".svg"}
        title={props.companyName}
      />
      <div>
        <Typography
          className={classes.companyName}
          variant="h5"
          color="primary"
          align="left"
          gutterBottom
        >
          {props.companyName.replaceAll('_', ' ')}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          align="justify"
          gutterBottom
        >
          {props.saleDescript}
        </Typography>
        <Typography variant="body2" color="Secondary" align="left" className={classes.saleAmount} gutterBottom>
          Up to {props.saleAmount}% off
        </Typography>
      </div>
    </Card>
  );
}

export default NormalSaleCard;

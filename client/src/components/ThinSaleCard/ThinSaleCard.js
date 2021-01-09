import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  root: {
    marginBottom: 4,
    marginRight: 12,
    width: 834,
    height: 42,
    borderRadius: 4,
    border: "1px solid #DDE3E6",
    boxShadow: "1px 1px 2px  rgba(150, 150, 250, 0.15)",
    padding: "4px 8px 4px 0px",
    display: "flex",
    flexDirection: "row",
    "&:hover": {
      boxShadow: "1px 1px 2px  rgba(150, 150, 250, 0.35)",
      border: "1px solid #b8b8b8",
    },
    cursor: "pointer",
    alignItems: "center",
  },
  companyPic: {
    width: 150,
    height: "100%",
    marginRight: 0,
    backgroundRepeat: "none",
    backgroundSize: "contain",
  },
  saleDescript: {
    display: "block",
  },
  saleAmount: {
    marginLeft: "auto",
    marginRight: 8,
    fontSize: 18,
    marginBottom: 0,
  },
  companyName: {
    justifySelf: "left",
    color: "#444444",
  },
  mainText: {
    textAlign: "left",
    overflow: "hidden",
  },
});

/* Component for a thin sale card */

function ThinSaleCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.companyPic}
        image={process.env.PUBLIC_URL + "/logos/" + props.companyName + ".svg"}
        title={props.companyName}
      />
      <div className={classes.mainText}>
        <Typography
          variant="subtitle2"
          align="left"
          className={classes.companyName}
        >
          {props.companyName.replaceAll("_", " ")}
        </Typography>
        <Typography
          className={classes.saleDescript}
          variant="body2"
          color="textSecondary"
          align="justify"
          gutterBottom
        >
          {props.saleDescript}
        </Typography>
      </div>
      <Typography
        className={classes.saleAmount}
        variant="body2"
        color="secondary"
        align="left"
        gutterBottom
      >
        Up to {props.saleAmount}% off
      </Typography>
    </Card>
  );
}

export default ThinSaleCard;

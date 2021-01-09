/*  Developer Notes - Kevin Peng
This React component is not a function component which uses React Hooks to work with states.
It is a classic class-based component with the classic lifecycle management. Other components 
will not be designed in the same way. This is so that I could familiarize myself with both
methods. Code consistency was sacrificed in this instance for the sake of learning.
*/

import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  root: {
    paddingTop: 16,
  },
});

/* Component for toggling between thin card view and normal view*/

class ToggleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: true,
    };
  }

  //function to handle listView state change
  handleListViewChange = () => {
    //handle callback based on previous state
    if (this.state.listView === true) this.passState(false);
    else this.passState(true);

    //change state to not(previous state)
    this.setState((state) => ({
      listView: !state.listView,
    }));
  };

  /* Developer's Notes - Kevin Peng
    I previously wrote the callback without any parameters, and used the listView state as the input for parentCallback.
    It was intended so that passState would be called after the setState function. The idea was that:
    onChange -> setState to correct state -> callback to parent

    However, after painful debugging, I realized that this method would not work, as setState is asynchronous.
    There is no guarentee that the passState function for the callback is called directly after the state is changed 
    using the React setState method.
  */

  //callback function to pass state to the parent component (App.js)
  passState = (state) => {
    this.props.parentCallback(state);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={this.state.listView}
              onChange={this.handleListViewChange}
            />
          }
          label="List View"
          labelPlacement="end"
        />
      </div>
    );
  }
}

export default withStyles(styles)(ToggleView);

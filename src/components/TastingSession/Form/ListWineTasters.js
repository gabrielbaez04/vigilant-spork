import React from "react";
import { graphql, compose, Query } from "react-apollo";
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import WINE_TASTERS from "../../../graphql/queries/WINE_TASTERS";
import ADD_WINE_TASTER from "../../../graphql/mutations/ADD_WINE_TASTER";

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
});

class ListWineTasters extends React.Component {
  state = {
    SelectedWineTaster: ""
  }
  render(){
    const { classes } = this.props;
    return (
      <Query query={WINE_TASTERS}>
        {({ loading, error, data }) => {
          if (loading) return "LOADING";
          if (error) return `Error! ${error.message}`;
          const { wineTasters } = data;
          //Merging wines taster of the session with the ones in the LOCAL_STORAGE
          this.props.prevSessionWinesTasters && this.props.prevSessionWinesTasters.forEach(prevWineTaster => {
            wineTasters.forEach((wineTaster)=>{
              if(wineTaster.id === prevWineTaster.id){
                this.props.addWineTaster({
                  variables: {
                    ...wineTaster
                  },
                });
              }
            })
          });
          return (
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="winesTaster-select">Existing Wine Tasters</InputLabel>
              <Select
                onChange={e => {
                  this.props.addWineTaster({
                    variables: {
                      ...wineTasters.filter(wine=>wine.id === e.target.value)[0],
                    },
                  });
                  e.target.value = "default";
                }}
                value={this.state.SelectedWineTaster}
                inputProps={{
                  name: 'wineTaster',
                  id: 'wineTaster-select',
                }}
              >
                {wineTasters.map((taster, i) => {
                  return (
                    <MenuItem key={`taster${i}`} value={taster.id}>
                      {taster.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          );
        }}
      </Query>
    );
  }
};

export default compose(graphql(ADD_WINE_TASTER, { name: "addWineTaster" }))(
  withStyles(styles)(ListWineTasters)
);

import React from "react";
import { graphql, compose, Query } from "react-apollo";
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import ADD_WINE from "../../../graphql/mutations/ADD_WINE";
import WINES from "../../../graphql/queries/WINES";

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class ListWines extends React.Component {
  state = {
    SelectedWine: ""
  }
  render()
  {
    const { classes } = this.props;
    return (
      <Query query={WINES}>
        {({ loading, error, data }) => {
          if (loading) return "LOADING";
          if (error) return `Error! ${error.message}`;
          const { wines } = data;
          //Merging wines of the session with the ones in the LOCAL_STORAGE
          this.props.prevSessionWines && this.props.prevSessionWines.forEach(prevWine => {
            wines.forEach((wine)=>{
              if(wine.id === prevWine.id){
                this.props.addWine({
                  variables: {
                    ...wine
                  },
                });
              }
            })
          });
          return (
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="wines-select">Existing Wines</InputLabel>
              <Select
                onChange={e => {
                  this.props.childCB
                    ? this.props.childCB(wines.filter(wine=>wine.id === e.target.value)[0].id)
                    : this.props.addWine({
                        variables: { ...wines.filter(wine=>wine.id === e.target.value)[0]},
                      });
                  if (!this.props.childCB) e.target.value = "default";
                }}
                value={this.state.SelectedWine}
                inputProps={{
                  name: 'wine',
                  id: 'wines-select',
                }}
              >
                {wines.map((wine, i) => {
                  return (
                    <MenuItem key={`wine${i}`} value={wine.id}>
                      {wine.name}
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

export default (compose(graphql(ADD_WINE, { name: "addWine" })))(withStyles(styles)(ListWines));

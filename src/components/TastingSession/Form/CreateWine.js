import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';

import CREATE_WINE from "../../../graphql/mutations/CREATE_WINE";
import WINES from "../../../graphql/queries/WINES";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  formControl: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  textField:{
    padding: theme.spacing.unit,
  }
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
class CreateWine extends Component {
  state = {
    isOpen: false,
    name: "",
    grapes: [],
    wineType:"RED",
    winery: "",
    year: undefined,
    alcohol: undefined,
    price: undefined,
    sugarContent:"",
    bottleSize: "",
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  handleChange = event => {
    this.setState({ grapes: event.target.value });
  };
  inputHandler = e => {
    let { name, value, options } = e.target;
    if (name === "grapes") {
      const values = [];
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          values.push(options[i].value);
        }
      }
      this.setState({
        grapes: values,
      });
    } else {
      if (name === "price" || name === "year" || name === "alcohol")
        value = Number(value);
      this.setState({ [name]: value });
    }
  };

  render() {
    const { isOpen, name, grapes, wineType, winery, year, alcohol, price , sugarContent, bottleSize} = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Button variant="outlined" color="primary" className={classes.button} onClick={this.toggle}>Create New Wine</Button>

        {isOpen ? (
        <div 
          style={{
            border: "1px solid black",
            padding: "20px",
            margin: "0 10%",
            borderRadius: "2%",
          }}>
          <div
          className={classes.container}
          >
            <Input
              name="name"
              value={name}
              onChange={this.inputHandler}
              type="text"
              placeholder="Name"
              inputProps={{
                'aria-label': 'Description',
              }}
              className={classes.input}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="grapes-select">Select Grapes</InputLabel>
              <Select
                multiple
                name="grapes"
                value={this.state.grapes}
                onChange={this.handleChange}
                input={<Input id="grapes-select" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                <MenuItem value="GEWURZTRAMINER">GEWURZTRAMINER</MenuItem>
                <MenuItem value="CHARDONNAY">CHARDONNAY</MenuItem>
                <MenuItem value="SAUVIGNON_BLANC">SAUVIGNON BLANC</MenuItem>
                <MenuItem value="SYRAH">SYRAH</MenuItem>
                <MenuItem value="MERLOT">MERLOT</MenuItem>
                <MenuItem value="CABERNET_SAUVIGNON">CABERNET SAUVIGNON</MenuItem>
                <MenuItem value="PINOT_NOIR">PINOT NOIR</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="winesTaster-select">Wine Type</InputLabel>
              <Select
                name="wineType"
                value={this.state.wineType}
                onChange={e => this.setState({ wineType: e.target.value })}
                  inputProps={{
                    name: 'wineTaster',
                    id: 'wineTaster-select',
                  }}
              >
                <MenuItem value="RED">Red</MenuItem>
                <MenuItem value="WHITE">White</MenuItem>
                <MenuItem value="ROSE">Rosé</MenuItem>
                <MenuItem value="SPARKLING">Sparkling</MenuItem>
                <MenuItem value="DESSERT">Dessert</MenuItem>
                <MenuItem value="FORTIFIED">Fortified</MenuItem>
              </Select>
            </FormControl>
            <Input
              name="winery"
              value={winery}
              onChange={this.inputHandler}
              type="text"
              placeholder="Winery"
              inputProps={{
                'aria-label': 'Description',
              }}
              className={classes.input}
            />
            <TextField
              id="year"
              label="Year"
              name="year"
              value={year}
              onChange={this.inputHandler}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
          </div>
          <div
          className={classes.container}
          >
            <TextField
              id="alcohol"
              label="Alcohol"
              name="alcohol"
              value={alcohol}
              onChange={this.inputHandler}
              type="number"
              className={classes.textField}
              margin="normal"
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
            />
            <TextField
              label="Price"
              id="price"
              name="price"
              type="number"
              value={price}
              onChange={this.inputHandler}
              className={classNames(classes.margin, classes.textField)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <TextField
              label="Sugar Content"
              id="sugarContent"
              name="sugarContent"
              value={sugarContent}
              onChange={this.inputHandler}
              className={classNames(classes.margin, classes.textField)}
              InputProps={{
                startAdornment: <InputAdornment position="start">g/L</InputAdornment>,
              }}
            />
            <TextField
              label="Bottle Size"
              id="bottleSize"
              name="bottleSize"
              value={bottleSize}
              onChange={this.inputHandler}
              className={classNames(classes.margin, classes.textField)}
              InputProps={{
                startAdornment: <InputAdornment position="start">mL</InputAdornment>,
              }}
            />
          </div>
          <div
          className={classes.container}
          >
            <Mutation
              mutation={CREATE_WINE}
              update={(cache, { data: { createWine } }) => {
                const { wines } = cache.readQuery({ query: WINES });
                cache.writeQuery({
                  query: WINES,
                  data: { wines: wines.concat([createWine]) },
                });
              }}
              variables={{
                name,
                grapes,
                wineType,
                winery,
                year,
                alcohol,
                price,
                sugarContent,
                bottleSize
              }}
              onCompleted={() =>
                this.setState({
                  isOpen: false,
                  name: "",
                  grapes: [],
                  wineType: "RED",
                  winery: "",
                  year: undefined,
                  alcohol: undefined,
                  price: undefined,
                  sugarContent:"",
                  bottleSize:"",
                })
              }
            >
              {postMutation => <Button variant="contained" color="primary" className={classes.button} onClick={postMutation}>Submit</Button>}
            </Mutation>
            
          </div>
        </div>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(CreateWine);

import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';

import CREATE_REVIEW from "../../../graphql/mutations/CREATE_REVIEW";

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
  formControl: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  textField:{
    padding: theme.spacing.unit,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
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

class CreateReview extends Component {
  state = {
    score: "",
    tastingNotes: [],
    predictedPrice: "",
    predictedYear: ""
  };

  inputHandler = e => {
    let { name, value } = e.target;
    if (name === "tastingNotes") {
      this.setState({
        tastingNotes: [...e.target.selectedOptions].map(o => o.value),
      });
    } else {
      if (name === "score" || name==="predictedYear" || name=== "predictedPrice") value = Number(value);
      this.setState({ [name]: value });
    }
  };

  render() {
    const { score, tastingNotes, predictedPrice, predictedYear } = this.state;
    const { wineTaster, wine, tastingSession , classes} = this.props;
    return (
      <div style={{
        border: "1px solid black",
        padding: "20px",
        margin: "0 10%",
        borderRadius: "2%",
      }}>
        <div className={classes.container}>
          <h5 style={{width:'100%'}}>{this.props.wineName}</h5>
            <TextField
              id="score"
              label="Score: 0 - 100"
              name="score"
              value={score}
              onChange={this.inputHandler}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
          <FormControl className={classes.formControl}>
              <InputLabel htmlFor="tastingNotes-select">Tasting Notes</InputLabel>
              <Select
                multiple
                name="tastingNotes"
                value={tastingNotes}
                onChange={this.handleChange}
                input={<Input id="tastingNotes-select" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                <MenuItem value="ACIDIC">ACIDIC</MenuItem>
                <MenuItem value="BARNYARD">BARNYARD</MenuItem>
                <MenuItem value="BRIGHT">BRIGHT</MenuItem>
                <MenuItem value="BUTTERY">BUTTERY</MenuItem>
                <MenuItem value="COMPLEX">COMPLEX</MenuItem>
                <MenuItem value="CRISP">CRISP</MenuItem>
                <MenuItem value="EARTHY">EARTHY</MenuItem>
                <MenuItem value="OAKED">OAKED</MenuItem>
                <MenuItem value="JUICY">JUICY</MenuItem>
              </Select>
            </FormControl>
          <TextField
            label="Predicted price"
            id="predictedPrice"
            name="predictedPrice"
            type="number"
            value={predictedPrice}
            onChange={this.inputHandler}
            className={classNames(classes.margin, classes.textField)}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          <TextField
            id="predictedYear"
            label="Predicted year"
            name="predictedYear"
            value={predictedYear}
            onChange={this.inputHandler}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </div>
        <Mutation
          mutation={CREATE_REVIEW}
          variables={{
            wine,
            wineTaster,
            tastingSession,
            score,
            tastingNotes,
            predictedPrice,
            predictedYear
          }}
        >
          {postMutation => <Button variant="contained" color="primary" className={classes.button} onClick={postMutation}>Submit</Button>}
        </Mutation>
      </div>
    );
  }
}

export default  withStyles(styles)(CreateReview);

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

import ListWines from "./ListWines";

import WINE_TASTERS from "../../../graphql/queries/WINE_TASTERS";
import CREATE_WINE_TASTER from "../../../graphql/mutations/CREATE_WINE_TASTER";

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
  textField:{
    padding: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
});

class CreateWineTaster extends Component {
  state = {
    isOpen: false,
    name: "",
    nationality: "",
    gender: "MALE",
    age: 0,
    favouriteWine: "",
    email:"",
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  inputHandler = e => {
    let { name, value } = e.target;
    if (name === "number" || name === "age") value = Number(value);
    this.setState({ [name]: value });
  };

  render() {
    const {
      isOpen,
      name,
      nationality,
      gender,
      age,
      favouriteWine,
      email,
    } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Button variant="outlined" color="primary" className={classes.button} onClick={this.toggle}>Create New Wine Taster</Button>

        {isOpen ? (
          <div
            style={{
              border: "1px solid black",
              padding: "20px",
              margin: "0 10%",
              borderRadius: "2%",
            }}
          >
            <div className={classes.container}>
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
              <Input
                name="nationality"
                value={nationality}
                onChange={this.inputHandler}
                type="text"
                placeholder="Nationality"
                inputProps={{
                  'aria-label': 'Description',
                }}
                className={classes.input}
              />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="gender-select">Gender</InputLabel>
                <Select
                  name="gender"
                  value={this.state.gender}
                  onChange={e => this.setState({ gender: e.target.value })}
                    inputProps={{
                      name: 'gender',
                      id: 'gender-select',
                    }}
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="age"
                label="Age"
                name="age"
                value={age}
                onChange={this.inputHandler}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
              <ListWines
                childCB={id => this.setState({ favouriteWine: id })}
                placeholder="Favourite Wine"
              />
              <Input
                name="email"
                value={email}
                onChange={this.inputHandler}
                type="text"
                placeholder="Email"
                inputProps={{
                  'aria-label': 'Description',
                }}
                className={classes.input}
              />
            </div>
            <div className={classes.container}>
              <Mutation
                mutation={CREATE_WINE_TASTER}
                update={(cache, { data: { createWineTaster } }) => {
                  const { wineTasters } = cache.readQuery({
                    query: WINE_TASTERS,
                  });
                  cache.writeQuery({
                    query: WINE_TASTERS,
                    data: { wineTasters: wineTasters.concat([createWineTaster]) },
                  });
                }}
                variables={{
                  name,
                  nationality,
                  gender,
                  age,
                  favouriteWine,
                  email
                }}
                onCompleted={() =>
                  this.setState({
                    isOpen: false,
                    name: "",
                    nationality: "",
                    gender: "MALE",
                    age: undefined,
                    favouriteWine: undefined,
                    email:""
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

export default withStyles(styles)(CreateWineTaster);

import React, { Component } from "react";
import { Mutation } from "react-apollo";

import ListWines from "./ListWines";

import WINE_TASTERS from "../../../graphql/queries/WINE_TASTERS";
import CREATE_WINE_TASTER from "../../../graphql/mutations/CREATE_WINE_TASTER";

class CreateWineTaster extends Component {
  state = {
    isOpen: false,
    name: "",
    nationality: "",
    gender: "MALE",
    age: undefined,
    favouriteWine: undefined,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  inputHandler = e => {
    let { name, value } = e.target;
    if (name === "number") value = Number(value);
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
    } = this.state;
    return (
      <div>
        <button onClick={this.toggle}>Create New Wine Taster</button>

        {isOpen ? (
          <div
            style={{
              border: "1px solid black",
              padding: "20px",
              margin: "0 10%",
              borderRadius: "2%",
            }}
          >
            <input
              name="name"
              value={name}
              onChange={this.inputHandler}
              placeholder="Name"
            />
            <input
              name="nationality"
              value={nationality}
              onChange={this.inputHandler}
              placeholder="Nationality"
            />
            <select
              name="gender"
              value={this.state.gender}
              onChange={e => this.setState({ gender: e.target.value })}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            <input
              name="age"
              value={age}
              onChange={e => this.setState({ age: Number(e.target.value) })}
              type="number"
              placeholder="Age"
            />
            <ListWines
              childCB={id => this.setState({ favouriteWine: id })}
              placeholder="Favourite Wine"
            />
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
              }}
              onCompleted={() =>
                this.setState({
                  isOpen: false,
                  name: "",
                  nationality: "",
                  gender: "MALE",
                  age: undefined,
                  favouriteWine: undefined,
                })
              }
            >
              {postMutation => <button onClick={postMutation}>Submit</button>}
            </Mutation>
          </div>
        ) : null}
      </div>
    );
  }
}

export default CreateWineTaster;

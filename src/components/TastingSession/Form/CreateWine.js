import React, { Component } from "react";
import { Mutation } from "react-apollo";

import CREATE_WINE from "../../../graphql/mutations/CREATE_WINE";
import WINES from "../../../graphql/queries/WINES";

class CreateWine extends Component {
  state = {
    isOpen: false,
    name: "",
    grapes: [],
    winery: "",
    year: undefined,
    alcohol: undefined,
    price: undefined,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  inputHandler = e => {
    let { name, value } = e.target;
    if (name === "grapes") {
      this.setState({
        grapes: [...e.target.selectedOptions].map(o => o.value),
      });
    } else {
      if (name === "price" || name === "year" || name === "alcohol")
        value = Number(value);
      this.setState({ [name]: value });
    }
  };

  render() {
    const { isOpen, name, grapes, winery, year, alcohol, price } = this.state;
    return (
      <div>
        <button onClick={this.toggle}>Create New Wine</button>

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
              type="text"
              placeholder="Name"
            />
            <select
              name="grapes"
              value={grapes}
              onChange={this.inputHandler}
              type="text"
              placeholder="Grapes"
              multiple={true}
            >
              <option value="GEWURZTRAMINER">GEWURZTRAMINER</option>
              <option value="CHARDONNAY">CHARDONNAY</option>
              <option value="SAUVIGNON_BLANC">SAUVIGNON BLANC</option>
              <option value="SYRAH">SYRAH</option>
              <option value="MERLOT">MERLOT</option>
              <option value="CABERNET_SAUVIGNON">CABERNET SAUVIGNON</option>
              <option value="PINOT_NOIR">PINOT NOIR</option>
            </select>
            <input
              name="winery"
              value={winery}
              onChange={this.inputHandler}
              type="text"
              placeholder="Winery"
            />
            <input
              name="year"
              value={year}
              onChange={this.inputHandler}
              type="number"
              placeholder="Year"
            />
            <input
              name="alcohol"
              value={alcohol}
              onChange={this.inputHandler}
              type="number"
              placeholder="Alcohol percentage"
            />
            <input
              name="price"
              value={price}
              onChange={this.inputHandler}
              type="number"
              placeholder="Price"
            />
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
                winery,
                year,
                alcohol,
                price,
              }}
              onCompleted={() =>
                this.setState({
                  isOpen: false,
                  name: "",
                  grapes: [],
                  winery: "",
                  year: undefined,
                  alcohol: undefined,
                  price: undefined,
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

export default CreateWine;

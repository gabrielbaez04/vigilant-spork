import React, { Component } from "react";
import { Mutation } from "react-apollo";

import CREATE_REVIEW from "../../../graphql/mutations/CREATE_REVIEW";

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
    const { wineTaster, wine, tastingSession } = this.props;
    return (
      <div>
        <div>
          <h5>{this.props.wine}</h5>
          <input
            name="score"
            value={score}
            onChange={this.inputHandler}
            type="number"
            placeholder="Score: 0 - 100"
          />
          <select
            name="tastingNotes"
            value={tastingNotes}
            onChange={this.inputHandler}
            type="text"
            placeholder="Tasting Notes"
            multiple={true}
          >
            <option value="ACIDIC">ACIDIC</option>
            <option value="BARNYARD">BARNYARD</option>
            <option value="BRIGHT">BRIGHT</option>
            <option value="BUTTERY">BUTTERY</option>
            <option value="COMPLEX">COMPLEX</option>
            <option value="CRISP">CRISP</option>
            <option value="EARTHY">EARTHY</option>
            <option value="OAKED">OAKED</option>
            <option value="JUICY">JUICY</option>
          </select>
          <input
            name="predictedPrice"
            value={predictedPrice}
            onChange={this.inputHandler}
            type="number"
            placeholder="Predicted price"
          />
          <input
            name="predictedYear"
            value={predictedYear}
            onChange={this.inputHandler}
            type="number"
            placeholder="Predicted year"
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
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    );
  }
}

export default CreateReview;

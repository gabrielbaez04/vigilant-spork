import React, { Component } from "react";
import { Mutation } from "react-apollo";

import CreateTastingSession from "./Form/CreateTastingSession";

import CREATE_TASTING_SESSION from "../../graphql/mutations/CREATE_TASTING_SESSION";
import LOCAL_TASTING_SESSION from "../../graphql/queries/LOCAL_TASTING_SESSION";

class Home extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <React.Fragment>
        <Mutation
          variables={{}}
          onCompleted={() => {
            this.setState({
              isOpen: true,
            });
          }}
          mutation={CREATE_TASTING_SESSION}
          update={(cache, { data }) => {
            const localData = cache.readQuery({ query: LOCAL_TASTING_SESSION });
            cache.writeQuery({
              query: LOCAL_TASTING_SESSION,
              data: { ...localData, sessionID: data.createTastingSession.id },
            });
          }}
        >
          {postMutation => (
            <button onClick={isOpen ? null : postMutation}>
              Create New Tasting Session
            </button>
          )}
        </Mutation>
        {isOpen ? <CreateTastingSession toggle={this.toggle} /> : null}
      </React.Fragment>
    );
  }
}

export default Home;

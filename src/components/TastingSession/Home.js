import React, { Component } from "react";
import { Mutation } from "react-apollo";

import CreateTastingSession from "./Form/CreateTastingSession";
import ListSessions from "./ListSessions";

import CREATE_TASTING_SESSION from "../../graphql/mutations/CREATE_TASTING_SESSION";
import LOCAL_TASTING_SESSION from "../../graphql/queries/LOCAL_TASTING_SESSION";

class Home extends Component {
  state = {
    isOpen: false,
    tastingSession: undefined
  };

  toggle = (tastingSession) => {
    this.setState({ isOpen: !this.state.isOpen, tastingSession });
  };

  render() {
    const { isOpen, tastingSession } = this.state;
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
            !isOpen && <button onClick={isOpen ? null : postMutation}>
              Create New Tasting Session
            </button>
          )}
        </Mutation>
        {isOpen ? <CreateTastingSession toggle={this.toggle} tastingSession={tastingSession}/> : null}
        {!isOpen && <ListSessions toggleProps={this.toggle}/>}
      </React.Fragment>
    );
  }
}

export default Home;

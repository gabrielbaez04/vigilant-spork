import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import CreateTastingSession from "./Form/CreateTastingSession";
import ListSessions from "./ListSessions";

import CREATE_TASTING_SESSION from "../../graphql/mutations/CREATE_TASTING_SESSION";
import LOCAL_TASTING_SESSION from "../../graphql/queries/LOCAL_TASTING_SESSION";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Home extends Component {
  state = {
    isOpen: false,
    tastingSession: undefined,
    count:0
  };

  toggle = (tastingSession) => {
    this.setState({ isOpen: !this.state.isOpen, tastingSession , count: this.state.count+1});
  };

  render() {
    const { isOpen, tastingSession, count } = this.state;
    const { classes } = this.props;
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
              data: { sessionWines : [],sessionWineTasters:[], sessionReviews:[],sessionID: data.createTastingSession.id },
            });
          }}
        >
          {postMutation => (
            !isOpen && <Button  variant="contained" color="primary" className={classes.button} onClick={isOpen ? null : postMutation}>
              Create New Tasting Session
            </Button>
          )}
        </Mutation>
        {isOpen ? <CreateTastingSession toggle={this.toggle} tastingSession={tastingSession}/> : null}
        {!isOpen && <ListSessions toggleProps={this.toggle} count={count}/>}
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Home);

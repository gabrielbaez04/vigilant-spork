import React from "react";
import { graphql, compose, Query, Mutation } from "react-apollo";
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import ListWines from "./ListWines";
import ListWineTasters from "./ListWineTasters";
import CreateWineTaster from "./CreateWineTaster";
import CreateWine from "./CreateWine";
import CreateReview from "./CreateReview";

import UPDATE_TASTING_SESSION from "../../../graphql/mutations/UPDATE_TASTING_SESSION";
import LOCAL_STATE from "../../../graphql/queries/LOCAL_TASTING_SESSION";
import initialState from "../../../graphql/initialState";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class CreateTastingSession extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.tastingSession ? moment(props.tastingSession.date) : moment(),
      calendarFocused: false
    };
  }
  onDateChange = (date) => {
    if (date) {
      this.setState(() => ({ date }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  render()
  {
    return (
      <Query query={LOCAL_STATE}>
        {({ loading, error, data }) => {
          
          if (loading) return "LOADING";
          if (error) return `Error! ${error.message}`;
          let prevSessionWinesTasters, prevSessionWines = [];
          let {
            sessionID,
            sessionWines,
            sessionWineTasters,
            // sessionReviews,
          } = data;
          if(this.props.tastingSession){
            prevSessionWinesTasters = this.props.tastingSession.wineTasters;
            sessionID = this.props.tastingSession.id;
            prevSessionWines = this.props.tastingSession.wines
          }
          
          const sessionWineIDs = sessionWines.map(wine => {
            return { id: wine.id };
          });
          const sessionWineTastersIDs = sessionWineTasters.map(taster => {
            return { id: taster.id };
          });
          const { date } = this.state;
          const { classes } = this.props;
          return (
            <div>
              <h3>Tasting Session</h3>
              <h5>Tasting Session Date</h5>
              <SingleDatePicker
                date={this.state.date}
                onDateChange={this.onDateChange}
                focused={this.state.calendarFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
              />
              <h5>Choose Wine(s)</h5>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                {sessionWines
                  ? sessionWines.map((wine, i) => {
                      return (
                        <li key={`sessionWine${i}`} style={{ listStyle: "none" }}>
                          {wine.name}
                        </li>
                      );
                    })
                  : null}
              </ul>
              <ListWines
                cb={wine => {
                  if (!wine.includes(wine)) {
                    this.setState({
                      wines: [...this.state.wines, wine],
                    });
                  }
                }}
                placeholder="Existing Wines"
                prevSessionWines={prevSessionWines}
              />
              <CreateWine />
              <h5>Choose Wine Taster(s)</h5>
              <ul>
                {sessionWineTasters
                  ? sessionWineTasters.map((taster, i) => {
                      return (
                        <li key={`sessionTasters${i}`} style={{ listStyle: "none" }}>
                          <div>
                            {taster.name}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                              }}
                            >
                              {sessionWines.map((wine, i) => {
                                return (
                                  <div key={`${taster.name}wine${i}`}>
                                    <CreateReview
                                      wineTaster={taster.id}
                                      wine={wine.id}
                                      wineName = {wine.name}
                                      tastingSession={sessionID}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </li>
                      );
                    })
                  : null}
              </ul>
              <ListWineTasters placeholder="Existing Wine Tester" prevSessionWinesTasters={prevSessionWinesTasters}/>
              <CreateWineTaster />
              {this.props.tastingSession && <Button variant="contained" className={classes.button}
                onClick={() => {this.props.toggle()}}
                style={{
                  padding: "10px",
                  margin: "30px",
                  width: "300px",
                }}
              >
                RETURN
              </Button>
              }
              <Mutation
                mutation={UPDATE_TASTING_SESSION}
                variables={{ sessionWineIDs, sessionWineTastersIDs, sessionID, date }}
                update={cache => {
                  cache.writeQuery({
                    query: LOCAL_STATE,
                    data: initialState,
                  });
                }}
                onCompleted={() => {this.props.toggle()}}
              >
                {postMutation => (
                  <Button variant="contained" color="primary" className={classes.button}
                    onClick={postMutation}
                    style={{
                      padding: "10px",
                      margin: "30px",
                      width: "300px",
                    }}
                  >
                    Submit Form
                  </Button>
                )}
              </Mutation>
            </div>
          );
        }}
      </Query>
    );
  }
};

export default compose(
  graphql(UPDATE_TASTING_SESSION, {
    name: "updateTastingSession",
  })
)(withStyles(styles)(CreateTastingSession));

import React from "react";
import { graphql, compose, Query, Mutation } from "react-apollo";

import ListWines from "./ListWines";
import ListWineTasters from "./ListWineTasters";
import CreateWineTaster from "./CreateWineTaster";
import CreateWine from "./CreateWine";
import CreateReview from "./CreateReview";

import UPDATE_TASTING_SESSION from "../../../graphql/mutations/UPDATE_TASTING_SESSION";
import LOCAL_STATE from "../../../graphql/queries/LOCAL_TASTING_SESSION";
import initialState from "../../../graphql/initialState";

const CreateTastingSession = props => {
  return (
    <Query query={LOCAL_STATE}>
      {({ loading, error, data }) => {
        if (loading) return "LOADING";
        if (error) return `Error! ${error.message}`;
        const {
          sessionID,
          sessionWines,
          sessionWineTasters,
          // sessionReviews,
        } = data;
        const sessionWineIDs = sessionWines.map(wine => {
          return { id: wine.id };
        });
        const sessionWineTastersIDs = sessionWineTasters.map(taster => {
          return { id: taster.id };
        });
        return (
          <div>
            <h3>Create New Tasting Session</h3>

            <ol
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
            </ol>
            <h5>Choose Wine(s)</h5>
            <ListWines
              cb={wine => {
                if (!wine.includes(wine)) {
                  this.setState({
                    wines: [...this.state.wines, wine],
                  });
                }
              }}
              placeholder="Existing Wines"
            />
            <CreateWine />

            <ol>
              {sessionWineTasters
                ? sessionWineTasters.map((taster, i) => {
                    return (
                      <li key={`sessionTasters${i}`}>
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
            </ol>
            <h5>Choose Wine Taster(s)</h5>
            <ListWineTasters placeholder="Existing Wine Tester" />
            <CreateWineTaster />
            <Mutation
              mutation={UPDATE_TASTING_SESSION}
              variables={{ sessionWineIDs, sessionWineTastersIDs, sessionID }}
              update={cache => {
                cache.writeQuery({
                  query: LOCAL_STATE,
                  data: initialState,
                });
              }}
              onCompleted={() => props.toggle()}
            >
              {postMutation => (
                <button
                  onClick={postMutation}
                  style={{
                    padding: "10px",
                    margin: "30px",
                    width: "800px",
                  }}
                >
                  Submit Form
                </button>
              )}
            </Mutation>
          </div>
        );
      }}
    </Query>
  );
};

export default compose(
  graphql(UPDATE_TASTING_SESSION, {
    name: "updateTastingSession",
  })
)(CreateTastingSession);

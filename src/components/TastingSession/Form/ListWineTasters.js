import React from "react";
import { graphql, compose, Query } from "react-apollo";

import WINE_TASTERS from "../../../graphql/queries/WINE_TASTERS";
import ADD_WINE_TASTER from "../../../graphql/mutations/ADD_WINE_TASTER";

const ListWineTasters = props => {
  return (
    <Query query={WINE_TASTERS}>
      {({ loading, error, data }) => {
        if (loading) return "LOADING";
        if (error) return `Error! ${error.message}`;
        const { wineTasters } = data;

        return (
          <select
            onChange={e => {
              props.addWineTaster({
                variables: {
                  ...wineTasters[e.target.options.selectedIndex - 1],
                },
              });
              e.target.value = "default";
            }}
            defaultValue="default"
          >
            <option value="default" disabled hidden>
              {props.placeholder}
            </option>
            {wineTasters.map((taster, i) => {
              return (
                <option key={`taster${i}`} value={taster.name}>
                  {taster.name}
                </option>
              );
            })}
          </select>
        );
      }}
    </Query>
  );
};

export default compose(graphql(ADD_WINE_TASTER, { name: "addWineTaster" }))(
  ListWineTasters
);

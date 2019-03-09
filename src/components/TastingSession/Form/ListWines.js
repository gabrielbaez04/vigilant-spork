import React from "react";
import { graphql, compose, Query } from "react-apollo";

import ADD_WINE from "../../../graphql/mutations/ADD_WINE";
import WINES from "../../../graphql/queries/WINES";

const ListWines = props => {
  return (
    <Query query={WINES}>
      {({ loading, error, data }) => {
        if (loading) return "LOADING";
        if (error) return `Error! ${error.message}`;
        const { wines } = data;

        return (
          <select
            onChange={e => {
              props.childCB
                ? props.childCB(wines[e.target.options.selectedIndex - 1].id)
                : props.addWine({
                    variables: { ...wines[e.target.options.selectedIndex - 1] },
                  });
              if (!props.childCB) e.target.value = "default";
            }}
            defaultValue="default"
          >
            <option value="default" disabled hidden>
              {props.placeholder}
            </option>
            {wines.map((wine, i) => {
              return (
                <option key={`wine${i}`} value={wine.id}>
                  {wine.name}
                </option>
              );
            })}
          </select>
        );
      }}
    </Query>
  );
};

export default compose(graphql(ADD_WINE, { name: "addWine" }))(ListWines);

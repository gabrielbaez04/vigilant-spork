import React from "react";
import { Query, Mutation } from "react-apollo";

import TASTING_SESSIONS from "../../graphql/queries/TASTING_SESSIONS";
import DELETE_SESSION from "../../graphql/mutations/DELETE_SESSION";

const ListSessions = (props) => {
    return (
    <Query query={TASTING_SESSIONS}>
        {({ loading, error, data }) => {
        if (loading) return "LOADING";
        if (error) return `Error! ${error.message}`;
        const { tastingSessions } = data;

        return (
            <div>
                <ul>
                {tastingSessions.map((session, i) => {
                    return (
                        <li key={`session${i}`} value={session.id}>
                        {session.date}
                        <button onClick={()=>props.toggleProps(session)}>EDIT</button>
                            <Mutation
                            mutation={DELETE_SESSION}
                            update={(cache, data ) => {
                                const { tastingSessions } = cache.readQuery({ query: TASTING_SESSIONS });
                                cache.writeQuery({
                                query: TASTING_SESSIONS,
                                data: { tastingSessions: tastingSessions.filter(s => s.id !== session.id) },
                                });
                            }}
                            variables={{
                                sessionID: session.id
                            }}
                            >
                            {postMutation => <button onClick={postMutation}>X</button>}
                            </Mutation>                          
                        </li>
                    );
                    })}
                </ul>
            </div>
        );
        }}
    </Query>
    );
};

export default ListSessions;

import React from "react";
import { Query, Mutation } from "react-apollo";

import TASTING_SESSIONS from "../../graphql/queries/TASTING_SESSIONS";
import DELETE_SESSION from "../../graphql/mutations/DELETE_SESSION";

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      margin:'0 auto',
    },
    listItem:{
        margin:'5px',
        '&:hover':{
            backgroundColor: 'rgba(0, 0, 0, 0.08)'
        }
    },
    button: {
        margin: '5px',
      },
      input: {
        display: 'none',
      },
    
  });

const ListSessions = (props) => {
    return (
    <Query query={TASTING_SESSIONS}>
        {({ loading, error, data, refetch }) => {
        if (loading) return "LOADING";
        if (error) return `Error! ${error.message}`;
        const { tastingSessions } = data;
        const { classes } = props;
        refetch();
        return (
            <div>
                <List dense className={classes.root}>
                {tastingSessions.map((session, i) => {
                    return (
                        <ListItem key={`session${i}`} value={session.id} className={classes.listItem}>
                            <ListItemText primary={session.date} />
                            <ListItemSecondaryAction>
                                <Button variant="outlined" color="primary" className={classes.button} onClick={()=>props.toggleProps(session)}>EDIT</Button>
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
                                    {postMutation => <Button variant="outlined" color="secondary" className={classes.button} onClick={postMutation}>X</Button>}
                                </Mutation>  
                            </ListItemSecondaryAction>                        
                        </ListItem>
                    );
                    })}
                </List>
            </div>
        );
        }}
    </Query>
    );
};

export default withStyles(styles)(ListSessions);

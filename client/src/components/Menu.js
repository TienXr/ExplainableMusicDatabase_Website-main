import React from 'react';
import { useItemContext } from '../hooks/useItemContext';

import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from 'react';

import List from '@mui/material/List';
import Button from '@mui/material/Button';

const styles = theme => ({
    container: {
        backgroundColor: "#DFF4FF",
        maxHeight: "70%"
    },
    h2: {
        fontFamily: 'PT Serif',
        fontSize: 25,
        fontWeight: 400,
        textAlign: 'center',
        paddingTop: 20
    },
    button: {
        backgroundColor: '#939393',
        borderRadius: 10,
        margin: "auto",
        marginBottom: 10,
        width: "85%",
        color: '#FFFFFF',
        fontSize: 20,
        alignItems: 'center',
        display: 'block'
    },

});

const useStyles = makeStyles(styles);

// this component is menu for user to select songs
export default function Menu() {
    const classes = useStyles();

    // get global state from context api 
    const { items, chosen, dispatch } = useItemContext();

    // when global state "chosen"
    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('/api/items')
            const json = await response.json()

            if (response.ok && json.length > 0) {
                dispatch({ type: 'GET_ITEMS', payload: json })
                if (chosen) { // if chosen is not null then do noting
                } else {     // if chosen is null then select the first one (this part is for clicking on node on the graph to move between two page )
                    dispatch({ type: 'SET_CHOOSE', payload: json[0]._id })
                }
            }
        }
        fetchItems()
    }, [chosen])

    return (
        <div className={classes.container}>
            <h2 className={classes.h2}>Music Description</h2>
            <List
                sx={{
                    height: "45.6vh",
                    overflow: 'auto'
                }}>
                {items && items.map((item) => (
                    <Button
                        onClick={() => dispatch({ type: 'SET_CHOOSE', payload: item._id })}
                        className={classes.button}
                        key={item._id}
                    >
                        {item.title}
                    </Button>
                ))}
            </List>
        </div>
    );
}
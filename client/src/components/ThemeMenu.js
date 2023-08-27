import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { useThemeContext } from '../hooks/useThemeContext';
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

// this component is similar the Menu component with use of theme context api 
export default function ThemeSong() {
    const classes = useStyles();
    const { themes, theme_choice, dispatch } = useThemeContext();

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('/api/themes');
            const json = await response.json();

            if (response.ok && json.length > 0) {
                dispatch({ type: 'GET_THEMES', payload: json })
                if (theme_choice) {
                } else {
                    dispatch({ type: 'CHOOSE_THEME', payload: json[0]._id })
                }
            }
        }
        fetchItems()
    }, [])

    return (
        <div className={classes.container}>
            <h2 className={classes.h2}>Themes</h2>
            <List
                sx={{
                    height: "45.6vh",
                    overflow: 'auto'
                }}>
                {themes && themes.map((theme) => (
                    <Button
                        onClick={() => dispatch({ type: 'CHOOSE_THEME', payload: theme._id })}
                        className={classes.button}
                        key={theme._id}
                    >
                        {theme.title}
                    </Button>
                ))}
            </List>
        </div>

    );
}
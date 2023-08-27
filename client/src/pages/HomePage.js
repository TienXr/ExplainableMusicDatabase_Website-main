import React from 'react';

import { makeStyles } from "@material-ui/core/styles";

import Menu from '../components/Menu'
import Description from '../components/Description';
import SongGraph from '../components/SongGraph'

import Grid from '@mui/material/Grid';

const styles = theme => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.6em',
            backgroundColor: '#D8D8D8',
            borderRadius: 10
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#4AC9FF',
            borderRadius: 10
        }
    }
});

const useStyles = makeStyles(styles);

export default function HomePage() {
    const classes = useStyles()
    return (
        <div>
            <Grid container className={classes.container}>
                <Grid item xs={7}>
                    <Description />
                </Grid>
                <Grid item xs={5}>
                    <SongGraph />
                    <Menu />
                </Grid>
            </Grid>
        </div>
    );
}
import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import FileUpload from '../components/FileUpload';

import Grid from '@mui/material/Grid';

const styles = theme => ({
    h1: {
        marginTop: 20,
        fontSize: 40,
        fontWeight: 600,
        textAlign: "center",
        margin: "auto"
    },
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

export default function UploadPage() {
    const classes = useStyles()
    return (
        <div>
            <Grid container className={classes.container}>
                <Grid item xs={12}>
                    <h1 className={classes.h1}>Upload</h1>
                </Grid>
                <Grid item xs={12}>
                    <FileUpload />
                </Grid>
            </Grid>
        </div>
    );
}
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useLogin } from '../hooks/useLogin';
import { useState } from 'react';
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
    },
    form: {
        margin: "auto",
        textAlign: 'center',
        marginTop: 50,
        backgroundColor: "#DFF4FF",
        minHeight: 350,
        minWidth: 600,
        borderRadius: 20
    },
    label: {
        fontSize: 20,
        marginBottom: 10
    },
    row: {
        textAlign: 'left',
        marginLeft: 15,
        marginRight: 15
    },
    button: {
        marginTop: 40,
        backgroundColor: "#4AC9FF",
        color: "black",
        width: "5rem",
        borderRadius: 10,
        border: "none",
        minHeight: 35
    },
    input: {
        width: "100%",
        borderRadius: 10,
        border: "1px solid black",
        minHeight: 40,
        padding: 10
    },
    h3: {
        marginTop: 50,
    },
    error: {
        color: "red",
        border: "1px solid red",
        width: "30%",
        margin: 'auto',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: "#FFB6C1"
    }
});

const useStyles = makeStyles(styles);

const Login = () => {
    const classes = useStyles();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password)
    }

    return (
        <Grid container style={{ backgroundColor: "#EEEEEE", minHeight: "100vh" }}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <h3 className={classes.h3}>Log In</h3>
                <Grid item className={classes.row} xs={12}>
                    <label className={classes.label}>Email:</label>
                </Grid>
                <Grid item className={classes.row} xs={12}>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className={classes.input}
                    />
                </Grid>
                <Grid item className={classes.row} xs={12}>
                    <label className={classes.label}>Password:</label>
                </Grid>
                <Grid item className={classes.row} xs={12}>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className={classes.input}
                    />
                </Grid>
                <button
                    disabled={isLoading}
                    className={classes.button}
                >Log in</button>
                {error &&
                    <div className={classes.error}>{error}</div>
                }
            </form>
        </Grid>
    )
}

export default Login;
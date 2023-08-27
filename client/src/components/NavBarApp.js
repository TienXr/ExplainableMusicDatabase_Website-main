import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button'

import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const styles = theme => ({
    container: {
        maxWidth: "100%"
    },
    typo: {
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontWeight: 700,
        fontSize: "30px",
        letterSpacing: '.3rem',
        color: '#FFFFFF',
        textDecoration: 'none',
    },
    link: {
        color: "#FFFFFF",
        fontSize: "15px",
        textAlign: "center",
        marginLeft: "2rem",
    },
    button: {
        color: '#FFFFFF',
        border: '1px solid white',
        marginLeft: 35
    },
    span: {
        marginLeft: 35
    }
});

const useStyles = makeStyles(styles);

// this component is for the navigation bar on top
export default function NavBarApp() {
    const classes = useStyles();
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <AppBar position="sticky">
            <section className={classes.container}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{ fontFamily: 'monospace' }}
                        classes={{ root: classes.typo }}
                    >
                        Explainable Music Archive
                    </Typography>
                    <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
                        <Link href="/"
                            underline='none'
                            classes={{
                                root: classes.link
                            }}
                        >HOME</Link>
                        <Link href="/theme"
                            underline='none'
                            classes={{
                                root: classes.link
                            }}
                        >THEME</Link>
                        <Link href="/upload"
                            underline='none'
                            classes={{
                                root: classes.link
                            }}
                        >UPLOAD</Link>
                        {!user && (
                            <Link href="/login"
                                underline='none'
                                classes={{
                                    root: classes.link
                                }}
                            >LOGIN</Link>
                        )}
                        {user && (<span className={classes.span}>{user.email}</span>)}
                        {user && (
                            <Button onClick={handleClick} className={classes.button}>Log Out</Button>
                        )}
                    </Box>
                </Toolbar>
            </section>
        </AppBar>
    );
}

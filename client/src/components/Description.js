import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { useItemContext } from '../hooks/useItemContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

// MUI import
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { v4 as uuidv4 } from 'uuid'

const styles = theme => ({
    container: {
        maxHeight: "100%",
    },
    title: {
        marginTop: 20,
        fontSize: 40,
        fontWeight: 600,
        textAlign: "center",
        marginBottom: 20
    },
    h2: {
        backgroundColor: "#4AC9FF",
        margin: 0,
        marginLeft: 10,
        textAlign: "center",
        width: "fit-content",
        marginTop: 10,
        padding: "7px 30px 7px 30px",
        fontSize: 15,
        borderRadius: 10
    },
    p: {
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        padding: 10,
        minHeight: 60,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 25,
        marginBottom: 25,
        height: 100,
        width: '97%',
        border: "none",
    },
    button: {
        backgroundColor: "#D42A2A",
        color: "#FFFFFF",
        marginTop: 10
    },
    option: {
        border: "1px solid transparent",
        backgroundColor: "#4AC9FF"
    },
    modalTitle: {
        marginBottom: 10,
        fontSize: 30,
        fontWeight: "bold"
    },
    submit: {
        backgroundColor: "#4AC9FF",
        color: 'white',
        marginTop: 20,
        textAlign: "center",
        width: "fit-content",
        fontSize: 15,
        borderRadius: 10
    },
    addTheme: {
        marginLeft: 10,
        backgroundColor: '#4AC9FF',
        borderRadius: 10,
        marginTop: 11,
        maxHeight: 30,
        color: 'white',
        width: "fit-content"
    },
    themeBox: {
        backgroundColor: "#DFF4FF",
        margin: 0,
        marginLeft: 10,
        marginTop: 10,
        textAlign: "center",
        width: "fit-content",
        padding: "5px 10px 5px 10px",
        fontSize: 15,
        borderRadius: 10
    },
    pdf: {
        backgroundColor: '#DC143C',
        color: "white",
        marginLeft: 10,
        borderRadius: 10,
        marginBottom: 20,
    }
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const options = [];
const themes = [
    {
        label: "Articulations",
        value: "Articulations",
    },
    {
        label: "Composition Process",
        value: "Composition Process",
    },
    {
        label: "Conflict",
        value: "Conflict",
    },
    {
        label: "Complexity",
        value: "Complexity",
    },
    {
        label: "Dynamics",
        value: "Dynamics",
    },
    {
        label: "Emotion",
        value: "Emotion",
    },
    {
        label: "External Theme",
        value: "External Theme"
    },
    {
        label: "Harmony",
        value: "Harmony",
    },
    {
        label: "Improvisation",
        value: "Improvisation",
    },
    {
        label: "Music Theory",
        value: "Music Theory",
    },
    {
        label: "Motif",
        value: "Motif",
    },
    {
        label: "Movement",
        value: "Movement",
    },
    {
        label: "Metaphor",
        value: "Metaphor",
    },
    {
        label: "Playing Style",
        value: "Playing Style",
    },
    {
        label: "Pitch",
        value: "Pitch",
    },
    {
        label: "Repetition",
        value: "Repetition",
    },
    {
        label: "Resolution",
        value: "Resolution",
    },
    {
        label: "Rhythm",
        value: "Rhythm",
    },
    {
        label: "Self Reflection",
        value: "Self Reflection",
    },
    {
        label: "Song Theme",
        value: "Song Theme"
    },
    {
        label: "Structure",
        value: "Structure",
    },
    {
        label: "Tempo",
        value: "Tempo",
    },
    {
        label: "Time Signature",
        value: "Time Signature",
    },
    {
        label: "Tension",
        value: "Tension",
    },
    {
        label: "Voicing",
        value: "Voicing",
    },

];

const useStyles = makeStyles(styles);

export default function Description() {
    const classes = useStyles()

    const [title, setTitle] = useState("");
    const [descriptions, setDescriptions] = useState([]);
    const [location, setLocation] = useState(null);
    const [location2, setLocation2] = useState(null);
    const [barStart, setBarStart] = useState("");
    const [barEnd, setBarEnd] = useState("");
    const [d, setD] = useState("");
    const [index, setIndex] = useState("");
    const [newTheme, setTheme] = useState(themes[0]['value']);
    const [allThemes, setAllThemes] = useState([]);
    const [themeId, setThemeId] = useState("");
    // Modal state
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const { chosen, dispatch } = useItemContext();
    const { user } = useAuthContext();

    useEffect(() => {
        getThemes();
    }, []);

    // if chosen is changed
    useEffect(() => {
        // create function inside useEffect then call it at then end
        const fetchContent = async () => {
            if (chosen) {
                try {
                    await axios.get('/api/items/' + chosen)
                        .then((res) => res.data)
                        .then((res) => {
                            // change informations displayed
                            setTitle(res.title); // change title 
                            setDescriptions(res.description); // change descriptions
                            setLocation(res.location); // change music file location to display
                            setLocation2(res.location2); // change pdf file location to display

                            // reset the options which have choices of start bar number
                            options.splice(0, options.length);
                            res.description.map((d) => {
                                options.push(
                                    {
                                        label: d['start'],
                                        value: d['start']
                                    }
                                )
                                return true;
                            })
                        })
                } catch (err) {
                    console.log(err.response.data.msg);
                }
            }
        }

        fetchContent()
    }, [chosen])

    // this function is used to call api to get all the themes
    const getThemes = async () => {
        try {
            await axios.get('/api/themes').then((res) => {
                if (res.data.length === 0) {
                    for (var i = 0; i < themes.length; i++) {
                        postThemes(themes[i].value)
                    }
                }
                // get all themes to put into state
                setAllThemes(res.data);
                res.data.find((o, i) => {
                    if (o["title"] === themes[0]['value']) {
                        // set theme id of default choice which is the first one
                        setThemeId(o["_id"]);
                    }
                })
            })
        } catch (err) {
            console.log(err.response.data.msg);
        }
    }


    // this function is used to open the pdf file if user want to see the pdf file content
    const openInNewTab = () => {
        window.open(location2, '_blank').focus();
    }

    const handleOpen = (index, bstart, bend, bdes) => {
        setOpen(true);
        setIndex(index);
        setBarStart(bstart);
        setBarEnd(bend);
        setD(bdes);
    };

    const handleClose = () => setOpen(false);

    const handleCloseDelete = () => setOpenDelete(false);
    const handleOpenDelete = () => setOpenDelete(true);


    // this function is used to update the items displayed on screen after an item is deleted
    const fetchItems = async () => {
        const response = await fetch('/api/items')
        const json = await response.json()

        if (response.ok && json.length > 0) {
            // dispatch global state to display on screen
            dispatch({ type: 'GET_ITEMS', payload: json }) // 
            dispatch({ type: 'SET_CHOOSE', payload: json[0]._id })
        }
    }

    const postThemes = async (name) => {
        const title = name;
        const song = [];
        const themeSche = { title, song }
        const response = await fetch('/api/themes', {
            method: 'POST',
            body: JSON.stringify(themeSche),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        if (!response.ok) {
            console.log(json.error)
        } else {
            console.log(json)
        }
    }


    // this function is used to delete the file that included in the item that is just been deleted 
    const deleteFile = async () => {
        await fetch('api/items/upload', {
            method: 'DELETE',
            body: JSON.stringify({ path1: location, path2: location2 }),
            headers: {
                'Content-type': 'application/json'
            }
        })
    }

    // delete the song from theme database 
    const deleteSongFromTheme = (s) => {
        const currentTheme = [...allThemes];
        for (var i = 0; i < currentTheme.length; i++) {
            // get the id 
            const tid = currentTheme[i]['_id']
            // filter the song from the theme 
            const newS = currentTheme[i]['song'].filter(song => song.title !== s)
            if (newS.length !== currentTheme[i]['song'].length) {
                // patch theme with new song and its id to find
                fetchTheme(tid, newS)
            }
        }
    }

    // this function is used for deleteting action
    const handleDelete = () => {
        if (chosen) {
            fetch('api/items/' + chosen, {
                method: 'DELETE'
            }).then(res => res.json())
                .then(j => {
                    // update global state by delete action from context api
                    dispatch({ type: 'DELETE_ITEM', payload: j })
                })
                .then(deleteSongFromTheme(title)) // delete song from the theme database 
                .then(deleteFile()) // delete files from the public in front-end
            // fetch item again
            fetchItems()
        }
    }

    // change themeId state when option chosen on modal is changed
    const onThemeChange = e => {
        setTheme(e.target.value)
        allThemes.find((o, i) => {
            if (o["title"] === e.target.value) {
                setThemeId(o["_id"]);
            }
        })
    }

    // this function is called when user want to add theme to item bar number
    const onSubmit = async e => {
        e.preventDefault();
        const currentList = [...descriptions];
        currentList[index]['themes'].push(newTheme)

        // put new song to the theme's song list database
        const themeList = [...allThemes]
        for (var i = 0; i < allThemes.length; i++) {
            if (themeList[i]['title'] === newTheme) {
                themeList[i]["song"].push({ title, location, location2, barStart, barEnd, d });
                const newSong = [...themeList[i]['song']]
                fetchTheme(themeId, newSong)
                break;
            }
        }

        try {
            // patch the item description list
            await axios.patch('/api/items/' + chosen, JSON.stringify({
                description: currentList
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                // update state to display
                setDescriptions(currentList)
            })
        } catch (err) {
            if (err.response.statis === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }

    // this function is used to fetch theme's song list with corresponding id in backend
    const fetchTheme = async (id, new_song) => {
        const response = await fetch('/api/themes/' + id, {
            method: 'PATCH',
            body: JSON.stringify({
                song: new_song
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })

        const json = await response.json()
        if (!response.ok) {
            console.log(json.error)
        }
        if (response.ok) {
            console.log("ok")
        }
    }

    // this function is used to return JXS for mp3 file or mid file 
    const getFileType = f => {
        if (f.substr(f.length - 3) === "mp3") {
            return (
                <div style={{ marginLeft: 10, marginBottom: 20 }}>
                    <audio src={`${f}`} type="audio/mp3" controls>
                    </audio>
                </div>
            )
        } else if (f.substr(f.length - 3) === "mid") {
            return (
                <div style={{ marginLeft: 10, marginBottom: 20 }}>
                    <midi-player
                        src={`${f}`}>
                    </midi-player>
                </div>
            )
        }
    }

    return (
        <div>
            <h1 className={classes.title}>{title}</h1>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography className={classes.modalTitle}>Adding Theme</Typography>
                    <Grid container style={{ marginBottom: 10 }}>
                        <Grid item>
                            <Typography className={classes.label}>From bar number {barStart} to {barEnd}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography>Theme: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <select className={classes.option} value={newTheme} onChange={onThemeChange}>
                                {themes.map((t) => (
                                    <option key={uuidv4()} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                        </Grid>
                    </Grid>
                    <center>
                        <Button className={classes.submit} onClick={onSubmit}>
                            Submit
                        </Button>
                    </center>
                </Box>
            </Modal>
            <Modal
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography className={classes.modalTitle}>Delete Song</Typography>
                    <Grid container style={{ marginBottom: 10 }}>
                        <Grid item>
                            <Typography className={classes.label}>Do you want to delete this song?</Typography>
                        </Grid>
                    </Grid>
                    <center>
                        <Button className={classes.button} onClick={handleDelete}>
                            Delete
                        </Button>
                    </center>
                </Box>
            </Modal>
            <Grid container>
                <Grid item>
                    {location &&
                        getFileType(location)
                    }
                </Grid>
                <Grid item style={{ marginTop: 10 }}>
                    <Button onClick={openInNewTab} className={classes.pdf}>PDF</Button>
                </Grid>
                {user &&
                    <Grid item style={{marginLeft: 15}}>
                        <Button
                            className={classes.button}
                            onClick={handleOpenDelete}
                        >
                            Delete <DeleteIcon />
                        </Button>
                    </Grid>
                }
            </Grid>
            <List
                sx={{
                    height: "75vh",
                    overflow: 'auto'
                }}>
                {descriptions && descriptions.map((d, i) => {
                    return (
                        <div key={uuidv4()}>
                            <Grid container>
                                <Grid item>
                                    <h2 className={classes.h2}>Bar Number {d['start']} to {d['end']}</h2>
                                </Grid>
                                {d['themes'] && d['themes'].map((t) => {
                                    return (
                                        <Grid key={uuidv4()} item>
                                            <div className={classes.themeBox}>{t}</div>
                                        </Grid>
                                    )
                                })}
                                <Grid item>
                                    <Button onClick={() => handleOpen(i, d['start'], d['end'], d['des'])} className={classes.addTheme}>
                                        <AddCircleOutlineIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                            <textarea readOnly className={classes.p} value={d['des']} />
                        </div>
                    );
                })}
            </List>

        </div>

    );
}
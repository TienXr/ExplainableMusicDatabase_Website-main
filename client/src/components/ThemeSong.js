import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { useThemeContext } from '../hooks/useThemeContext';
import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';

const styles = theme => ({
    container: {
        maxHeight: "100%"
    },
    title: {
        marginTop: 20,
        fontSize: 40,
        fontWeight: 600,
        textAlign: "center",
    },
    h2: {
        backgroundColor: "#4AC9FF",
        margin: 0,
        marginLeft: 15,
        marginBottom: 15,
        textAlign: "center",
        width: "fit-content",
        padding: "5px 30px 5px 30px",
        fontSize: 15,
        borderRadius: 10
    },
    p: {
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        padding: 10,
        minHeight: 60,
        marginLeft: 15,
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
        margin: "auto",
        alignItem: "center",
    },
    song: {
        fontFamily: "Times New Roman",
        marginLeft: 15
    },
    pdf: {
        backgroundColor: '#DC143C',
        color: "white",
        marginLeft: 15,
        borderRadius: 10,
        marginBottom: 20,
    }
});

const useStyles = makeStyles(styles);

// this component is useed for theme page for displaying the song that the theme in 
export default function ThemeSong() {
    const classes = useStyles();

    const [title, setTitle] = useState("");
    const [song, setSong] = useState([]);
    const { theme_choice } = useThemeContext();

    // this function is used to return JSX part for mp3 file or mid file
    const getFileType = f => {
        if (f.substr(f.length - 3) === "mp3") {
            return (
                <div style={{ marginLeft: 15, marginBottom: 15 }}>
                    <audio src={`${f}`} type="audio/mp3" controls>
                    </audio>
                </div>
            )
        } else if (f.substr(f.length - 3) === "mid") {
            return (
                <div style={{ marginLeft: 15, marginBottom: 15 }}>
                    <midi-player
                        src={`${f}`}>
                    </midi-player>
                </div>
            )
        }
    }

    // this function is used to open pdf file in new tab
    const openInNewTab = (url) => {
        window.open(url, '_blank').focus();
    }

    // this useEffect is used when user select different global state theme choice
    useEffect(() => {
        const fetchContent = async () => {
            if (theme_choice) {
                const response = await fetch('/api/themes/' + theme_choice)
                const json = await response.json()

                if (response.ok) {
                    setTitle(json.title)  // change the title
                    setSong(groupBy(json.song, "title")) // change the state song data to display after groupby them togerther by title
                }
            } else {
                setTitle("")
                setSong([])
            }
        }
        fetchContent()
    }, [theme_choice]);

    // groupby collection by attr
    function groupBy(collection, attr) {
        // unique set for quick reference
        const final = Object.create(null);
        for (var i = 0; i < collection.length; i++) {
            const key = collection[i][attr]
            // if there is already this key in the set then just push the reference including bar number, description and location
            if (key in final) {
                const arr = final[key]
                arr.push(collection[i])
                final[key] = arr
            } else {
                final[key] = [collection[i]]
            }
        }
        return final;
    }

    return (
        <div>
            <h1 className={classes.title}>{title}</h1>
            <List
                sx={{
                    height: "75vh",
                    overflow: 'auto'
                }}>
                {song && Object.keys(song).map((key, index) => {
                    return (
                        <div key={uuidv4()} className={classes.item}>
                            <h2 key={uuidv4()} className={classes.song}>{key}</h2>
                            {getFileType(song[key][0]['location'])}
                            <Button key={uuidv4()} onClick={() => openInNewTab(song[key][0]['location2'])} className={classes.pdf}>PDF</Button>
                            {song[key].map((s) => {
                                return (
                                    <div key={uuidv4()}>
                                        <h2 key={uuidv4()}  className={classes.h2}>Bar Number {s['barStart']} to {s['barEnd']}</h2>
                                        <textarea key={uuidv4()} readOnly className={classes.p} value={s['d']} />
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </List>
        </div >

    );
}
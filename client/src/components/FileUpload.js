
import React, { Fragment, useState } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useItemContext } from '../hooks/useItemContext';

const styles = theme => ({
    container: {
        margin: "auto"
    },
    input: {
        border: '1px gray solid',
        width: "100%",
        marginTop: "20px"
    },
    row: {
        marginTop: 30,
        marginRight: 15
    },
    label: {
        backgroundColor: "#4AC9FF",
        display: 'flex',
        width: "100%",
        minHeight: 63,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        borderRadius: 10
    },
    bar: {
        display: 'flex',
        width: "100%",
        minHeight: 63,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        borderRadius: 10
    },
    description: {
        display: 'flex',
        width: "100%",
        minHeight: 151,
        borderRadius: 10,
        padding: 10
    },
    button: {
        backgroundColor: "#4AC9FF",
        color: "black",
        width: "5rem"
    },
    removebtn: {
        backgroundColor: "#D42A2A",
        color: "#FFFFFF",
        alignItem: "center",
        maxHeight: 150,
        marginTop: 30,
        borderRadius: 10
    },
    submit: {
        backgroundColor: '#4AC9FF',
        color: '#FFFFFF',
        height: 50,
        width: "100%",
        marginTop: 25,
        marginBottom: 100,
        borderRadius: 10
    },
    title: {
        margin: 'auto',
        fontSize: 20,
        fontFamily: "Times New Roman",
        backgroundColor: "#4AC9FF",
        borderRadius: 10,
        width: "fit-content",
        padding: 20,
        marginTop: 30
    },
    noti: {
        backgroundColor: "#59e559",
        borderRadius: 10,
        margin: "auto",
        width: "fit-content",
        padding: 10
    },
    warning: {
        backgroundColor: "#f37070",
        color: "white",
        borderRadius: 10,
        margin: "auto",
        width: "fit-content",
        padding: 10,
        marginTop: 10
    }
});

const useStyles = makeStyles(styles);

// this component is for file uploading on upload page
export default function FileUpload() {
    const classes = useStyles();
    const [file, setFile] = useState('');
    const [file2, setFile2] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [inputList, setinputList] = useState([{ start: '', end: '', des: '', themes: [] }]);
    const [name, setName] = useState('');
    const { dispatch } = useItemContext();

    // this function is called when the content on the first file input changed. It will change the state for final submission
    const onChange = e => {
        setFile(e.target.files[0]);
    }

    // this function is called when the content on the second file input changed. It will change the state for final submission
    const onChange2 = e => {
        setFile2(e.target.files[0]);
    }

    // this function is used to add extra object to the state when user want extra input location
    const handleAddClick = () => {
        setinputList([...inputList, { start: '', end: '', des: '', themes: [] }]);
    }

    // this function is called when the input on the description content change. It will change the state for final submission
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const currentList = [...inputList];
        currentList[index][name] = value;
        setinputList(currentList);
    }

    // this function is used to change state for final submission when title input change
    const handleTitleChange = (e) => {
        setName(e.target.value)
    }

    // this function is used to remove input user add before
    const handleRemove = index => {
        const currentList = [...inputList];
        currentList.splice(index, 1);
        setinputList(currentList);
    }

    // this function is used to submit all the input user write and also the files user uploaded
    const onSubmit = async e => {
        e.preventDefault();
        
        // the music file and pdf file will be appened into FormData to call post api from backend
        const formData = new FormData();
        formData.append('file', file);
        formData.append('file2', file2);
        try {
            await axios.post('api/items/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => res.data)
                .then((res) => {
                    const n = res.fileName;
                    const p = res.filePath;
                    const p2 = res.filePath2;
                    setUploadedFile({n, p})
                    return ({p: p, p2: p2})
            }).then((res) => handleUpload(res)) // post the content user input
        } catch (err) {
            if (err.response.statis === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }

    // this function is used to upload the input content including bar number, description, location of the file for displaying file for playing and reading pdf
    const handleUpload = async (path) => {
        const description = [...inputList];
        const location = path.p;
        const location2 = path.p2;
        const title = name;
        const item = { title, description, location, location2 }
        const response = await fetch('/api/items', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        if (!response.ok) {
            console.log(json.error)
        }

        if (response.ok) {
            dispatch({ type: "CREATE_ITEM", payload: json })
        }

    }

    return (
        <Fragment>
            <Grid item xs={6} className={classes.title}> Music file (.mid or .mp3)</Grid>
            <form>
                <Grid item xs={6} className={classes.container}>
                    <input type='file' className={classes.input} id='customFile' onChange={onChange} />
                </Grid>
            </form>
            <div className={classes.warning}> The file name of music file must not have space </div>
            <Grid item xs={6} className={classes.title} style={{marginTop: 15}}> For reading bar (.pdf file)</Grid>
            <form>
                <Grid item xs={3} className={classes.container}>
                    <input type='file' className={classes.input} id='xmlFile' onChange={onChange2} />
                </Grid>
            </form>
            <Grid container justifyContent="center" style={{ marginTop: 40 }}>
                <Grid item xs={3}>
                    <input name="title" type="text" className={classes.bar} placeholder="Enter Title" onChange={e => handleTitleChange(e)} />
                </Grid>
            </Grid>
            {uploadedFile ?
                <div className={classes.noti}> {uploadedFile[Object.keys(uploadedFile)[0]]} uploaded</div> : null}
            {
                inputList.map((x, i) => {
                    return (
                        <Grid key={i} container justifyContent="center">
                            <Grid item xs={1} className={classes.row}>
                                <div className={classes.label}>Start</div>
                                <div className={classes.label}>End</div>
                            </Grid>
                            <Grid item xs={1} className={classes.row}>
                                <input name="start" type="number" className={classes.bar} value={x.start} placeholder="Start Bar" onChange={e => handleInputChange(e, i)} />
                                <input name="end" type="number" className={classes.bar} value={x.end} placeholder="End Bar" onChange={e => handleInputChange(e, i)} />
                            </Grid>
                            <Grid item xs={6} className={classes.row}>
                                <textarea name="des" type="text" className={classes.description} value={x.des} placeholder="Enter Description" onChange={e => handleInputChange(e, i)}></textarea>
                            </Grid>
                            {inputList.length !== 1 &&
                                <Button className={classes.removebtn} onClick={() => handleRemove(i)}>
                                    Remove
                                </Button>
                            }
                        </Grid>
                    );
                })
            }
            <center>
                <Button className={classes.button} onClick={handleAddClick}>
                    <AddCircleOutlineIcon />
                </Button>
                <Grid item xs={3} style={{ margin: "auto" }}>
                    <Button onClick={onSubmit} className={classes.submit}>Upload</Button>
                </Grid>
            </center>
        </Fragment>
    );
}
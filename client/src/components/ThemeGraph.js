import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { useThemeContext } from '../hooks/useThemeContext';
import { useItemContext } from '../hooks/useItemContext';
import { Graph } from "react-d3-graph";
import { useNavigate } from 'react-router-dom';

const styles = theme => ({

});

const useStyles = makeStyles(styles);

// this function is used to groupby collection by an attribute 
function groupBy(collection, attr) {
    const final = Object.create(null);
    var count = 1;
    for (var i = 0; i < collection.length; i++) {
        const key = collection[i][attr]
        if (key in final) {
        } else {
            final[key] = count;
            count = count + 1
        }
    }
    return final;
}

// format the data for link and node for GRAPH component data
function getData(item, center) {
    const final = { "nodes": [], "links": [] }
    final.nodes.push({ "id": center, size: 700, color: "#FEDEFF" })
    for (const [key, value] of Object.entries(item)) {
        final.nodes.push({ "id": key })
        final.links.push({ "source": center, "target": key })
    }
    return final;
}

// this function is used to create unique set with key as the title and value as its id for quick finding
function getItemsId(items) {
    const result = Object.create(null);
    for (var i = 0; i < items.length; i++) {
        const key = items[i]["title"]
        result[key] = items[i]['_id']
    }
    return result
}

// this component is similar to SongGraph but it is more simple as we do not have to deal with sub child 
export default function NetworkGraph() {
    const classes = useStyles();
    let navigate = useNavigate();
    const [data, setData] = useState({});
    const [items, setItems] = useState({});
    const [title, setTitle] = useState("");
    const { theme_choice } = useThemeContext();
    const { dispatch } = useItemContext();

    const onClickNode = (nodeId) => {
        if (nodeId !== title) {
            let path = '/';
            dispatch({ type: 'SET_CHOOSE', payload: items[nodeId] })
            navigate(path);
        }
    };

    useEffect(() => {
        const fetchContent = () => {
            if (theme_choice) {
                fetch('/api/themes/' + theme_choice)
                    .then(res => {
                        return res.json();
                    })
                    .then(j => {
                        const items = groupBy(j.song, "title");
                        setData(getData(items, j.title));
                        setTitle(j.title)
                    })

            }
        }

        const fetchItems = () => {
            fetch('/api/items')
                .then(res => res.json())
                .then(j => {
                    setItems(getItemsId(j))
                })
        }

        fetchContent();
        fetchItems();

    }, [theme_choice])

    return (
        <div style={{ background: "#AEE2FF" }}>
            <Graph id="graph-id"
                data={data}
                onClickNode={onClickNode}
                config={{
                    nodeHighlightBehavior: true,
                    automaticRearrangeAfterDropNode: true,
                    directed: true,
                    panAndZoom: true,
                    collapsible: false,
                    focusAnimationDuration: 0.75,
                    focusZoom: 0.5,
                    freezeAllDragEvents: false,
                    maxZoom: 8,
                    minZoom: 0.1,
                    panAndZoom: true,
                    staticGraph: false,
                    staticGraphWithDragAndDrop: false,
                    d3: {
                        gravity: -300
                    },
                    node: {
                        color: "#a1a2a3",
                        size: 300,
                        fontSize: 10,
                        fontWeight: 'bold',
                        labelPosition: "top",
                        highlightStrokeColor: "blue",
                        highlightFontSize: 15,
                        highlightColor: 'red'
                    },
                    link: {
                        color: "#524A4E",
                    },
                }}
            />
        </div >

    );
}
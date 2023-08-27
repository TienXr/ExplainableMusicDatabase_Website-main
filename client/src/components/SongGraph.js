import React, { useEffect, useState } from 'react'
import { useItemContext } from '../hooks/useItemContext';
import { useThemeContext } from '../hooks/useThemeContext';
import { Graph } from "react-d3-graph";
import { useNavigate } from 'react-router-dom';


// this function is used to check if an object is in an array or not as "in" cannot be used in this case
function containElem(elem, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === elem.id) {
            return true;
        }
    }
    return false;
}

// this function is used to group items of array by attribute
function groupBy(collection, attr) {
    const final = Object.create(null);
    var count = 1;
    for (var i = 0; i < collection.length; i++) {
        const arr = collection[i][attr]
        for (var j = 0; j < arr.length; j++) {
            const key = arr[j]
            if (key in final) {
            } else {
                final[key] = count;
                count = count + 1
            }
        }
    }
    return final;
}

// this function is used to format data for graph data
function getData(item, center) {
    const final = { "nodes": [], "links": [] }
    final.nodes.push({ "id": center, size: 700, color: "#FEDEFF" })
    for (const [key, value] of Object.entries(item)) {
        final.nodes.push({ "id": key }) // adding all nodes as the key 
        final.links.push({ "source": center, "target": key }) // adding link from the title to every theme
    }
    // below step is hard coded for sub children themes (this might be changed in the future if there are more theme option that have sub-children or change to other non-hardcoded algorithm)
    if (containElem({ "id": "Movement" }, final.nodes) && containElem({ "id": "Repetition" }, final.nodes)) {
        final.links.push({ "source": "Movement", "target": "Repetition" })
        final.links = (final.links.filter(x => x.source !== center || x.target !== "Repetition"))
    }
    if (containElem({ "id": "Voicing" }, final.nodes) && containElem({ "id": "Pitch" }, final.nodes)) {
        final.links.push({ "source": "Voicing", "target": "Pitch" })
        final.links = (final.links.filter(x => x.source !== center || x.target !== "Pitch"))
    }

    if (containElem({ "id": "Playing Style" }, final.nodes)) {
        if (containElem({ "id": "Articulations" }, final.nodes)) {
            final.links.push({ "source": "Playing Style", "target": "Articulations" })
            final.links = (final.links.filter(x => x.source !== center || x.target !== "Articulations"))
        }
        if (containElem({ "id": "Dynamics" }, final.nodes)) {
            final.links.push({ "source": "Playing Style", "target": "Dynamics" })
            final.links = (final.links.filter(x => x.source !== center || x.target !== "Dynamics"))
        }
    }

    if (containElem({ "id": "Rhythm" }, final.nodes)) {
        if (containElem({ "id": "Tempo" }, final.nodes)) {
            final.links.push({ "source": "Rhythm", "target": "Tempo" })
            final.links = (final.links.filter(x => x.source !== center || x.target !== "Tempo"))
        }
        if (containElem({ "id": "Time Signature" }, final.nodes)) {
            final.links.push({ "source": "Rhythm", "target": "Time Signature" })
            final.links = (final.links.filter(x => x.source !== center || x.target !== "Time Signature"))
        }
    }
    if (containElem({ "id": "Self Reflection" }, final.nodes)) {
        if (containElem({ "id": "Composition Process" }, final.nodes)) {
            final.links.push({ "source": "Self Reflection", "target": "Composition Process" })
            final.links = (final.links.filter(x => x.source !== center || x.target !== "Composition Process"))
            if (containElem({ "id": "Conflict" }, final.nodes)) {
                final.links.push({ "source": "Composition Process", "target": "Conflict" })
                final.links = (final.links.filter(x => x.source !== center || x.target !== "Conflict"))
            }
            if (containElem({ "id": "Improvisation" }, final.nodes)) {
                final.links.push({ "source": "Composition Process", "target": "Improvisation" })
                final.links = (final.links.filter(x => x.source !== center || x.target !== "Improvisation"))
            }
        } else {
            if (containElem({ "id": "Conflict" }, final.nodes)) {
                final.links.push({ "source": "Self Reflection", "target": "Conflict" })
                final.links = (final.links.filter(x => x.source !== center || x.target !== "Conflict"))
            }
            if (containElem({ "id": "Improvisation" }, final.nodes)) {
                final.links.push({ "source": "Self Reflection", "target": "Improvisation" })
                final.links = (final.links.filter(x => x.source !== center || x.target !== "Improvisation"))
            }
        }
    } else {
        if (containElem({ "id": "Composition Process" }, final.nodes)) {
            if (containElem({ "id": "Conflict" }, final.nodes)) {
                final.links.push({ "source": "Composition Process", "target": "Conflict" })
                final.links = (final.links.filter(x => x.source !== center || x.target !== "Conflict"))
            }
            if (containElem({ "id": "Improvisation" }, final.nodes)) {
                final.links.push({ "source": "Composition Process", "target": "Improvisation" })
                final.links = (final.links.filter(x => x.source !== center || x.target !== "Improvisation"))
            }
        }
    }

    if (containElem({ "id": "Song Theme" }, final.nodes)) {
        if (containElem({ "id": "External Theme" }, final.nodes)) {
            final.links.push({ "source": "Song Theme", "target": "External Theme" })
            final.links = (final.links.filter(x => x.source !== center || x.target !== "External Theme"))
        }
        if (containElem({ "id": "Metaphor" }, final.nodes)) {
            final.links.push({ "source": "Song Theme", "target": "Metaphor" })
            final.links = (final.links.filter(x => x.source !== center || x.target !== "Metaphor"))
        }
    }

    return final;
}


// this function is used to create unique set with key as the title and value as its id for quick finding
function getThemesId(themes) {
    const result = Object.create(null);
    for (var i = 0; i < themes.length; i++) {
        const key = themes[i]["title"]
        result[key] = themes[i]['_id']
    }
    return result
}

// this component is for the graph in Home page
export default function NetworkGraph() {
    let navigate = useNavigate();
    const [data, setData] = useState({})
    const [themes, setThemes] = useState({})
    const [title, setTitle] = useState("");
    const { chosen } = useItemContext();
    const { dispatch } = useThemeContext();

    // this function is executed when a node is clicked on graph
    const onClickNode = (nodeId) => {
        // if not the main node
        if (nodeId !== title) {
            // it will move to the theme page
            let path = '/theme';
            // dispatch the clicked node as chosen theme for displaying state
            dispatch({ type: 'CHOOSE_THEME', payload: themes[nodeId] })
            // navigate to path /theme
            navigate(path);
        }
    };

    useEffect(() => {
        const fetchContent = () => {
            if (chosen) {
                fetch('/api/items/' + chosen)
                    .then(res => {
                        return res.json();
                    })
                    .then(j => {
                        const items = groupBy(j.description, "themes"); // group data by themes to group theme together
                        setData(getData(items, j.title)); // format the data as required format for graph data then set the state data 
                        setTitle(j.title) // set the title 
                    })
            }
        }

        const fetchThemes = () => {
            fetch('/api/themes')
                .then(res => res.json())
                .then(j => {
                    setThemes(getThemesId(j)) // set state themes as its key as title and id as value for quick reference
                })
        }

        fetchContent();
        fetchThemes();

    }, [chosen])

    return (
        <div style={{ background: "#AEE2FF" }}>
            <Graph id="graph-id"
                data={data}
                onClickNode={onClickNode}
                config={{
                    nodeHighlightBehavior: true,
                    highlightOpacity: 0.5,
                    automaticRearrangeAfterDropNode: true,
                    directed: true,
                    panAndZoom: true,
                    collapsible: false,
                    focusAnimationDuration: 0.75,
                    focusZoom: 0.5,
                    freezeAllDragEvents: false,
                    maxZoom: 8,
                    minZoom: 0.1,
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
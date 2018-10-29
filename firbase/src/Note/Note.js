import React, { Component } from 'react';
import "./Note.css"
import Proptypes from "prop-types"


class Note extends Component {
    constructor(props) {
        super(props)
        this.noteContent = props.noteContent
        this.noteId = props.noteId
        this.handleRemoveNote = this.handleRemoveNote.bind(this)
    }
    state = {
        noteContent: this.props.noteContent,
        noteId: this.props.noteId
    }

    handleRemoveNote(id) {
        this.props.removeNote(id)
    }
    render() {
        return (
            <div className="note fade-in">
                <p className="noteContent">{this.state.noteContent}</p>
                <button onClick={() => this.handleRemoveNote(this.noteId)}>completed</button>
            </div>
        );
    }

}
Note.Proptypes = {
    noteContent: Proptypes.string
}
export default Note;
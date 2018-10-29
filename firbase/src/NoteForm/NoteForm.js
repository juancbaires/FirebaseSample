import React, { Component } from 'react';
import "./NoteForm.css"
class NoteForm extends Component {
    state = {
        newNote: ""
    }
    handleInput = (e) => {
        this.setState({
            newNote: e.target.value
        })
    }
    writeNote = (e) => {
        e.preventDefault()
        this.props.addnote(this.state.newNote);
        this.setState({
            newNote: ' '
        })
    }
    render() {
        return (
            <div className="form">
                <form>
                    <input value={this.state.newNote} onChange={this.handleInput} type="text"></input>
                    <button onClick={this.writeNote}>Add Note</button>
                </form>
            </div>
        );
    }
}

export default NoteForm;
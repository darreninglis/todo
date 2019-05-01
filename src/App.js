import React, { Component } from "react";
import "./App.css";
import Note from "./components/note";

class App extends Component {
	state = {
		noteText: "",
		note: [],
	};

	updateNoteText = noteText => {
		this.setState({
			noteText: noteText.target.value,
		});
	};

	handleKeyPress = event => {
		if (event.key === "Enter") {
			let notesArray = this.state.note;
			notesArray.push(this.state.noteText);
			this.setState({
				noteText: "",
			});
		}
	};

	deleteNote = index => {
		let notesArray = this.state.note;
		notesArray.splice(index, 1);
		this.setState({
			note: notesArray,
		});
	};

	addNote = () => {
		if (this.state.noteText === "") {
			return;
		}

		let notesArray = this.state.note;
		notesArray.push(this.state.noteText);
		this.setState({
			noteText: "",
		});
		this.textInput.focus();
	};

	render() {
		let notes = this.state.note.map((val, key) => {
			return (
				<Note key={key} text={val} deleteMethod={() => this.deleteNote(key)} />
			);
		});

		return (
			<div className="container">
				<div className="header">React Todo List</div>
				{notes}
				<div className="btn" onClick={this.addNote}>
					+
				</div>
				<input
					type="text"
					ref={input => {
						this.textInput = input;
					}}
					className="textInput"
					value={this.state.noteText}
					onChange={noteText => this.updateNoteText(noteText)}
					onKeyPress={this.handleKeyPress}
					autoFocus
				/>
			</div>
		);
	}
}

export default App;

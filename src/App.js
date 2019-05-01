import React, { Component } from "react";
import "./App.css";
import Note from "./components/note";

class App extends Component {
	state = {
		noteText: "",
		note: [],
	};

	// OG above
	componentDidMount() {
		this.hydrateStateWithLocalStorage();

		// add event listener to save state to localStorage
		// when user leaves/refreshes the page
		window.addEventListener(
			"beforeunload",
			this.saveStateToLocalStorage.bind(this),
		);
	}

	componentWillUnmount() {
		window.removeEventListener(
			"beforeunload",
			this.saveStateToLocalStorage.bind(this),
		);

		// saves if component has a chance to unmount
		this.saveStateToLocalStorage();
	}

	hydrateStateWithLocalStorage() {
		// for all items in state
		for (let key in this.state) {
			// if the key exists in localStorage
			if (localStorage.hasOwnProperty(key)) {
				// get the key's value from localStorage
				let value = localStorage.getItem(key);

				// parse the localStorage string and setState
				try {
					value = JSON.parse(value);
					this.setState({ [key]: value });
				} catch (e) {
					// handle empty string
					this.setState({ [key]: value });
				}
			}
		}
	}

	saveStateToLocalStorage() {
		// for every item in React state
		for (let key in this.state) {
			// save to localStorage
			localStorage.setItem(key, JSON.stringify(this.state[key]));
		}
	}
	// OG below

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

import React, { Component } from "react";

class CompleteNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: JSON.parse(localStorage.getItem("data2"))
    };
  }

  pendNote = (e, id)  => {
    e.preventDefault();

    const noteToMove = this.state.notes.filter(note => note.id == id);
    localStorage.setItem("data", JSON.stringify(noteToMove));

    const arrToUpdate = this.state.notes.filter(note => note.id != id);
    localStorage.setItem("data2", JSON.stringify(arrToUpdate));

    this.setState({
      notes: arrToUpdate
    });
  };

  deleteNote = id => {
    const noteToRemove = this.state.notes.filter(note => note.id != id);

    this.setState({
      notes: noteToRemove
    });

    localStorage.setItem("data2", JSON.stringify(noteToRemove));
  };

  render() {
    if (this.state.notes.length > 0) {
      return (
        <ul>
          {this.state.notes.map((el, index) => {
            return (
              <li key={index}>
                <div className="pending__note__container">
                  <div className="pending">
                    <input type="text" defaultValue={el.title} id="titleNote" />
                    <input defaultValue={el.description} id="descriptionNote" />
                    <span>{el.date}</span>
                    <div className="pending__note_wrapper">
                      <button onClick={() => this.deleteNote(el.id)}>
                        Delete
                      </button>
                      <button onClick={e => this.pendNote(e, el.id)}>
                        Pending
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <div>
        <strong>No completes notes</strong>
      </div>
    );
  }
}

export { CompleteNote };

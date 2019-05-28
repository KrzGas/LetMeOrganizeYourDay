import React, { Component } from "react";

class PendingNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: JSON.parse(localStorage.getItem("data")),
      edit: false,
      readOnly: true
    };
  }

  editNote = (id) => {
    this.setState(prevState => {
      const arrId = this.state.notes.filter(note => note.id == id);
      // let update = JSON.parse(JSON.stringify(this.state.notes))
      // localStorage.setItem("data", JSON.stringify(this.state.notes))
      return {
        edit: !prevState.edit,
        readOnly: !prevState.readOnly
      };
    })
}

  deleteNote = id => {
    const arrToRemove = this.state.notes.filter(note => note.id != id);

    this.setState({
      notes: arrToRemove
    });

    localStorage.setItem("data", JSON.stringify(arrToRemove));
  };

  render() {
    //console.log(this.state.notes);
    return (
      <ul>
        {this.state.notes.map((el, index) => {
          return (
            <li key={index}>
              <div className="pending__note__container">
                <div className="pending">
                  <input type="text" defaultValue ={el.title} id="titleNote" readOnly={this.state.readOnly} />
                  <input defaultValue ={el.description} id="descriptionNote" readOnly={this.state.readOnly} />
                  <span>{el.date}</span>
                  <div className="pending__note_wrapper">
                    <button>Complete</button>
                    <button onClick={() => this.editNote(el.id)}>
                      {this.state.edit ? "Finish" : "Edit"}
                    </button>
                    <button onClick={() => this.deleteNote(el.id)}>
                      Delete
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
}

export { PendingNote };

import React, { useState, useEffect } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    fetch('/api/notes')
      .then(response => response.json())
      .then(data => setNotes(data));
  }, []);

  const handleAddNote = () => {
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })
      .then(response => response.json())
      .then(data => {
        setNotes([...notes, data]);
        setNewNote({ title: '', content: '' });
      });
  };

  const handleDeleteNote = (id) => {
    fetch(`/api/notes/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        setNotes(notes.filter(note => note.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <input
        type="text"
        placeholder="Title"
        value={newNote.title}
        onChange={e => setNewNote({ ...newNote, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={newNote.content}
        onChange={e => setNewNote({ ...newNote, content: e.target.value })}
      ></textarea>
      <button onClick={handleAddNote}>Add Note</button>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

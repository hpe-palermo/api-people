import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PersonForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [people, setPeople] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/people/');
      setPeople(response.data);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`http://127.0.0.1:8000/api/people/${currentId}/`, { name, age });
      setEditing(false);
      setCurrentId(null);
    } else {
      await axios.post('http://127.0.0.1:8000/api/people/', { name, age });
    }
    setName('');
    setAge('');
    fetchPeople();
  };

  const handleEdit = (person) => {
    setName(person.name);
    setAge(person.age);
    setEditing(true);
    setCurrentId(person.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/people/${id}/`);
    fetchPeople();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">{editing ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            {person.name} ({person.age})
            <button onClick={() => handleEdit(person)}>Edit</button>
            <button onClick={() => handleDelete(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonForm;

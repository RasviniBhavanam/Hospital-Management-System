import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Patients.css';
import PatientCard from './PatientCard';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '' });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    axios.get('http://localhost:5000/patients')
      .then(response => {
        console.log('Fetched patients:', response.data);
        setPatients(response.data);
      })
      .catch(error => console.error('Error fetching patients:', error));
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    console.log('Adding patient:', newPatient);
    
    axios.post('http://localhost:5000/patients/add', newPatient)
      .then(response => {
        console.log('Patient added:', response.data);
        setPatients([...patients, response.data]);
        setNewPatient({ name: '', age: '', gender: '' });
        alert('Patient added successfully!');
      })
      .catch(error => {
        console.error('Error adding patient:', error);
        alert('Error adding patient. Please try again.');
      });
  };

  const handleUpdatePatient = (id, e) => {
    e.preventDefault();
    console.log('Updating patient:', id, selectedPatient);
    
    axios.post(`http://localhost:5000/patients/update/${id}`, selectedPatient)
      .then(response => {
        console.log('Patient updated:', response.data);
        const updatePat = { ...selectedPatient, _id: id };
        setPatients(
          patients.map(patient => (patient._id === id ? updatePat : patient))
        );
        setSelectedPatient(null);
        setIsEditMode(false);
        alert('Patient updated successfully!');
      })
      .catch(error => {
        console.error('Error updating patient:', error);
        alert('Error updating patient. Please try again.');
      });
  };

  const handleDeletePatient = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      console.log('Deleting patient:', id);
      
      axios.delete(`http://localhost:5000/patients/delete/${id}`)
        .then(response => {
          console.log('Patient deleted:', response.data);
          setSelectedPatient(null);
          setPatients(patients.filter(patient => patient._id !== id));
          alert('Patient deleted successfully!');
        })
        .catch(error => {
          console.error('Error deleting patient:', error);
          alert('Error deleting patient. Please try again.');
        });
    }
  };

  const handleEditPatient = (patient) => {
    console.log('Editing patient:', patient);
    setSelectedPatient(patient);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setSelectedPatient(null);
    setIsEditMode(false);
  };

  return (
    <div className='patient-main'>
      <div className='form-sections'>
        <h4>{isEditMode ? 'Edit Patient' : 'Add New Patient'}</h4>
        <form
          onSubmit={
            isEditMode
              ? (e) => handleUpdatePatient(selectedPatient._id, e)
              : handleAddPatient
          }
        >
          <label>Name:</label>
          <input
            type="text"
            required
            value={isEditMode ? selectedPatient?.name || '' : newPatient.name}
            onChange={(e) =>
              isEditMode
                ? setSelectedPatient({ ...selectedPatient, name: e.target.value })
                : setNewPatient({ ...newPatient, name: e.target.value })
            }
          />

          <label>Age:</label>
          <input
            type="number"
            required
            min="0"
            max="150"
            value={isEditMode ? selectedPatient?.age || '' : newPatient.age}
            onChange={(e) =>
              isEditMode
                ? setSelectedPatient({ ...selectedPatient, age: e.target.value })
                : setNewPatient({ ...newPatient, age: e.target.value })
            }
          />

          <label>Gender:</label>
          <select
            required
            value={isEditMode ? selectedPatient?.gender || '' : newPatient.gender}
            onChange={(e) =>
              isEditMode
                ? setSelectedPatient({ ...selectedPatient, gender: e.target.value })
                : setNewPatient({ ...newPatient, gender: e.target.value })
            }
            style={{
              padding: '10px',
              marginBottom: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit">
            {isEditMode ? 'Update Patient' : 'Add Patient'}
          </button>
          
          {isEditMode && (
            <button 
              type="button" 
              onClick={handleCancelEdit}
              style={{ marginTop: '10px', backgroundColor: '#6c757d' }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className='patients-section'>
        <h3 style={{ textAlign: "center" }}>Patients ({patients.length})</h3>
        <div className="patient-list">
          {patients.length === 0 ? (
            <p style={{ color: '#999', marginTop: '20px', textAlign: 'center' }}>
              No patients yet. Add one to get started!
            </p>
          ) : (
            patients.map(patient => (
              <PatientCard
                key={patient._id}
                patient={patient}
                onEdit={handleEditPatient}
                onDelete={handleDeletePatient}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Patients;
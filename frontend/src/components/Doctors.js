import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from './DoctorCard';
import './Doctors.css';

const API_URL = 'http://localhost:5000';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '' });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Component mounted, fetching doctors...');
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching doctors from:', `${API_URL}/doctors`);
      
      const response = await axios.get(`${API_URL}/doctors`);
      console.log('Doctors fetched successfully:', response.data);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      console.error('Error details:', error.response?.data || error.message);
      setError('Failed to fetch doctors. Make sure backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    console.log('Add doctor button clicked');
    console.log('New doctor data:', newDoctor);

    if (!newDoctor.name || !newDoctor.specialty) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      console.log('Sending POST request to:', `${API_URL}/doctors/add`);
      
      const response = await axios.post(`${API_URL}/doctors/add`, newDoctor);
      console.log('Doctor added successfully:', response.data);
      
      setDoctors([...doctors, response.data]);
      setNewDoctor({ name: '', specialty: '' });
      alert('Doctor added successfully!');
    } catch (error) {
      console.error('Error adding doctor:', error);
      console.error('Error details:', error.response?.data || error.message);
      alert('Error adding doctor: ' + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDoctor = async (id, e) => {
    e.preventDefault();
    console.log('Update doctor button clicked');
    console.log('Updating doctor ID:', id);
    console.log('Updated data:', selectedDoctor);

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/doctors/update/${id}`, selectedDoctor);
      console.log('Doctor updated:', response.data);
      
      const updateDoc = { ...selectedDoctor, _id: id };
      setDoctors(doctors.map(doctor => (doctor._id === id ? updateDoc : doctor)));
      setSelectedDoctor(null);
      setIsEditMode(false);
      alert('Doctor updated successfully!');
    } catch (error) {
      console.error('Error updating doctor:', error);
      alert('Error updating doctor: ' + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDoctor = async (id) => {
    console.log('Delete doctor button clicked for ID:', id);
    
    if (!window.confirm('Are you sure you want to delete this doctor?')) {
      return;
    }

    try {
      setLoading(true);
      console.log('Sending DELETE request for doctor ID:', id);
      
      const response = await axios.delete(`${API_URL}/doctors/delete/${id}`);
      console.log('Doctor deleted:', response.data);
      
      setDoctors(doctors.filter(doctor => doctor._id !== id));
      alert('Doctor deleted successfully!');
    } catch (error) {
      console.error('Error deleting doctor:', error);
      alert('Error deleting doctor: ' + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEditDoctor = (doctor) => {
    console.log('Edit button clicked for doctor:', doctor);
    setSelectedDoctor(doctor);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setSelectedDoctor(null);
    setIsEditMode(false);
  };

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3 style={{ color: 'red' }}>Error</h3>
        <p>{error}</p>
        <button onClick={fetchDoctors}>Retry</button>
      </div>
    );
  }

  return (
    <div className='main-doc-container'>
      <div className='form-sections'>
        <h4>{isEditMode ? 'Edit Doctor' : 'Add New Doctor'}</h4>
        <form
          onSubmit={
            isEditMode
              ? (e) => handleUpdateDoctor(selectedDoctor._id, e)
              : handleAddDoctor
          }
        >
          <label>Name:</label>
          <input
            type="text"
            required
            value={isEditMode ? selectedDoctor?.name || '' : newDoctor.name}
            onChange={(e) => {
              console.log('Name input changed:', e.target.value);
              isEditMode
                ? setSelectedDoctor({ ...selectedDoctor, name: e.target.value })
                : setNewDoctor({ ...newDoctor, name: e.target.value });
            }}
          />

          <label>Specialty:</label>
          <input
            type="text"
            required
            value={isEditMode ? selectedDoctor?.specialty || '' : newDoctor.specialty}
            onChange={(e) => {
              console.log('Specialty input changed:', e.target.value);
              isEditMode
                ? setSelectedDoctor({ ...selectedDoctor, specialty: e.target.value })
                : setNewDoctor({ ...newDoctor, specialty: e.target.value });
            }}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : (isEditMode ? 'Update Doctor' : 'Add Doctor')}
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

      <div className='doctors-section'>
        <h3>Doctors ({doctors.length})</h3>
        {loading && <p>Loading...</p>}
        <div className="doctor-list">
          {doctors.length === 0 ? (
            <p style={{ color: '#999', marginTop: '20px' }}>
              No doctors yet. Add one to get started!
            </p>
          ) : (
            doctors.map(doctor => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
                onEdit={handleEditDoctor}
                onDelete={handleDeleteDoctor}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
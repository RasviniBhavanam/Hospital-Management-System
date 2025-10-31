import React from 'react';

const PatientCard = ({ patient, onEdit, onDelete }) => {
  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Edit button clicked for:', patient);
    onEdit(patient);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Delete button clicked for:', patient._id);
    onDelete(patient._id);
  };

  return (
    <div className="patient-card">
      <h4>{patient.name}</h4>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <div className='btn-container' style={{ width: "100%" }}>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default PatientCard;
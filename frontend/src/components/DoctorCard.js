import React from 'react';

const DoctorCard = ({ doctor, onEdit, onDelete }) => {
  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Edit button clicked for:', doctor);
    onEdit(doctor);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Delete button clicked for:', doctor._id);
    onDelete(doctor._id);
  };

  return (
    <div className="doctor-card">
      <p>
        <strong>{doctor.name}</strong> - {doctor.specialty}
      </p>
      <div className='btn-container'>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DoctorCard;
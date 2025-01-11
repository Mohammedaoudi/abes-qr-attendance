/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import './ListAbsences.css'; // Import the CSS file for additional styling

const ListAbsences = () => {
  const [selectedElement, setSelectedElement] = useState(null);

  const elements = [
    { id: 1, title: 'Python', text: 'Professeur: Chafik Baidada', titles: ['Title 1', 'Title 2', 'Title 3'] },
    { id: 2, title: 'LC', text: 'Professeur: lahyyalh', titles: ['Title 4', 'Title 5', 'Title 6'] },
    { id: 3, title: 'Systeme information', text: 'Professeur: Chafik Baidada', titles: ['Title 7', 'Title 8', 'Title 9'] },
    { id: 4, title: 'Reseaux', text: 'Professeur: Aqqal', titles: ['Title 1', 'Title 2', 'Title 3'] },
    { id: 5, title: 'BDD', text: 'Professeur: Hanin', titles: ['Title 4', 'Title 5', 'Title 6'] },
    { id: 6, title: 'Linux', text: 'Professeur: salmam', titles: ['Title 7', 'Title 8', 'Title 9'] },
    // Add more elements as needed
  ];

  const handleCardClick = (element) => {
    setSelectedElement(element);
  };

  const handleDownloadClick = (title) => {
    // Simulate the download functionality
    alert(`Downloading PDF for ${title}`);
  };

  return (
    <div className="container mt-5">
        <h2> ....</h2>
      <div className="row">
        {elements.map(element => (
          <div className="col-md-4 mb-4" key={element.id}>
            <div className="card h-100 custom-card" onClick={() => handleCardClick(element)}>
              <div className="card-body">
                <h5 className="card-title">{element.title}</h5>
                <p className="card-text">{element.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedElement && (
        <div className="mt-4">
          <h3>les seances de :  {selectedElement.title}</h3>
          <ul className="list-group">
            {selectedElement.titles.map((title, index) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                {title}
                <FontAwesomeIcon 
                  icon={faDownload} 
                  className="download-icon" 
                  onClick={() => handleDownloadClick(title)} 
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ListAbsences;

import React, { useEffect, useState } from 'react';
import { uploadImage, uploadImageToCloudinary } from '../../../services/uploadImage.service';
import { CheatingModal } from './CheatingModal';
import { get } from 'http';
import { getCheatingIncidents } from '../../../services/cheating-record';
import { CircularLoading } from '../../../App';
import { useAuth } from '../../../context/AuthContext';
// import { uploadImageToCloudinary } from '../../../services/auth.service';

// Define the TypeScript interface for the cheating incident
interface CheatingIncident {
  student: { name: string };
  title: string;
  description: string;
  proof: string; // This could be a URL or a file path
  caughtBy?: { name: string };
}

// Mock data for cheating incidents
const mockCheatingIncidents: CheatingIncident[] = [
  {
    student: { name: 'John Doe' },
    title: 'Using Mobile Phone',
    description: 'Student was caught using a mobile phone to access answers.',
    proof: 'https://via.placeholder.com/300', // Placeholder image URL
    caughtBy: { name: 'Prof. Smith' },
  },
  {
    student: { name: 'Jane Smith' },
    title: 'Cheat Sheet',
    description: 'Student was found with a handwritten cheat sheet.',
    proof: 'https://via.placeholder.com/300', // Placeholder image URL
    caughtBy: { name: 'Dr. Brown' },
  },
  {
    student: { name: 'Alice Johnson' },
    title: 'Talking to Another Student',
    description: 'Student was caught discussing answers with another student.',
    proof: 'https://via.placeholder.com/300', // Placeholder image URL
    caughtBy: { name: 'Mr. White' },
  },
];


// React component to display the list of cheating incidents in a card layout
const CheatingIncidentsList: React.FC = () => {

  const { loading, setLoading } = useAuth();
  const [incidents, setIncidents] = useState<CheatingIncident[]>(mockCheatingIncidents);
  const [isFaculty, setIsFaculty] = useState<boolean>(false);

  useEffect(() => {
    const path = window.location.pathname;
    setIsFaculty(path.includes('faculty'));
  }, []);

  const fetchCheatingIncidents = async () => {
    // setLoading(true);
    try {

      const response = await getCheatingIncidents();
      setIncidents(response);
    } catch (error) {
      console.error('Failed to fetch cheating incidents', error);
    }
    // setLoading(false);

  }

  useEffect(() => {
    fetchCheatingIncidents();
  }, []);


  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {
        loading && <CircularLoading />
      }
      {
        isFaculty && <CheatingModal />
      }

      {/* List of cheating incidents */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {incidents && Array.isArray(incidents) ? incidents.map((incident, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
            }}
          >
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <img
                src={incident.proof}
                alt="Proof" 
                style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <div>
                <h3 style={{ margin: '0', fontSize: '18px', color: '#333' }}>{incident.title}</h3>
                <p style={{ margin: '4px 0', fontSize: '14px', color: '#666' }}>
                  <strong>Student:</strong> {incident?.student?.name}
                </p>
                {/* <p style={{ margin: '4px 0', fontSize: '14px', color: '#666' }}>
                  <strong>Caught By:</strong> {incident.caughtBy?.name}
                </p> */}
                <p style={{ margin: '4px 0', fontSize: '14px', color: '#666' }}>
                  {incident.description}
                </p>
              </div>
            </div>
          </div>
        )) : (
          <p>No cheating incidents found.</p>
        )}
      </div>
    </div>
  );
};

export default CheatingIncidentsList;
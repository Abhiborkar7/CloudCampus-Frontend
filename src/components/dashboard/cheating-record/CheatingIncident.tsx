import React, { useState } from 'react';
import { uploadImageToCloudinary } from '../../../services/uploadImage.service';
import { CheatingModal } from './CheatingModal';
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
  const [showPopup, setShowPopup] = useState(false);
  const [incidents, setIncidents] = useState<CheatingIncident[]>(mockCheatingIncidents);

  // Form state
  const [studentName, setStudentName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [proof, setProof] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle image upload
  const handleContinueToUpload = async () => {
    console.log('Selected File:', selectedFile);
    setIsUploading(true);
    if (selectedFile) {
      try {
        const response = await uploadImageToCloudinary(selectedFile);
        console.log('Response:', response);
        // setImageFile()
        setProof(response.secure_url);
      } catch (error) {
        console.error('Failed to extract text from image', error);
      }
    }
    setIsUploading(false);
  };



  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!proof) {
      alert('Please upload an image first.');
      return;
    }

    // Create a new cheating incident
    const newIncident: CheatingIncident = {
      student: { name: studentName },
      title,
      description,
      proof,
    };
    console.log(newIncident)

    // Add the new incident to the list
    setIncidents([...incidents, newIncident]);

    // Reset form fields
    setStudentName('');
    setTitle('');
    setDescription('');
    setProof('');
    setSelectedFile(null);

    // Close the popup
    setShowPopup(false);
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Cheating Incidents Report</h1>
      </div>


      <CheatingModal />

      {/* List of cheating incidents */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {incidents.map((incident, index) => (
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
                  <strong>Student:</strong> {incident.student.name}
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px', color: '#666' }}>
                  <strong>Caught By:</strong> {incident.caughtBy?.name}
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px', color: '#666' }}>
                  {incident.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheatingIncidentsList;
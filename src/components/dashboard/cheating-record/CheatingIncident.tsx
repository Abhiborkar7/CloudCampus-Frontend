import React, { useEffect, useState } from "react";
import { CheatingModal } from "./CheatingModal";
import { getCheatingIncidents } from "../../../services/cheating-record";
import { CircularLoading } from "../../../App";
import { useAuth } from "../../../context/AuthContext";

interface CheatingIncident {
  student: { name: string };
  title: string;
  description: string;
  proof: string; // URL or file path
  caughtBy?: { name: string };
}

const CheatingIncidentsList: React.FC = () => {
  const { loading } = useAuth();
  const [incidents, setIncidents] = useState<CheatingIncident[]>([]);
  const [isFaculty, setIsFaculty] = useState(false);

  useEffect(() => {
    setIsFaculty(window.location.pathname.includes("faculty"));
  }, []);

  const fetchCheatingIncidents = async () => {
    try {
      const response = await getCheatingIncidents();
      if (response && Array.isArray(response)) {
        setIncidents(response);
      } else {
        setIncidents([]);
      }
    } catch (error) {
      console.error("Failed to fetch cheating incidents", error);
      setIncidents([]);
    }
  };

  useEffect(() => {
    fetchCheatingIncidents();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {loading && <CircularLoading />}
      {isFaculty && <CheatingModal />}

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {incidents.length > 0 ? (
          incidents.map((incident, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                <img
                  src={incident.proof}
                  alt="Proof"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <h3
                    style={{
                      margin: "0",
                      fontSize: "18px",
                      color: "#333",
                    }}
                  >
                    {incident.title}
                  </h3>
                  <p
                    style={{
                      margin: "4px 0",
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    <strong>Student:</strong> {incident?.student?.name}
                  </p>
                  <p
                    style={{
                      margin: "4px 0",
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    {incident.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>
            No cheating records yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default CheatingIncidentsList;

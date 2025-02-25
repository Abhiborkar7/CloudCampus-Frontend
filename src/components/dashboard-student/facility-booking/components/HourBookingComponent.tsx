import { useState } from "react";

const highlightedSlots = [
  "10:00 AM - 11:00 AM",
  "02:00 PM - 03:00 PM",
  "08:00 PM - 09:00 PM"
];

const TimeTable: React.FC<{ timeSlots: string[] }> = ({ timeSlots }) => {
  const [bookNewSlot, setBookNewSlot] = useState<string[]>([]);

  const handleSlotClick = (slot: string) => {
    if (highlightedSlots.includes(slot)) {
      return; // Do nothing for already booked slots
    }
    
    setBookNewSlot(prev => 
      prev.includes(slot) 
        ? prev.filter(s => s !== slot) // Remove slot if already selected
        : [...prev, slot] // Add slot if not selected
    );
  };

  return (
    <div style={{ width: "300px", border: "1px solid white" }}>
      {timeSlots.map((slot, i) => (
        <div
          key={i}
          style={{
            padding: "1px",
            margin: "2px 0",
            cursor: highlightedSlots.includes(slot) ? "not-allowed" : "pointer",
            backgroundColor: highlightedSlots.includes(slot) 
              ? "red" 
              : bookNewSlot.includes(slot) 
                ? "green" 
                : "black",
            color: "white",
            textAlign: "center",
          }}
          onClick={() => handleSlotClick(slot)}
        >
          {slot}
        </div>
      ))}
    </div>
  );
};

const timeSlots = [
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 01:00 PM",
  "01:00 PM - 02:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
  "05:00 PM - 06:00 PM",
  "07:00 PM - 08:00 PM",
  "08:00 PM - 09:00 PM",
  "09:00 PM - 10:00 PM",
  "10:00 PM - 11:00 PM",
  "11:00 PM - 12:00 AM",
  "12:00 AM - 01:00 AM",
];

export default function HourBookingComponent() {
  return (
    <div style={{ padding: "20px", paddingLeft: "10rem" }}>
      <h2 style={{ color: "white" }}>Time Slots</h2>
      <TimeTable timeSlots={timeSlots} />
    </div>
  );
}
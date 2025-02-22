import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ selectedDate, onChange }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginBottom: "10px" }}>
      <label style={{ fontWeight: "bold", marginBottom: "5px" }}>Select Date:</label>
      <div style={{ padding: "0px", border: "1px solid #ccc", borderRadius: "4px" }}>
        <DatePicker
          selected={selectedDate}
          onChange={onChange}
          dateFormat="dd/MM/yyyy"
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;

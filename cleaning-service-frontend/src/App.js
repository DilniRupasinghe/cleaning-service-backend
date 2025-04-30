import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";


export default function App() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    address: "",
    dateTime: "",
    serviceId: "",
    userId: "user123",
  });
  const [editingId, setEditingId] = useState(null);

  const getBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/bookings/user/${form.userId}`
      );
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/bookings/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:8080/bookings", form);
      }
      setForm({
        customerName: "",
        address: "",
        dateTime: "",
        serviceId: "",
        userId: form.userId,
      });
      getBookings();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleEdit = (booking) => {
    setForm(booking);
    setEditingId(booking.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/bookings/${id}`);
      getBookings();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Cleaning Service Booking</h1>
  
      <form onSubmit={handleSubmit} className="form-container">
        <input name="customerName" placeholder="Customer Name" value={form.customerName} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input name="dateTime" type="datetime-local" value={form.dateTime} onChange={handleChange} required />
        <select name="serviceId" value={form.serviceId} onChange={handleChange} required>
          <option value="">Select Service</option>
          <option value="deep-cleaning">Deep Cleaning</option>
          <option value="carpet-cleaning">Carpet Cleaning</option>
          <option value="window-cleaning">Window Cleaning</option>
        </select>
        <button type="submit" className="submit-btn">
          {editingId ? "Update Booking" : "Book Service"}
        </button>
      </form>
  
      <div className="booking-list">
        <h2>Your Bookings</h2>
        {bookings.map((b) => (
          <div key={b.id} className="booking-card">
            <div>
              <p><strong>Name:</strong> {b.customerName}</p>
              <p><strong>Address:</strong> {b.address}</p>
              <p><strong>Date/Time:</strong> {b.dateTime}</p>
              <p><strong>Service:</strong> {b.serviceId}</p>
            </div>
            <div className="booking-actions">
              <button onClick={() => handleEdit(b)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(b.id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  

  
 
}

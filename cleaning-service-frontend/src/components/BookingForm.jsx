import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    address: "",
    dateTime: "",
    serviceId: "",
    userId: "user123" // mock user
  });
  const [editingId, setEditingId] = useState(null);

  const getBookings = async () => {
    const res = await axios.get(`http://localhost:8080/bookings/user/${form.userId}`);
    setBookings(res.data);
  };

  useEffect(() => {
    getBookings();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:8080/bookings/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post("http://localhost:8080/bookings", form);
    }
    setForm({ customerName: "", address: "", dateTime: "", serviceId: "", userId: form.userId });
    getBookings();
  };

  const handleEdit = (booking) => {
    setForm(booking);
    setEditingId(booking.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/bookings/${id}`);
    getBookings();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Cleaning Service Booking</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md max-w-md mx-auto">
        <input name="customerName" placeholder="Customer Name" value={form.customerName} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
        <input name="dateTime" type="datetime-local" value={form.dateTime} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
        <select name="serviceId" value={form.serviceId} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required>
          <option value="">Select Service</option>
          <option value="deep-cleaning">Deep Cleaning</option>
          <option value="carpet-cleaning">Carpet Cleaning</option>
          <option value="window-cleaning">Window Cleaning</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {editingId ? "Update Booking" : "Book Service"}
        </button>
      </form>

      <div className="mt-8 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <p><strong>Name:</strong> {b.customerName}</p>
                <p><strong>Address:</strong> {b.address}</p>
                <p><strong>Date/Time:</strong> {b.dateTime}</p>
                <p><strong>Service:</strong> {b.serviceId}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleEdit(b)} className="px-4 py-1 bg-yellow-500 text-white rounded">Edit</button>
                <button onClick={() => handleDelete(b.id)} className="px-4 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

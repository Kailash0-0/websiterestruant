const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/tablebooking', { useNewUrlParser: true, useUnifiedTopology: true });

const tableSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  available: Boolean
});

const customerSchema = new mongoose.Schema({
  // Define your customer schema here
  name: String,
  email: String
});

const bookingSchema = new mongoose.Schema({
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  date: Date,
  time: String,
  status: String
});

const Table = mongoose.model('Table', tableSchema);
const Customer = mongoose.model('Customer', customerSchema);
const Booking = mongoose.model('Booking', bookingSchema);

app.use(express.json());

app.get('/tables', async (req, res) => {
  const tables = await Table.find({ available: true });
  res.send(tables);
});

app.post('/bookings', async (req, res) => {
  const { tableId, customerId, date, time } = req.body;
  const table = await Table.findById(tableId);
  if (!table || !table.available) {
    return res.status(400).send({ error: 'Table not available' });
  }
  const customer = await Customer.findById(customerId);
  if (!customer) {
    return res.status(400).send({ error: 'Customer not found' });
  }
  const booking = new Booking({
    tableId,
    customerId,
    date,
    time,
    status: 'pending'
  });
  await booking.save();
  // Send notification to customer and restaurant staff
  await sendNotification(customer, booking);
  res.send({ message: 'Booking created successfully' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('input[name="name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const date = document.querySelector('input[name="date"]').value;
  const time = document.querySelector('input[name="time"]').value;
  const people = document.querySelector('input[name="people"]').value;

  if (!name || !email || !date || !time || !people) {
    alert('Please fill in all the fields');
    return;
  }

  // Submit the form
  form.submit();
});

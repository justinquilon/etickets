import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'events',
    default: null,
  },
  eventName: {
    type: String,
    required: true,
    default: 'test event name',
  },
  eventDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 100,
  },
  venue: {
    type: String,
    required: true,
    default: 'test venue',
  },
  seat: {
    type: String,
    required: true,
    default: 'test seat',
  },
});

const Ticket = model('tickets', ticketSchema);
export default Ticket;

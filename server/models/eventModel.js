import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    eventAbout: {
        type: String,
        required: false
    },
    venue: {
        type: String,
        required: true
    },
    imageUrl : {
        type: String,
        required: false
    },
    eventDate: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    seats: {
        type: Array,
        required: true
    }
});

const Event = model('events', eventSchema);
export default Event;
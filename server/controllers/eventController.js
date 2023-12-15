import Event from '../models/eventModel.js';
import User from '../models/userModel.js';

const getEvent = async (req, res) => {
  let { offset, limit } = req.query;

  if (!offset) {
    offset = '0';
  }

  if (!limit) {
    limit = '10';
  }

  try {
    const events = await Event.find().skip(Number(offset)).limit(Number(limit));

    res.status(200).send({
      message: 'Get an Event',
      data: events,
    });
  } catch (error) {
    console.error(error);
    res.send({ message: error.message });
  }
};

const getEventDetails = async (req, res) => {
    const { eventId } = req.params;

    try {
        const event = await Event.findOne({ _id: eventId });

        if (event) {
            res.status(200).send({
                message: "Event found",
                data: event
            });
        } else {
            res.status(400).send({message: "Event not found"});
        }
    } catch (error) {
        console.error(error);
        res.send({ message: error.message})
    }
}

const addEvent = async (req, res) => {
  let {
    userId,
    eventName,
    eventAbout,
    venue,
    imageUrl,
    eventDate,
    price,
    seats,
  } = req.body;
  const setDate = new Date(eventDate);
  const eventBody = {
    eventName: eventName,
    eventAbout: eventAbout,
    venue: venue,
    imageUrl: imageUrl,
    eventDate: setDate,
    price: price,
    seats: seats,
  };
  if (userId) {
    const getUser = await User.findOne({ _id: userId });
    const isAdmin = getUser.admin;
    if (isAdmin) {
      const newDocument = new Event(eventBody);
      await newDocument.save();
      res.status(200).send({ message: 'Event sent' });
    } else {
      res.status(400).send({ message: 'User is not admin' });
    }
  } else {
    res.status(400).send({ message: 'Missing UserID' });
  }
};

const deleteEvent = async (request, response) => {
  const { eventId } = request.params;

  try {
    // Delete the event from the Event collection
    const deletedEvent = await Event.deleteOne({ _id: eventId });

    if (deletedEvent.deletedCount === 0) {
      return response.status(404).send({
        message: 'Event not found',
      });
    }

    response.status(200).send({
      message: 'Event deleted successfully',
      deletedEvent,
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({
      error: 'operation_failed',
      message: error.message,
    });
  }
};

const updateEvent = async (req, res) => {
  let { eventId } = req.params;
  let {
    userId,
    eventName,
    eventAbout,
    venue,
    imageUrl,
    eventDate,
    price,
    seats,
  } = req.body;
  const setDate = new Date(eventDate);

  if (userId) {
    const getUser = await User.findOne({ _id: userId });
    const isAdmin = getUser.admin;
    if (isAdmin) {
      const updatedEvent = await Event.updateOne(
        { _id: eventId },
        {
          eventName,
          eventAbout,
          venue,
          imageUrl,
          eventDate: setDate,
          price,
          seats,
        },
        { new: true }
      );

      res.status(200).send({ message: 'Event updated' });
    } else {
      res.status(400).send({ message: 'User is not admin' });
    }
  } else {
    res.status(400).send({ message: 'Missing UserID' });
  }
};

const filterByName = async (req,res) => {
    const { name } = req.params;
    try {
        if (name) {
            const events = await Event.find({ eventName: { $regex: name, $options: 'i' } });
            res.status(200).send({
                message: "Events found",
                data: events
            });
        } else {
            res.status(400).send({ message: 'Invalid input' });
        }
    } catch (error) {
    console.error(error);
    response.status(400).send({
      error: 'operation_failed',
      message: error.message,
    }); 
    }
}

const filterByDate = async (req,res) => {
    const { date } = req.params;
    const exactDate = new Date(date);
    const nextDay = new Date(exactDate);
    nextDay.setDate(exactDate.getDate() + 1); // Get the next day
    try {
        // Use Mongoose to find documents with the same day
        const events = await Event.find({
        eventDate: {
            $gte: exactDate,
            $lt: nextDay,
        },
        });
        // Respond with the found users
        res.status(200).send({
            message: "Events found",
            data: events
        });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const filterByDateRange = async (req,res) => {
    const { dateStart, dateEnd } = req.params;
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);
    try {
        // Use Mongoose to find documents with the same day
        const events = await Event.find({
        eventDate: {
            $gte: startDate,
            $lte: endDate,
        },
        });
        // Respond with the found users
        res.status(200).send({
            message: "Events found",
            data: events
        });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
export { getEvent, addEvent, deleteEvent, updateEvent, getEventDetails, filterByName, filterByDate, filterByDateRange };

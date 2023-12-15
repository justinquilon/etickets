import Event from '../models/eventModel.js';
import Account from '../models/accountModel.js';
import Ticket from '../models/ticketModel.js';

//Create ticket
export const createTicket = async (request, response) => {
  try {
    const { eventId, seat, accountId } = request.body;

    const query = {
      _id: eventId,
      seats: {
        $elemMatch: {
          location: seat, // Specify the seat location
          count: { $gt: 0 }, // Ensure the count is greater than 0
        },
      },
    };

    // Find and update the event in the database
    const updatedEvent = await Event.findOneAndUpdate(
      query,
      { $inc: { 'seats.$.count': -1 } },
      { new: true } // Return the modified document
    );

    if (!updatedEvent) {
      return response.status(404).send({
        message: 'Event not found or seat not available.',
      });
    }

    // Now you can use the updated event data
    const updatedPrice = updatedEvent.seats.find(
      (s) => s.location === seat
    ).price;

    // Create a new ticket using the updated data
    const newTicket = new Ticket({
      eventId: eventId,
      eventName: updatedEvent.eventName,
      eventDate: updatedEvent.eventDate,
      venue: updatedEvent.venue,
      price: updatedPrice,
      seat: seat,
    });

    // Save the new ticket
    await newTicket.save();

    // Find and update the account to add the new ticketId to the tickets array
    const updatedAccount = await Account.findOneAndUpdate(
      { _id: accountId, load: { $gt: 0 } },
      {
        $inc: { load: -updatedPrice },
        $push: { tickets: newTicket._id }, // Assuming tickets is the name of the array field
      },
      { new: true }
    );

    if (!updatedAccount) {
      return response.status(404).send({
        message: 'Account not found or has 0 load',
      });
    }

    response.status(201).send({
      message: 'Ticket created',
      data: newTicket,
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({
      error: 'operation_failed',
      message: error.message,
    });
  }
};

export const getTickets = async (request, response) => {
  const { accountId } = request.params;

  const accountData = await Account.findOne({ _id: accountId });

  if (!accountData) {
    return response.status(404).send({
      message: 'Account not found',
    });
  }

  const tickets = await Ticket.find({
    _id: { $in: accountData.tickets },
  });

  response.status(200).send({
    message: 'All tickets',
    data: tickets,
  });
};

export const deleteTicket = async (request, response) => {
  const { ticketId } = request.params;
  const { accountId } = request.body;

  try {
    // Remove ticketId from the tickets array in the Account collection
    const updatedAccount = await Account.findOneAndUpdate(
      { _id: accountId },
      { $pull: { tickets: ticketId } },
      { new: true }
    );

    if (!updatedAccount) {
      return response.status(404).send({
        message: 'Account not found',
      });
    }

    // Delete the ticket from the Ticket collection
    const deletedTicket = await Ticket.deleteOne({ _id: ticketId });

    if (deletedTicket.deletedCount === 0) {
      return response.status(404).send({
        message: 'Ticket not found',
      });
    }

    response.status(200).send({
      message: 'Ticket deleted successfully',
      deletedTicket,
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({
      error: 'operation_failed',
      message: error.message,
    });
  }
};

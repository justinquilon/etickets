import Account from '../models/accountModel.js';

//Accepts the _id of the account as filter
const getLoad = async (req, res) => {
  try {
    const { accountId } = req.params;
    const userAccount = await Account.findOne({ _id: accountId });
    res.status(200).send({
      message: 'Load Balance',
      data: userAccount.load,
    });
  } catch (error) {
    console.error(error);
    res.send({ message: error.message });
  }
};

//Accepts _id and addLoad in payload
const addLoad = async (req, res) => {
  try {
    const { id } = req.body;
    const { addLoad } = req.body;
    const addToLoad = await Account.findOneAndUpdate(
      { _id: id },
      { $inc: { load: addLoad } }
    );
    const userAccount = await Account.findOne({ _id: id });
    res.status(200).send({
      message: 'success',
      data: userAccount.load,
    });
  } catch (error) {
    console.error(error);
    res.send({ message: error.message });
  }
};

export { getLoad, addLoad };

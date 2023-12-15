import { useState, createContext } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [accountId, setAccountId] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [eventArray, setEventArray] = useState([]);
  const [load, setLoad] = useState('0');
  const settings = {
    userId,
    setUserId,
    userName,
    setUserName,
    accountId,
    setAccountId,
    isAdmin,
    setIsAdmin,
    eventArray,
    setEventArray,
    load,
    setLoad,
  };
  return (
    <UserContext.Provider value={settings}>{children}</UserContext.Provider>
  );
};

export default UserProvider;

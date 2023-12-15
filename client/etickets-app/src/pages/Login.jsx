import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import { toast } from 'react-toastify';
import { Fade } from 'react-awesome-reveal';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let eMessage = '';
  const {
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
  } = useContext(UserContext);

  const navigate = useNavigate();

  const setEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const setPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const setErrorMessageHandler = (str) => {
    setErrorMessage(str);
  };

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email === '' || password === '') {
        eMessage = 'Please fill-up all fields';
        setErrorMessageHandler(eMessage);
      } else {
        eMessage = '';
        setErrorMessage(eMessage);
        setEmail('');
        setPassword('');

        const data = await fetch(`http://localhost:8080/api/v1/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const response = await data.json();

        if (response.data) {
          await setUserId(response.data._id);
          await setAccountId(response.data.accountId);
          await setIsAdmin(response.data.admin);
          await setUserName(response.data.name);
          toast.success(`Login successful, welcome ${response.data.name}!`);
          navigate('/');
        } else {
          toast.error('User not found or login failed');
          navigate('/login');
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fade>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleLoginFormSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In Eticket Service</h3>
            <div className="text-center">
              Not registered yet? <Link to="/register">{'Sign Up'}</Link>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={setEmailHandler}
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={setPasswordHandler}
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleLoginFormSubmit}
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    </Fade>
  );
};
export default Login;

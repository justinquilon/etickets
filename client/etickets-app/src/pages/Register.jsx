import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Fade } from 'react-awesome-reveal';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const { userId, setUserId } = useContext(UserContext);
  let eMessage = '';

  const navigate = useNavigate();

  const setNameHandler = (event) => {
    setName(event.target.value);
  };

  const setEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const setPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const setErrorMessageHandler = (str) => {
    setErrorMessage(str);
  };

  const checkPassword = async (event) => {
    event.preventDefault();
    try {
      if (name === '' || email === '' || password === '') {
        eMessage = 'Please fill-up all fields';
        setErrorMessageHandler(eMessage);
      } else {
        eMessage = '';
        setErrorMessage(eMessage);
        setEmail('');
        setPassword('');
        setName('');

        const data = await fetch(
          `http://localhost:8080/api/v1/users/register`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
            }),
          }
        );

        const response = await data.json();

        if (response.data) {
          toast.success(
            `Registration successful, welcome ${response.data.name}!`
          );
          navigate('/login');
        } else {
          toast.error(`Email already registered`);
          navigate('/register');
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fade>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={checkPassword}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In Eticket Service</h3>
            <div className="text-center">
              Already registered? <Link to="/login"> Sign In</Link>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={setNameHandler}
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                className="form-control mt-1"
                placeholder="Email Address"
                onChange={setEmailHandler}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                className="form-control mt-1"
                placeholder="Password"
                onChange={setPasswordHandler}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <p style={{ color: 'red' }}>{errorMessage ?? ''}</p>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fade>
  );
};
export default Register;

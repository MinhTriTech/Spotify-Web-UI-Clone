import { useState } from 'react';
import { AlertCircleIcon } from '../../components/Icons';
import { isValidEmail } from '../../utils/common';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [registerErrors, setRegisterErrors] = useState({
      username: false,
      email: false,
      password: false,
      confirmPassword: false,

      usernameErrorMessage: "",
      emailErrorMessage: "",
      passwordErrorMessage: "",
      confirmPasswordErrorMessage: "",
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Nhập input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
      setRegisterErrors(prev => ({ ...prev, username: false}));
    }
    if (name === 'email') {
      setEmail(value);
      setRegisterErrors(prev => ({ ...prev, email: false}));
    }
    if (name === 'password') {
      setPassword(value);
      setRegisterErrors(prev => ({ ...prev, password: false}));
    }
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
      setRegisterErrors( prev => ({ ...prev, confirmPassword: false}));
    }
  };

  // Đăng ký
  const handleRegisterForm = async (e) => {
    e.preventDefault();
    
    let isValid = true;
    let errors = {
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
       
      usernameErrorMessage: "",
      emailErrorMessage: "",
      passwordErrorMessage: "",
      confirmPasswordErrorMessage: "",
    };

    if (username.trim() === '') {
      errors.username = true;
      errors.usernameErrorMessage = "Vui lòng nhập tên đăng nhập";
      isValid = false;
    }

    if (email.trim() === '') {
      errors.email = true;
      errors.emailErrorMessage = "Vui lòng nhập email";
      isValid = false;
    } else if (!isValidEmail(email)) {
      errors.email = true;
      errors.emailErrorMessage = "Email không hợp lệ";
      isValid = false;
    }

    if (password.trim() === '') {
      errors.password = true;
      errors.passwordErrorMessage = "Vui lòng nhập mật khẩu";
      isValid = false;
    }

    if (confirmPassword.trim() === '') {
      errors.confirmPassword = true;
      errors.confirmPasswordErrorMessage = "Vui lòng nhập lại mật khẩu";
      isValid = false;
    }

    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = true;
      errors.confirmPasswordErrorMessage = "Mật khẩu không khớp";
      isValid = false;
    }

    setRegisterErrors(errors);
    if (!isValid) return;

    let rs = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });
  };

  return (
    <form onSubmit={handleRegisterForm} className="form">
        <div className="inputGroup">
            <label htmlFor="username">Tên đăng nhập:</label>
            <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
            autoComplete="off"
            className={registerErrors.username ? "input error" : "input success"}
            />
            {
            registerErrors.username && 
            <div className="errorMessageLabel">
              <AlertCircleIcon />
              <span className="error">{registerErrors.usernameErrorMessage}</span>
            </div>
            }
        </div>
        <div className="inputGroup">
            <label htmlFor="email">Email:</label>
            <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            autoComplete="off"
            className={registerErrors.email ? "input error" : "input success"}
            />
            {
            registerErrors.email && 
            <div className="errorMessageLabel">
              <AlertCircleIcon />
              <span className="error">{registerErrors.emailErrorMessage}</span>
            </div>
            }
        </div>
        <div className="inputGroup">
            <label htmlFor="password">Mật khẩu:</label>
            <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            autoComplete="off"
            className={registerErrors.password ? "input error" : "input success"}
            />
            {
            registerErrors.password && 
            <div className="errorMessageLabel">
              <AlertCircleIcon />
              <span className="error">{registerErrors.passwordErrorMessage}</span>
            </div>
            }
        </div>
        <div className="inputGroup">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
            <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            autoComplete="off"
            className={registerErrors.confirmPassword ? "input error" : "input success"}
            />
            {
            registerErrors.confirmPassword && 
            <div className="errorMessageLabel">
              <AlertCircleIcon />
              <span className="error">{registerErrors.confirmPasswordErrorMessage}</span>
            </div>
            }
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit" className="submitButton">Đăng ký</button>
    </form>
  );
}

export default RegisterForm;
import { useState } from 'react';
import { AlertCircleIcon } from '../../components/Icons';
import { useNavigate } from 'react-router-dom';
import { login } from "../../services/auth.service";
import { useAuth } from '../../context/AuthContext';

function LoginForm() {
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginErrors, setLoginErrors] = useState({
      username: false,
      password: false,

      usernameErrorMessage: "",
      passwordErrorMessage: ""
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Nhập input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
      setLoginErrors(prev => ({ ...prev, username: false }));
    }
    if (name === 'password') {
      setPassword(value);
      setLoginErrors(prev => ({ ...prev, password: false}));
    }
  };

  // Đăng nhập
  const handleLoginForm = async (e) => {
    e.preventDefault();

    let isValid = true;
    let errors = {
        username: false,
        password: false,

        usernameErrorMessage: "",
        passwordErrorMessage: ""
    };

    if (username.trim() === '') {
      errors.username = true;
      errors.usernameErrorMessage = "Vui lòng nhập tên đăng nhập";
      isValid = false;  
    }

    if (password.trim() === '') {
      errors.password = true;
      errors.passwordErrorMessage = "Vui lòng nhập mật khẩu";
      isValid = false;  
    }

    setLoginErrors(errors);
    if (!isValid) return;

    let datas = {
      username: username,
      password: password
    }

    try {
      const data = await login(datas);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      loginContext(data.user);

      navigate("/home");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <form onSubmit={handleLoginForm} className="form">
        <div className="inputGroup">
            <label htmlFor="username">Tên đăng nhập:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              autoComplete="off"
              className={loginErrors.username ? "input error" : "input success"}
            />
            {loginErrors.username && 
            <div className="errorMessageLabel">
              <AlertCircleIcon />
              <span className="error">{loginErrors.usernameErrorMessage}</span>
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
              className={loginErrors.password ? "input error" : "input success"}
            />
            {loginErrors.password && 
            <div className="errorMessageLabel">
              <AlertCircleIcon />
              <span className="error">{loginErrors.passwordErrorMessage}</span>
            </div>
            }
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit" className="submitButton">Đăng nhập</button>
    </form>
  );
}

export default LoginForm;
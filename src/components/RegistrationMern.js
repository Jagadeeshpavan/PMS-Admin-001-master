import React, { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios'; 
import './RegistrationMern.css';

const RegistrationMern = () => {
  // Removed duplicate declarations
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate firstName
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
      isValid = false;
    }

    // Validate lastName
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }

    // Validate password
    const validatePassword = (password) => {
      if (password.length < 6) {
        return 'Password must be at least 6 characters';
      }
    
      // At least one lowercase letter
      if (!/[a-z]/.test(password)) {
        return 'Password must include at least one lowercase letter';
      }
    
      // At least one uppercase letter
      if (!/[A-Z]/.test(password)) {
        return 'Password must include at least one uppercase letter';
      }
    
      // At least one digit
      if (!/\d/.test(password)) {
        return 'Password must include at least one digit';
      }
    
      // At least one special character
      if (!/[@$!%*?&]/.test(password)) {
        return 'Password must include at least one special character';
      }

      return null;
    };

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
      isValid = false;
    }

    // Validate confirmPassword
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Registration successful!', formData);
    } else {
      console.log('Form validation failed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  // Removed duplicate declarations
  /*
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '', // Add a 'gender' field to the form data
    password: '',
  });
  */

  /*
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  */

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Form Data:', formData); // Log the form data
      // Send formData to backend
      await axios.post('http://localhost:5005/users', formData);
  
      // Redirect on success
      navigate('/');
    } catch (err) {
      console.error('Error:', err.response.data); // Log the error response details
  
      // Show an alert with the error message
      window.alert(`Error: ${err.response.data.error}`);
    }
  };

  return (
    <div className="body-Register">
    <div className="registration-form">
      <h1 className='Registration-h1'>REGISTER</h1>
      
      <form onSubmit={handleSubmit} className="form-container">
  <div className="form-group1">
    <label htmlFor="firstName" className="form-label">
      First Name
    </label>
    <input
      type="text"
      id="firstName"
      name="firstName"
      value={formData.firstName}
      onChange={handleChange}
      className="form-input"
      required
     
    />
    {errors.firstName && <p className="error">{errors.firstName}</p>}
  </div>

  <div className="form-group1">
    <label htmlFor="lastName" className="form-label">
      Last Name
    </label>
    <input
      type="text"
      id="lastName"
      name="lastName"
      value={formData.lastName}
      onChange={handleChange}
      className="form-input"
      required
      
    />
    {errors.lastName && <p className="error">{errors.lastName}</p>}
  </div>

  <div className="form-group1">
    <label htmlFor="email" className="form-label">
      Email
    </label>
    <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="form-input"
      required
      
    />
    {errors.email && <p className="error">{errors.email}</p>}
  </div>

  <div className="form-group1">
    <label className="form-label">Gender</label>
    <div className="gender-options">
      <input
        type="radio"
        id="male"
        name="gender"
        value="male"
        checked={formData.gender === "male"}
        onChange={handleChange}
        className="form-radio"
      />
      <label htmlFor="male" className="form-radio-label">
        Male
      </label>
      <input
        type="radio"
        id="female"
        name="gender"
        value="female"
        checked={formData.gender === "female"}
        onChange={handleChange}
        className="form-radio"
        
      />
      <label htmlFor="female" className="form-radio-label">
        Female
      </label>
    </div>
  </div>

  <div className="form-group1">
    <label htmlFor="password" className="form-label">
      Password
    </label>
    <input
      type="password"
      id="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      className="form-input"
      required
      
    />
    {errors.password && <p className="error">{errors.password}</p>}
  </div>

  <div className="form-group1">
    <label htmlFor="confirmPassword" className="form-label">
      Confirm Password
    </label>
    <input
      type="password"
      id="confirmPassword"
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
      className="form-input"
      required
    
    />
    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
  </div>

  <button type="submit" className="submit-button1">
    SUBMIT
  </button>
</form>
<p className="login-link">
          Already have an account? <Link to="/">Log in</Link>
        </p>
     
    </div>
    </div>
  );
};

export default RegistrationMern;
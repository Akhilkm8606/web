import React, { useState } from 'react'
import axios from 'axios'
import './form.css'
function Form() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: ""
  })
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  
    try {
      const response = await axios.post("http://localhost:4000/api/auth/registration", {
        fullname: input.username, 
        email: input.email,        
        password: input.password
      });
  
      if (response.data.success) {
        console.log(response.data.success);
      } else {
        // Handle other cases if needed
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }
  
  const [focus , setFocus] = useState({
    errname : false,
    erremail : false,
    errpass : false,
    errcpass :   false,
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
  }
  return (
    <div className="registration-container">
      <h2>Register Form </h2>
      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input type="text" id='username'
            name='username'
            pattern="^(?=.*[A-Za-z])[A-Za-z\d]{4,16}$"

            className='form-control'
            onChange={handleChange}
            value={input.username}
            onBlur={() => setFocus ({
              ...focus,errname : true
            })}
            focus ={focus.errname.toString()}
            required
          />
          <span>Entre a valid Email</span>


        </div>
        <div className="form-group">
          <label htmlFor="email">EMail</label>
          <input type="email" id='email'
            name='email'
            className='form-control'
            onChange={handleChange}
            value={input.email}
            onBlur={() => setFocus ({
              ...focus,erremail : true
            })}
            focus ={focus.erremail.toString()}
            required />
          <span>Entre a valid Email</span>
        </div>
        <div className="form-group">
          <label htmlFor="password">password</label>
          <input type="text" id='password'
            name='password'
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$"

            className='form-control'
            onChange={handleChange}
            value={input.password}
            onBlur={() => setFocus ({
              ...focus,errpass : true
            })}
            focus ={focus.errpass.toString()}
            required />
          <span>password must have 8 characters and include atleast 1 uppercase, 1 digit and 1 special character </span>

        </div>
        <div className="form-group">
          <label htmlFor="cpassword">conform password</label>
          <input type="text" id='cpassword'
            name='cpassword'
            className='form-control'
            onChange={handleChange}
            pattern={input.password}
            value={input.cpassword}
            onBlur={() => setFocus ({
              ...focus,errcpass : true
            })}
            focus ={focus.errcpass.toString()}
            required />
          <span>password is not match</span>

        </div>
        <button type="submit">Register</button>

      </form>

    </div>
  )
}

export default Form
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/todos/tudosThunk'; // Update with the correct path

const RegisterModal = ({ setIsRegisterModalOpen }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const user = { name, email, password };
    dispatch(registerUser(user));
    setIsRegisterModalOpen(false);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsRegisterModalOpen(false);
      }}
    >
      <div className="bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className="text-lg">Register</h3>

        <form onSubmit={handleRegister}>
          {/* Name */}
          <div className="mt-8 flex flex-col space-y-1">
            <label className="text-sm dark:text-white text-gray-500">Name</label>
            <input
              id="name-input"
              type="text"
              className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
              placeholder="Your Name "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mt-8 flex flex-col space-y-1">
            <label className="text-sm dark:text-white text-gray-500">Email</label>
            <input
              id="email-input"
              type="email"
              className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mt-8 flex flex-col space-y-1">
            <label className="text-sm dark:text-white text-gray-500">Password</label>
            <input
              id="password-input"
              type="password"
              className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full items-center text-white bg-[#635fc7] py-2 rounded-full mt-4"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => setIsRegisterModalOpen(false)}
            className="w-full items-center text-white bg-gray-500 py-2 rounded-full mt-4"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;

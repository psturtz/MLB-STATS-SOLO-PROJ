import React, { useState } from 'react';
import { Link, redirect, useNavigate, useLocation } from 'react-router-dom';

const Register = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [firstName, setFirstName] = useState('');
  const [favoriteTeam, setFavoriteTeam] = useState('');
  const [formValidity, setFormValidity] = useState({
    matchingPasswords: true,
    favoriteTeam: true,
  })
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (favoriteTeam == '' || password !== confirm) {
      if (favoriteTeam == '') {
        setFormValidity({
          ...formValidity,
          favoriteTeam: false,
        })
      }
      if (password !== confirm) {
        setFormValidity({
        ...formValidity,
        matchingPasswords: false,
        })
      }
    } else {
      setFormValidity({
        ...formValidity,
        matchingPasswords: true,
      });
      console.log('here')
    await fetch('./submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, firstName, favoriteTeam}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  };

  return (
    <div className="container relative flex m-auto items-center justify-center h-screen">
      <div className="relative flex justify-center items-center w-[800px] h-[800px]">
        <svg
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 5C4.44772 5 4 5.44772 4 6V12.6528C4 13.2241 4.2443 13.7681 4.67127 14.1476L11.3356 20.0715C11.7145 20.4083 12.2855 20.4083 12.6644 20.0715L19.3287 14.1476C19.7557 13.7681 20 13.2241 20 12.6528V6C20 5.44772 19.5523 5 19 5H5ZM2 6C2 4.34315 3.34315 3 5 3H19C20.6569 3 22 4.34315 22 6V12.6528C22 13.7954 21.5114 14.8834 20.6575 15.6424L13.9931 21.5663C12.8564 22.5767 11.1436 22.5767 10.0069 21.5663L3.34254 15.6424C2.48859 14.8834 2 13.7954 2 12.6528V6Z"
            className="stroke-0 stroke-red-700 fill-blue-400"
          />
        </svg>
        <div className="flex max-w-[500px] min-h-[300px] -mt-16 place-content-around">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6 max-w-[500px] min-h-[300px] place-content-around">
              <input
                className="border border-sky-500"
                name="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              ></input>
              <input
                className="border border-sky-500"
                name="firstName"
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
              ></input>
              <input
                className="border border-sky-500"
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              ></input>
              <input
                className="border border-sky-500"
                name="confirm"
                type="password"
                placeholder="Confirm password"
                onChange={(e) => setConfirm(e.target.value)}
                value={confirm}
                required
              ></input>
              <div className="col-span-2 mx-auto text-rose-600">
                <p className={formValidity.matchingPasswords ? 'hidden' : ''}>
                  Passwords don't match!
                </p>
              </div>
              <div className="col-span-2 mx-auto text-center">
                <select
                  className="block"
                  name="selectList"
                  id="selectList"
                  onChange={(e) => {
                    if (e.target.value != '') {
                      setFormValidity({
                        ...formValidity,
                        favoriteTeam: true,
                      });
                    }
                    setFavoriteTeam(e.target.value);
                  }}
                  value={favoriteTeam}
                >
                  <option defaultValue="">Click to see options</option>
                  <option value="109">Arizona Diamondbacks</option>
                  <option value="144">Atlanta Braves</option>
                  <option value="110">Baltimore Orioles</option>
                  <option value="111">Boston Red Sox</option>
                  <option value="112">Chicago Cubs</option>
                  <option value="145">Chicago White Sox</option>
                  <option value="113">Cincinnati Reds</option>
                  <option value="114">Cleveland Guardians</option>
                  <option value="115">Colorado Rockies</option>
                  <option value="116">Detroit Tigers</option>
                  <option value="117">Houston Astros</option>
                  <option value="118">Kansas City Royals</option>
                  <option value="108">Los Angeles Angels</option>
                  <option value="119">Los Angeles Dodgers</option>
                  <option value="146">Miami Marlins</option>
                  <option value="158">Milwaukee Brewers</option>
                  <option value="142">Minnesota Twins</option>
                  <option value="121">New York Mets</option>
                  <option value="147">New York Yankees</option>
                  <option value="133">Oakland Athletics</option>
                  <option value="143">Philadelphia Phillies</option>
                  <option value="134">Pittsburgh Pirates</option>
                  <option value="135">San Diego Padres</option>
                  <option value="137">San Francisco Giants</option>
                  <option value="136">Seattle Mariners</option>
                  <option value="138">St. Louis Cardinals</option>
                  <option value="139">Tampa Bay Rays</option>
                  <option value="140">Texas Rangers</option>
                  <option value="141">Toronto Blue Jays</option>
                  <option value="120">Washington Nationals</option>
                </select>
                <p
                  className={
                    formValidity.favoriteTeam ? 'hidden' : 'text-rose-600'
                  }
                >
                  Please select a team
                </p>
              </div>
              <button
                type="submit"
                className=" col-span-2 w-20 mx-auto border border-sky-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

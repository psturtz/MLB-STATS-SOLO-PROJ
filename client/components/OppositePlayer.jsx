import React, { useEffect, useState } from 'react';

const OppositePlayer = (props) => {
  const { selectedTeam, selectedPlayer, changePlayer, hitter } = props;
  const [roster, setRoster] = useState(null);
  const [options, setOptions] = useState([]);
  const [oppTeam, setOppTeam] = useState(null);
  const [playerOptions, setPlayerOptions] = useState([]);
  const [keepTeam, setKeepTeam] = useState('');

  useEffect(() => {
    async function getRoster(team, cb, roster, setArr) {
      if (!roster) {
        const roster = await fetch(`./${team}/schedule`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            cb(data);
            const arr = [];
            data.forEach((el) => {
              console.log(arr);
              if (el.teamId) {
                arr.push(
                  <option key={el.teamId} value={el.teamId}>
                  {el.name}
                  </option>
                );
              } else if (el.id) {

              }
            });
            setArr(arr);
            //console.log(arr);
            return data;
          })
          .catch((err) => {
            return err;
          });
      }
    }
    getRoster(selectedTeam, setOppTeam, oppTeam, setOptions);
  }, [oppTeam]);

  async function handleChange(team, cb, roster, setArr) {
    if (!roster) {
      const roster = await fetch(`./${team}`)
        .then((res) => res.json())
        .then((data) => {
          cb(data);
          const arr = [];
          console.log(hitter)
          data.forEach((el) => {
            if ((hitter == true && el.position == 'P') || (hitter == false && el.position != 'P')) {
              arr.push(
                <option key={el.id} value={el.id} className={el.position}>
                  {el.fullName}
                </option>
              );
            }
          });
          setArr(arr);
          return data;
        })
        .catch((err) => {
          return err;
        });
    }
  }




  return (
    <div className=' justify-content text-center space-y-2 shadow-md border-spacing-5 p-8 rounded-lg bg-blue-300 border border-blue-500'>
      <div className="underline">Upcoming Opponents</div>
      <select
        className="block"
        name="team"
        id="team"
        onChange={(e) => {
          if (e.target.value != '') {
            handleChange(e.target.value, setRoster, roster, setPlayerOptions);
            setKeepTeam(e.target.value);
          }
        }}
        value={keepTeam}
      >
        <option defaultValue="">Click to see options</option>
        {options}
      </select>
      <div className="underline">Opposing Player</div>
      <select
        className="block"
        name="selectList"
        id="selectList"
        onChange={(e) => {
          if (e.target.value != '') {
            changePlayer(e.target.value);
          }
        }}
        value={selectedPlayer}
      >
        <option defaultValue="">Click to see options</option>
        {playerOptions}
      </select>
    </div>
  );
};

export default OppositePlayer;

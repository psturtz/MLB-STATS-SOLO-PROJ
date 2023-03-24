import React, { useEffect, useState } from "react"

const TeamPlayer = (props) => {
  const {selectedTeam, selectedPlayer, changePlayer, setHitter} = props
  const [roster, setRoster] = useState(null);
  const [options, setOptions] = useState([])
  

  useEffect(() => {
    async function getRoster(team, cb, roster, setArr) {
      if (!roster) {
        const roster = await fetch(`./${team}`)
          .then((res) => res.json())
          .then((data) => {
            //console.log(data,);
            cb(data);
            const arr = [];
            data.forEach((el) => {
                //console.log(arr);
              if (el.id) {
              arr.push(
                <option key={el.id} value={el.id + '_' + el.position}>
                  {el.fullName}
                </option>
              );
              }
            });
            setArr(arr)
            return data;
          })
          .catch((err) => {
            return err;
          });
      }
    }
    getRoster(selectedTeam, setRoster, roster, setOptions);
  },[roster])


  


  return (
    <div className="text-center shadow-md border-spacing-5 px-8 rounded-lg bg-blue-300 border border-blue-500">
      <div className="underline">Select your player</div>
      <select
        className="block"
        name="selectList"
        id="selectList"
        onChange={(e) => {
          console.log(e.target.value);
          if (e.target.value != '') {
            changePlayer(e.target.value);
            const val = e.target.value.split('_');
            console.log(val[0]);
            changePlayer(e.target.value);
            if (val[1] == 'P') {
              setHitter(false);
            } else {
              setHitter(true);
            }
          }
        }}
        value={selectedPlayer}
      >
        <option defaultValue="">Click to see options</option>
        {options}
      </select>
    </div>
  );
};

export default TeamPlayer;

import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import TeamPlayer from "./teamPlayer.jsx";
import OppositePlayer from "./OppositePlayer.jsx";
import Stats from "./Stats.jsx";

const Home = (props) => {
  const [homePlayer, setHomePlayer] = useState('')
  const [otherPlayer, setOtherPlayer] = useState('');
  const favoriteTeam = Cookies.get('favTeam');
  const firstName = Cookies.get('firstName');
  const [hitter, setHitter] = useState('')




  return (
    <div className="container h-screen">
      <div className="my-auto flex flex-col justify-center items-center h-full">
        <div className="my-10">Welcome {firstName}</div>
        <div className="m-auto flex-row flex justify-around items-center max-h-2/5 w-screen">
          <div className="justify-content text-center shadow-md border-spacing-5 p-8 rounded-lg bg-blue-300 border border-blue-500">
            <div className="underline mb-8">Select your player</div>
            <TeamPlayer
              selectedTeam={favoriteTeam}
              selectedPlayer={homePlayer}
              changePlayer={setHomePlayer}
              setHitter={setHitter}
            />
          </div>
          <div>
            <Stats
              homePlayer={homePlayer.split('_')[0]}
              otherPlayer={otherPlayer}
            />
          </div>
          <div>
            <OppositePlayer
              selectedTeam={favoriteTeam}
              selectedPlayer={otherPlayer}
              changePlayer={setOtherPlayer}
              hitter={hitter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

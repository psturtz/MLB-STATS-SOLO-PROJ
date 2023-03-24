import React, { useEffect, useState } from 'react';

const Stats = (props) => {
  const { homePlayer, otherPlayer } = props;
  const [stats, setStats] = useState('');


  useEffect(() => {
    if (homePlayer != '' && otherPlayer != '') {
    async function getStats(cb) {
        const matchup = await fetch(`/stats/${homePlayer}/${otherPlayer}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data,);
            cb(data);
            return data;
          })
          .catch((err) => {
            return err;
          });
    }
    getStats(setStats);
  }
  }, [homePlayer, otherPlayer]);

  return (
    <div className="text-center shadow-md border-spacing-5 px-8 rounded-lg bg-blue-300 border border-blue-500">
      <h2 className="underline">STATS</h2>
      <div className="grid gap-4 grid-cols-3 grid-rows-3 my-4">
        <div>PA: {stats.plateAppearances}</div>
        <div>BA: {stats.avg}</div>
        <div>OPS: {stats.ops}</div>
        <div>RBI: {stats.rbi}</div>
        <div>HR: {stats.homeRuns}</div>
        <div>K: {stats.strikeOuts}</div>
      </div>
    </div>
  );
};

export default Stats;

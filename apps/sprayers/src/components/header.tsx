import { useEffect, useState } from 'react';
import { HeaderItem } from './header-item';
import { CiSettings } from 'react-icons/ci';
import { HeaderInput } from './header-input';

export const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const [sprayingTarget, setSprayingTarget] = useState('0');
  return (
    <div className="flex gap-2 justify-between m-2 items-center">
      {/* <div className="text-3xl font-bold text-blue-500">RPerception</div> */}
      <img src="/RP.png" />
      <HeaderItem title="Horizontal speed" value="0" unit="m/s" />
      <HeaderItem title="Instantaneous flow rate" value="1.2" unit="L/Dunam" />
      <HeaderInput
        title="Spraying target"
        value={sprayingTarget}
        setter={setSprayingTarget}
        unit="L/Dunam"
      />
      <HeaderItem title="Tank Level" value="0" unit="%" />
      <HeaderItem
        title={time.toLocaleDateString()}
        value={time.toLocaleTimeString()}
      />
      <div className="flex gap-4">
        <CiSettings className="w-12 h-12 transition-transform duration-300 hover:rotate-90 hover:cursor-pointer" />

        <div className="w-12 h-12 flex items-center justify-center bg-blue-500 font-bold rounded-full shadow-md hover:cursor-pointer">
          RP
        </div>
      </div>
    </div>
  );
};

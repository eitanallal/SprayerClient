import { HeaderItem } from './header-item';
import { CiSettings } from 'react-icons/ci';
import { HeaderInput } from './header-input';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const Header: React.FC = () => {
  const downloadLogs = async () => {
    const result = await fetch('http://localhost:5000/logs');
    const blob = await result.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'system_logs.log';
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  };

  const tankLevel = useSelector((state: RootState) => state.system.tankLevel);

  const speed = useSelector((state: RootState) => state.system.GPSdata.speed);
  const nozzleData = useSelector((state: RootState) => state.system.nozzles);

  const flowRate =
    nozzleData.reduce((sum, item) => sum + item.flow, 0) / nozzleData.length;
  return (
    <div className="flex gap-2 justify-between m-2 items-center h-24">
      <img src="/RP.png" />
      <HeaderItem title="Speed" value={`${speed}`} unit="m/s" />
      <HeaderItem title="Flow rate" value={`${flowRate}`} unit="L/Dunam" />
      <HeaderInput title="Spraying target" unit="L/Dunam" />
      <HeaderItem title="Tank Level" value={tankLevel} unit="%" />
      <div className="flex gap-4">
        <CiSettings
          className="w-12 h-12 transition-transform duration-300 hover:rotate-90 hover:cursor-pointer"
          onClick={() => downloadLogs()}
        />
        <div className="w-12 h-12 flex items-center justify-center bg-blue-500 font-bold rounded-full shadow-md hover:cursor-pointer">
          RP
        </div>
      </div>
    </div>
  );
};

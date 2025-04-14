import { Nozzle } from './nozzle';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const Nozzles: React.FC = () => {
  const nozzles = useSelector((state: RootState) => state.system.nozzles);
  return (
    <div className="flex gap-4 flex-col py-2 ">
      <div className="flex gap-4">
        <Nozzle nozzle={nozzles[0]} />
        <Nozzle nozzle={nozzles[1]} />
      </div>
      <div className="flex gap-4">
        <Nozzle nozzle={nozzles[2]} />
        <Nozzle nozzle={nozzles[3]} />
      </div>
      <div className="flex gap-4">
        <Nozzle nozzle={nozzles[4]} />
        <Nozzle nozzle={nozzles[5]} />
      </div>
      <div className="flex gap-4">
        <Nozzle nozzle={nozzles[6]} />
        <Nozzle nozzle={nozzles[7]} />
      </div>
    </div>
  );
};

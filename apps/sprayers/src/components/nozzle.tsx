import { NozzleState } from '../enums/nozzle-state.enum';
import { Nozzle as NozzleType } from '../types/nozzle.type';

interface Props {
  nozzle: NozzleType;
  setNozzle: React.Dispatch<React.SetStateAction<NozzleType>>;
}

export const Nozzle: React.FC<Props> = ({ nozzle, setNozzle }) => {
  return (
    <div className="border-2 border-black">
      <div
        className={`text-center font-bold ${
          nozzle.status != NozzleState.OFF ? 'bg-green-500' : 'bg-red-600'
        }`}
      >
        {nozzle.name}
      </div>
      <div className="p-1 text-center">
        {nozzle.status === NozzleState.OFF ? 0 : nozzle.flow}L/Dunam
      </div>
      <div className="flex">
        <button
          className={`w-14 p-1 border-t border-black ${
            nozzle.status != NozzleState.ON ? 'bg-slate-300' : 'font-bold'
          } hover:bg-slate-600`}
          onClick={() =>
            setNozzle({
              flow: nozzle.flow,
              name: nozzle.name,
              status: NozzleState.ON,
            })
          }
        >
          ON
        </button>
        <button
          className={`w-16 p-1 border-t border-l border-black  ${
            nozzle.status != NozzleState.OFF ? 'bg-slate-300' : 'font-bold'
          } hover:bg-slate-600`}
          onClick={() =>
            setNozzle({
              flow: nozzle.flow,
              name: nozzle.name,
              status: NozzleState.OFF,
            })
          }
        >
          OFF
        </button>
        {/* <button
          className={`w-16 p-1 border-t border-black  ${
            nozzle.status != NozzleState.AUTO ? 'bg-slate-300' : 'font-bold'
          } hover:bg-slate-600`}
          onClick={() =>
            setNozzle({
              flow: nozzle.flow,
              name: nozzle.name,
              status: NozzleState.AUTO,
            })
          }
        >
          AUTO
        </button>*/}
      </div>
    </div>
  );
};

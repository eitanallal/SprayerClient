import { useDispatch, useSelector } from 'react-redux';
import { NozzleState } from '../enums/nozzle-state.enum';
import { useSendCommandMutation } from '../store/api.slice';
import { Nozzle as NozzleType } from '../types/nozzle.type';
import { setSystemStatus } from '../store/system.slice';
import { RootState } from '../store/store';

interface Props {
  nozzle: NozzleType;
}

export const Nozzle: React.FC<Props> = ({ nozzle }) => {
  const [sendCommand] = useSendCommandMutation();
  const dispatch = useDispatch();
  const systemState = useSelector(
    (state: RootState) => state.system.systemStatus
  );
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
          onClick={() => {
            sendCommand({
              id: '123456',
              SystemCommand: systemState,
              nozzleOpen: { [Number(nozzle.name) - 1]: true },
            }).then((response) => {
              console.log(response.data.system_status.nozzleOpen);
              dispatch(
                setSystemStatus({
                  nozzles: Object.entries(
                    response.data.system_status.nozzleOpen
                  ).map(([key, value]) => ({
                    name: key,
                    flow:
                      response.data.nozzleFlowRates[
                        key as keyof typeof response.data.nozzleFlowRates
                      ] || 0,
                    status: value ? NozzleState.ON : NozzleState.OFF,
                  })),
                  systemStatus: response.data.system_status.system_state,
                  tankLevel: response.data.system_status.tankLevel,
                })
              );
            });
          }}
        >
          ON
        </button>
        <button
          className={`w-16 p-1 border-t border-l border-black  ${
            nozzle.status != NozzleState.OFF ? 'bg-slate-300' : 'font-bold'
          } hover:bg-slate-600`}
          onClick={() =>
            sendCommand({
              id: '123456',
              SystemCommand: systemState,
              nozzleOpen: { [nozzle.name]: false },
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

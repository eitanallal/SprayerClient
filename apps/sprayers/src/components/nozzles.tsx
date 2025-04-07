import { useState } from 'react';
import { NozzleState } from '../enums/nozzle-state.enum';
import { Nozzle } from './nozzle';
import { Nozzle as NozzleType } from '../types/nozzle.type';

export const Nozzles: React.FC = () => {
  const [nozzle1L, setNozzle1L] = useState<NozzleType>({
    flow: 1.2,
    name: '1L',
    status: NozzleState.ON,
  });
  const [nozzle1R, setNozzle1R] = useState<NozzleType>({
    flow: 1.2,
    name: '1R',
    status: NozzleState.ON,
  });
  const [nozzle2L, setNozzle2L] = useState<NozzleType>({
    flow: 1,
    name: '2L',
    status: NozzleState.ON,
  });
  const [nozzle2R, setNozzle2R] = useState<NozzleType>({
    flow: 1.1,
    name: '2R',
    status: NozzleState.ON,
  });
  const [nozzle3L, setNozzle3L] = useState<NozzleType>({
    flow: 0,
    name: '3L',
    status: NozzleState.ON,
  });
  const [nozzle3R, setNozzle3R] = useState<NozzleType>({
    flow: 0,
    name: '3R',
    status: NozzleState.OFF,
  });
  const [nozzle4L, setNozzle4L] = useState<NozzleType>({
    flow: 1.5,
    name: '4L',
    status: NozzleState.ON,
  });
  const [nozzle4R, setNozzle4R] = useState<NozzleType>({
    flow: 0,
    name: '4R',
    status: NozzleState.OFF,
  });

  return (
    <div className="flex gap-4 flex-col py-2 ">
      <div className="flex gap-4">
        <Nozzle nozzle={nozzle1L} setNozzle={setNozzle1L} />
        <Nozzle nozzle={nozzle1R} setNozzle={setNozzle1R} />
      </div>
      <div className="flex gap-4 ">
        <Nozzle nozzle={nozzle2L} setNozzle={setNozzle2L} />
        <Nozzle nozzle={nozzle2R} setNozzle={setNozzle2R} />
      </div>
      <div className="flex gap-4 ">
        <Nozzle nozzle={nozzle3L} setNozzle={setNozzle3L} />
        <Nozzle nozzle={nozzle3R} setNozzle={setNozzle3R} />
      </div>
      <div className="flex gap-4 ">
        <Nozzle nozzle={nozzle4L} setNozzle={setNozzle4L} />
        <Nozzle nozzle={nozzle4R} setNozzle={setNozzle4R} />
      </div>
    </div>
  );
};

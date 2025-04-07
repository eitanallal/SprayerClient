import { NozzleState } from '../enums/nozzle-state.enum';

export type Nozzle = { name: string; flow: number; status: NozzleState };

export type NozzlesSystem = {
  nozzle1R: Nozzle;
  nozzle1L: Nozzle;
  nozzle2R: Nozzle;
  nozzle2L: Nozzle;
  nozzle3R: Nozzle;
  nozzle3L: Nozzle;
  nozzle4R: Nozzle;
  nozzle4L: Nozzle;
};

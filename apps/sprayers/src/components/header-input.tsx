import { useState } from 'react';
import { useSendCommandMutation } from '../store/api.slice';

interface Props {
  title: string;
  unit?: string;
}
export const HeaderInput: React.FC<Props> = ({ title, unit }) => {
  const [sendCommand] = useSendCommandMutation();
  const [value, setValue] = useState('0');
  return (
    <div className="bg-blue-300 px-4 py-1 flex flex-col">
      <div className="text-center">{title}</div>
      <div className="flex gap-1 justify-center">
        <input
          className="text-center bg-blue-300 border border-black w-20"
          placeholder=""
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {unit ? <div className="text-center">{unit}</div> : null}
      </div>
      <button
        className="border border-black"
        onClick={(e) =>
          sendCommand({
            id: '123456',
            SprayRate: parseFloat(value),
          })
        }
      >
        Enter
      </button>
    </div>
  );
};

import { Header } from '../components/header';
import { Nozzles } from '../components/nozzles';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import {
  useGetGPSDataQuery,
  useGetHealthDataQuery,
  useGetSystemStatusQuery,
  useSendCommandMutation,
} from '../store/api.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const {} = useGetSystemStatusQuery(undefined, { pollingInterval: 1000 });

  const {} = useGetGPSDataQuery(undefined, {
    pollingInterval: 1000,
  });

  const systemState = useSelector(
    (state: RootState) => state.system.systemStatus
  );

  const {} = useGetHealthDataQuery(undefined, {
    pollingInterval: 1000,
  });

  const [sendCommand] = useSendCommandMutation();

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick={true}
      />

      <Header />
      <div className="flex gap-10 w-full h-full justify-between p-4">
        <div>
          <div className="flex gap-2 w-full">
            Requested Mode:
            <select
              onChange={(e) =>
                sendCommand({ id: 'aaaa', SystemCommand: e.target.value })
              }
            >
              <option>MIXING</option>
              <option>SPRAYING</option>
              <option>MAINTENANCE</option>
              <option>STOP</option>
              <option>CONSTANT_SPRAY</option>
            </select>
          </div>
          <div className="flex gap-2">
            Current Mode:
            <div className="font-bold">
              {systemState ? systemState : 'UNKNOWN'}
            </div>
          </div>

          <Nozzles />
        </div>
        <div className="w-full h-15rem py-2">
          {/* <MapContainer
            center={[31.88, 34.96]}
            zoom={13}
            scrollWheelZoom={false}
            style={{
              height: '95%',
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[31.885, 34.961]}
              icon={new Icon({ iconUrl: 'react-icons/ci/CiMapPin' })}
            />
          </MapContainer> */}
        </div>
      </div>
    </div>
  );
}

export default App;

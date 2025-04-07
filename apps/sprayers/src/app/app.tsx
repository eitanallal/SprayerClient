import { Header } from '../components/header';
import { Nozzles } from '../components/nozzles';
import { CiMapPin } from 'react-icons/ci';

import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';

export function App() {
  return (
    <div>
      <Header />
      <div className="flex gap-10 w-full h-full justify-between p-4">
        <Nozzles />
        <div className="w-full h-15rem py-2">
          <MapContainer
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
              // icon={new Icon({ iconUrl: 'react-icons/ci/CiMapPin' })}
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default App;

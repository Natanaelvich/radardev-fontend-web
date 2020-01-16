import React, { useEffect, useState } from 'react';
import api from './services/api';

import './global.css';
import './app.css';
import './sidebar.css';
import './main.css';
import DevList from './components/DevList';
import DevFomr from './components/DevForm';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      {/* cadastro */}
      <aside>
        <strong>Cadastrar</strong>
        <DevFomr onSubmit={handleAddDev} />
      </aside>

      {/* lista de usuarios */}
      <main>
        <ul>
          {devs.map(dev => (
            // eslint-disable-next-line no-underscore-dangle
            <DevList dev={dev} key={dev._id} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

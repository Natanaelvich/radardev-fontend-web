import React, { useState, useEffect } from 'react';

// import { Container } from './styles';

export default function DevForm({ onSubmit }) {
  const [latitudeState, setlatitude] = useState(0);
  const [longitudeState, setLongitude] = useState(0);
  const [usernameGithub, setUsernameGithub] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setlatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  async function handleSubimit(e) {
    e.preventDefault();
    await onSubmit({
      github_username: usernameGithub,
      techs,
      latitude: latitudeState,
      longitude: longitudeState,
    });
    setUsernameGithub('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubimit}>
      <div className="input-block">
        <label htmlFor="username_github">
          Usuário do Github
          <input
            value={usernameGithub}
            onChange={txt => setUsernameGithub(txt.target.value)}
            name="username_github"
            id="username_github"
            required
          />
        </label>
      </div>

      <div className="input-block">
        <label htmlFor="techs">
          Tecnologias
          <input
            value={techs}
            onChange={txt => setTechs(txt.target.value)}
            name="techs"
            id="techs"
            required
          />
        </label>
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">
            latitude
            <input
              type="number"
              value={latitudeState}
              onChange={txt => setlatitude(txt.target.value)}
              name="latitude"
              id="latitude"
              required
            />
          </label>
        </div>

        <div className="input-block">
          <label htmlFor="longitude">
            Longitude
            <input
              type="number"
              value={longitudeState}
              onChange={txt => setLongitude(txt.target.value)}
              name="longitude"
              id="longitude"
              required
            />
          </label>
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

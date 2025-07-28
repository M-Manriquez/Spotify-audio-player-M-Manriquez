import React, { useEffect, useState, useRef } from "react";

const MusicPlayer = () => {
  // Hook que se encarga de manejar las canciones
  const [songs, setSongs] = useState([]);
  // Hook que se encarga de saber si el mouse esta sobre una cancion
  const [hoveredSong, setIsHovered] = useState(false);
  // Hook que se encarga de saber si la cancion esta en reproduccion
  const [isPlaying, setIsPlaying] = useState(false);
  // Hook que se encarga de saber que cancion se esta reproduciendo
  const [currentSong, setCurrentSong] = useState(null);
  // Hook que se encarga de administrar el audio
  const audioRef = useRef(null);

  // funcion que se encarga de obtener las canciones utilizando un fetch
  const getSongs = () => {
    fetch("https://playground.4geeks.com/sound/songs")
      .then((response) => response.json())
      .then((data) => {
        setSongs(data.songs);
        console.log(data);
      });
  };

  // funcion que se encarga de reproducir la cancion
  const playSong = (song) => {
    // Actualiza la fuente del audio
    if (audioRef.current) {
      // toma la url de la cancion a la que se le dio click
      audioRef.current.src = `https://playground.4geeks.com${song.url}`;
      // reproduce el audio
      audioRef.current.play();
      // asigna la cancion que se clickeo a currentSong
      setCurrentSong(song);
      // isPlaying pasa a ser verdadero
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    // si audioRef.current no es falsy
    if (audioRef.current) {
      // si isPlaying es verdadero
      if (isPlaying) {
        // se pausa el audio
        audioRef.current.pause();
        // isPlaying pasa a ser falso
        setIsPlaying(false);
      } else {
        // en caso contrario el audio se reproduce
        audioRef.current.play();
        // isPlaying pasa a ser verdadero
        setIsPlaying(true);
      }
    }
  };

  const nextSong = () => {
    // si currentSong es falsy simplemente retorna
    if (!currentSong || songs.length === 0) return;
    // para asignar el indice actual se hace lo siguiente: recorre el array songs comparando el id de cada song con el de la song actual, si los id coinsiden entonces el ese pasa a ser el valor de currentsong
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    // para avanzar en el index hace lo siguiente: a currentindex le suma 1 y divide este valor por el largo del array songs, asignando el resto de esta division a currentIndex
    const nextIndex = (currentIndex + 1) % songs.length;
    playSong(songs[nextIndex]);
  };

  const previousSong = () => {
    // si currentSong es falsy simplemente retorna
    if (!currentSong || songs.length === 0) return;
    // para asignar el indice actual se hace lo siguiente: recorre el array songs comparando el id de cada song con el de la song actual, si los id coinsiden entonces el ese pasa a ser el valor de currentsong
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    // para retroceder en el index hace lo siguiente: si currentindex es 0 entonces currentindex pasa a ser el id del ultimo elemento del array (songs.length - 1), en caso contrario entonces se le resta 1 a currentIndex
    const previousIndex =
      currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    // reproduce la el elemento del array songs que tenga coincida con el valor de previousindex
    playSong(songs[previousIndex]);
  };

  // Hook que se encarga de ejecutar la funcion getSongs cuando se renderiza el componente
  useEffect(() => {
    getSongs();
  }, []);

  // Constante que utiliza el metodo map para crear los items de la lista por cada cancion que tenga la api
  const HTMLSongs = songs.map((song) => {
    return (
      <li
        key={song.id}
        className="list-group-item py-3 px-5 border-0"
        onMouseEnter={() => setIsHovered(song.id)}
        onMouseLeave={() => setIsHovered(null)}
        onClick={() => playSong(song)}
        style={{
          backgroundColor: hoveredSong === song.id ? "#535353" : "#191414",
          color: "#ffffffb4",
        }}
      >
        <div className="d-flex align-items-center fs-1">
          <span className="me-2 me-md-5" style={{ minWidth: "40px" }}>
            {song.id}
          </span>
          <span>{song.name}</span>
        </div>
      </li>
    );
  });

  return (
    <>
      <audio
        ref={audioRef}
        onEnded={() => nextSong()}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <ul className="list-group overflow-auto" style={{ height: "90vh" }}>
        {HTMLSongs}
      </ul>
      <div
        className="fixed-bottom justify-content-center align-items-center d-flex"
        style={{ height: "10vh", backgroundColor: "#121212" }}
      >
        <button className="btn m-4" onClick={previousSong}>
          <i class="fa-solid fa-backward fs-1 text-white"></i>
        </button>
        <button className="btn m-4" onClick={togglePlayPause}>
          {isPlaying ? (
            <i class="fa-solid fa-pause fs-1 text-white"></i>
          ) : (
            <i class="fa-solid fa-play fs-1 text-white"></i>
          )}
        </button>
        <button className="btn m-4" onClick={nextSong}>
          <i class="fa-solid fa-forward fs-1 text-white"></i>
        </button>
      </div>
    </>
  );
};

export default MusicPlayer;

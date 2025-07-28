import React, { useEffect, useState } from "react";

const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const getSongs = () => {
    fetch("https://playground.4geeks.com/sound/songs")
      .then((response) => response.json())
      .then((data) => {
        setSongs(data.songs);
        console.log(data);
      });
  };

  useEffect(() => {
    getSongs();
  }, []);

  const HTMLSongs = songs.map((song) => {
    return (
      <li
        key={song.id}
        className="list-group-item py-3 pt-5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: isHovered ? "#535353" : "#191414",
          color: "#ffffffb4",
        }}
      >
        <p className="mb-1 display-5 fw-semibold" href={song.url}>
          {song.id} &emsp;
          {song.name} -
        </p>
        <br />
        <small
          className="text-muted"
          style={{
            color: "#B3B3B3",
          }}
        >
          {song.category}
        </small>
      </li>
    );
  });

  return (
    <>
      <ul className="list-group overflow-auto" style={{ height: "90vh" }}>
        {HTMLSongs}
      </ul>
      <div
        className="fixed-bottom justify-content-center align-items-center d-flex"
        style={{ height: "10vh", backgroundColor: "#121212" }}
      >
        <button className="btn m-4">
          <i class="fa-solid fa-backward fs-1 text-white"></i>
        </button>
        <button className="btn m-4">
          {isPlaying ? (
            <i class="fa-solid fa-pause fs-1 text-white"></i>
          ) : (
            <i class="fa-solid fa-play fs-1 text-white"></i>
          )}
        </button>
        <button className="btn m-4">
          <i class="fa-solid fa-forward fs-1 text-white"></i>
        </button>
      </div>
    </>
  );
};

export default MusicPlayer;

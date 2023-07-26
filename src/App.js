import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";

import {
  getDocs,
  collection,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  // Update Title State

  const [updatedTitle, setUpdatedTitle] = useState("");
  const moviesCollectionRef = collection(db, "movies");
  // File Upload State
  const [fileUpload, setFileUpload] = useState(null);

  const getMovieList = async () => {
    // READ THE DATA
    // SET THE MOVIE LIST
    try {
      const data = await getDocs(moviesCollectionRef);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);

    await deleteDoc(movieDoc);

    getMovieList();
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);

    await updateDoc(movieDoc, { title: updatedTitle });

    getMovieList();
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });

      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;

    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="App">
      <Auth />

      <div>
        <input
          placeholder="Movie Title..."
          onChange={(e) => {
            setNewMovieTitle(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Movie Date..."
          onChange={(e) => {
            setNewReleaseDate(e.target.value);
          }}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => {
            setIsNewMovieOscar(e.target.checked);
          }}
        />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      {movieList?.map((movie) => (
        <div>
          <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
            {movie.title}
          </h1>
          <p>{movie.releaseDate}</p>

          <button
            onClick={() => {
              deleteMovie(movie.id);
            }}
          >
            delete movie
          </button>

          <input
            onChange={(e) => {
              setUpdatedTitle(e.target.value);
            }}
            placeholder="new title..."
          />
          <button
            onClick={() => {
              updateMovieTitle(movie.id);
            }}
          >
            Update Title
          </button>
        </div>
      ))}

      <div>
        <input
          onChange={(e) => {
            setFileUpload(e.target.files[0]);
          }}
          type="file"
        />
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App;

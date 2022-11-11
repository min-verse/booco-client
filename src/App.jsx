import React, { useEffect } from 'react'
import LandingPage from './components/pages/LandingPage';
import HomePage from './components/pages/HomePage';
import BookPage from './components/pages/BookPage';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setReadings, setOutgoings, setFriends, setPosts, setComments, setPendings, setGenres, setMoods } from './components/state/user';
import PostPage from './components/pages/PostPage';
import './App.css'
import ReaderPage from './components/pages/ReaderPage';
import BookResultsPage from './components/pages/BookResultsPage';
import ReaderResultsPage from './components/pages/ReaderResultsPage';

function App() {

  const dispatch = useDispatch();
  const user = useSelector((state)=> state.user);
  const navigate = useNavigate();
  const goToLanding = ()=>{
    navigate("/");
  }


  const goToUserHome = ()=>{
    navigate("/home");
  }

  
  useEffect(() => {

    let token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/private/verify", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else if (res.status == "401") {
            throw new Error("Unauthorized Request. Must be signed in.");
          }
        })
        .then((data) =>{
          console.log(data);
          dispatch(setUser(data));
          dispatch(setReadings(data));
          dispatch(setFriends(data));
          dispatch(setPosts(data));
          dispatch(setComments(data));
          dispatch(setPendings(data));
          dispatch(setGenres(data));
          dispatch(setMoods(data));
          dispatch(setOutgoings(data));
        })
        .catch((err) =>{ 
          console.error(err);
          goToLanding();
        });
    } else {
      // alert("Not logged in.");
      goToLanding();
    }
  }, []);


  function getToken() {
    let now = new Date(Date.now()).getTime();
    let threeDays = 1000 * 60 * 30 * 144;
    let timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
    if (timeSinceLastLogin < threeDays) {
      return localStorage.getItem("token");
    } else {
      localStorage.removeItem("token");
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/books/:id" element={<BookPage />}/>
      <Route path="/browse" element={<BookResultsPage />} />
      <Route path="/readersearch" element={<ReaderResultsPage />} />
      <Route path="/posts/:id" element={<PostPage />}/>
      <Route path="/readers/:id" element={<ReaderPage />}/>
    </Routes>
  );
}

export default App

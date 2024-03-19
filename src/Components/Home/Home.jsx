import React, { useEffect, useState } from "react"
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus} from "react-icons/ai"

const apikey = "f7447f2aadb2ba231507916495477640";
const url = "https://api.themoviedb.org/3/movie/";
const imgurl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";
const genreUrl = "https://api.themoviedb.org/3";

const Card = ({img}) => (
  <img className='card' src={img} alt="cover" />
)

const Row = ({
  title, 
  arr=[], })=> (
  <div className='row'>
    <h2>{title}</h2>
    <div>
      {
        arr.map((item, index) =>(
          <Card key={index} img={`${imgurl}/${item.poster_path}`}/>
        ))
      }
    </div>
  </div>
)

const Home = () => {
  const [upcomingMovies, setupcomingMovies] = useState([])
  const [nowPlayingMovies, setnowPlayingMovies] = useState([])
  const [popularMovies, setpopularMovies] = useState([])
  const [topRatedgMovies, settopRatedMovies] = useState([])
  const [genre, setGenre] = useState([])

  useEffect(() => {
    const fetchupcoming = async() => {
      const {data: {results}} = await axios.get(`${url}/${upcoming}?api_key=${apikey}&page=2`)
      setupcomingMovies(results)
    };
    const fetchnowPlaying = async() => {
      const {data: {results}} = await axios.get(`${url}/${nowPlaying}?api_key=${apikey}`)
      setnowPlayingMovies(results)
    };
    const fetchpopular = async() => {
      const {data: {results}} = await axios.get(`${url}/${popular}?api_key=${apikey}`)
      setpopularMovies(results)
    };
    const fetchnowtopRated = async() => {
      const {data: {results}} = await axios.get(`${url}/${topRated}?api_key=${apikey}`)
      settopRatedMovies(results)
    };
    const getallGenre = async() => {
      const {data: {genres}} = await axios.get(`${genreUrl}/genre/movie/list?api_key=${apikey}`)
      setGenre(genres);
    };
    getallGenre();

    fetchupcoming();
    fetchnowPlaying();
    fetchpopular();
    fetchnowtopRated();
  }, [])

  return (
    <section className="home">
      <div className="banner" style={{
        backgroundImage: popularMovies[0]? `url(${`${imgurl}/${popularMovies[0].poster_path}`})`:"rgb(16, 16, 16)"
      }}>
          {
            popularMovies[0] &&
            (
              <h1>{popularMovies[0].original_title}</h1>
            )
          }
          {
            popularMovies[0] && (
              <p>{popularMovies[0].overview}</p>
            )
          };
          <div>
          <button><BiPlay/>Play  </button>
          <button>My List <AiOutlinePlus /></button>
          </div>
      </div>

      <Row title={"Upcoming Movies"}  arr={upcomingMovies}/>
      <Row title={"Now Playing"}  arr={nowPlayingMovies}/>
      <Row title={"Popular Movies"}  arr={popularMovies}/>
      <Row title={"Top-Rated Movies"}  arr={topRatedgMovies}/>

      <div className="genreBox">

      {genre.map((item)=>(
        <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
      ))}

      </div>
    </section>
  )
}

export default Home

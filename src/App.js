import React, { useState } from 'react';
import axios from 'axios';
import SearchResult from './components/searchResult';
import Nominee from './components/nominations';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const App = () => {
  const [entry, setEntry] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const [nominated, setNominated] = useState([]);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');

  const toggle = () => {
    setModal(!modal)
    if(error !== "") setError("");
  };

  var movieInNominated = JSON.parse(localStorage.getItem('nominationList'));
  if(movieInNominated && nominated.length === 0) {
    setNominated(movieInNominated)
  }

  const searchForMovie = e => {
    let entryData = e.target.value
    setEntry(entryData)
    getData(entryData)
  }

  function getData(val) {
    axios.get(`http://www.omdbapi.com/?apikey=6c327448&t=${val}`)
    .then(res => {
      if(!res.data.Error) {
        let indexNum;
        let existingMovie;
        let arrayData = searchResults.filter( (movie, idx) => {
          if(movie.movie.Title === res.data.Title) {
            indexNum = idx
            existingMovie = movie
            return null
          }
          else return movie
        })
        if(indexNum !== undefined && indexNum < arrayData.length && existingMovie) {  
          arrayData.pop()
          arrayData.push(existingMovie)
        }
        else {
          arrayData.push({movie: res.data, nominated: false})
        }
        setSearchResult(arrayData);
      }
      else if(entry.length === 1 && searchResults.length >= 1) {
        setSearchResult([])
      }
    })
  }

  const nominateMovie = num => {
    if (nominated.length < 5){
      searchResults[num].nominated = true
      setSearchResult([...searchResults])
      nominated.push(searchResults[num])
      localStorage.setItem('nominationList', JSON.stringify(nominated));
      setNominated(nominated)

    }
    else{
      let name = searchResults[num].movie.Title
      setError(name)
      toggle();
    }
  }

  const removeNomination = movie => {
    let updatedNominee = nominated.filter(item => item !== movie)
    if (updatedNominee.length > 0){
      localStorage.setItem('nominationList', JSON.stringify([...updatedNominee]))
    }
    localStorage.removeItem('nominationList')
    setNominated(updatedNominee)
    let found = false
    let updatedSearchList = searchResults.map(item => {
      if(item === movie) {
        item.nominated = false;
        found = true
      }
      return item
    })
    found ? setSearchResult(updatedSearchList) : found = !found
  }

  return (
    <div className="container col-md-10 my-md-5 p-4 bg-secondary">
      <h1 className="display-4 text-info my-4">The Shoppies</h1>
      <p className = "my-2">Please enter a movie name and nominate your top 5 favorite movies of all time for the <b>Shoppies Awards</b></p>
      <div className="my-3">
        <form>
          <div className="form-group">
            <input type="text" className="form-control form-control-lg" placeholder="Enter movie title" value={entry} onChange={searchForMovie} />
          </div>
        </form>
      </div>
      <div className="row">
        <SearchResult query={entry} data={searchResults} nominate={nominateMovie} />
        <Nominee data={nominated} editNomination={removeNomination} />
        <Modal isOpen={modal} toggle={toggle} style={{top: "250px"}} >
          <ModalHeader><b className= "text-info">Too Many Nominations!!!</b></ModalHeader>
            <ModalBody>We know you love your movies - which makes it hard to choose - but, <b>{error}</b> cannot be nominated because you have reached the maximum number of nominations.</ModalBody>
            <ModalFooter>
              <Button color="warning" onClick={toggle}>Cancel</Button>{' '}
            </ModalFooter>
        </Modal>
      </div>
    </div>
  )
}

export default App;
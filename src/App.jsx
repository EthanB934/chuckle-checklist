import { useEffect, useState } from "react"
import { getAllJokes, saveNewJoke } from "./services/jokeService"
import stevePic from "./assets/steve.png"
import "./App.css"

export const App = () => {
  // Initial state as deconstructed arrays. UserInput and isTold are tracked state that will be sent to permanent state
  // All else is dealing with the permanent state itself 

  const [userInput, setUserInput] = useState(" ")
  const [isTold, setTold] = useState(false)
  const [allJokes, setAllJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])

  // Object to pass into the POST function as an argument 
  const jokeFrame = {
    text: userInput,
    told: isTold
  }

  // To keep from infinitely regenerating HTML, this function set the value of allJokes states once, upon initial render
  useEffect( () => {
    getAllJokes().then(jokesArray => {
      setAllJokes(jokesArray)
      console.log(allJokes)
    })
  }, [])

  // To filter objects in permanent state based on their told property. Storing a collection of objects with false into one variable and the rest in another. 
  useEffect(() => {
    if(allJokes) {
      const untoldJokes = allJokes.filter((joke) => joke.told === false)
      setUntoldJokes(untoldJokes)
      const toldJokes = allJokes.filter((joke) => joke.told === true)
      setToldJokes(toldJokes)
    }
    // Dependency Array, allJokes is needed to display filtered jokes arrays on initial browser load
  }, [allJokes])

  // HTML generation, wrapped in a React fragment
  return <> 
    <div className="app-container"> 
      <div className="app-heading">
        <div className="app-heading-circle" >
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <h1 className="app-heading-text">
        Chuckle Checklist
        </h1>
      </div>
        <h2>Add Joke</h2>
      <div className="joke-add-form">
      <input 
      className="joke-input" 
      type="text" 
      placeholder="A new one liner" 
      value={userInput} // Interpolates the set value in state. This ties the input field to our state. 
      onChange={(event) => {
        setUserInput(event.target.value)
        //console.log("type: ", typeof event, event) //event is the data type object 
      }}>
      </input>
      <button className="joke-input-submit"
      onClick={() => {
        // Runs saveNewJoke, POST function with tracked transient state object as an argument
        saveNewJoke(jokeFrame)
        // .then method used here to after the return on saveNewJoke function 
        .then(() => {
          // receive the updated array of allJokes, since saveNewJoke has added a new entry in the database. 
          return getAllJokes()
        })
        // after allJokes has been returned, including the newJoke added to the array, reset the state passing in the new array of allJokes as an argument to the setter function
        .then(updatedJokes => {
          setAllJokes(updatedJokes)
        })
        // Reinitializes the value of userInput, clears text field when button is clicked
        setUserInput("")
      }}>
        Add a new joke
      </button>
      </div>
      <div className="joke-lists-container">
        <section className="joke-list-container">
        <h2>
          Untold Jokes <span className="untold-count">{untoldJokes.length}</span>
        </h2>
      {untoldJokes.map((untoldJoke) => {
        // Uses .map method to generate HTML for each untoldJoke objects that was filtered in useEffect
        return (
            <div className="joke-list-item" key={untoldJoke.id}>
              <p className="joke-list-item-text">{untoldJoke.text}</p>
            </div>
        )
      })}
      </section>
      <section className="joke-list-container">
        <h2> 
          Told Jokes <span className="told-count">{toldJokes.length}</span>
        </h2>
       {toldJokes.map((toldJoke) => {
        // Uses .map method to generate HTML for each toldJoke objects that was filtered in useEffect
         return (
            <div className="joke-list-item" key={toldJoke.id}>
              <p className="joke-list-item-text">{toldJoke.text}</p>
            </div>
        )
      })}
      </section>
      </div>
    </div>
  </> 
}
/*
  Problem: We are displaying all of the jokes by first filtering them on the basis of their .told property value (boolean). We are mapping this filtered arrays for their 
  display on the browser. The problem is now, that, once a new joke has been added, the HTML is not regenerating to display the new addition to permanent state. The POST
  function is definitely working, it is sending the new joke object to the database.
*/
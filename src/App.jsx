import { useEffect, useState } from "react"
import { getAllJokes, saveNewJoke } from "./services/jokeService"
import stevePic from "./assets/steve.png"
import "./App.css"

export const App = () => {
  const [userInput, setUserInput] = useState(" ")
  const [isTold, setTold] = useState(false)
  const [allJokes, setAllJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])

  const jokeFrame = {
    text: userInput,
    told: isTold
  }

  useEffect(() => {
    getAllJokes().then(jokesArray => {
      setAllJokes(jokesArray)
    })
  }, [])

  useEffect(() => {
    if(allJokes) {
      const untoldJokes = allJokes.filter((joke) => joke.told === false)
      setUntoldJokes(untoldJokes)
      const toldJokes = allJokes.filter((joke) => joke.told === true)
      setToldJokes(toldJokes)
    }
  }, [allJokes])

  return <>
    <div className="app-container"> 
      <div className="app-heading">
        <div className="app-heading-circle">
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
      value={userInput}
      onChange={(event) => {
        setUserInput(event.target.value)
        //console.log("type: ", typeof event, event) //event is the data type object 
      }}>
      </input>
      <button className="joke-input-submit"
      onClick={() => {
        saveNewJoke(jokeFrame)
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
  Problem: When the user inputs a new joke, the button should add a new joke to the database. We have a function for the button.
  Once the button is clicked, the state is set to true. The button is currently functioning on this basis. The user input is being set with
  the setUserInput function. It is being stored in the state userInput variable. Since we want to add this userInput to the database
  we will need a function that fetches the database and POSTs the userInput, the new joke for later rendering. We have a function that will POST to the database
  in another module. We want to insure that when the POST takes place the object contains two keys, the userInput and told (a boolean).

  Tasks:
  (1) Create a POST function in .js module
  (2) Import POST function to this module
  (3) Store state values to object keys
  (4) Pass state object as an argument to POST function 

  Problem: We are saving new user input data on clicks. They are being stored in permanent state. However, we want to clear the input field after the click has happened
  and the user input data has been saved to permanent state. Currently our, "state is tied to our input field. We must find a "tie our input field to our state."
  How exactly is our state tied to our input field at the moment? 
    
    const [userInput, setUserInput] = useState("")
  
  We are passing in an empty string as an argument to useState. Our setterFunction is taking this value and initializing the userInput variable with the empty string. We
  know that our functions are working currently, that is, we are saving user input data as the type in the input field. So, this argument is changing every time an entry 
  is made in the input field. For example: 

    useState("A new one liner")
  
  Now, our setUserInput function is initializing the userInput variable with this string. This is being performed with the onChange function on the input field: 

    onChange={(event) => {
        setUserInput(event.target.value)
    }}>

  The event in the onChange function is an object. It has properties that we are referencing. First, the event object itself, then the target of the event, and finally, the
  value of the target of the event. 

  Let's see the flow: 

    onChange={(event) => {
        setUserInput("A new one liner")
    }}>
  
    useState("A new one liner")

    const [userInput, setUserInput] = useState("")

  Our state is tied to our input field. 

How can we tie our input field to our state? 


*/
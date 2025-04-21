// This function will be invoked in app.jsx module to send the tracked state into permanent state 
export const saveNewJoke = async (jokeFrame) => {
    const jokeForm = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jokeFrame)
    }
    return await fetch("http://localhost:8088/jokes", jokeForm)
}

export const updateJoke = async (updatedJoke) => {
    const jokeForm = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedJoke)
    }
    return await fetch(`http://localhost:8088/jokes/${updatedJoke.id}`, jokeForm)
}

export const deleteJoke = async (joke) => {
    const jokeForm = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(joke)
    }
    return await fetch(`http://localhost:8088/jokes/${joke.id}`, jokeForm)
}
// http://localhost:8088/jokes/${untoldJoke.id} is the proper pathing for a PUT request. 
// Not http://localhost:8088/jokes/
// Nor http://localhost:8088/${untoldJoke.id}

// This function will be invoked in the app.jsx module so that all objects may be filtered by the boolean value set on their told key. 
export const getAllJokes = async () => {
    return await fetch("http://localhost:8088/jokes").then((res) => res.json())
}
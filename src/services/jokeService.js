// This function will be invoked in app.jsx module to send the tracked state into permanent state 
export const saveNewJoke = async (jokeFrame) => {
    const jokeForm = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jokeFrame)
    }
    const response = await fetch("http://localhost:8088/jokes", jokeForm)
}

// This function will be invoked in the app.jsx module so that all objects may be filtered by the boolean value set on their told key. 
export const getAllJokes = async () => {
    return await fetch("http://localhost:8088/jokes").then((res) => res.json())
}
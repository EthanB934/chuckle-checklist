
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

export const getAllJokes = () => {
    return fetch("http://localhost:8088/jokes").then((res) => res.json())
}
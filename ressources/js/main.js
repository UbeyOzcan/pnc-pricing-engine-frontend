const petPromise = await fetch("https://learnwebcode.github.io/pet-adoption-data/pets.json")
const pets = await petPromise.json()

console.log(pets)

const template = document.querySelector("#animal-card")
const wrapper = document.createElement("div")

function decideAgeText(age) {
    if (!age) {
        return "Less than a year old"
    } else if (age === 1) {
        return `${age} year old`
    } else {
        return `${age} years old`
    }

}

pets.forEach(pet => {
    const clone = template.content.cloneNode(true)

    clone.querySelector("h3").textContent = pet.name

    const img = clone.querySelector("img")
    img.src = pet.photo
    img.alt = `A ${pet.species} named ${pet.name}`

    const age = new Date().getFullYear() - pet.birthYear
    clone.querySelector(".age").textContent = decideAgeText(age)
    clone.querySelector(".species").textContent = pet.species
    clone.querySelector(".description").textContent = pet.description
    clone.querySelector(".name").textContent = pet.name
    
    wrapper.appendChild(clone)
})

document.querySelector(".animals").appendChild(wrapper)

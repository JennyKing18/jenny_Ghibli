const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)


// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://ghibliapi.herokuapp.com/people', true)

request.onload = function () {
  // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    data.forEach((person) => {
        // Log each persona name
        console.log(person.name)
        // Create a div with a card class
        const card = document.createElement('div')
        card.setAttribute('class', 'card')

        // Create an h1 and set the text content to the persona name
        const h1 = document.createElement('h1')
        h1.textContent = person.name

        // Create a p and set the text content to the persona description
        const p = document.createElement('p')
        person.description = person.gender + ' '+ ' Age '+ person.age
        p.textContent = person.gender + ' - '+ ' Age '+ person.age

        
        // Append the cards to the container element
        container.appendChild(card)

        // Each card will contain an h1 and a p
        card.appendChild(h1)
        card.appendChild(p)
        // card.appendChild(b)

    })
}

// Send request
request.send()
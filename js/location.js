const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);
async function fetchData() {
    try {
      const response = await fetch('https://ghibliapi.vercel.app/locations');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse the JSON data
      const data = await response.json();
      data.forEach((location) => {        
        // Create a div with a card class
        const card = document.createElement('div')
        card.setAttribute('class', 'card')
  
        const h1 = document.createElement('h1')
        h1.textContent = location.name;
        
        const h2 = document.createElement("h2");
        getTitle(location,h2);

        const p = document.createElement('p')
        p.textContent = "Climate: "+location.climate;

        const p2 = document.createElement('p')
        p2.textContent = "Terrain: "+location.terrain;
  
  
        // Append the cards to the container element
        container.appendChild(card);
  
        // Each card will contain an h1 and a p
        card.appendChild(h1);
        card.appendChild(h2);
        card.appendChild(p);
        card.appendChild(p2);        
    });
    }catch{
      // Handle any errors
      console.error('Error fetching data:', error);
    }
}
  
async function getTitle(location,h2)
{
    const filmUrl = location.films[0]; // Get first film URL

    try {
        const response = await fetch(filmUrl);
        const filmData = await response.json();

        h2.textContent = "Film: "+filmData.title; // Set the film title
    } catch (error) {
        console.error("Error fetching film data:", error);
        h2.textContent = "Film not found";
    }
}

  
  // Send request
  fetchData();
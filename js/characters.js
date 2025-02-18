const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);


async function fetchData() {
  try {
    // Fetch data from the API
    const response = await fetch('https://ghibliapi.vercel.app/people');

    // Check if the response is successful
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON data
    const data = await response.json();

    // Process each person in the data
    data.forEach((person) => {        
      // Create a div with a card class
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      // Create h1 set person's name
      const h1 = document.createElement('h1');
      h1.textContent = person.name;

      // Create p, set person's gender and age
      const p = document.createElement('p');
      p.textContent = `${person.gender} - Age ${person.age}`;

      // Append the card to the container element
      container.appendChild(card);

      // Append the h1 and p to the card
      card.appendChild(h1);
      card.appendChild(p);

      //Create Img holder
      const imageElement = document.createElement("img");
      imageElement.alt = `${person.name} Image`; 
      imageElement.style.width = '100px'; 

      // Fetch Image using Google API
      fetchCharacterImage(person.name,card,imageElement);
      });
  } catch (error) {
      // Handle any errors
      console.error('Error fetching data:', error);
  }
}

async function fetchCharacterImage(name,card,imgElement) {
  
    // Neede apiKey and engine ID from Google Cloud
    const searchEngineID = "02c07817b2b004f8d";
    const apiKey = "AIzaSyC_iFp0QucOU2kCk3g46Ybju1D68Y9STVg";
    const query = "${name} Ghibli";

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${searchEngineID}&searchType=image&key=${apiKey}`;
    // Check if the response is successful
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.items && data.items.length > 0) {
        const firstImageUrl = data.items[0].link;
        console.log("Image URL",firstImageUrl);
        imgElement.src = firstImageUrl; // Set the image source
      } else {
        console.log('No image found for:', name);
        imgElement.src = 'placeholder.jpg'; // Use a placeholder image if no image is found
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      imgElement.src = 'placeholder.jpg'; // Use a placeholder image if there's an error
    }
    card.appendChild(imgElement);
    
  }
// fetch & display
fetchData();
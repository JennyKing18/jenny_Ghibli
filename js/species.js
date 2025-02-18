const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

let speciesType = [];

async function fetchData()
{
  const card = document.createElement('div')
  card.setAttribute('class', 'card')
  const h1 = document.createElement('h1')
  h1.textContent = "Species in Ghibli Movies";
  card.appendChild(h1);
  container.appendChild(card);
  const p = document.createElement('p')
  try {
      const response = await fetch('https://ghibliapi.vercel.app/species');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse the JSON data
      const data = await response.json();
      data.forEach((type) => {      

        if(isInList(type)){
          // Create a p and set the text content to the film's description
          if(p.textContent==="")
            {
              p.textContent=type.name;    
            }
          p.textContent= p.textContent+", "+type.name;          
          speciesType.push(type);
          
        }
 
              
      });
      card.appendChild(p);  
    }catch(error) {

    }
}
function isInList(type)
{
  //Controls duplicates
  for(let i = 0; i < speciesType.length; i++)
    {
      if(type === speciesType[i]){
        console.log("repetido");
        return false;
        
      }
    }
    console.log(speciesType);
    console.log("nuevo",type);
    return true;
}
//send request
fetchData();
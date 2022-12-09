

const init = () =>{
const darkModeButton = document.getElementById("dark-mode-button");

// toggles the class in the dark mode html button

darkModeButton.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
});

// Checks the user's preference for dark/light mode 
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add("dark-mode");
  }
}

// handleSubmit runs whenever user submits their input which then filters it with the fetched api

const handleSubmit = e =>{
    e.preventDefault()
    
    let agentContainer = document.getElementById("agent-container")
    let nestedAgent = agentContainer.querySelectorAll('div')

    if(nestedAgent.length > 0){
      for (var i = 0; i < nestedAgent.length; i++) {
        nestedAgent[i].remove();
      }
    }

    const searchTerm = e.target.search_req.value
   fetch("https://valorant-api.com/v1/agents", {
    method:"GET"
   })
   .then(res => res.json())
   .then(agents => {
    let filteredAgent = agents.data.filter(agent =>{
      return agent.displayName.toLowerCase() === searchTerm.toLowerCase() && agent.isPlayableCharacter === true
    })
        // Create a div element
        const div = document.createElement('div');
        div.classList.add("agent")

        // Create an image element and set its src attribute
        const img = document.createElement('img');
        img.src = filteredAgent[0].displayIcon;
        img.alt = filteredAgent[0].displayName;
        img.width = 125;
        img.height = 125;

        // Create a p element and set its text content
        const p = document.createElement("p")
        p.innerText=filteredAgent[0].displayName

          
      // Append the image and p elements to the div
      div.appendChild(img);
      div.appendChild(p);
      
      // Append the div to the DOM
      document.getElementById("agent-container").appendChild(div);
   }
   
   
   )}

const renderAgents = () =>{
    fetch("https://valorant-api.com/v1/agents", {
        method:"GET"
    })
    .then(res => res.json())
    .then(agents => {
        
     return agents.data.map(agent =>{
        // Create a div element
        const div = document.createElement('div');

        // Create an image element and set its src attribute
        const img = document.createElement('img');
        img.src = agent.displayIcon;
        img.alt = agent.displayName;
        img.width = 125;
        img.height = 125;

        // Create a p element and set its text content
        const p = document.createElement("p")
        p.innerText=agent.displayName

          
      // Append the image and p elements to the div
      div.appendChild(img);
      div.appendChild(p);
      
      // Append the div to the DOM
      document.getElementById("agent-container").appendChild(div);
     })
        
      
    })
}

const form = document.getElementById("form")
form.addEventListener("submit", handleSubmit)

if(!form.onsubmit){
    renderAgents()
}

document.addEventListener("DOMContentLoaded",init)
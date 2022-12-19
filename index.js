

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


const clearAgentContainer = () =>{
   // checks to see if there's any agent divs already inplace
   let nestedAgent = document.querySelectorAll("#agent-container div");

   // if there's any agent divs this iterates over all divs and removes all previous searched agents
   if (nestedAgent.length > 0) {
     nestedAgent.forEach((el) => el.remove());

   }

}


// handleSubmit runs whenever user submits their input which then filters it with the fetched api

const handleSubmit = async (e) => {

  const homebtn = document.getElementById("home-btn")
      homebtn.addEventListener("click", renderAgents);
      document.getElementById("agent-container").style.gridTemplateColumns ='repeat(4, 1fr)'

  e.preventDefault();

  clearAgentContainer()
  
  // stores the user input into searchTerm
  const searchTerm = e.target.search_req.value;

  try {
    // Use the async getDataFromAPI function to fetch the data from the API
    const agents = await getDataFromAPI();
    const filteredAgent = agents.data.find((agent) => {
      return (
        agent.displayName.toLowerCase() === searchTerm.toLowerCase() &&
        agent.isPlayableCharacter === true
      );
    });

    // some logic to make sure user is spelling correctly or if there's no input on submit
    if (searchTerm === "") {
      alert("Please input a valid agent name!");
      renderAgents()
    } else if (!filteredAgent) {
      alert("make sure the name you entered is spelt correctly!");
      renderAgents()
    } else {
      // Create a div element
      const div = document.createElement("div");
      div.classList.add("agent");

      // Create an image element and set its src attribute
      const img = document.createElement("img");
      img.src = filteredAgent.displayIcon;
      img.alt = filteredAgent.displayName;
      img.width = 125;
      img.height = 125;

      // Create a p element and set its text content
      const agentName = document.createElement("p");
      const agentRole = document.createElement("p");
      const agentDescription = document.createElement("p");
      agentName.innerText = filteredAgent.displayName;
      agentRole.innerText = filteredAgent.role.displayName;
      agentDescription.innerText = filteredAgent.description;

      // Append the image and p elements to the div
      div.appendChild(img);
      div.appendChild(agentName);
      div.appendChild(agentRole);
      div.appendChild(agentDescription);

      // Append the div to the DOM
      document.getElementById("agent-container").appendChild(div);
      document.getElementById("agent-container").style.gridTemplateColumns ='repeat(1, 1fr)'
      
    }
  } catch (error) {
    console.error(error);
  }
};


// this function makes it simpler to fetch data.
   const getDataFromAPI = async() => {
    try {
      // Send a GET request to the API
      const response = await fetch('https://valorant-api.com/v1/agents');
  
      // If the response is successful, parse the JSON data
      const data = await response.json();
  
      // Return the data
      return data;
    } catch (error) {
      // If there is an error, log it to the console
      console.error(error);
    }
  }
  


  //  this renders all agents on refresh so the user knows what to input into the search bar.
  const renderAgents = async () => {
    const homebtn = document.getElementById("home-btn")
    homebtn.addEventListener("click", renderAgents);
    document.getElementById("agent-container").style.gridTemplateColumns ='repeat(4, 1fr)'


    clearAgentContainer()

    try {
      // Use the async getDataFromAPI function to fetch the data from the API
      const agents = await getDataFromAPI();
      const agentElements = agents.data
        .filter((agent) => agent.isPlayableCharacter)
        .map((agent) => {
          // Create a div element
          const div = document.createElement("div");
          div.classList.add("agent");
  
          // Create an image element and set its src attribute
          const img = document.createElement("img");
          img.src = agent.displayIcon;
          img.alt = agent.displayName;
          img.width = 125;
          img.height = 125;
  
          // Create a p element and set its text content
          const agentName = document.createElement("p");
          const agentRole = document.createElement("p");
          agentName.innerText = agent.displayName;
          agentRole.innerText = agent.role.displayName;
  
          // Append the image and p elements to the div
          div.appendChild(img);
          div.appendChild(agentName);
          div.appendChild(agentRole);
  
          // Return the div element
          return div;
        });
  
      // Append the agent elements to the DOM
      document.getElementById("agent-container").append(...agentElements);
    } catch (error) {
      console.error(error);
    }

    


  };
  

const form = document.getElementById("form")
form.addEventListener("submit", handleSubmit)

// this renders all agents if the form has not been submitted, once submitted the filtered agents show.
if(!form.onsubmit){
    renderAgents()
}

document.addEventListener("DOMContentLoaded",init)
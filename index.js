


const init = () =>{
const darkModeButton = document.getElementById("dark-mode-button");


darkModeButton.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
});


if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add("dark-mode");
  }
}

const clearAgentContainer = () =>{
  
   let nestedAgent = document.querySelectorAll("#agent-container div");

   if (nestedAgent.length > 0) {
     nestedAgent.forEach((el) => el.remove());

   }

}




const handleSubmit = async (e) => {

  const homebtn = document.getElementById("home-btn")
      homebtn.addEventListener("click", renderAgents);

      document.getElementById("agent-container").style.gridTemplateColumns ='repeat(4, 1fr)'

  e.preventDefault();

  clearAgentContainer()

  const searchTerm = e.target.search_req.value;

  try {
 
    const agents = await getDataFromAPI();
    const filteredAgent = agents.data.find((agent) => {
      return (
        agent.displayName.toLowerCase() === searchTerm.toLowerCase() &&
        agent.isPlayableCharacter === true
      );
    });

   
    if (searchTerm === "") {
      alert("Please input a valid agent name!");
      renderAgents()
    } else if (!filteredAgent) {
      alert("make sure the name you entered is spelt correctly!");
      renderAgents()
    } else {
 
      const div = document.createElement("div");
      div.classList.add("agent");

   
      const img = document.createElement("img");
      img.src = filteredAgent.displayIcon;
      img.alt = filteredAgent.displayName;
      img.width = 125;
      img.height = 125;

      const newButton = document.createElement("button")
      newButton.innerText="Counter"

      let counter = 0
      const displayCount = document.createElement("p")
      displayCount.innerText = counter

      const incrementalCounter = () => {
        counter++

        displayCount.innerText=counter
        console.log(counter)
      }



      newButton.addEventListener("click", incrementalCounter)


      const agentName = document.createElement("p");
      const agentRole = document.createElement("p");
      const agentDescription = document.createElement("p");
      agentName.innerText = filteredAgent.displayName;
      agentRole.innerText = filteredAgent.role.displayName;
      agentDescription.innerText = filteredAgent.description;


      div.appendChild(img);
      div.appendChild(newButton);
      div.appendChild(displayCount)
      div.appendChild(agentName);
      div.appendChild(agentRole);
      div.appendChild(agentDescription);

 
      document.getElementById("agent-container").appendChild(div);
      document.getElementById("agent-container").style.gridTemplateColumns ='repeat(1, 1fr)'
      
    }
  } catch (error) {
    console.error(error);
  }
};



   const getDataFromAPI = async() => {
    try {
  
      const response = await fetch('https://valorant-api.com/v1/agents');
  
  
      const data = await response.json();
  

      return data;
    } catch (error) {
    
      console.error(error);
    }
  }
  



  const renderAgents = async () => {
    const homebtn = document.getElementById("home-btn")
    homebtn.addEventListener("click", renderAgents);

    document.getElementById("agent-container").style.gridTemplateColumns ='repeat(4, 1fr)'


    clearAgentContainer()

    try {
    
      const agents = await getDataFromAPI();
      const agentElements = agents.data
        .filter((agent) => agent.isPlayableCharacter)
        .map((agent) => {
         
          const div = document.createElement("div");
          div.classList.add("agent");
  
       
          const img = document.createElement("img");
          img.src = agent.displayIcon;
          img.alt = agent.displayName;
          img.width = 125;
          img.height = 125;
  
       
          const agentName = document.createElement("p");
          const agentRole = document.createElement("p");
          agentName.innerText = agent.displayName;
          agentRole.innerText = agent.role.displayName;
  
         
          div.appendChild(img);
          div.appendChild(agentName);
          div.appendChild(agentRole);
  
       
          return div;
        });
  
     
      document.getElementById("agent-container").append(...agentElements);
    } catch (error) {
      console.error(error);
    }

    


  };
  

const form = document.getElementById("form")
form.addEventListener("submit", handleSubmit)


if(!form.onsubmit){
    renderAgents()
}
document.addEventListener("DOMContentLoaded",init)


// whenever we render our filtered character, add a button in js that counts starting from 0
// create button
// add the event listener using the click method
// make a function that increments the p tag next to the button by 1
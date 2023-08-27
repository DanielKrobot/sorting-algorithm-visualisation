const graph = document.querySelector("#graph");
const shuffle = document.querySelector("#shuffle");
const start = document.querySelector("#start");

let arr = [];
let isSorting = false;

for (let i = 1; i <= 50; i++) {
    arr.push(i * 5);
}

for (let i = 0; i < arr.length; i++) {
    let element = document.createElement("div");
    element.style.height = arr[i] + "px";
    graph.appendChild(element);
}

function updateGraph() {
    graph.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
        let element = document.createElement("div");
        element.style.height = arr[i] + "px";
        graph.appendChild(element);
    }
}

function shuffleArray() {
    if (isSorting) return;
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    updateGraph()
}

function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

async function sort() {
    isSorting = true;
    for (let i = 0; i < arr.length; i++) {

        for (let j = 0; j < arr.length - i - 1; j++) {
            let graphElemnts = graph.querySelectorAll("*")
            graphElemnts[j].style.backgroundColor = "green";
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
            await wait(1)
            updateGraph() 
            
        }     
        
    }
    isSorting = false;
}

shuffle.addEventListener("click", shuffleArray);
start.addEventListener("click", sort);


  

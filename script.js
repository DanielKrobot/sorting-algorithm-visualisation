const graph = document.querySelector("#graph");
const shuffle = document.querySelector("#shuffle");
const start = document.querySelector("#start");
const bubble = document.querySelector("#bubble");
const insertion = document.querySelector("#insertion");
const selection = document.querySelector("#selection");
const merge = document.querySelector("#merge");
const selector = document.querySelectorAll("#selector > button");

let arr = [];
let isSorting = false;
let isSorted = true;
let mobile = false;
let sortType = bubbleSort;

for (let i = 1; i <= 50; i++) {
    arr.push(i * 10);
}

function resize() {
    mobile = window.screen.width < 600 ? true : false;

    if (mobile && arr.every((num) => num % 10 === 0)) {
        arr = arr.map((num) => num / 2);
    } else if (!mobile && !arr.every((num) => num % 10 === 0)) {
        arr = arr.map((num) => num * 2);
    }
    
    updateGraph();
}

resize();

window.addEventListener("resize", resize)

function updateGraph() {
    graph.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
        let element = document.createElement("div");
        element.style.height = arr[i] + "px";
        graph.appendChild(element);
    }
}

updateGraph()

function shuffleArray() {
    if (isSorting) return;
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    isSorted = false;
    updateGraph()
}

function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

async function bubbleSort() {
    if (isSorting || isSorted) return;
    isSorting = true;
    for (let i = 0; i < arr.length; i++) {

        for (let j = 0; j < arr.length - i - 1; j++) {
            let graphElemnts = graph.querySelectorAll("*");
            graphElemnts[j].style.backgroundColor = "green";
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                // let temp = arr[j + 1];
                // arr[j + 1] = arr[j];
                // arr[j] = temp;
            }
            await wait(10)
            updateGraph() 
            
        }     
        
    }
    isSorting = false;
    isSorted = true;
}

async function insertionSort () {
    if (isSorting || isSorted) return;
    isSorting = true;
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;

        let graphElemnts = graph.querySelectorAll("*");
        graphElemnts[i].style.backgroundColor = "green";

        while (j >= 0 && current < arr[j]) {
            graphElemnts[j].style.backgroundColor = "red";
            await wait(20)
            graphElemnts[j].style.backgroundColor = "var(--color-5)";
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
        await wait(50);
        updateGraph();
    }
    isSorting = false;
    isSorted = true;
}

async function selectionSort() {
    if (isSorting || isSorted) return;
    isSorting = true;
    
    for (let i = 0; i < arr.length; i++) {
        let graphElemnts = graph.querySelectorAll("*");
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            graphElemnts = graph.querySelectorAll("*");
            if (arr[j] < arr[min]) {
                min = j;
                graphElemnts[j].style.backgroundColor = "green";
            } else {
                graphElemnts[j].style.backgroundColor = "red"
            };
            await wait(20)
            updateGraph()
            graphElemnts = graph.querySelectorAll("*");
            graphElemnts[min].style.backgroundColor = "green";
        }
        if (min !== i) {
            [arr[i], arr[min]] = [arr[min], arr[i]]
            
            graphElemnts[i].style.backgroundColor = "green";
            
        }
        await wait(20)
        updateGraph()
    }
    isSorting = false;
    isSorted = true;
}

async function mergeSort(array) {
    array = await array;
    const mid = array.length / 2;
    if (array.length < 2) return array;

    const left = array.splice(0, mid);
    const first = await mergeSort(left);
    const second = await mergeSort(array)
    const merged = await merging(first, second)
    await wait(100)
    return merged;
}

async function merging(left, right) {
    let graphElemnts = graph.querySelectorAll("*");
    left = await left
    right = await right
    const concatArr = left.concat(right)
    for (const element of concatArr){
        
        graphElemnts[arr.indexOf(element)].style.backgroundColor = "green";
        await wait(50);
    }
    await wait(50)
    updateGraph()
    
    let array = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            array.push(left.shift());
        } else {
            array.push(right.shift());
        }
    }

    array = [...array, ...left, ...right];
    let min = arr.indexOf(concatArr[0]);
    for (let i = 0; i < array.length; i ++) {
        arr[min + i] = array[i]; 
    }
    updateGraph();
    return [...array]; 

}

shuffle.addEventListener("click", shuffleArray);
start.addEventListener("click", () => sortType());

bubble.addEventListener("click", () => {
    if (isSorting) return;
    sortType = bubbleSort;
    selector.forEach(btn => btn.classList.remove("selected"))
    bubble.classList.add("selected")
})

insertion.addEventListener("click", () => {
    if (isSorting) return;
    sortType = insertionSort;
    selector.forEach(btn => btn.classList.remove("selected"))
    insertion.classList.add("selected")
})

selection.addEventListener("click", () => {
    if (isSorting) return;
    sortType = selectionSort;
    selector.forEach(btn => btn.classList.remove("selected"))
    selection.classList.add("selected")
})  

merge.addEventListener("click", () => {
    if (isSorting) return;
    sortType = () => {
        new Promise((resolve) => {
            resolve(mergeSort([...arr]))
        }).then((result) => {
            arr = result;
            updateGraph()
        })
        isSorting = false;
        isSorted = true;
    };
    selector.forEach(btn => btn.classList.remove("selected"))
    merge.classList.add("selected")
})

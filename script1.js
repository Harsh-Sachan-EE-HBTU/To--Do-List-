let inputElem=document.getElementById("inputBox");
let buttonElem=document.getElementById("addplanBtn");
let sectionElem=document.querySelector(".menuList");

const getArray=()=>{
    return JSON.parse(localStorage.getItem("planList"));
};

const arrayListLocalStorage=(arrayList)=>{
    return localStorage.setItem("planList",JSON.stringify(arrayList));
};

let arrayList=getArray() || [];

const addDynamicElem=(curElem)=>{
    const divElem=document.createElement("div");
    divElem.classList.add("taskList");
    divElem.innerHTML=`<li> ${curElem} </li> <button id="deleteBtn">Delete</button>`;
    sectionElem.append(divElem);
};

const handleInputEvent=(e)=>{
    e.preventDefault();
    const arrayVal=inputElem.value.trim();
    inputElem.value="";
    if(arrayVal!="" && !arrayList.includes(arrayVal))
    {
        arrayList.push(arrayVal);
        arrayList=[...new Set(arrayList)];
        
        localStorage.setItem("planList",JSON.stringify(arrayList));
        addDynamicElem(arrayVal);
    }
};

const displayArray=()=>{
    console.log(arrayList);
      arrayList.forEach((curElem)=>{
      addDynamicElem(curElem);
      })
};
      displayArray();

const handleRemoveEvent=(e)=>{ 
    const removeVal=e.target;
    let taskContent=removeVal.previousElementSibling.innerText;
    let parentElem=removeVal.parentElement;

     arrayList=arrayList.filter((curElem)=>{
        return curElem!=taskContent.toLowerCase();
    });
    arrayListLocalStorage(arrayList);
    parentElem.remove();
    console.log(arrayList);
};

buttonElem.addEventListener("click", (e)=>{
    console.log(e.target);
    handleInputEvent(e);
});

sectionElem.addEventListener("click", (e)=>{
   e.preventDefault();
   console.log(e.target);
   if(e.target.classList.contains("deleteBtn")){
   }
    handleRemoveEvent(e);
});
function readData(files){	
    let file =  inputfile.files[0];	
    
    let reader = new FileReader();	
    reader.readAsText(file);	
    reader.onload = async function(){	
        filecontent.innerHTML = await reader.result;
        
       spellCheck(reader.result);	
    }
}
let err;
async function spellCheck(data){
    let url = "https://api.textgears.com/grammar?key=wF4nKAm0SzmgBeEd&text="+data;
    let response = await fetch(url);
   
    if(response.ok){
        err = await response.json();
        
        for(let word of err.response.errors){
           wrongWords(word.bad);
        }
    }
}
function wrongWords(word) {

    var inputText = document.getElementById("filecontent").innerHTML
 
    var index = inputText.indexOf(word);


    if (index !== 0) { 
         inputText = inputText.substring(0,index) + "<span class='highlight' >" + inputText.substring(index,index+word.length) + "</span>" + inputText.substring(index + word.length);
         document.getElementById("filecontent").innerHTML = inputText;
    }
}
document.oncontextmenu = menuBar;
//
document.onclick = hideMenu;


function hideMenu() { 
    document.getElementById("contextMenu").style.display = "none";
}


function menuBar(e){
    e.preventDefault()
    if(e.composedPath().length !== 7){
        var wrongWord = e.path[0].innerHTML		

        var errorWords = err.response.errors;
        var list = document.createElement("div");  
        list.style.backgroundColor = 'lightgreen';
        list.style.width = '50px';	
        for(let i = 0; i<errorWords.length; i++){
            if(errorWords[i].bad == wrongWord) {
                
                const parent = document.getElementById('contextMenu')
                while (parent.firstChild) {
                    parent.firstChild.remove()
                }
    
                for(let j = 0; j < errorWords[i].better.length; j++ ){

    		
                    var li = document.createElement("li");
                    li.innerText = errorWords[i].better[j];
    
                    
                    li.addEventListener('click', (ev) => {
                        e.path[0].innerHTML = ev.path[0].innerHTML;
                        e.path[0].classList.remove('highlight')
                    }
                    )
                    list.appendChild(li);
    			list.style.listStyleType = "none";
                }
                document.getElementById('contextMenu').appendChild(list);
                
    }
}
if (document.getElementById("contextMenu").style.display == "block") 
hideMenu(); 

    else { 
        var menu = document.getElementById("contextMenu") 
              
        menu.style.display = 'inline'; 
        menu.position = "relative";
        menu.style.left = e.clientX + "px"; 
        menu.style.top = e.clientY + "px"; 
    }
    console.log("Inside menubar");
}
}
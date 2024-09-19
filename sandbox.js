const Box =
    [[, , , ,],
     [, , , ,],
     [, , , ,],
     [, , , ,]
    ]


//function that generates a* min <= random number <= max*
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//function to select which image to assign for each case
function picassign(num){
    if (num == 1){
        return 'js';
    }else if(num == 2){
        return 'cpp';
    }else if (num == 3){
        return 'py';
    }else if(num ==4){
        return 'html';
    }else if(num == 5){
        return 'css';
    }
}

//function to fill the matrix (assign pictures in the game)
function StartGame(){
    let html = css = js = cpp = py = 0;

    for(i = 0;i <= 3;i++){
        for(j = 0 ; j <= 4 ; j++){
            
            let x = 0;
            do {
               x = picassign(rand(1,5));
            }while ((py >= 4 && x == "py") || (html >= 4 && x == "html") || (js >= 4 && x == "js") || (css >= 4 && x == "css") || (cpp >= 4 && x == "cpp"))

                if(x == "html"){
                    html++;
                }else if(x == "css"){
                    css++;
                }else if(x == "js"){
                    js++;
                }else if(x == "py"){
                    py++;
                }else if(x ==="cpp"){
                    cpp++;
                }
                
            Box[i][j] = x;
            document.getElementsByClassName("Box" + (i+1).toString() + (j+1).toString())[0].getElementsByClassName("BackImage")[0].innerHTML = '<img src="Images\\'+x+'.png" alt="">';
        }   
    }

    let name = prompt("Whats Your Name !");
    document.getElementsByClassName("PlayerName")[0].innerHTML += ' ' + name;
}

console.log(Box);

function flipBox(){
    for(i = 1 ; i <= 4 ; i++){
        for(j = 1 ; j <= 5 ;j++){
            let x = document.getElementsByClassName("Box" + i.toString() + j.toString())[0];
            
            x.addEventListener('click',(event) => {
                if(!x.classList.contains("done"))
                    x.classList.toggle('flipped'); // this will add the div clicked to another class called flipped !
            })
        }
    }
};
//real-time updates


function Game(){
    let wrongTries = 0;
    let num = 0;
    let i = 0;
    for(i = 1 ; i <= 4 ; i++){
        for(j = 1 ; j <= 5 ;j++){
            let x = document.getElementsByClassName("Box" + i.toString() + j.toString())[0];
            x.addEventListener('click',(event) => {
                if(!x.classList.contains("done")){
                    num++; 
                    if (num == 2){
                        if(document.getElementsByClassName("flipped")[0].getElementsByClassName("BackImage")[0].innerHTML == document.getElementsByClassName("flipped")[1].getElementsByClassName("BackImage")[0].innerHTML){
                            setTimeout(function(){
                                document.getElementsByClassName("flipped")[0].classList.toggle("done");
                                document.getElementsByClassName("flipped")[1].classList.toggle("done");
                                document.getElementsByClassName("flipped")[0].classList.remove("flipped");
                                document.getElementsByClassName("flipped")[0].classList.remove("flipped");
                                num = 0;
                            },1000)
                        }else {
                            setTimeout(function(){ 
                                document.getElementsByClassName("flipped")[0].classList.remove("flipped");
                                document.getElementsByClassName("flipped")[0].classList.remove("flipped");
                                num = 0;},1000);
                                wrongTries++;
                                setTimeout(function(){
                                    document.getElementsByClassName("Tries")[0].innerHTML = 'Wrong Tries : ' + wrongTries;
                                },1000)
                            }
                            console.log(num);
                        }
                    }
                }
            )
        }
    }
    
}

StartGame()
flipBox();
Game();
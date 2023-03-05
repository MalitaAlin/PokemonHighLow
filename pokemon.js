
function startscreen(){
    var pokegame=$("#pokegame"); pokegame.css("display","none"); 
var pokemenu=$("#pokemonmenu"); pokemenu.css("display","block"); pokemenu.fadeIn(500);
}
$(window).on('load',  startscreen());

document.addEventListener("keypress", (event) => {
  var name = event.key;
  if (name === 'H' || name === 'h') {
    higherfunc();
  }
}, false); // function that adds a keypress Event Listener and calls rollDice() function if 'r' or 'R' is pressed

document.addEventListener("keypress", (event) => {
  var name = event.key;
  if (name === 'L' || name === 'l') {
   lowerfunc();
  }
}, false); // function that adds a keypress Event Listener and calls rollDice() function if 'r' or 'R' is pressed


var pokeidarr = generateRandomArray(1, 1000); //create array of random numbers between 1 and current nr of registered pokemon //console.log("Id array generated: "+pokeidarr,"Length"+ pokeidarr.length);
var images=[]; var names=[]; var values=[];
var index=0; //index 
//var modetext=$(".lifebox").text().split(" ");
//var mode=modetext[2]; //console.log(mode);

function generateRandomArray(min, max) {
    var arr = [];
while(arr.length < 800 ){ //800 random numbers
    var r = Math.floor(Math.random() * max) + min;
    if(arr.indexOf(r) == -1) arr.push(r);}
return arr;
}


function fetchPokeData(pokemon) {   
  names[index] = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  images[index] =pokemon.sprites.other["official-artwork"].front_default; 
  switch(mode){
    case "bst":
      values[index]=pokemon.stats[0].base_stat+pokemon.stats[1].base_stat+pokemon.stats[2].base_stat+pokemon.stats[3].base_stat+pokemon.stats[4].base_stat+pokemon.stats[5].base_stat;
      break;
    case "pokedex":
      values[index]=pokemon.id.toString().padStart(3, '0');
    break;

    case "height":
      values[index]= parseFloat(pokemon.height)/10;
      break;

     case "weight":
      values[index]=parseFloat(pokemon.weight)/10;
      break;

    default:
      console.log("Error on mode switch");
   } 
  
  }

const fetchPokemon = async () => {//console.log(pokeidarr);
      var url = `https://pokeapi.co/api/v2/pokemon/${pokeidarr[index]}`; // <--- this is saving the pokemon url to a variable to use in the fetch. //Example: https://pokeapi.co/api/v2/pokemon/1/"
      var res = await fetch(url);
      var pokemon = await res.json();
    //  console.log(pokemon+" has stat "+pokemon.stats);
        fetchPokeData(pokemon);
        index++; //loads po
        var url = `https://pokeapi.co/api/v2/pokemon/${pokeidarr[index]}`; // <--- this is saving the pokemon url to a variable to use in the fetch. //Example: https://pokeapi.co/api/v2/pokemon/1/"
        var res = await fetch(url);
        var pokemon = await res.json();
      //  console.log("Pokemon called"+pokemon);
        fetchPokeData(pokemon);
        displayData(); // console.log("Names:" +names,"Values: "+ values,"Images: "+ images );
  };

 // page elements 
 var rs=$("#rightsymbol"); var ws=$("#wrongsymbol");//answer right/wrong symbol
 var cmenu=$('#gamemenu'); var endmenu=$('#endmenu'); //menus
 endmenu.css("display","none"); 

 var score = $('#score');  var scnumber = Number(score.text());//score system 
 var highscore = $('#highscore');  var highscnumber = Number(highscore.text());//highscore system 
 var lives = $('#lifenr'); var lifenumber = lives.text();//life system 

 
 var pokenames=$(".pokename"); //text regarding the name instances of a pokemon
 var pokestats=$(".pokestat"); //texts regarding the stat being compared
 var pokecomparestat=$(".pokecomparestat");//text in compare menu
 var pokeimageleft=$(".pokemondisplay").eq(0);  var pokeimageright=$(".pokemondisplay").eq(1); //images to left and right of the pokemon
 
 
 var value1, value2, name1, name2, image1, image2;
 var n=0;//index used for current  two pokemon displayed 
 
 function setParameters(){
 value1 =Number(values[index-1]);
  value2 = Number(values[index]); //initial values ////the value of the [n+1]th pokemon in the array//console.log(value1);     console.log(value2);
  name1 =names[index-1];
  name2 = names[index]; //initial values//console.log(name1);     console.log(name2);
  image1 =images[index-1];
  image2 = images[index]; //initial values//console.log(image1);     console.log(image2);
var y='<br> <img class="heartimg" src="images/pokeheartimg.png" > x <var id="lifenr">'+lifenumber+'</var>';
  $(".lifebox").html("Mode: "+mode +y);

 }
 
  function setNameImage(){ // sets the names and images for the pokemon
   pokenames.eq(0).text(name1); 
 pokenames.eq(2).text(name2);
 pokenames.eq(1).text(name1);
 pokenames.eq(3).text(name2); //sets pokemon name in the 4 instances of the class
 var imgsource1=image1;
 var imgsource2=image2;
 pokeimageleft.attr("src", imgsource1);   pokeimageleft.fadeOut( 300 ).delay(100).fadeIn( 400 ); 
 pokeimageright.attr("src", imgsource2);  pokeimageright.fadeOut( 300 ).delay(100).fadeIn( 400 ); 
 $(".imagelabel").eq(0).fadeOut( 300 ).delay(100).fadeIn( 400 ); 
 $(".imagelabel").eq(1).fadeOut( 300 ).delay(100).fadeIn( 400 ); 
  }   


 function displayData(){   

    switch(mode){
     case "bst":
 setParameters();
 setNameImage();
 var staticon='<i class="fa-solid fa-chart-bar"></i>'; //icon that is added to the pokestat
 pokestats.eq(0).html(value1+staticon); 
 pokestats.eq(1).html(value2+staticon);//values of each pokestat

 pokestats.eq(1).css("display","none"); //hiding  answer
 pokecomparestat.html(" Base Stat Total"); //compare menu element
 
       break;
 
     case "pokedex":
     setParameters();
     setNameImage();
 var staticon='<i class="fa-solid fa-book-atlas"></i>';
 pokestats.eq(0).html("#"+value1+staticon);
 pokestats.eq(1).html("#"+value2+staticon);//values of each pokestat

 pokestats.eq(1).css("display","none");//hiding  answer
 pokecomparestat.html("Pokedex Number " ); //compare menu element
     break;
 
     case "height":
     setParameters();
     setNameImage();
 var staticon='<i class="fa-solid fa-ruler-vertical"></i>';
 pokestats.eq(0).html(value1+"m"+ staticon );
 pokestats.eq(1).html(value2+"m"+staticon);//values of each pokestat
 pokestats.eq(1).css("display","none");//hiding  answer
 pokecomparestat.html("Height ");   //compare menu element
       break;
 
      case "weight":
      setParameters();
      setNameImage();
 var staticon='<i class="fa-solid fa-weight-hanging"></i>';
 pokestats.eq(0).html(value1+" kg "+ staticon);
 pokestats.eq(1).html(value2+" kg "+ staticon);//values of each pokestat
 pokestats.eq(1).css("display","none");//hiding  answer

 pokecomparestat.html("Weight "); //compare menu element
       break;
 
     default:
       console.log("Error on mode switch");
    } 
 } 
 
 function higherfunc(){
   pokestats.eq(1).css("display","block");
  comparevalues(value1,value2,1); 
                } 
 function lowerfunc(){
   pokestats.eq(1).css("display","block");
 comparevalues(value1,value2,2);
           }           
 
 
 function comparevalues(x,y,guess)
 { 
  if(x==y||(x>y && guess===1 )||( x<y && guess === 2)){
   goodguess(); 
  }
  else{ badguess(); }
 }
 

 function goodguess(){ //console.log("goodguess");
  
  cmenu.fadeOut( 300 ).delay( 1000 ).fadeIn( 400 ); 
 rs.fadeIn( 300 ).delay( 1000 ).fadeOut( 400 ); 
 scnumber++;  
  if(scnumber==10||scnumber==25||scnumber==50||scnumber==100)
  {lifenumber++; lives.text(lifenumber);} //life gain threshold
 score.text(scnumber);
 n++;
 setTimeout(function() { fetchPokemon(); }, 1200);
 //makes check sign appear, call connect.js function, score++
 }
 
 function badguess(){//console.log("badguess");
 
 ws.fadeIn( 300 ).delay( 1000 ).fadeOut( 400 );  //make wrong sign apear, put endmenu
 lives.fadeOut( 300 );
 lifenumber--;//lower the life count7
 y='<br> <img class="heartimg" src="images/pokeheartimg.png" > x <var id="lifenr">'+lifenumber+'</var>';
  $(".lifebox").html("Mode: "+mode +y).fadeIn( 400 );
 
 if(lifenumber==0){
   $("#endscore").text(scnumber);
  cmenu.css("display","none"); 
   endmenu.fadeIn(1800);
  endmenu.css("display","block"); 
 
  if(Number(scnumber)<10){
  $("#endmessage").text("Magikarp ");}
  else if(Number(scnumber)<25){
    $("#endmessage").text("Unown ");
  } else if(Number(scnumber)<51){
    $("#endmessage").text("Slowbro ");
  } else if(Number(scnumber)<76){
    $("#endmessage").text("Orbeetle ");
  } else if(Number(scnumber)<101){
    $("#endmessage").text("Metagross ");
  } else if(Number(scnumber)<201){
    $("#endmessage").text("Tort ");
  }  //adds a message based on the player's performance

  if(Number(scnumber) > Number(highscnumber)){
    highscnumber=scnumber;
    highscore.text(highscnumber);
    localStorage.setItem("highscore", highscnumber);
  }
}else{
     cmenu.fadeOut( 300 ).delay( 1000 ).fadeIn( 400 );

   n++;
   setTimeout(function() { fetchPokemon(); }, 1200);
  }
 }


function replay(){//console.log(highscnumber);
  $(document).ready(function () {location.reload(true);});
 }
 
 //functions for individual version of the site
 function startgame(){
  mode=String($( ".modeselect" ).val());//  console.log(mode);
     highscnumber=  localStorage.getItem("highscore");
    highscore.text(highscnumber);//console.log(highscnumber);
    var pokemenu=$("#pokemonmenu");pokemenu.fadeOut(500);
    var pokegame=$("#pokegame");  pokegame.fadeIn(500);// console.log($( ".modeselect" ).val());
    fetchPokemon();
 }

var mode="bst"; //default
//function setMode(newmode){mode=newmode;} function that used to replace select
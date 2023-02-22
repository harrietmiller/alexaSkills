const getRating = async (movieName) => {
    try {
        //console.log("aaaaah");
      const response = await fetch('http://www.omdbapi.com/?t='+movieName.replace(/\s/g,'+')+'&apikey=f094a884');
      if (!response.ok) {
        console.log("hoi");
      }
      console.log("aaaaah");
      const myJson = await response.json();
      console.log(myJson.Title, myJson.Director);
      return myJson.imdbRating;
    }
    catch (error) {
      return 'Noi';
    }
  }

let a = getRating('shark tale')
a.then((res) => {console.log(res)})

// const getRating = async (spellName) => {
//     try {
//       const response = await fetch('https://www.omdbapi.com/?t=shark+tale&apikey=f094a884');
//       if (!response.ok) {
//         throw 'Spell not found'
//       }

//       const myJson = await response.json();
//       return myJson;
//     }
//     catch (error) {
//         console.log(error);
//       return 'The spell tome doesn\'t seem to contain the spell ' + spellName
//     }
//   }

// let a = getRating('healing-word')
// a.then((res) => {console.log(res)})

const axios =require('axios');
const getSentence=async ()=>{
 const res=  await axios.get("https://api.quotable.io/random");
   return res.data.content.split(" ");
};

module.exports = getSentence;
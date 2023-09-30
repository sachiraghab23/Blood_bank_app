const express = require('express');
const app = express();

const PORT = 8080;

app.get('/',(req,res)=>{
  // res.status(200).json({
  //   message: "Welcome to Blood bank web app",
  // })
  res.status(200).send('<h2>Welcome to Blood bank web app</h2>');
})

app.listen(PORT,()=>{
  console.log(`Server running successfully on port ${PORT}`);
})
// --------Job Model:
// jobSchema include{
// email: String
// };
//--------------------


// -------Disregard if not seeding------------

// seed.js:
// await City.create --> include{
// email: 'student@email.com'
// }
//----------------------------------------------

//---------------------------------------
// IN server.js -->

// const verifyUser = require('./auth0');


// app.use(verifyUser);

// IN -->
// City.find({email:req.user.email});
// Only show data tied/saved to specific email

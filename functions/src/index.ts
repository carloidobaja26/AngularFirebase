import * as functions from "firebase-functions";
import * as express from "express";
import {db} from './init';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//


export const helloWorld = functions.https.onRequest((request, response) => {
  // functions.logger.info("Hello logs!", {structuredData: true});
  response.status(200).json({message: "Hello World!"});
});
// const cors = require('cors');

// const app = express();

// app.use(cors({origin:true}));


// app.get('/courses', async (request, response) => {

//     const snaps = await db.collection('courses').get();

//     const courses:any[] = [];

//     snaps.forEach(snap => courses.push(snap.data()));

//     response.status(200).json({courses});

// });


// export const getCourses = functions.https.onRequest(app);

// export {onAddLesson, onDeleteLesson} from './lessons-counter';

// export {resizeThumbnail} from './image-upload';
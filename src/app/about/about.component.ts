import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from 'app/model/course';
import * as firebase from 'firebase/app';
import {Observable, of} from 'rxjs';
import 'firebase/firestore';

var config = {
  // apiKey: "AIzaSyDAdoefqX5OqjkD3BkW25ZAL6XYZMo4Vz8",
  // authDomain: "fir-course-17549.firebaseapp.com",
  // databaseURL: "https://fir-course-17549.firebaseio.com",
  // projectId: "fir-course-17549",
  // storageBucket: "fir-course-17549.appspot.com",
  // messagingSenderId: "170806523820",
  // appId: "1:170806523820:web:a3181632d54d076a0bec09"
  apiKey: "AIzaSyBGKq0kvLNVZpE5yoKbH8x9kY7J30xmaTU",
  authDomain: "fir-course-c1ca6.firebaseapp.com",
  projectId: "fir-course-c1ca6",
  storageBucket: "fir-course-c1ca6.appspot.com",
  messagingSenderId: "1087119503809",
  appId: "1:1087119503809:web:964f3c3aa71dc05d7e7f40",
  measurementId: "G-6JFFS63HR9"
};

firebase.initializeApp(config);

const db = firebase.firestore();


// const settings = { timestampsInSnapshots: true};

// db.settings(settings);



@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    // db.collection('courses').get()

    
    // .then(snaps => {
    //   const courses : Course[] = snaps.docs.map(snap => {
    //     return <Course>{
    //       id: snap.id,
    //       ...snap.data()
    //     }

    //   });
    //   console.log(courses);
    // });

    // this.db.collection('courses').valueChanges()
    //   .subscribe(val => console.log(val));

    //  this.db.collection('courses').snapshotChanges()
    //   .subscribe(snaps => {

        
    //       const courses: Course[] = snaps.map(snap => {
    //         return <Course> {
    //           id: snap.payload.doc.id,
    //           ...snap.payload.doc.data() as {}

    //         }
    //       })


    //       console.log(courses);
    //   });
    const courseRef = this.db.doc('/courses/2S0owIEQvJozVqMwTzls').snapshotChanges()
                        .subscribe(snap => {
                          const course: any = snap.payload.data();
                          console.log('course.relatedCourseRef', course.relatedCourseRef);
                        });
    const ref = this.db.doc('/courses/k8kEPBB8aREKyqi9h4Gd').snapshotChanges()
                        .subscribe(
                          doc => console.log("ref", doc.payload.ref)
                        )


  }
  save() {
    const firebaseCourseRef = this.db.doc('/courses/2S0owIEQvJozVqMwTzls').ref;
    const rxjsCourseRef = this.db.doc('/courses/k8kEPBB8aREKyqi9h4Gd').ref;
    const batch = this.db.firestore.batch();

    batch.update(firebaseCourseRef,{tittles: {description: 'Firebase Course'}});
    batch.update(rxjsCourseRef,{tittles: {description: 'RxJs Course'}});
    const batch$ = of (batch.commit());
    batch$.subscribe();

  }

  async runTransaction() {
      const newCounter = await this.db.firestore.runTransaction(async transaction => {
        console.log('Running Transaction');
        const courseRef = this.db.doc('/courses/2S0owIEQvJozVqMwTzls').ref;
        const snap = await transaction.get(courseRef);

        const course = <Course>snap.data();
        const lessonCount = course.lessonsCount + 1;
        transaction.update(courseRef,{lessonCount});

        return lessonCount;

      });
      //console.log(newCounter);
  }

}

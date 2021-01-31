import { Injectable } from '@angular/core';
import OrderByDirection = firebase.firestore.OrderByDirection;
import { Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import {Course} from "../model/course";
import {convertSnaps} from "../services/db-utils";
import {first, map, take} from "rxjs/operators";
import { Lesson } from 'app/model/lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private db: AngularFirestore) { 

    }
    
    saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
      return from (this.db.doc(`courses/${courseId}`).update(changes));
          
    }
  


    loadAllCourses(): Observable <Course[]> {
      return this.db.collection(
        'courses', 
        ref => ref.orderBy("seqNo"))
      .snapshotChanges()
      .pipe(
        map(snap => convertSnaps<Course>(snap)),
        first())
  }

  findCourseByUrl(courseUrl: string) : Observable <Course> {
    return this.db.collection('courses',
      ref => ref.where("url","==", courseUrl))
      .snapshotChanges()
      .pipe(
        map(snap => {
          const course = convertSnaps<Course>(snap);
          return course.length == 1 ? course[0]: undefined
        }),
        first()
      )
  }

  findLessons(courseId: string, sortOrder: OrderByDirection = 'asc', pageNumber = 0, pageSize = 3): Observable<Lesson[]>{
    return this.db.collection(`courses/${courseId}/lessons`,
      ref => ref.orderBy('seqNo',sortOrder)
        .limit(pageSize)
        .startAfter(pageNumber * pageSize))
      .snapshotChanges()
      .pipe (
        map (snaps => convertSnaps<Lesson>(snaps)),
      )
     
      
  }


}

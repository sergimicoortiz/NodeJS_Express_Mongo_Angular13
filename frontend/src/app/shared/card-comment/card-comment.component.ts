import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/app/core/models/profile.model';
import { Comment } from '../../core'


@Component({
  selector: 'app-card-comment',
  templateUrl: './card-comment.component.html',
  styleUrls: ['./card-comment.component.css']
})
export class CardCommentComponent implements OnInit {

  @Input() comment: Comment = {} as Comment;
  @Output() id_comment = new EventEmitter<String>();
  @Input() currentUsername: String = " ";


  constructor() { }

  ngOnInit(): void {
  }

  comment_delete() {
    this.id_comment.emit(this.comment.id);
  }//comment_delete

}//class

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Comment } from '../../core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comments: Comment[] = [];
  @Input() currentUsername: String = "";
  @Output() deleteId = new EventEmitter<String>();
  @Output() formEmiter = new EventEmitter<any>();

  isSubmitting = false;

  commentForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      'msg': ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  sendIdDelete(id: String) {
    this.deleteId.emit(id);
  }//sendIdDelete

  submitForm() {
    this.isSubmitting = true;
    const data = this.commentForm.value;
    this.formEmiter.emit(data);
    this.isSubmitting = false;
  }//submitForm

}//class

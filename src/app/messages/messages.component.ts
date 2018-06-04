import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import 'rxjs/add/operator/map';
import { config } from "../config";

import { Message } from "../message";

import { MessageService } from "../service/message.service";


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input() user: any;

  loadingState: boolean = true;

  message_subject: string = null;
  message_content: string = null;
  filesToUpload: Array<File> = [];
  sendTime: Date = null;

  filePrefixUrl: string = config.RESTUrl + config.attatchmentUrl;

  styleSent = {
    'float-right': true,
    'border-success': true,
    'card': true,
    'message-card': true,
  }
  styleReceived = {
    'border-warning': true,
    'card': true,
    'message-card': true,
  }

  me: any = null;

  messagesToShow: Message[] = [];

  constructor(private _message: MessageService) {
  }

  ngOnInit() {
    this.me = {
      partyId: localStorage.getItem('partyId')
    }
  }

  getMessages(userId: number){
    this.messagesToShow = [];
    let myId = localStorage.getItem('partyId');
    this._message.getMessages(userId, myId).subscribe(data=>{
      if(data[0]){
        let i = 0;
        while(data[i]){
          this.messagesToShow.push(data[i]);
          i++;
        }
      }
      this.loadingState = false;
    });
  }

  ngOnChanges(changes: SimpleChanges){
    this.messagesToShow = [];
    const user: SimpleChange = changes.user;
    const temp: any = user.currentValue;
    this.loadingState = true;
    if(temp){
      if(temp !== user.previousValue)
        this.getMessages(temp.partyId);
    }
  }

  deleteMessage(messageId: number){
    if (confirm("Are you sure to delete this message?")){
      this._message.deleteMessage(messageId).subscribe(
        res => {
          for (let i = 0; i < this.messagesToShow.length; i++) {
            if (this.messagesToShow[i].messageId === messageId) {
              this.messagesToShow.splice(i, 1);
              break;
            }
          }
        }
      );
    }
  }

  handleFileInput(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  clearMessageBox(){
    this.message_subject = "";
    this.message_content = "";
    this.filesToUpload = [];
  }

  upload(){
    const formData: any = new FormData();
    let attId = 0;
    const files: Array<File> = this.filesToUpload;
    for(let i = 0; i < files.length; i++)
      formData.append("uploads[]", files[i], files[i]['name']);
    this._message.upload(formData).subscribe(response => {
        attId = response['attId'];
        let newMessageData = new Message(this.message_subject, this.message_content, attId, response['attatchments'], -1, this.me.partyId, this.user.partyId, this.sendTime.toDateString());
        this._message.newMessage(newMessageData).subscribe(response => {
          newMessageData.messageId = response[0].messageId;
          this.messagesToShow.push(newMessageData);
          this.clearMessageBox();
        });
    });
  }

  submitForm(){
    this.sendTime = new Date();
    if(this.user)
    {
      let newMessageData: Message;
      if(this.filesToUpload.length !== 0){
        this.upload();
      } else{
        newMessageData = new Message(this.message_subject, this.message_content, 0, [], -1, this.me.partyId, this.user.partyId, this.sendTime.toDateString());
        this._message.newMessage(newMessageData).subscribe(response => {
          newMessageData.messageId = response[0].messageId;
          this.messagesToShow.push(newMessageData);
          this.clearMessageBox();
        });
      }
    }
  }
}

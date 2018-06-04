import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { config } from "../config";

import { Message } from "../message";

@Injectable()
export class MessageService {

  httpHeader: HttpHeaders;
  constructor(private http: HttpClient) {
    this.httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    })
  }

  getMessages(userId: number, myId: string){
    let desURL = config.RESTUrl + config.messageUrl + config.getMessages + userId + '/' + myId;
    return this.http.get(desURL, { headers: this.httpHeader });
  }

  deleteMessage(messageId: number){
    let desURL = config.RESTUrl + config.messageUrl + config.deleteMessage + messageId;
    return this.http.delete(desURL, { headers: this.httpHeader });
  }

  newMessage(newMessage: Message){
    let newMessage_body = {
      "subject": newMessage.subject,
      "body": newMessage.body,
      "attatchment": newMessage.attatchment,
      "senderId": newMessage.sender_id,
      "receiverId": newMessage.receiver_id,
      "sent_time": newMessage.sent_time
    }
    
    let desURL = config.RESTUrl + config.messageUrl + config.newMessage;
    return this.http.post(desURL, newMessage_body, { headers: this.httpHeader });
  }

  upload(formData: any){
    let desURL = config.RESTUrl + config.messageUrl + config.chatUploadUrl;
    return this.http.post(desURL, formData);
  }

}

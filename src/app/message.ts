export class Message {
  subject: string;
  body: string;
  attatchment: number;
  attatchments: any;
  messageId: number;
  sent_time: string;
  sender_id: number;
  receiver_id: number;
  
  constructor(subject, body, attatchment, attatchments, messageId, sender_id, receiver_id, sent_time){
    this.messageId = messageId;
    this.subject = subject;
    this.body = body;
    this.attatchment = attatchment;
    this.attatchments = attatchments;
    this.sent_time = sent_time;
    this.sender_id = sender_id;
    this.receiver_id = receiver_id;
  }
}

export class User {
  userId: number;
  userImage: string;
  userName: string;
  userType: number;
  
  constructor(userId: number, userImage: string, userName: string, userType: number){
    this.userId = userId;
    this.userImage = userImage;
    this.userName = userName;
    this.userType = userType;
  }
}

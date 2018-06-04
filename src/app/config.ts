export const config = {
  "siteUrl" : "http://localhost:4200",
  "RESTUrl": "http://localhost:8080",

  "userUrl": "/userAPI",

    "getAllVendors": "/getVendors",
    "getAllBuyers": "/getBuyers",

  "messageUrl": "/messageAPI",

    "getMessages": "/getMessages/",
    "deleteMessage": "/deleteMessage/",
    "newMessage": "/newMessage",

  "attatchmentUrl": "/uploads/",
  "chatUploadUrl": "/doUpload/chat",

  "authUrl": "/authAPI",

    "authGuard": "/isLoggedIn",
    
    "vendor_auth": "/vendor_auth",
      "vendor_signup": "/vendor_signup",
      "vendor_login": "/vendor_login",
      "vendor_logout": "/vendor_logout",

    "customer_auth": "/customer_auth",
      "customer_signup": "/customer_signup",
      "customer_login": "/customer_login",
      "customer_logout": "/customer_logout",

      "customer_signup_facebook": "/customer_signup_facebook",
      "customer_signup_google": "/customer_signup_google",
      "customer_login_facebook": "/customer_login_facebook",
      "customer_login_google": "/customer_login_google",

  "profileUrl": "/profileAPI",

    "vendor_profile": "/vendor_profile/",
    "customer_profile": "/customer_profile/",
    "address_profile": "/address_profile/",
    "phone_profile": "/phone_profile/",
    "email_profile": "/email_profile/",
    "vendorUploadUrl": "/doUpload/vendor",

  "aws_elasticsearch" :"/elasticSearchAPI",
    "get_categories": "/getCategories/",
    "update_categories": "/updateCategories/",
  
  "requestURL": "/serviceAPI",
    "saveServiceRequest": "/saveServiceRequest",
    "getServiceRequest": "/getServiceRequest",
    "getJobByCustomerID": "/getServiceById",
    "serviceCustomerUploadUrl": "/doUpload/serviceCustomer",
    "serviceInfoUpdate": "/updateServiceInfo",
    
}
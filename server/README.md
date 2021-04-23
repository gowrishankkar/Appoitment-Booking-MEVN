
# RESTAPIDocs Appointment Booking



## Endpoints



## Get free slots


Endpoint to get free slots.
Used to collect all free slots for the selected month and time zone.

  **URL** : `/slots?date=2021-04-01&timezone=Pacific/Rarotonga`
  
  **URL Parameters** : `date=2021-04-01` where `date` is used to get the selected month,  `timezone=Pacific/Rarotonga` where `timezone` is the  time zone chosen by the user.  
  
**Method**  :  `GET`


### Success Response

 
**Code** : `200 OK`


**Content examples**
 

Following is the response for all the available free slots for the given month.
Based on the selected time zone, the response may have additional slots from one day before of after the selected month.

  

```json

```json
{
  "2021-03-31": {
    "slots": [
      "2021-03-31 07:00 PM",
      "2021-03-31 07:30 PM",
      "2021-03-31 08:00 PM",
      "2021-03-31 08:30 PM",
      "2021-03-31 09:00 PM",
      "2021-03-31 09:30 PM",
      "2021-03-31 11:00 PM",
      "2021-03-31 11:30 PM"
    ]
  },
  ...
  
  "2021-04-30": {
    "slots": [
      "2021-04-30 12:30 AM",
      "2021-04-30 01:00 AM"
    ]
  }
}
```



## Create Event


Create new event or book a specific slot

  **URL** : `/events`
  
**Method**  :  `POST`
 


**Data example** All fields must be sent.
 

```json
{
   "Name": "Test Name",
  "Email": "testname@gmail.com",
  "Timezone": "America/Los_Angeles",
  "Date": "2021-04-01T21:30:00+05:30"
}
```

  

### Success Response

**Condition** : If everything is OK and an Event didn't exist.

**Code** : `201 CREATED`

**Content example**
 

```json
{
"id": 123,
"name": "Build something project dot com",
"url": "http://testserver/api/accounts/123/"
}
```

### Error Responses

**Condition** : If Account already exists for User.

**Code** : `422 Unprocessable Entity`

**Content** : `{}`
 


## Get events in range


Endpoint to get booked events or slots in a given range.

  **URL** : `/events/range?startDate=2021-04-13&endDate=2021-04-30`
  
  **URL Parameters** : `startDate=2021-04-13`   `endDate=2021-04-30` where `startDate` & `startDate` are the range between which all the booked events will be fetched.
  
**Method**  :  `GET`


### Success Response

 
**Code** : `200 OK`


**Content examples**
 

Following is the response for all the booked slot for the fixed time zone   `America/Los_Angeles`
  


```json
[
  {
    "_id": "60804bb32c4a99526414fb08",
    "Date": "2021-04-22T16:00:00.000Z",
    "Timezone": "America/Los_Angeles",
    "Name": "as",
    "Email": "as@gmail.com",
    "__v": 0
  },
	...
  {
    "_id": "60823c669c828642c8cc2c2c",
    "Date": "2021-04-22T19:00:00.000Z",
    "Timezone": "America/Los_Angeles",
    "Name": "sd",
    "Email": "sd@gmail.com",
    "__v": 0
  }
]
```


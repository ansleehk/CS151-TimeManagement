![Time Management Background Image](/proposal/img/time-management-bg.png)

# Time Management

## Team

Group 12

Members:
- Anson Lee (Anson)
- Benjamin Joseph Filoteo (Benjamin)

Members working on the proposal:
- Anson
- Benjamin


## Proposal Contributions:
- Benjamin
  - Developed the idea of the project
  - Listed functionalities
  - Researched alternative applications
- Anson
  - Wrote issue to solve paragraphs
  - Listed functionalities.


## Presentation Contributions
- Benjamin
  - Created presentation slides
  - Discussed slides relating to features of the website
- Anson 
  - Created presentation slides
  - Discussed slides relating to data flow, MVC framework, Spring, and networking concepts.

## Project Contributions
- Benjamin
  - Frontend Development
    - Created Login and Register Page
  - Backend Development
    - Created model files for the java objects to be used
    - Created controller files with REST API to help transfer information from backend to frontend
    - Helped with service and repository files
  - Project report
    - Updated class and state diagrams
    - Wrote individual contributions
- Anson
  - Frontend Development
    - Created main home page and calender page.
    - Created menu bar
  - Backend Development
    - Created service files
    - Created repository files
    - Contributed a lot towards backend and frontend interaction
  - Project report
    - Updated sequence and use case diagrams
    - Wrote individual contributions


## Issue to solve
In today's fast-paced world, time management is more important than ever before, and students are no exception. With academic and social responsibilities constantly competing for their attention, it is easy for students to feel overwhelmed and struggle to stay organized. This can lead to missed deadlines, forgotten assignments, and a general feeling of stress and anxiety.

As a result, there is a clear need for a reliable and effective time management software that can help students better manage their schedules and priorities. In the past, students have often relied on traditional methods such as paper planners and to-do lists. However, these methods can be cumbersome and difficult to keep up with, particularly in today's digital age.

Furthermore, students today face unique challenges that previous generations did not. For example, they may be juggling multiple part-time jobs, extracurricular activities, and social media distractions, all while trying to maintain a healthy work-life balance. This makes it all the more important to have a time management software that can help students stay on top of their tasks and obligations, while also providing them with the flexibility and convenience they need to adapt to their changing schedules.

Therefore, the proposed time management software would be an invaluable tool for students of all ages and backgrounds. By leveraging the latest technology and proven time management techniques, it will help students optimize their schedules, prioritize their tasks, and stay focused and productive throughout the day. With the help of this software, students will be better equipped to meet their academic goals, excel in their extracurricular activities, and enjoy a more balanced and fulfilling life overall.

## Similar Applications

- Monday [1]
- Asana [2]
- Todoist [3]

## Solution w/ Functionality
Similar to how we humans like to start a morning routine after waking up, we hope using our application becomes apart of the user's routine. We want to help the user actively plan out their day and reduce any amount of stress that may occur from having too many events to participate in. This application will follow a calender based format in which activities and events will appear in. It's our job to help the user organize events and activities based on their time length and priority so they can have a general plan on how they're day is going to be. 

## Operations
- Upon opening the application, the user will be greeted with a login/signup page.
- Users will create or login to an account by providing general information, such as their name, date of birth, email, etc.
- Users will be asked to fill out timeslots that relate to common human activities, such as waking up, sleeping, eating, etc., to give a rough idea of their daily schedule.
- Users will be prompted to indicate any common activities or events that occur daily, weekly, etc.
- Users can checkbox the days of the week when the activity occurs, indicate its priority level on a scale of 1-5, and choose a scheduled timeslot or the amount of time they want to spend on that activity.
- Users can also include daily events and activities that may not be typically considered when planning a schedule, such as playing videogames, hanging out with friends, meal prepping, gardening, etc.
- The above information helps to organize both the activities users want to do and the activities they may add later on.
- After completing the above steps, users will see their own calendar, organized with the events and actions they previously entered.
- Users can view their calendar in a day, week, or month format.
- Buttons are present that allow users to mark one or all events for ending or canceling an event early or adding more time.
- A button is also available for users to add a new event, where they will provide the same information as before (name of the event, when or how often it occurs, priority level, and time slot/time they want to spend on that event).
- Upon finishing any of the above actions, the calendar will automatically update while considering the time slots and time requested from already present events.

## References
- [1] Monday: https://monday.com
- [2] Asana: https://asana.com/company
- [3] Todoist: https://todoist.com

![Demonstration](./proposal/img/demo-static.png)

**Demo Video on YouTube:**
https://youtu.be/7xLJknSHdqA


## Running the application
You should have both frontend and backend running at the same time to get the application works properly.

### Download
```zsh
git clone https://github.com/ansleehk/CS151-TimeManagement.git
cd CS151-TimeManagement
```

### Frontend
```zsh
cd frontend
npm install
npm run start
```

**Default running port:** 3000

#### Frontend Preview Server

This is not the production server. This server is used for previewing the frontend design. It does not connect to our backend service.
https://cs151-time-management.pages.dev/

### Backend

You should have Maven installed on your machine.

To install Maven on a Mac:
```zsh
brew install maven
```

```zsh
cd backend
mvn spring-boot:run
```


**Default running port:** 8010

## Architecture

### Tech Stack
![Tech Stack](./proposal/img/stack.png)

We utilize Java Spring framework to build the backend and JavaScript ReactJs framework to build the frontend.

### API Endpoints
![API Endpoints](./proposal/img/api-endpoints.png)

We utilize the REST API way to allow frontend and backend communicate with each other.

Four endpoints are established to allow data flow between frontend and backend.
- Event: CRUD events.
    - Path: /{{userId}}/event
- Routine: CRUD schedules.
    - Path: /{{userId}}/daily-routine/
- Day Schedule: Fetch scheduled schedules
    - Path: /{{userId}}/day-schedule/
- User Authentication: Account registration and login
    - Path: /auth/

### Data Flow
![General Data Flow](./proposal/img/data-flow.png)

#### Partially Utilizing MVC
Our design does not strictly follow the MVC pattern. However, the basic structure is the same.

##### View (V)
ReactJs is the view for rendering the data.

##### Controllers (C)
Controllers are the endpoints of the backend.

##### Models (M)
- Activity
    - Event
    - DailyRoutine
- DaySchedule
- ScheduledDayActivity
- User

## Development

### API Documentation

![Postman](./proposal/img/postman.png)

URL: https://documenter.getpostman.com/view/20961535/2s93ebUX5S

### Testing API with Postman

**Download the collection for testing the API with Postman**

[Download Postman Collection](/proposal/api/Time%20Management.postman_collection.json)

### Changing the port

PORTs are set to be easily manipulated. They are saved in two files.

#### Frontend
```zsh
nano frontend/.env
// Locate the REACT_APP_SERVER_URL variable and change it
```

#### Backend
```zsh
nano backend/src/main/resources/application.properties
// Locate the server.port variable and change it
```

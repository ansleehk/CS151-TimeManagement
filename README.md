![Time Management Background Image](/proposal/img/time-management-bg.png)

# Time Management

## Live Server

### Preview Server
This is not the production server. This server is used for previewing the frontend design. It does not connect to our backend service.
https://cs151-time-management.pages.dev/

## Running the application

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

### Backend

You should have Maven installed on your machine.

To install Maven on a Mac:
```zsh
brew install maven
```

```zsh
cd backend
mvn clean install
cd target
java -jar cs151-time-management-0.0.1-SNAPSHOT.jar
```

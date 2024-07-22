@echo off
echo Closing any programs running on port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    echo Taskkill process %%a
    taskkill /PID %%a /F
)
echo Starting the projects...

REM Navigate to the myapp directory and run npm run dev in a new terminal
echo Running myapp...
cd myapp
start cmd /k "npm run dev"
cd ..

REM Navigate to the backend directory and run npm start in a new terminal
echo Running backend...
cd backend
start cmd /k "npm start"
cd ..

echo Projects are running in separate terminal windows.
pause

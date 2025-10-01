@ECHO OFF
ECHO "-----------------------------------------"
ECHO "> Runing App Frontend - Development"
ECHO "-----------------------------------------"
SET NODE_ENV=development
IF NOT EXIST .env.development COPY /-Y .env.development.sample .env.development
npm run dev
IF ERRORLEVEL 1 GOTO finish

:finish
CD..
PAUSE
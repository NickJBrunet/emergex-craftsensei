@echo off
title Paper Plugin Build & Deploy (Server-Side Script)

REM ================================
REM CONFIG - EDIT THIS PATH ONLY (path to plugin folder)
REM ================================
set SCRIPT_DIR=%~dp0
set PROJECT_DIR=%SCRIPT_DIR%..\crafty_bot

REM ================================
REM INTERNAL (DO NOT CHANGE)
REM ================================
set SERVER_DIR=%~dp0
set PLUGINS_DIR=%SERVER_DIR%plugins

echo.
echo [1/5] Checking project directory...
if not exist "%PROJECT_DIR%\gradlew.bat" (
    echo ERROR: gradlew.bat not found in project directory!
    echo Check PROJECT_DIR path.
    pause
    exit /b
)

echo.
echo [2/5] Moving to project directory...
cd /d "%PROJECT_DIR%"

echo.
echo [3/5] Cleaning previous build...
call gradlew.bat clean
if %errorlevel% neq 0 (
    echo ERROR: Clean failed.
    pause
    exit /b
)

echo.
echo [4/5] Building plugin jar...
call gradlew.bat build
if %errorlevel% neq 0 (
    echo ERROR: Build failed.
    pause
    exit /b
)

echo.
echo [5/5] Deploying jar to server plugins folder...

set JAR_FILE=
for %%f in (build\libs\*.jar) do (
    set JAR_FILE=%%f
)

if not defined JAR_FILE (
    echo ERROR: No jar found in build\libs\
    pause
    exit /b
)

echo Found jar: %JAR_FILE%

REM Remove old versions of the same plugin (prevents duplicate loading)
del /Q "%PLUGINS_DIR%\*.jar" 2>nul

echo Copying new jar to: %PLUGINS_DIR%
copy /Y "%JAR_FILE%" "%PLUGINS_DIR%"

if %errorlevel% neq 0 (
    echo ERROR: Failed to copy jar.
    pause
    exit /b
)

echo.
echo SUCCESS: Plugin built and deployed!
echo Next step: FULL server restart (DO NOT USE /reload)
java -Xmx12G -jar paper-1.21.11-126.jar nogui
pause
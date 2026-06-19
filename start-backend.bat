@echo off
title VilaStay Backend
set JAVA_HOME=C:\Program Files\Java\jdk-25
set PATH=C:\Program Files\apache-maven-3.9.14\bin;%PATH%
cd /d "%~dp0property-rental-backend"
echo Starting VilaStay Backend...
mvn spring-boot:run
pause

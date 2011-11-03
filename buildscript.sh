#!/bin/sh

## Written by Khalid
## Buildscript that updates the project, cleans it, builds it and signs it.
## It assumes the Android SDK is one folder prior to script; SDK is currently not in repo (too large)
## Emulator installation is not tested here atm, mostly because I'm not sure how to make the script wait until the emulator is finished launching before installing

echo Updating project ...
../android-sdk-linux_x86/tools/android update project --target 'android-10' --name NotePad --path NotePad/
../android-sdk-linux_x86/tools/android update project --target 'android-10' --name NuNumbers --path NuNumbers/

#echo Trying to create new emulator named SecondDevice ...
#../android-sdk-linux_x86/tools/android create avd -n SecondDevice -t 1 --force

#installing Android 2.3.3 on the server, so this line is geared towards Android emulator 2.3.3
../android-sdk-linux_x86/tools/emulator @Android2.3.3 -no-window

echo Trying new debug build
#ant clean -f HelloWorldPhoneGap/build.xml
ant debug -f NotePad/build.xml
ant debug -f NuNumbers/build.xml

echo Running Jasmine tests ...
cd jasmine-testing-files
rm TEST-*.xml
java -jar lib/js.jar -opt -1 lib/envjs.bootstrap.js SpecRunner.html

#../android-sdk-linux_x86/tools/emulator '@SecondDevice'

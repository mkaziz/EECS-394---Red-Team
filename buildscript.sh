#!/bin/sh

## Written by Khalid
## Buildscript updates the project, cleans it, builds it and signs it.
## It assumes the Android SDK is one folder prior to script; SDK is currently not in repo (too large)
## Emulator installation isn't tested here yet - not sure how to make the script wait until the emulator has finished launching before installing

echo Updating project ...
../android-sdk-*_x86/tools/android update project --target 'android-10' --name NotePad --path NotePadKhalid/
../android-sdk-*_x86/tools/android update project --target 'android-10' --name NotePad --path ContactsPlugin/

#echo Trying to create new emulator named SecondDevice ...
#../android-sdk-linux_x86/tools/android create avd -n SecondDevice -t 1 --force

#echo Trying to access and run Android emulator @SecondDevice ...
#../android-sdk-linux_x86/tools/emulator @SecondDevice -no-window

echo Trying new debug build ...
#ant clean -f HelloWorldPhoneGap/build.xml
ant debug -f NotePadKhalid/build.xml
ant debug -f ContactsPlugin/build.xml

echo Running Jasmine tests ...
cd jasmine-testing-files
rm TEST-*.xml
java -jar lib/js.jar -opt -1 lib/envjs.bootstrap.js SpecRunner.html



#../android-sdk-linux_x86/tools/emulator '@SecondDevice'

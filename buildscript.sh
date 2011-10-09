#!/bin/sh

## Written by Khalid
## Build Script that updated the project, and then cleans, builds and signs it.
## It assumes Android SDK is one folder prior to script; SDK is currently not in repo
## Emulator installation is not tested here atm, mostly because I'm not sure how to make the script wait until the emulator is finished launching before installing

echo Updating project ...
../android-sdk-linux_x86/tools/android update project --target 'android-10' --name HelloWorldPhoneGap --path HelloWorldPhoneGap/

#echo Trying to create new emulator named SecondDevice ...
#../android-sdk-linux_x86/tools/android create avd -n SecondDevice -t 1 --force

echo Trying new debug build
ant clean -f HelloWorldPhoneGap/build.xml
ant debug -f elloWorldPhoneGap/build.xml

#../android-sdk-linux_x86/tools/emulator '@SecondDevice'

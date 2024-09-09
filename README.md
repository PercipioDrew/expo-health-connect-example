# Expo Health Connect Example

> [!WARNING]
> This is not a working example.  This repository was published to reference in a GitHub Issue, and the purpose is to show how to recreate a bug.

## Setup

This project requires NodeJS.

Run the following to install necessary dependencies:

```shell
npm install
```

## Run the Mobile App

```shell
npx expo run:android --device
```

The above command will fail because the library does not work on Expo 50.

You can switch to branch `expo-51`, and follow the same steps (including `npm install`) and the application will work.  You may need to also run `rm -rf android` to delete the generated cache directory.

## Fix

[The bug illustrated in this repository was fixed in Expo v50.0.21](https://github.com/matinzd/react-native-health-connect/issues/150#issuecomment-2337844953).  It can be applied using the following commands:

```shell
npm install expo@50.0.21
rm -rf android
npm run android
```
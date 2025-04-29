# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

```
npx expo run:ios
npx expo run:android

npx expo prebuild --clean
eas build --platform android --local
eas build --platform ios --local
npx eas build --platform android --profile development --local
npx eas build --platform android --profile preview --local
npx eas build --platform ios --profile development --local
npx eas build --platform ios --profile preview --local

npx expo-router-sitemap (https://youtu.be/Yh6Qlg2CYwQ?si=wKH0CGw9-mTqRvcN)

npx testflight
similar to (eas build -p ios -s)

eas build:version:set

npm run cleanup-firebase
npm run prepare-firebase

firebase deploy --only firestore:rules
firebase deploy --only storage
```

## TODO

- [] Add private codelabs
- [] Add codelabs user
- [] Add codelabs image
- [] Add codelabs likes and comments
- [] Add codelabs tags
- [] Add codelabs categories
- [] Add codelabs search
- [] Add codelabs pagination
- [] Add codelabs filters
- [] Add codelabs sorting
- [] Add codelabs videos
- [x] Add Profile picture upload (web and react native) - TEST ON REACT NATIVE and add image cropping
- [ ] Add expo image placeholder
- [ ] show password
- [ ] Add play progress bar, history and queue
- [ ] Add playback screen
- [ ] Google/Apple login
- [ ] Recommended events sign_up, login, share
- [ ] Add tabs https://www.reactnativepapertabs.com/
- [ ] Add haptics
- [ ] Add offline notification - NETINFO
- [ ] Add flashlist https://github.com/Shopify/flash-list
- [ ] Add Expo Image https://docs.expo.dev/versions/latest/sdk/image/
- [ ] Delete firebase function (delete firebase config) (email: arthur@genkit.ai) and reason
- [ ] Get device info on signup and login (if device exists skip)
- [ ] Add rive https://github.com/rive-app/rive-react-native
- [ ] Add empty states https://github.com/margelo/react-native-skottie
- [ ] Add blur SKIA
- [ ] Add analytics
- [ ] Add xevo
- [ ] Add crash reporting
- [ ] Add sentry
- [] Add firestore
- [ ] Add Notifications (FCM - New episode, Download complete, Subscription)
- [ ] Add Paddle payment
- [ ] Add google pay - (Revenue Cat)
- [ ] Add apple pay - (Revenue Cat)
- [ ] Add amazon pay
- [ ] Add webview
- [ ] Add terms of service
- [ ] Add privacy policy
- [ ] Add refund policy
- [ ] Add cookies policy
- [ ] Add security policy
- [ ] Add sitemap
- [ ] Add robots.txt
- [ ] Add google-site-verification.html
- [ ] Add googleb70092922922929292929.html
- [ ] Add googleb70092922922929292929.html

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

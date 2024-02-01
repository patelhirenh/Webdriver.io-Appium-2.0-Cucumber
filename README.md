# DailyMail Technical Task

## Framework Overview

This framework leverages WebdriverIO version 8.x and Appium version 2.x, implementing a Behavior-Driven Development (BDD) style using TypeScript. 
Following is the folder structure for the framework.
```bash
Project Root
├── allure-report               # Directory for Allure report files
├── allure-results              # Directory to store Allure test results
├── app/                        # Directory containing the Android application (.apk file)
├── node_modules                # Directory for Node.js modules and dependencies
├── test/
│   ├── features/
│   │   ├── android-features    # Directory for Android-specific feature files
│   │   └── web-features        # Directory for Web-specific feature files
│   ├── pageobjects/
│   │   ├── androidPage/        # Directory for Android page objects
│   │   └── webPage/            # Directory for Web page objects
│   ├── step-definations/
│   │   ├── mobile/             # Directory for step definitions related to the mobile app
│   │   └── web/                # Directory for step definitions related to the web app
│   └── utils/                  # Directory for utility functions common to both Android and Web
├── .gitignore                  # File specifying which files and directories to ignore in version control
├── package-lock.json           # File automatically generated for npm dependencies
├── README.md                   # Project documentation file in Markdown format
├── tsconfig.json               # TypeScript configuration file
├── tunnel.log                  # Log file for tunnel-related information
├── wdio.android.conf.ts        # Configuration file for WebDriverIO related to Android
├── wdio.browserstack.conf.ts   # Configuration file for WebDriverIO related to BrowserStack
└── wdio.web.conf.ts            # Configuration file for WebDriverIO related to Web
```

## Prerequisites
1. Node.js and npm
    * Install Node.js and npm from [nodejs.org](https://nodejs.org/en)
    * Verify the installation using:
```bash
    node -v
    npm -v
```
2. IDE (Integrated Development Environment)
    * Choose an IDE such as Visual Studio Code, Atom, or Sublime Text.
3. Java Development Kit (JDK)
    * Install JDK from Oracle JDK[Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/en-GB/).
    * Set the JAVA HOME [environment variables](https://mkyong.com/java/how-to-set-java_home-environment-variable-on-mac-os-x/).
4. Appium
    * Install Appium using npm:
```bash
    npm install -g appium
```
* Install Appium Doctor to check for Appium dependencies:
```bash
    npm install -g appium-doctor
```
    Run Appium Doctor:
```bash
    appium-doctor
```
5.  Android Studio (for Android Testing):
    * Install Android Studio from [developer.android.com](https://developer.android.com/studio)
    * Set Android environment variables in your shell configuration file (e.g., .bashrc, .zshrc):
```bash
    export ANDROID_HOME=/path/to/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
``` 
6. Setup Android Emulator:
      Configure the emulator through the Android Studio.
7. Install Appium Inspector:
      Download from [here](https://github.com/appium/appium-inspector/releases)

## Installation
Clone the project:
```bash
    git clone https://github.com/patelhirenh/dailyMail.git
```

## Install dependencies:
```bash
    npm install
```

## Running Mobile test locally
```bash
    npm run wdio-android
```

## Running Web test locally
```bash
    npm run wdio-web
```

## Running Tests on BrowserStack
```bash
    npm run wdio-browserstack
```
> Create a `.env` file in the root with your BrowserStack credentials:
  `BROWSERSTACK_USER=<YourUserName>`
  `BROWSERSTACK_KEY=<YourAccessKey>`

## Reporting
The framework utilizes the `allure-report` to display test successes and failures. To generate the report, execute the following command in the terminal:
```bash
    allure generate --clean allure-results && allure open
```
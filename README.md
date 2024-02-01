**WebdriverIO V8, Appium 2.0 & BDD Style framework using Typescript and Cucumber**

# This Framework is based on:
WebdriverIO: 8.x
Appium: 2.x

# About the framework
- **BDD Style framework.**
- **Page object model.**
- **Feature files** include scenarios. Relative path for the feature files: **test/features/android-features**.
- **Page objects** include the pages with are navigated and locators for elements are defined in each pageObject file for the respective page. Relative path: **test/pageobjects/androidPage**.
- **Step-definitions** include the code implementation for the steps defined in scenarios in the feature file. Relative path: **test/step-definitions/mobile**.
- **Utils** include the reusable functions which are created to eliminate duplication/reduction of code and maintain reusability of code throughout the framework. Relative path: **test/utils/android.utils.ts**.
- **Package.json** includes the dependencies installed to build and run tests - This is in the root folder.
- **Tsconfig.json** includes the compiler options and other necessary logic compile typescript.
- **Wdio.android.conf.js** includes 
    - Configuration of tests to run on local
    - Port where the test will run
    - Path of feature files
    - Path of Setp definition
    - Capabilities defined to run the test on Android Emulator
    - Appium service
    - Cucumber options where you can customise your cucumber tests
    - Reports used to provide information of test runs
- **Wdio.browserstack.conf.js** includes
    - Browserstack credentials
    - Configuration of tests to run on browserstack
    - Path of feature files
    - Path of Setp definition
    - Capabilities defined to run the test on Browserstack
    - Browserstack service
    - Cucumber options where you can customise your cucumber tests 
- **.gitignore** includes the changes in files which you do not want git to recognise as changes and by mentioning this in .gitignore will be ignored by git

# Installation
Clone this project by running
git clone https://github.com/desaikeyur7/daily-mail

## Install all dependencies
- npm install

## Setup Android from scratch including JDK
- Java JDK Setup
  https://mkyong.com/java/how-to-set-java_home-environment-variable-on-mac-os-x/
  
## Android Studio Setup
  https://developer.android.com/studio
  
## Android Environment Variables setup
  Open the Environment Variable file: **vim ~/.zshenv**
  
  **Add Android environment variables:**
  
  export ANDROID_HOME=/Users/<yourMacbookUserName>/Library/Android/sdk/
  
  export ANDROID_SDK_ROOT=/Users/<yourMacbookUserName>/Library/Android/sdk
  
  export PATH=$PATH:$ANDROID_HOME/platform-tools:$PATH
  
  export PATH=$PATH:$ANDROID_HOME/tools:$PATH
  
  export PATH=$ANDROID_HOME/build-tools/34.0.0:$PATH
  
  export PATH=$ANDROID_HOME/build-tools/34.0.0/bin:$PATH
  
  **Source the changes:**
  source ~/.zshenv
  
  **Test changes:**
  echo $ANDROID_HOME
  adb devices - should return list of devices attached.
  
 **Note:** the same changes can be added to .zshrc or .bashprofile file as well.

## Setup Android Emulator
  This has to be setup via Configure option in Android studio.

## Install Appium Inspector
  https://github.com/appium/appium-inspector/releases.

## Install Appium
  https://www.npmjs.com/package/appium.

## Install Appium drivers
  appium driver install uiautomator2
  To verify if its been installed, you can run **- appium driver list**

  
# Run tests in local
  npm run wdio-android

  **Note:** The tests run locally on port 4723.


# Run tests on browserstack
  npm run wdio-browserstack

  **Note:** You will require to create a **.env** file in root add your browserstack credentials as shown below in the .env file:
  BROWSERSTACK_USER=<YourUserName>
  BROWSERSTACK_KEY=<YourAccessKey>


# Locator strategy
I have used Xpath as there are no accessibility id's available for any element during the creation of the tests. 


# Reporting 
I have used **allure-report** as it helps to visualise the success and failures of tests in a convenient manner. Command to generate the report:
**allure generate allure-results && allure open**



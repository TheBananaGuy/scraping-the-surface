# Prerequisites, Javascript stack

## What exactly are we using

**JAVASCRIPT STACK:**
- JavaScript scripting language
- Node.js event driven runtime
- Google Puppeteer test automation framework
- Chromium browser driver

Commands given below should be executed through Windows' command prompt.

## Step 1 - download Node.JS

Go to the [official source](https://nodejs.org/en/)
Make sure that you pick the LTS (Long Term Support) version
Make sure all the environment variables are set during installation.

## Step 2 - doublecheck

Check versions of Node.JS and the package manager (npm). 

```
node -v
npm -v 
```

## Step 3 - install the dependencies

Go to your scripts folder and install puppeteer

```
npm i puppeteer  
```

## Step 4 - run your scripts

Call them from the folder via command prompt using Node.js

E.g.:
```
node test.js
```
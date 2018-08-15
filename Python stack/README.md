# Prerequisites, Python stack

## What exactly are we using

**PYTHON STACK:**
- Python programming language
- Selenium WebDriver test automation framework
- BeautifulSoup library for parsing HTML data
- Mozilla Firefox browser driver

Commands given below should be executed through Windows' command prompt.

## Step 1 - download Python

Go to the (official source)[https://www.python.org/downloads/]
I recommend taking version **3.6.5**, as it was the one I used.
Make sure all the environment variables are set during installation.

## Step 2 - doublecheck

Check versions of Python and the package manager (pip). 

```
python --version
pip --version
```

## Step 3 - install the dependencies

Update **pip**, install **Selenium**, and install **BeautifulSoup**

```
python -m pip install --upgrade pip setuptools wheel
pip install selenium
pip install beautifulsoup4 
```

Download **Firefox driver** for Selenium (here)[https://github.com/mozilla/geckodriver/releases)] and put it where the scripts are.

## Step 4 - run your scripts

Call them from the folder via command prompt

E.g.:
```
script.py
```
# Web scraping with test automation tools

## Abstract

These materials were produced while working on my bachelor thesis called "Exploring the technologies and methods utilized in web scraping". It was mainly focused on the differences between the technologies applied to the methods of web scraping and web scraping tool creation.

## Disclaimer

Web scraping can be used for malicious intents and may result in illegal activities. I, the author of this paper, do not have any intent or advice for other people to start web scraping for such means and highly recommend thinking twice about how you, the reader, would use the information provided in this repository beyond this point. I hold no responsibility for any content theft, piracy, illegal data gathering or anything similar and/or related as a result of examining these materials.

## Technologies used

**PYTHON STACK:**
- **Python** programming language
- **Selenium WebDriver** test automation framework
- **BeautifulSoup** library for parsing HTML data
- **Mozilla Firefox** browser driver

**JAVASCRIPT STACK:**
- **JavaScript** scripting language
- **Node.js** event driven runtime
- **Google Puppeteer** test automation framework
- **Chromium** browser driver

## Purpose, case and target

In this situation, the main goal was to compare different technologies used in web scraping. 

An example case example could be the following - sometimes, there is a simple requirement to get the prices for certain products, if you are selling the same items but would like to introduce competitorship by having them lowered compared to other resources. In this case, we are going to attempt to scrape simple data such as prices, product names, product unique identifier numbers, availability, and if there's a discount or not.

As our subject to scrape, I chose [Føniks](https://www.fcomputer.dk/) - a Danish store that sells different kinds of consumer electronics both online and physically. Items in question could simply be laptops - a perfect example of a product to set a competitive price for.

## Prerequisites

Examine each folder for each stack's prerequisites.

## Initial testing environment and results

Script performance test runs were conducted after a full restart via Windows 10 on a Lenovo T440S laptop with a Intel Core i5-4200 CPU at 1.6 and 2.3 core clock speeds, having 12 GB of RAM and 1 TB solid state drive installed. The scripts were aimed to gather **7** attributes and format them in **2** different data types. The technology stacks were utilized in a way that the resulted scripts could be as close as possible to each other. At the moment of the performance comparison, the scraped category of products had 2030 entries. Lastly, this iteration of web scraping was made in Aarhus, Denmark, through a wired connection to a VPN located in Copenhagen, Denmark.

This table contains the results of the performance test for each of the technology stacks tested in both headless and complete user interface modes. The results are in seconds.

Performance criteria | Scrape and format data | Total script execution | Subsequent data output to console
--- | --- | --- | ---
Python stack - first run (headless) | 13.442 | 78.360 | 1.075
JavaScript stack - first run (headless) | 0.506 | 49.375 | 8.826
Python stack - second run (complete UI) | 13.405 | 84.856 | 1.078
JavaScript stack - second run (complete UI) | 1.389 | 48.709 | 2.248
Python stack - third run (headless) | 13.062 | 77.646 | 1.078
JavaScript stack - third run (headless) | 0.591 | 37.526 | 2.547

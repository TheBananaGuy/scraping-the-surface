# 		Start the runtime timer.
import time
scriptStart = time.time()
# 		Import dependencies.
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import bs4 as bs # BeautifulSoup.
import re # default Python library for regular expressions.
#		Set some options for our driver, like a fake user-agent string and the interface mode.
options = Options()
profile = webdriver.FirefoxProfile()
profile.set_preference("general.useragent.override", "Mozilla/5.0 (X11; Linux x86_64; rv:17.0) Gecko/20121202 Firefox/17.0 Iceweasel/17.0.1")
options.profile = profile
options.set_headless(headless=True)
driver = webdriver.Firefox(firefox_options = options)
#		Set the URL and appropriate arguments.
fish = "https://www.fcomputer.dk/computer/baerbar"
chips = "?eachPage=99999"
#		Pass the URL to the driver and get the source code.
driver.get(fish+chips)
pageSource = driver.page_source
#		Parse the recieved HTML, make sure to explicitly specify the parser to avoid possible errors.
soup = bs.BeautifulSoup(pageSource, "html.parser")
#		Declare your methods outside the scraping loop for optimize performance.
def unitCheck(product, location):
	#		This method should set a string that should have a value depending on one of three conditions.
	unit = product.find_all("div", class_="store-stock-wrapper")[location]
	if unit:
		#		If there's more than five units
		if re.search(r"[+]", unit.text) != None: unit = "5+"
		#		If there's five or less
		else: unit = re.sub('\D+', '', unit.text)
	#		Or if product count is not shown for any reason.
	else: unit = "N/A"
	return unit
#		Declare an array to store the data and start the timer for data gathering.
data = []
productLapStart = time.time()
#		Initialize a loop through the product containing elements.
for product in soup.find_all("div", class_="related-product-list-inner-wrapper"):
	#		Store the name and ID of the product as strings, cutting off the irrelevant data.
	productName = product.find("span", class_="product-header").find("div").text
	productID = product.find("div", class_="bottom-name-wrapper").find("span").text.replace("Produkt nr.: ", "")
	#		Check if price tags exist, strip the digits and parse the result as an integer.
	productPrice = product.find("span", class_="overview-product-price")
	if productPrice: productPrice = int(re.sub('\D+', '', productPrice.text))
	else: productPrice = None;
	productDiscount = product.find("div", class_="inner-price-comparison-wrapper")
	if productDiscount: productDiscount = int(re.sub('\D+', '', productDiscount.find_all("span")[1].text))
	else: productDiscount = None
	#		Store the availability status with the previously declared function.
	productInCph = unitCheck(product, 0)
	productInAar = unitCheck(product, 1)
	productInWeb = unitCheck(product, 2)
	#		Declare a dictionary data type for each product and pass key/value pairs to it.
	values = {}
	values.update({'productName':productName})
	values.update({'productID':productID})
	values.update({'productPrice':productPrice})
	values.update({'productDiscount':productDiscount})
	values.update({'productInCph':productInCph})
	values.update({'productInAar':productInAar})
	values.update({'productInWeb':productInWeb})
	#		End the loop with passing the data to the general array.
	data.append(values)
#		Stop the data timer and close the interface.
ProductLapEnd = time.time()
driver.quit()
#		Stop the runtime timer.
scriptEnd = time.time()
#		Start the output timer and loop through the data to log it in the console.
printStart = time.time()
productCounter = 1;
for item in data:
	#		Make sure that you don't mix up string and integer types.
	print("\r\n              DATA FOR ITEM #"+str(productCounter))
	print("Name:                   "+item['productName']),
	print("ID:                     "+item['productID']),
	print("Price:                  "+str(item['productPrice'])),
	print("Discount:               "+str(item['productDiscount'])),
	print("Amount in Copenhagen:   "+item['productInCph']),
	print("Amount in Copenhagen:   "+item['productInAar']),
	print("Amount in the webshop:  "+item['productInWeb']),
	productCounter+=1
#		Stop output timer and log the gathered performance data.
printEnd = time.time()
print("\r\nGathered 7 data attributes about "+str(productCounter-1)+" products")
print("{0:0.3f} seconds to scrape and format the data".format(ProductLapEnd-productLapStart))
print("{0:0.3f} seconds for script execution".format(scriptEnd-scriptStart))
print("{0:0.3f} bonus seconds for logging the processed data".format(printEnd-printStart))

#		The output should look like this:
#### Gathered 7 data attributes about ___ products
#### ___.___ seconds to scrape and format the data
#### ___.___ seconds for script execution
#### ___.___ bonus seconds for logging the processed data
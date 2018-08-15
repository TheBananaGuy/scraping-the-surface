//		Start runtime timer and declare all global variables for the performance check.
const {performance} = require('perf_hooks');
var scriptStart = performance.now();
var scriptEnd;
var productLapStart;
var productLapEnd;
var printStart;
var printEnd;
var productCounter;
//		Import dependencies.
const puppeteer = require('puppeteer');
//		Declare the scraping method.
let scrape = async() => {
	//		Declare the URL and appropriate arguments.
	let fish = 'https://www.fcomputer.dk/computer/baerbar';
	let chips = '?eachPage=99999';
	//		Set some options for our driver, like a fake user-agent string and the interface mode.
	let userAgentString = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0';
	const driver = await puppeteer.launch({headless: true});
	const page = await driver.newPage();
	await page.setUserAgent(userAgentString);
	//		Pass the URL to our driver and tell it to wait max 2 minutes until there are no connections within half a second.
	await page.goto(fish+chips, {
		waitUntil: 'networkidle0',
		timeout: 120000,
	});
	//		Declare the timer and the method for data gathering within the page's context evaluation.
	productLapStart = performance.now();
	const soup = await page.evaluate(()=>{
		//		Declare an array to store the data and the products path to scrape.
		let data = [];
		let products = document.querySelectorAll('div.related-product-list-inner-wrapper');
		//		Declare the method to check existence of DOM elements and return a conditional value.
		function checkExistence(product, path, fallback){
			check = product.querySelector(path);
			//		Store inner text data as a string and specify a default value.
			check != null ? check = check.innerText : check = fallback;
			return check;
		};
		//		Declare a loop through the DOM tree to check existence and assign an appropriate value for each product attribute.
		for (var product of products) {
			let productName = checkExistence(product, 'span.product-header>div:nth-of-type(1)', '---');
			let productID = checkExistence(product, 'div.bottom-name-wrapper>span:nth-of-type(1)', '---');
			let productPrice = checkExistence(product, 'span.overview-product-price', 0);
			let productDiscount = checkExistence(product, 'div.inner-price-comparison-wrapper>span:nth-of-type(2)', 0);
			let productInCph = checkExistence(product, 'div.store-stock-wrapper:nth-of-type(1)>span.stock-title', 'N/A');
			let productInAar = checkExistence(product, 'div.store-stock-wrapper:nth-of-type(3)>span.stock-title', 'N/A');
			let productInWeb = checkExistence(product, 'div.store-stock-wrapper:nth-of-type(5)>span.stock-title', 'N/A');
			//		Pass the results to the general data array as a dictionary with key/value pairs.
			data.push({
				productName: productName,
				productID: productID,
				productPrice: productPrice,
				productDiscount: productDiscount,
				productInCph: productInCph,
				productInAar: productInAar,
				productInWeb: productInWeb
			});
		}
		//		Return the data evaluated within the page's context.
		return data;
	})
	//		Close the interface and return all the resulted data and variables.
	driver.close();
	return soup;
}
//		Initiate the scraping method and pass all the resulted data and variables for further manipulation.
scrape().then((value)=>{
	//		Declare a method to change the default value in the case of two specific conditions.
	function filterUnit(unit) {
		var unit = unit;
		if(unit != 'N/A') {
			//		Either if it's more than five, or any other amount.
			unit.match(/\+/g) ? unit = '+5' : unit = unit.replace(/\D/g, '')
		}
		return unit;
	}
	//		Initiate a loop through the data for manipulations.
	for (var i = 0; i < value.length; i++) {
		//		Remove irrelevant data from the product ID
		value[i].productID = value[i].productID.replace('Produkt nr.: ', '');
		//		Strip the digits and parse the result as an integer if the recieved value for the price tags is not default.
		if(value[i].productPrice != 0) value[i].productPrice = parseInt(value[i].productPrice.replace(/\D/g, ''));
		if(value[i].productDiscount != 0) value[i].productDiscount = parseInt(value[i].productDiscount.replace(/\D/g, ''));
		//		Change the availability status with the previously declared function.
		value[i].productInCph = filterUnit(value[i].productInCph);
		value[i].productInAar = filterUnit(value[i].productInAar);
		value[i].productInWeb = filterUnit(value[i].productInWeb);
	}
	//		Stop the data and runtime timers.
	productLapEnd = performance.now();
	scriptEnd = performance.now();
	//		Start the output timer and loop through the data to log it in the console.
	printStart = performance.now();
	for (var i = 0; i < value.length; i++) {
		//		Make sure that you don't mix up string and integer types.
		console.log("\r\n              DATA FOR ITEM #"+(i+1).toString());
		console.log("Name:                   "+value[i].productName);
		console.log("ID:                     "+value[i].productID);
		console.log("Price:                  "+value[i].productPrice.toString());
		console.log("Discount:               "+value[i].productDiscount.toString());
		console.log("Amount in Copenhagen:   "+value[i].productInCph);
		console.log("Amount in Copenhagen:   "+value[i].productInAar);
		console.log("Amount in the webshop:  "+value[i].productInWeb);
	}
	//		Stop the output timer and prepare the data amount.
	printEnd = performance.now();
	productCounter = value.length;
	//		Log the gathered performance data.
}).then(()=>{
	console.log("\r\nGathered 7 data attributes about "+productCounter.toString()+" products")
	console.log((productLapEnd-productLapStart)+" milliseconds to scrape and format the data")
	console.log((scriptEnd-scriptStart)+" milliseconds for script execution")
	console.log((printEnd-printStart)+" bonus milliseconds for logging the processed data")
});

//		The output should look like this:
//////// Gathered 7 data attributes about ___ products
//////// ___.___ milliseconds to scrape and format the data
//////// ___.___ milliseconds for script execution
//////// ___.___ bonus milliseconds for logging the processed data
This folder contains two subfolders: elasticsearchScripts and puppeteerScript

There are two files inside the puppeteerScript folder:

fetchEverythingWithPuppeteer.js does what the name suggests - fetches all necessary data for a person in google scholar and all the data from their publications and stores them into an existing ElasticSearch index. Therefore, this script can be used to add all data from scratch if necessary or simply add to the existing data.

For the script to run successfully, a recent version of node is necessary and the puppeteer package needs to be installed by running npm install puppeteer

fetchEverything.ps1 is a powershell script that runs the puppeteer script. This file is not necessary to run the script but it is there for convenience. The script can instead be run by simply typing "node fetchEverythingWithPuppeteer.js 'linktogooglescholar'" on the command line.

The elasticsearchScripts folder contains all the data on people and their respective publications. It also contains python scripts that will create the indices in elastic search and files that will index the data into these indices.

The data for all people is in "newUpdatedProfiles.json"
The data for all the publications is inside the "data_finalfiles_ndjson" folder
To keep track of which file contains publications for which person, we have a nameToId.json and fileNameToName.json file that stores a dictionary to track what thier names suggest.

To create the indices and store data into them we have:
createNewPeopleIndex.py
createNewPubIndex.py
storePeopleInES.py
storePubsInES.py

As mentioned before, an ElasticSearch instance must be running for these indices to be created and for the data to be stored. Currently, the scripts call my local version of ElasticSearch
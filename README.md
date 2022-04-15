# finalprojectforsure
Project contains three main folders.
The data folder contains all the necessary scripts/files to collect data and then to index it to ElasticSearch easily and quickly. There is an additional README file in that folder for detailed explanation on how to use the files.

The **server** and **web** folders contain the **backend** and **frontend** respectively. To use, you must have a recent you must have a recent version of node installed. You must also have an ElasticSearch instance running either locally or on the cloud, but all code is written to recognize a local instance so the code would have to be changed if ES is on the cloud. There is more information about ElasticSearch under the data folder. To install ElasticSearch visit: https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html.

To run the website completely make sure you run ```npm install``` inside both folders to install the necessary npm packages.

Afterwards, to run the server run:
```
npm start
```

To run the frontend in development run:
```
npm run dev
```

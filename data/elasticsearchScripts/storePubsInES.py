import requests, json, os
import ndjson
from elasticsearch import Elasticsearch, helpers

res = requests.get('http://localhost:9200')
# print(res.content)

es = Elasticsearch([{'host': 'localhost', 'port': '9200'}])

publications = []

nameToId = {}
with open('nameToId.json', 'r') as nameidfile:
    nameToId = json.load(nameidfile)

idToName = {}
for item in nameToId:
    idToName[nameToId[item]] = item

publications = []

for filename in os.listdir('data_finalfiles_ndjson'):
    print(filename)
    with open('./data_finalfiles_ndjson/'+filename, 'r', encoding='utf-8') as authorFile:
        data = ndjson.load(authorFile)

        for item in data:

            tempAuthors = set(item['authors'])
            finalAuthors = list(tempAuthors)

            authorObj = []

            for author in finalAuthors:
                authorObj.append({"id": author, "name": idToName[author]})
    
            toIndex = {
                "_index": "publications2",
                "_type": "_doc",
                "_source": {
                    "title": item['title'],
                    "abstract": item['abstract'],
                    "num_citations": item['num_citations'],
                    "pub_authors": authorObj
                }
            }

            publications.append(toIndex)

helpers.bulk(es, publications)

print(len(publications))

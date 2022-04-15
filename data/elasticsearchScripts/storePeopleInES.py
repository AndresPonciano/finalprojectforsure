import requests, json, os
import ndjson
from elasticsearch import Elasticsearch, helpers

directory = './files'

res = requests.get('http://localhost:9200')
# print(res.content)

es = Elasticsearch([{'host': 'localhost', 'port': '9200'}])

people = []

with open('./newUpdatedProfiles.json') as f:
    data = ndjson.load(f)

    for item in data:

        toIndex = {
            "_index": "people2",
            "_type": "_doc",
            "_source": {
                "id": item['id'],
                "name": item['name'],
                "scholar_id": item['scholar_id'],
                "affiliation": item['affiliation'],
                "topics": item['topics'],
                "other_topics": item['other_topics'],
                "url_picture": item['url_picture'],
                "total_citations": int(item['total_citations']),
                "h_index": int(item['h_index']),
                "tag_cloud": item['tag_cloud']
            }
        }

        people.append(toIndex)

helpers.bulk(es, people)

print(len(people))

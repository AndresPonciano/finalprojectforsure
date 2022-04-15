import requests, json, os
import ndjson
from elasticsearch import Elasticsearch, helpers

directory = './files'

res = requests.get('http://localhost:9200')
# print(res.content)

es = Elasticsearch([{'host': 'localhost', 'port': '9200'}])

#create mapping for authors
mapping = {
    "mappings": {
        "properties": {
            "title": {
                "type": "text",
                "fields": {
                    "raw": {
                        "type": "keyword"
                    }
                }
            },
            "abstract": { "type": "text" },
            "num_citations": { "type": "double" },
            "pub_authors": { 
                "type": "nested", 
                "properties": {
                    "id": { "type": "long" },
                    "name": { "type": "keyword" }
                }
            }
        }
    }
}

response = es.indices.create(
    index="publications2",
    body=mapping,
    ignore=400
)

print(response)
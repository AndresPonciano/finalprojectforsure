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
            "id": { "type": "long" },
            "name": {
                "type": "text",
                "fields": {
                    "raw": {
                        "type": "keyword"
                    }
                }
            },
            "scholar_id": { "type": "keyword" },
            "affiliation": { "type": "keyword" },
            "topics": { "type": "keyword" },
            "other_topics": { "type": "keyword" },
            "url_picture": { "type": "keyword" },
            "total_citations": { "type": "long" },
            "h_index": { "type": "long" },
            "tag_cloud": { "type": "keyword" }
        }
    }
}

response = es.indices.create(
    index="people2",
    body=mapping,
    ignore=400
)

print(response)
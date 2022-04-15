const puppeteer = require("puppeteer");
const fs = require("fs");
const { Client } = require("@elastic/elasticsearch")
const client = new Client({ node: 'http://localhost:9200' })

const TOPICS = new Set([
     "softwareengineering", "softwaremaintenance", "softwareevolution", "empiricalsoftwareengineering", 
     "miningsoftwarerepositories", "softwareanalytics", "programanalysis", "softwaretesting", 
     "softwaresecurity", "softwareprocess", "softwarecostestimation", "softwarereliabilityengineering", 
     "softwarereliability", "faulttolerance", "sbse", "model-drivensoftwareengineering", "modeldrivendevelopment", 
     "model-drivendevelopment", "softwarearchitecture", "softwareenvironments", "analysisandtesting", "softwareverification", 
     "softwareperformance", "softwareecosystems", "softwareecosystem", "refactoring", "codeclone", "codeclones", 
     "data-drivensoftwareengineering", "opensource", "opensourcesoftware", "softwarevisualization", "softwarepowerconsumption", 
     "codereview", "softwaremaintenanceandevolution", "softwareevolutionandmaintenance", "testing", "conceptdrift", 
     "releaseengineering", "buildsystems", "softwarequality", "socialcomputing", "socio-technicalsystems", "appmarketanalytics", 
     "softwaremetrics", "logfileanalysis", "softwarequalityassurance", "experimentalsoftwareengineering", 
     "evidence-basedsoftwareengineering", "self-adaptivesystems", "self-adaptivesoftwaresystems", "technicaldebt", 
     "softwareprocessimprovement", "verificationandvalidation", "requirementsengineering", "softwaresafety", 
     "adaptivesoftwaresystems", "softwareproductlines", "softwareproductmanagement", "globalsoftwareengineering", 
     "formalmethods", "modelchecking", "runtimeverification", "programsynthesis", "programverification", "formalverification", 
     "debugging", "verification", "softwaretools", "automatedsoftwareengineering", "devops", "evidence-basedsoftwareengineering", 
     "softwarefaultprediction", "search-basedsoftwareengineering", "softwarecostestimation", "defectprediction", 
     "softwaremeasurement", "mutationtesting", "conceptlocation", "codesearch", "crowdsourcing", "programrepair", 
     "bigcode", "clonedetection", "codeclonesearch", "sourcecodesearch", "programcomprehension", "patchgenerator", 
     "bugfixing", "softwarereuse", "programsearch", "agilesoftwaredevelopment", "softwaretraceability", "safetyassurance", 
     "softwareprocessimprovement", "socialsoftwareengineering"
]);

const stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];

function convert_lower_case(data) {
    return data.toLowerCase();
}

function remove_stop_words(data) {
    res = []

    words = data.split(' ')
    for(let i = 0; i < words.length; i++) {
        if(!stopwords.includes(words[i])) {
            res.push(words[i])
        }
    }

    return(res.join(' '))
}

function remove_punctuation(data) {
    const symbols = "!\"#$%&()*+./:;<=>?@[\]^_`{|}~\n"

    for(let i = 0; i < symbols.length; i++) {
        data = data.replaceAll(symbols[i], ' ')
        data = data.replaceAll("  ", " ")
    }

    data = data.replaceAll(',', '')
    return data
}

function remove_apostrophe(data) {
    return(data.replaceAll("'", ""))
}

function preprocess(data) {
    data = convert_lower_case(data)
    data = remove_punctuation(data)
    data = remove_apostrophe(data)
    data = remove_stop_words(data)

    return data
}

function isascii(str) {
    return /^[\x00-\x7F]*$/.test(str);
}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

function createTagCloud(tfDict, dfDict, N) {
    let tagCloud = []

    for(const [key, value] of Object.entries(tfDict)) {
        tempLogVal = N / (dfDict[key] + 1)
        let idf = Math.log(tempLogVal, 10)

        let tfdfVal = value * idf
        tagCloud.push([key, tfdfVal])
    }

    tagCloud.sort((a,b) => {
        return b[1] - a[1]
    })

    let count = 0
    let greatestIndex = 0
    let finalTagCloud = []
    console.log(tagCloud)
    while(count != 50 || greatestIndex != tagCloud.length) {
        if (greatestIndex === tagCloud.length) break;
        if (finalTagCloud.length === 50) break;

        if( isascii(tagCloud[greatestIndex][0]) && !isNumeric(tagCloud[greatestIndex][0]) ) {
            finalTagCloud.push(tagCloud[greatestIndex][0])
            count++
            greatestIndex++
        } else {
            greatestIndex++
        }
    }

    console.log(finalTagCloud)
    return finalTagCloud
}

function delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
}

let ID = 2335;

(async () => {
    
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200,
    });

    const page = await browser.newPage();
    await page.goto(process.argv[2]);

    // TODO: keep track of new userId for new poeple being stored

    while(true) {

        const peopleLinks = await page.evaluate(() => 
            Array.from(document.querySelectorAll(".gs_ai_name a"), (a) => 
                a.getAttribute("href")
            )
        );

        for(let i = 0; i < 10; i++) {
            const personPage = await browser.newPage();

            await personPage.goto(`https://scholar.google.com${peopleLinks[i]}`);

            const citationsAndHindexSelector = await personPage.$$(
                "td.gsc_rsb_std", { visible: true }
            );

            // here I need to get first certain info:
            // Name, id, affiliation, topics, picture?, total citations, h-index
            const nameSelector = await personPage.$(
                "div#gsc_prf_in", { visible: true }
            );

            // id get from link

            const affiliationSelector = await personPage.$(
                "div.gsc_prf_il", { visible: true }
            );

            const topicsSelector = await personPage.$$(
                "a.gsc_prf_inta.gs_ibl", { visible: true }
            );

            let name;
            let affiliation
            let realTopics = []
            let otherTopics = []
            let totalCitations;
            let hIndex;

            name = await personPage.evaluate(
                (el) => el.textContent,
                nameSelector
            );

            affiliation = await personPage.evaluate(
                (el) => el.textContent,
                affiliationSelector
            );

            for(let a = 0; a < topicsSelector.length; a++) {
                tempTopic = await personPage.evaluate(
                    (el) => el.textContent,
                    topicsSelector[a]
                );     

                toCompare = tempTopic
                toCompare = toCompare.replaceAll(' ', '');
                toCompare = toCompare.toLowerCase();

                if(TOPICS.has(toCompare)) {
                    realTopics.push(tempTopic)
                } else {
                    otherTopics.push(tempTopic)
                }
            }

            totalCitations = await personPage.evaluate(
                (el) => el.textContent,
                citationsAndHindexSelector[0]
            )

            hIndex = await personPage.evaluate(
                (el) => el.textContent,
                citationsAndHindexSelector[2]
            )

            console.log('AUTHOR INFO:');
            console.log(name, affiliation);
            console.log(realTopics, otherTopics);
            console.log(totalCitations, hIndex);

            // doing elasticsearch search to avoid duplicates
            const results = await client.search({
                index: 'people2',
                body: {
                    query: {
                        match: { "name.raw": name }
                    }   
                }
            })

            let found = 0;

            for(let x = 0; x < results.hits.hits.length; x++) {
                let result = results.hits.hits[x]._source;
                // console.log('result is: ', result);
                if(result.name === name && result.affiliation === affiliation) {
                    found = 1;
                    break;
                }
            }

            if(found === 1) {
                console.log('author: ', name, ' already exists in ES!');
                await personPage.close();
                continue;
            }

            // after getting all the author's data, we will get their publications
            // setting up things for tag cloud
            let termFrequency = {}
            let documentFrequency = {}
            let numOfDocsN = 0
            
            let wordSet = new Set([]);
            let tagCloud = [];

            // keeping track of the range of publications we are fetching currently
            let prev = 0;
            while(true) {

                const publicationLinks = await personPage.evaluate(() =>
                    Array.from(document.querySelectorAll("tr td a.gsc_a_at"), (a) =>
                        a.getAttribute("href")
                    )
                );

                const titles = await personPage.evaluate(() =>
                    Array.from(
                        document.querySelectorAll("tr td a.gsc_a_at"),
                        (a) => a.textContent
                    )
                );

                if( publicationLinks.length === prev ) {
                    break;
                }

                for(let j = prev; j < publicationLinks.length; j++) {
                    const publicationPage = await browser.newPage();

                    if( j === publicationLinks.length ) {
                        await publicationPage.close();
                        break;
                    } else {
                        await publicationPage.goto(`https://scholar.google.com${publicationLinks[j]}`)
                    }

                    let abstract;
                    let numCitations = "0";

                    try {
                        const abstractSelector = await publicationPage.$(
                            "div#gsc_oci_descr.gsc_oci_value",
                            { visible: true }
                        );


                        const [numCitationsSelector] = await publicationPage.$x(
                            "//div[@class='gsc_oci_value']/div[contains(., 'Cited by')]"
                        );

                        abstract = await publicationPage.evaluate(
                            (el) => el.textContent,
                            abstractSelector
                        );

                        try {
                            numCitations = await publicationPage.evaluate(
                              (el) => el.textContent,
                              numCitationsSelector
                            );
                        } catch {
                            numCitations = "0"
                        }

                    } catch( err ) {
                        await publicationPage.close();
                        continue;
                    }

                    // console.log('PUBLICATION INFO: ')
                    // console.log(titles[j])
                    // console.log(abstract);
                    // console.log(numCitations)
                    // console.log('________________________________')

                    // here we need to preprocess title and abstract
                    // tokenize title and abstract
                    let newTitle = preprocess(titles[j])
                    let newAbstract = preprocess(abstract)

                    let titleTokens = newTitle.split(' ')
                    let abstractTokens = newAbstract.split(' ')

                    // add tokens to dictionaries
                    for(let k = 0; k < titleTokens.length; k++) {
                        if(!(titleTokens[k] in termFrequency)) {
                            termFrequency[titleTokens[k]] = 1
                            wordSet.add(titleTokens[k])
                        } else {
                            termFrequency[titleTokens[k]] += 1
                        }
                    }

                    for(let k = 0; k < abstractTokens; k++) {
                        if(!(abstractTokens[k] in termFrequency)) {
                            termFrequency[titleTokens[k]] = 1
                            wordSet.add(abstractTokens[k])
                        } else {
                            termFrequency[abstractTokens[k]] += 1
                        }
                    }

                    for(let key of wordSet) {
                        if(!(key in documentFrequency)) {
                            documentFrequency[key] = 1
                        } else {
                            documentFrequency[key] += 1
                        }
                    }

                    numOfDocsN += 1
                    
                    // TODO: update publication if it already exists in ES
                    const pubResults = await client.search({
                        index: 'publications2',
                        body: {
                            query: {
                                match: { "title": titles[j] }
                            }   
                        }
                    });

                    let foundPub = 0;
                    let foundPubId = -1;
                    let newPubAuthors = []

                    for(let x = 0; x < pubResults.hits.hits.length; x++) {
                        let result = pubResults.hits.hits[x]._source;
                        // console.log('pub result is: ', result);
                        let title1 = result.title
                        let title2 = titles[j]

                        title1 = title1.replaceAll(' ', '')
                        title1 = title1.replace(/\n+$/, '')
                        title1 = title1.toLowerCase()

                        title2 = title2.replaceAll(' ', '')
                        title2 = title2.toLowerCase()

                        // console.log('title1: ', title1)
                        // console.log('title2: ', title2)
                        if(title1 === title2) {
                            let abstract1 = result.abstract
                            let abstract2 = abstract

                            abstract1 = abstract1.replaceAll(' ', '')
                            abstract1 = abstract1.replace(/\n+$/, '')
                            abstract1 = abstract1.toLowerCase()

                            abstract2 = abstract2.replaceAll(' ', '')
                            abstract2 = abstract2.replace(/\n+$/, '')
                            abstract2 = abstract2.toLowerCase()

                            // console.log('abstract1: ', abstract1)
                            // console.log('abstract2: ', abstract2)
                            if(abstract1 === abstract2) {
                                foundPub = 1
                                foundPubId = pubResults.hits.hits[x]._id
                                newPubAuthors = result.pub_authors
                                newPubAuthors.push({ "id": String(ID), "name": name })
                                break;
                            }
                        }
                    }
        
                    if(foundPub === 1) {
                        console.log('publication: ', titles[j], ' already exists in ES!');
                        // TODO: update publication with new author
                        await client.update({
                            index: 'publications2',
                            id: foundPubId,
                            doc: {
                                pub_authors: newPubAuthors
                            }
                        })
                        await publicationPage.close();
                        continue;
                    } else {
                        // TODO: store new publicaiton with author
                        await client.index({
                            index: 'publications2',
                            document: {
                                title: titles[j],
                                abstract: abstract,
                                num_citations: numCitations.substr(9, numCitations.length),
                                pub_authors: [{ "id": String(ID), "name": name }]
                            }
                        })
                    }

                    await publicationPage.close();
                }

                prev = publicationLinks.length;
                const showMoreButton = await personPage.waitForSelector("#gsc_bpf_more");
                await showMoreButton.click();

                await delay(2000);
            }

            // TODO: call createTagCloud
            tagCloud = createTagCloud(termFrequency, documentFrequency, numOfDocsN);

            // TODO: store person into ES
            await client.index({
                index: 'people2',
                document: {
                    id: ID,
                    name: name,
                    scholar_id: "",
                    url_picture: "",
                    affiliation: affiliation,
                    topics: realTopics,
                    other_topics: otherTopics,
                    total_citations: totalCitations,
                    h_index: hIndex,
                    tag_cloud: tagCloud,
                }
            })

            await personPage.close();

            ID++;

            console.log('latest id is now: ', ID);

        }

        await delay(2000);

        console.log('do we get to next page button!!')
        const nextPageButton = await page.waitForSelector("button.gs_btnPR", { visible: true });
        await nextPageButton.click();

        await delay(10000);
    }

    await page.close();

    await browser.close();

})();
import { ExtractedNodeset } from "./translation10";

export const largeBatchExtracted:ExtractedNodeset[]=[
  {
    "nodesetId": "kosciuszko00219-ra-610206",
    "relationNodeId": "610206",
    "relationType": "RA",
    "raw": {
      "corpusId": "kosciuszko00219",
      "sourceRepository": "arg-tech/ACH-ArgNav",
      "sourcePath": "uploaded_data/FFkosciuszko00219.json",
      "sourceNodeCount": 1195,
      "sourceEdgeCount": 1383,
      "nodes": [
        {
          "nodeID": "610196",
          "type": "I",
          "text": "it is highly likely that Target A (AIZAD) was about to commit an act of terrorism",
          "timestamp": "2020-12-13 14:38:54"
        },
        {
          "nodeID": "610203",
          "type": "I",
          "text": "Target A (AIZAD) remains an ongoing security risk to the region of Southern Philippines",
          "timestamp": "2020-12-13 14:38:55"
        },
        {
          "nodeID": "610206",
          "type": "RA",
          "text": "Default Inference",
          "timestamp": "2020-12-13 14:38:56"
        },
        {
          "nodeID": "610230",
          "type": "YA",
          "text": "Arguing",
          "timestamp": "2020-12-13 14:39:02"
        }
      ],
      "edges": [
        {
          "edgeID": "790006",
          "fromID": "610196",
          "toID": "610206",
          "formEdgeID": null
        },
        {
          "edgeID": "790007",
          "fromID": "610206",
          "toID": "610203",
          "formEdgeID": null
        },
        {
          "edgeID": "790037",
          "fromID": "610230",
          "toID": "610206",
          "formEdgeID": null
        }
      ]
    }
  },
  {
    "nodesetId": "otway00219-ra-1001_164813044708340528",
    "relationNodeId": "1001_164813044708340528",
    "relationType": "RA",
    "raw": {
      "corpusId": "otway00219",
      "sourceRepository": "arg-tech/AMF_Scheme_Classifier2",
      "sourcePath": "data/corpespotway.json",
      "sourceNodeCount": 739,
      "sourceEdgeCount": 784,
      "nodes": [
        {
          "nodeID": "969_164813044708340528",
          "type": "I",
          "text": "steroids have caused a personality change, causing his relationship with colleagues to become strained"
        },
        {
          "nodeID": "830_164813044708340528",
          "type": "I",
          "text": "It is likely Shane Jeffries is using anabolic steroids, which increases the probability he would be involved in corporate espionage or theft"
        },
        {
          "nodeID": "1003_164813044708340528",
          "type": "YA",
          "text": "Arguing"
        },
        {
          "nodeID": "1001_164813044708340528",
          "type": "RA",
          "text": "Default Inference"
        }
      ],
      "edges": [
        {
          "edgeID": "607",
          "fromID": "830_164813044708340528",
          "toID": "1001_164813044708340528"
        },
        {
          "edgeID": "608",
          "fromID": "1001_164813044708340528",
          "toID": "969_164813044708340528"
        },
        {
          "edgeID": "610",
          "fromID": "1003_164813044708340528",
          "toID": "1001_164813044708340528"
        }
      ]
    }
  },
  {
    "nodesetId": "kosciuszko00219-ra-610210",
    "relationNodeId": "610210",
    "relationType": "RA",
    "raw": {
      "corpusId": "kosciuszko00219",
      "sourceRepository": "arg-tech/ACH-ArgNav",
      "sourcePath": "uploaded_data/FFkosciuszko00219.json",
      "sourceNodeCount": 1195,
      "sourceEdgeCount": 1383,
      "nodes": [
        {
          "nodeID": "610175",
          "type": "I",
          "text": "it is unlikely that Target A (AIZAD) was about to commit an act of terrorism",
          "timestamp": "2020-12-13 14:38:46"
        },
        {
          "nodeID": "610209",
          "type": "I",
          "text": "the motivation of Target A (AIZAD) to commit an act of terrorism in Philippines remains an intelligence gap",
          "timestamp": "2020-12-13 14:38:57"
        },
        {
          "nodeID": "610210",
          "type": "RA",
          "text": "Lack of extremist motivation",
          "timestamp": "2020-12-13 14:38:57"
        },
        {
          "nodeID": "610229",
          "type": "YA",
          "text": "Arguing",
          "timestamp": "2020-12-13 14:39:02"
        }
      ],
      "edges": [
        {
          "edgeID": "790010",
          "fromID": "610209",
          "toID": "610210",
          "formEdgeID": null
        },
        {
          "edgeID": "790011",
          "fromID": "610210",
          "toID": "610175",
          "formEdgeID": null
        },
        {
          "edgeID": "790035",
          "fromID": "610229",
          "toID": "610210",
          "formEdgeID": null
        }
      ]
    }
  },
  {
    "nodesetId": "otway00219-ra-1038_164813044708340528",
    "relationNodeId": "1038_164813044708340528",
    "relationType": "RA",
    "raw": {
      "corpusId": "otway00219",
      "sourceRepository": "arg-tech/AMF_Scheme_Classifier2",
      "sourcePath": "data/corpespotway.json",
      "sourceNodeCount": 739,
      "sourceEdgeCount": 784,
      "nodes": [
        {
          "nodeID": "1026_164813044708340528",
          "type": "I",
          "text": "It is also a reasonable assumption that the car may be under a lease or loan arrangement, based on recent phone calls to a loans bank"
        },
        {
          "nodeID": "1040_164813044708340528",
          "type": "YA",
          "text": "Arguing"
        },
        {
          "nodeID": "1038_164813044708340528",
          "type": "RA",
          "text": "Default Inference"
        },
        {
          "nodeID": "1021_164813044708340528",
          "type": "I",
          "text": "Jeffries and Diaz are a dual income couple with no children, and the appearance of the car on both their Instagram pages indicates they are sharing the purchase"
        }
      ],
      "edges": [
        {
          "edgeID": "629",
          "fromID": "1026_164813044708340528",
          "toID": "1038_164813044708340528"
        },
        {
          "edgeID": "630",
          "fromID": "1038_164813044708340528",
          "toID": "1021_164813044708340528"
        },
        {
          "edgeID": "632",
          "fromID": "1040_164813044708340528",
          "toID": "1038_164813044708340528"
        }
      ]
    }
  },
  {
    "nodesetId": "kosciuszko00219-ra-610263",
    "relationNodeId": "610263",
    "relationType": "RA",
    "raw": {
      "corpusId": "kosciuszko00219",
      "sourceRepository": "arg-tech/ACH-ArgNav",
      "sourcePath": "uploaded_data/FFkosciuszko00219.json",
      "sourceNodeCount": 1195,
      "sourceEdgeCount": 1383,
      "nodes": [
        {
          "nodeID": "610247",
          "type": "I",
          "text": "Philippine authorities suspect that Muhamad Sadili Nazrin bin AIZAD is a foreign fighter",
          "timestamp": "2020-12-13 14:43:06"
        },
        {
          "nodeID": "610261",
          "type": "I",
          "text": "a search of Muhamad Sadili Nazrin bin AIZAD's room located an AK-47 assault rifle and hand grenades",
          "timestamp": "2020-12-13 14:43:13"
        },
        {
          "nodeID": "610263",
          "type": "RA",
          "text": "Islamic documents possession",
          "timestamp": "2020-12-13 14:43:14"
        },
        {
          "nodeID": "610265",
          "type": "YA",
          "text": "Arguing",
          "timestamp": "2020-12-13 14:43:14"
        }
      ],
      "edges": [
        {
          "edgeID": "790064",
          "fromID": "610261",
          "toID": "610263",
          "formEdgeID": null
        },
        {
          "edgeID": "790065",
          "fromID": "610263",
          "toID": "610247",
          "formEdgeID": null
        },
        {
          "edgeID": "790069",
          "fromID": "610265",
          "toID": "610263",
          "formEdgeID": null
        }
      ]
    }
  },
  {
    "nodesetId": "otway00219-ra-1044_164813044708340528",
    "relationNodeId": "1044_164813044708340528",
    "relationType": "RA",
    "raw": {
      "corpusId": "otway00219",
      "sourceRepository": "arg-tech/AMF_Scheme_Classifier2",
      "sourcePath": "data/corpespotway.json",
      "sourceNodeCount": 739,
      "sourceEdgeCount": 784,
      "nodes": [
        {
          "nodeID": "1016_164813044708340528",
          "type": "I",
          "text": "The vehicle could be an indication of an additional source of revenue, possibly a kickback from corporate espionage"
        },
        {
          "nodeID": "1011_164813044708340528",
          "type": "I",
          "text": "Social Media indicates Shane Jeffries has  recently purchased of 2018 or 2019 Hyundai i30 N, which retail for between  20,000 and 45,000 AUD (second hand)"
        },
        {
          "nodeID": "1046_164813044708340528",
          "type": "YA",
          "text": "Arguing"
        },
        {
          "nodeID": "1044_164813044708340528",
          "type": "RA",
          "text": "Default Inference"
        },
        {
          "nodeID": "1006_164813044708340528",
          "type": "I",
          "text": "It is possible that a recent high value purchase indicates employee behaviour consistent with corporate espionage"
        }
      ],
      "edges": [
        {
          "edgeID": "635",
          "fromID": "1011_164813044708340528",
          "toID": "1044_164813044708340528"
        },
        {
          "edgeID": "636",
          "fromID": "1044_164813044708340528",
          "toID": "1006_164813044708340528"
        },
        {
          "edgeID": "638",
          "fromID": "1046_164813044708340528",
          "toID": "1044_164813044708340528"
        },
        {
          "edgeID": "640",
          "fromID": "1016_164813044708340528",
          "toID": "1044_164813044708340528"
        }
      ]
    }
  },
  {
    "nodesetId": "kosciuszko00219-ra-610270",
    "relationNodeId": "610270",
    "relationType": "RA",
    "raw": {
      "corpusId": "kosciuszko00219",
      "sourceRepository": "arg-tech/ACH-ArgNav",
      "sourcePath": "uploaded_data/FFkosciuszko00219.json",
      "sourceNodeCount": 1195,
      "sourceEdgeCount": 1383,
      "nodes": [
        {
          "nodeID": "610247",
          "type": "I",
          "text": "Philippine authorities suspect that Muhamad Sadili Nazrin bin AIZAD is a foreign fighter",
          "timestamp": "2020-12-13 14:43:06"
        },
        {
          "nodeID": "610268",
          "type": "I",
          "text": "also located in Muhamad Sadili Nazrin bin AZAID's room were pamphlets on Islamic practice, rituals and ethics, and extremist paraphernalia on the merits of martyrdom",
          "timestamp": "2020-12-13 14:43:16"
        },
        {
          "nodeID": "610270",
          "type": "RA",
          "text": "Islamic documents possession",
          "timestamp": "2020-12-13 14:43:18"
        },
        {
          "nodeID": "610272",
          "type": "YA",
          "text": "Arguing",
          "timestamp": "2020-12-13 14:43:18"
        }
      ],
      "edges": [
        {
          "edgeID": "790072",
          "fromID": "610268",
          "toID": "610270",
          "formEdgeID": null
        },
        {
          "edgeID": "790073",
          "fromID": "610270",
          "toID": "610247",
          "formEdgeID": null
        },
        {
          "edgeID": "790077",
          "fromID": "610272",
          "toID": "610270",
          "formEdgeID": null
        }
      ]
    }
  },
  {
    "nodesetId": "otway00219-ra-1068_164813044708340528",
    "relationNodeId": "1068_164813044708340528",
    "relationType": "RA",
    "raw": {
      "corpusId": "otway00219",
      "sourceRepository": "arg-tech/AMF_Scheme_Classifier2",
      "sourcePath": "data/corpespotway.json",
      "sourceNodeCount": 739,
      "sourceEdgeCount": 784,
      "nodes": [
        {
          "nodeID": "1056_164813044708340528",
          "type": "I",
          "text": "In order for the release of MAX10 to remain on schedule, it is recommended to address the allegations of bullying that Shane Jeffries has raised"
        },
        {
          "nodeID": "1068_164813044708340528",
          "type": "RA",
          "text": "Default Inference"
        },
        {
          "nodeID": "1070_164813044708340528",
          "type": "YA",
          "text": "Arguing"
        },
        {
          "nodeID": "1051_164813044708340528",
          "type": "I",
          "text": "It is almost certain that UA’s stock price and earnings will fall if the MAX10 is not released"
        }
      ],
      "edges": [
        {
          "edgeID": "649",
          "fromID": "1051_164813044708340528",
          "toID": "1068_164813044708340528"
        },
        {
          "edgeID": "650",
          "fromID": "1068_164813044708340528",
          "toID": "1056_164813044708340528"
        },
        {
          "edgeID": "652",
          "fromID": "1070_164813044708340528",
          "toID": "1068_164813044708340528"
        }
      ]
    }
  },
  {
    "nodesetId": "kosciuszko00219-ra-610286",
    "relationNodeId": "610286",
    "relationType": "RA",
    "raw": {
      "corpusId": "kosciuszko00219",
      "sourceRepository": "arg-tech/ACH-ArgNav",
      "sourcePath": "uploaded_data/FFkosciuszko00219.json",
      "sourceNodeCount": 1195,
      "sourceEdgeCount": 1383,
      "nodes": [
        {
          "nodeID": "610275",
          "type": "I",
          "text": "it is highly likely Muhamad Sadili Nazrin bin AIZAD was alerted to his impending arrest minutes prior to apprehension",
          "timestamp": "2020-12-13 14:43:20"
        },
        {
          "nodeID": "610283",
          "type": "I",
          "text": "Muhamad Sadili Nazrin bin AIZAD was attempting to erase his mobile phone when arrested",
          "timestamp": "2020-12-13 14:43:24"
        },
        {
          "nodeID": "610286",
          "type": "RA",
          "text": "Alerting - Evidence Erasing",
          "timestamp": "2020-12-13 14:43:25"
        },
        {
          "nodeID": "610287",
          "type": "YA",
          "text": "Arguing",
          "timestamp": "2020-12-13 14:43:25"
        }
      ],
      "edges": [
        {
          "edgeID": "790090",
          "fromID": "610283",
          "toID": "610286",
          "formEdgeID": null
        },
        {
          "edgeID": "790091",
          "fromID": "610286",
          "toID": "610275",
          "formEdgeID": null
        },
        {
          "edgeID": "790093",
          "fromID": "610287",
          "toID": "610286",
          "formEdgeID": null
        }
      ]
    }
  },
  {
    "nodesetId": "otway00219-ra-1086_164813044708340528",
    "relationNodeId": "1086_164813044708340528",
    "relationType": "RA",
    "raw": {
      "corpusId": "otway00219",
      "sourceRepository": "arg-tech/AMF_Scheme_Classifier2",
      "sourcePath": "data/corpespotway.json",
      "sourceNodeCount": 739,
      "sourceEdgeCount": 784,
      "nodes": [
        {
          "nodeID": "1080_164813044708340528",
          "type": "I",
          "text": "Shane Jeffries has demonstrated his ability to be an excellent employee, requiring minimal supervision, demonstrating maturity and possessing a valuable skill set"
        },
        {
          "nodeID": "1086_164813044708340528",
          "type": "RA",
          "text": "Default Inference"
        },
        {
          "nodeID": "1088_164813044708340528",
          "type": "YA",
          "text": "Arguing"
        },
        {
          "nodeID": "1075_164813044708340528",
          "type": "I",
          "text": "Shane Jeffries has a history of being a valuable employee"
        }
      ],
      "edges": [
        {
          "edgeID": "661",
          "fromID": "1080_164813044708340528",
          "toID": "1086_164813044708340528"
        },
        {
          "edgeID": "662",
          "fromID": "1086_164813044708340528",
          "toID": "1075_164813044708340528"
        },
        {
          "edgeID": "664",
          "fromID": "1088_164813044708340528",
          "toID": "1086_164813044708340528"
        }
      ]
    }
  },
  {
    "nodesetId": "kosciuszko00219-ca-610187",
    "relationNodeId": "610187",
    "relationType": "CA",
    "raw": {
      "corpusId": "kosciuszko00219",
      "sourceRepository": "arg-tech/ACH-ArgNav",
      "sourcePath": "uploaded_data/FFkosciuszko00219.json",
      "sourceNodeCount": 1195,
      "sourceEdgeCount": 1383,
      "nodes": [
        {
          "nodeID": "610172",
          "type": "I",
          "text": "it is likely that Target B (MANGUNSONG) presents a threat of committing an act of terrorism in Philippines",
          "timestamp": "2020-12-13 14:38:45"
        },
        {
          "nodeID": "610185",
          "type": "I",
          "text": "it is unlikely that Target B (MANGUNSONG) presents a threat of committing an act of terrorism in Philippines, based on intelligence available",
          "timestamp": "2020-12-13 14:38:50"
        },
        {
          "nodeID": "610187",
          "type": "CA",
          "text": "Default Conflict",
          "timestamp": "2020-12-13 14:38:51"
        }
      ],
      "edges": [
        {
          "edgeID": "789982",
          "fromID": "610172",
          "toID": "610187",
          "formEdgeID": null
        },
        {
          "edgeID": "789983",
          "fromID": "610187",
          "toID": "610185",
          "formEdgeID": null
        }
      ]
    }
  },
  {
    "nodesetId": "otway00219-ca-1032_164813044708340528",
    "relationNodeId": "1032_164813044708340528",
    "relationType": "CA",
    "raw": {
      "corpusId": "otway00219",
      "sourceRepository": "arg-tech/AMF_Scheme_Classifier2",
      "sourcePath": "data/corpespotway.json",
      "sourceNodeCount": 739,
      "sourceEdgeCount": 784,
      "nodes": [
        {
          "nodeID": "1021_164813044708340528",
          "type": "I",
          "text": "Jeffries and Diaz are a dual income couple with no children, and the appearance of the car on both their Instagram pages indicates they are sharing the purchase"
        },
        {
          "nodeID": "1032_164813044708340528",
          "type": "CA",
          "text": "Default Conflict"
        },
        {
          "nodeID": "1034_164813044708340528",
          "type": "YA",
          "text": "Disagreeing"
        },
        {
          "nodeID": "1006_164813044708340528",
          "type": "I",
          "text": "It is possible that a recent high value purchase indicates employee behaviour consistent with corporate espionage"
        }
      ],
      "edges": [
        {
          "edgeID": "623",
          "fromID": "1021_164813044708340528",
          "toID": "1032_164813044708340528"
        },
        {
          "edgeID": "624",
          "fromID": "1032_164813044708340528",
          "toID": "1006_164813044708340528"
        },
        {
          "edgeID": "626",
          "fromID": "1034_164813044708340528",
          "toID": "1032_164813044708340528"
        }
      ]
    }
  },
  {
    "nodesetId": "kosciuszko00219-ca-610188",
    "relationNodeId": "610188",
    "relationType": "CA",
    "raw": {
      "corpusId": "kosciuszko00219",
      "sourceRepository": "arg-tech/ACH-ArgNav",
      "sourcePath": "uploaded_data/FFkosciuszko00219.json",
      "sourceNodeCount": 1195,
      "sourceEdgeCount": 1383,
      "nodes": [
        {
          "nodeID": "610172",
          "type": "I",
          "text": "it is likely that Target B (MANGUNSONG) presents a threat of committing an act of terrorism in Philippines",
          "timestamp": "2020-12-13 14:38:45"
        },
        {
          "nodeID": "610185",
          "type": "I",
          "text": "it is unlikely that Target B (MANGUNSONG) presents a threat of committing an act of terrorism in Philippines, based on intelligence available",
          "timestamp": "2020-12-13 14:38:50"
        },
        {
          "nodeID": "610188",
          "type": "CA",
          "text": "Default Conflict",
          "timestamp": "2020-12-13 14:38:51"
        }
      ],
      "edges": [
        {
          "edgeID": "789984",
          "fromID": "610185",
          "toID": "610188",
          "formEdgeID": null
        },
        {
          "edgeID": "789985",
          "fromID": "610188",
          "toID": "610172",
          "formEdgeID": null
        }
      ]
    }
  },
  {
    "nodesetId": "otway00219-ca-200_164813044708340528",
    "relationNodeId": "200_164813044708340528",
    "relationType": "CA",
    "raw": {
      "corpusId": "otway00219",
      "sourceRepository": "arg-tech/AMF_Scheme_Classifier2",
      "sourcePath": "data/corpespotway.json",
      "sourceNodeCount": 739,
      "sourceEdgeCount": 784,
      "nodes": [
        {
          "nodeID": "175_164813044708340528",
          "type": "I",
          "text": "financial risks for Ultimate Audio are likely to be realised due to corporate espionage"
        },
        {
          "nodeID": "202_164813044708340528",
          "type": "YA",
          "text": "Disagreeing"
        },
        {
          "nodeID": "200_164813044708340528",
          "type": "CA",
          "text": "Default Conflict"
        },
        {
          "nodeID": "82_164813044708340528",
          "type": "I",
          "text": "it is recommended an attempt is made to safely retain Shane Jeffries as a productive employee"
        }
      ],
      "edges": [
        {
          "edgeID": "129",
          "fromID": "175_164813044708340528",
          "toID": "200_164813044708340528"
        },
        {
          "edgeID": "130",
          "fromID": "200_164813044708340528",
          "toID": "82_164813044708340528"
        },
        {
          "edgeID": "132",
          "fromID": "202_164813044708340528",
          "toID": "200_164813044708340528"
        }
      ]
    }
  },
  {
    "nodesetId": "kosciuszko00219-ca-610198",
    "relationNodeId": "610198",
    "relationType": "CA",
    "raw": {
      "corpusId": "kosciuszko00219",
      "sourceRepository": "arg-tech/ACH-ArgNav",
      "sourcePath": "uploaded_data/FFkosciuszko00219.json",
      "sourceNodeCount": 1195,
      "sourceEdgeCount": 1383,
      "nodes": [
        {
          "nodeID": "610175",
          "type": "I",
          "text": "it is unlikely that Target A (AIZAD) was about to commit an act of terrorism",
          "timestamp": "2020-12-13 14:38:46"
        },
        {
          "nodeID": "610196",
          "type": "I",
          "text": "it is highly likely that Target A (AIZAD) was about to commit an act of terrorism",
          "timestamp": "2020-12-13 14:38:54"
        },
        {
          "nodeID": "610198",
          "type": "CA",
          "text": "Default Conflict",
          "timestamp": "2020-12-13 14:38:54"
        }
      ],
      "edges": [
        {
          "edgeID": "789996",
          "fromID": "610175",
          "toID": "610198",
          "formEdgeID": null
        },
        {
          "edgeID": "789997",
          "fromID": "610198",
          "toID": "610196",
          "formEdgeID": null
        }
      ]
    }
  },
  {
    "nodesetId": "otway00219-ca-229_164813044708340528",
    "relationNodeId": "229_164813044708340528",
    "relationType": "CA",
    "raw": {
      "corpusId": "otway00219",
      "sourceRepository": "arg-tech/AMF_Scheme_Classifier2",
      "sourcePath": "data/corpespotway.json",
      "sourceNodeCount": 739,
      "sourceEdgeCount": 784,
      "nodes": [
        {
          "nodeID": "219_164813044708340528",
          "type": "I",
          "text": "If the remprimand of Shane Jeffries involves a non-disclosure agreement, Ultimate Audio may be able to escape this issue with little or no financial downside"
        },
        {
          "nodeID": "229_164813044708340528",
          "type": "CA",
          "text": "Default Conflict"
        },
        {
          "nodeID": "231_164813044708340528",
          "type": "YA",
          "text": "Disagreeing"
        },
        {
          "nodeID": "214_164813044708340528",
          "type": "I",
          "text": "Termination will almost certainly result in a delayed launch of the MAX10 according to Shane Jeffries’ manager, which in turn would hit Ultimate Audio’s share price and earnings by $1 and $7 million respectively"
        }
      ],
      "edges": [
        {
          "edgeID": "145",
          "fromID": "219_164813044708340528",
          "toID": "229_164813044708340528"
        },
        {
          "edgeID": "146",
          "fromID": "229_164813044708340528",
          "toID": "214_164813044708340528"
        },
        {
          "edgeID": "148",
          "fromID": "231_164813044708340528",
          "toID": "229_164813044708340528"
        }
      ]
    }
  },
  {
    "nodesetId": "kosciuszko00219-ca-610199",
    "relationNodeId": "610199",
    "relationType": "CA",
    "raw": {
      "corpusId": "kosciuszko00219",
      "sourceRepository": "arg-tech/ACH-ArgNav",
      "sourcePath": "uploaded_data/FFkosciuszko00219.json",
      "sourceNodeCount": 1195,
      "sourceEdgeCount": 1383,
      "nodes": [
        {
          "nodeID": "610175",
          "type": "I",
          "text": "it is unlikely that Target A (AIZAD) was about to commit an act of terrorism",
          "timestamp": "2020-12-13 14:38:46"
        },
        {
          "nodeID": "610196",
          "type": "I",
          "text": "it is highly likely that Target A (AIZAD) was about to commit an act of terrorism",
          "timestamp": "2020-12-13 14:38:54"
        },
        {
          "nodeID": "610199",
          "type": "CA",
          "text": "Default Conflict",
          "timestamp": "2020-12-13 14:38:54"
        }
      ],
      "edges": [
        {
          "edgeID": "789998",
          "fromID": "610196",
          "toID": "610199",
          "formEdgeID": null
        },
        {
          "edgeID": "789999",
          "fromID": "610199",
          "toID": "610175",
          "formEdgeID": null
        }
      ]
    }
  },
  {
    "nodesetId": "otway00219-ca-233_164813044708340528",
    "relationNodeId": "233_164813044708340528",
    "relationType": "CA",
    "raw": {
      "corpusId": "otway00219",
      "sourceRepository": "arg-tech/AMF_Scheme_Classifier2",
      "sourcePath": "data/corpespotway.json",
      "sourceNodeCount": 739,
      "sourceEdgeCount": 784,
      "nodes": [
        {
          "nodeID": "219_164813044708340528",
          "type": "I",
          "text": "If the remprimand of Shane Jeffries involves a non-disclosure agreement, Ultimate Audio may be able to escape this issue with little or no financial downside"
        },
        {
          "nodeID": "235_164813044708340528",
          "type": "YA",
          "text": "Disagreeing"
        },
        {
          "nodeID": "233_164813044708340528",
          "type": "CA",
          "text": "Default Conflict"
        },
        {
          "nodeID": "214_164813044708340528",
          "type": "I",
          "text": "Termination will almost certainly result in a delayed launch of the MAX10 according to Shane Jeffries’ manager, which in turn would hit Ultimate Audio’s share price and earnings by $1 and $7 million respectively"
        }
      ],
      "edges": [
        {
          "edgeID": "149",
          "fromID": "214_164813044708340528",
          "toID": "233_164813044708340528"
        },
        {
          "edgeID": "150",
          "fromID": "233_164813044708340528",
          "toID": "219_164813044708340528"
        },
        {
          "edgeID": "152",
          "fromID": "235_164813044708340528",
          "toID": "233_164813044708340528"
        }
      ]
    }
  },
  {
    "nodesetId": "kosciuszko00219-ca-610215",
    "relationNodeId": "610215",
    "relationType": "CA",
    "raw": {
      "corpusId": "kosciuszko00219",
      "sourceRepository": "arg-tech/ACH-ArgNav",
      "sourcePath": "uploaded_data/FFkosciuszko00219.json",
      "sourceNodeCount": 1195,
      "sourceEdgeCount": 1383,
      "nodes": [
        {
          "nodeID": "610179",
          "type": "I",
          "text": "it is unlikely that returning foreign fighters or new recruits focused on Southern Philippines may convene in the port city of Manado (North Sulawesi, Indonesia)",
          "timestamp": "2020-12-13 14:38:48"
        },
        {
          "nodeID": "610213",
          "type": "I",
          "text": "it is likely that returning foreign fighters or new recruits focused on Southern Philippines may convene in the port city of Manado (North Sulawesi, Indonesia)",
          "timestamp": "2020-12-13 14:38:58"
        },
        {
          "nodeID": "610215",
          "type": "CA",
          "text": "Default Conflict",
          "timestamp": "2020-12-13 14:38:58"
        }
      ],
      "edges": [
        {
          "edgeID": "790016",
          "fromID": "610179",
          "toID": "610215",
          "formEdgeID": null
        },
        {
          "edgeID": "790017",
          "fromID": "610215",
          "toID": "610213",
          "formEdgeID": null
        }
      ]
    }
  },
  {
    "nodesetId": "otway00219-ca-284_164813044708340528",
    "relationNodeId": "284_164813044708340528",
    "relationType": "CA",
    "raw": {
      "corpusId": "otway00219",
      "sourceRepository": "arg-tech/AMF_Scheme_Classifier2",
      "sourcePath": "data/corpespotway.json",
      "sourceNodeCount": 739,
      "sourceEdgeCount": 784,
      "nodes": [
        {
          "nodeID": "258_164813044708340528",
          "type": "I",
          "text": "the probability that Shane Jeffries is involved in corporate theft or espionage rises to 49%"
        },
        {
          "nodeID": "286_164813044708340528",
          "type": "YA",
          "text": "Disagreeing"
        },
        {
          "nodeID": "284_164813044708340528",
          "type": "CA",
          "text": "Default Conflict"
        },
        {
          "nodeID": "243_164813044708340528",
          "type": "I",
          "text": "Although Shane Jeffries polygraph test indicated that he was lying about maintaining confidentiality when he was hired three years ago, this piece of information alone only carries a 13.5% probability that Jeffries lied"
        }
      ],
      "edges": [
        {
          "edgeID": "181",
          "fromID": "243_164813044708340528",
          "toID": "284_164813044708340528"
        },
        {
          "edgeID": "182",
          "fromID": "284_164813044708340528",
          "toID": "258_164813044708340528"
        },
        {
          "edgeID": "184",
          "fromID": "286_164813044708340528",
          "toID": "284_164813044708340528"
        }
      ]
    }
  },
  {
    "nodesetId": "kosciuszko00219-ma-610454",
    "relationNodeId": "610454",
    "relationType": "MA",
    "raw": {
      "corpusId": "kosciuszko00219",
      "sourceRepository": "arg-tech/ACH-ArgNav",
      "sourcePath": "uploaded_data/FFkosciuszko00219.json",
      "sourceNodeCount": 1195,
      "sourceEdgeCount": 1383,
      "nodes": [
        {
          "nodeID": "610433",
          "type": "I",
          "text": "the photos found on Target A's (Muhamad Sadili Nazrin bin AIZAD) phone are consistent with one of the known migration routes for foreign fighters into the Philippines through the Sulu Archipelago",
          "timestamp": "2020-12-13 14:47:40"
        },
        {
          "nodeID": "610454",
          "type": "MA",
          "text": "Default Rephrase",
          "timestamp": "2020-12-13 14:47:47"
        },
        {
          "nodeID": "610456",
          "type": "YA",
          "text": "Restating",
          "timestamp": "2020-12-13 14:47:47"
        }
      ],
      "edges": [
        {
          "edgeID": "790254",
          "fromID": "610433",
          "toID": "610454",
          "formEdgeID": null
        },
        {
          "edgeID": "790255",
          "fromID": "610454",
          "toID": "610433",
          "formEdgeID": null
        },
        {
          "edgeID": "790259",
          "fromID": "610456",
          "toID": "610454",
          "formEdgeID": null
        }
      ]
    }
  },
  {
    "nodesetId": "otway00219-ma-150_164813044708340528",
    "relationNodeId": "150_164813044708340528",
    "relationType": "MA",
    "raw": {
      "corpusId": "otway00219",
      "sourceRepository": "arg-tech/AMF_Scheme_Classifier2",
      "sourcePath": "data/corpespotway.json",
      "sourceNodeCount": 739,
      "sourceEdgeCount": 784,
      "nodes": [
        {
          "nodeID": "82_164813044708340528",
          "type": "I",
          "text": "it is recommended an attempt is made to safely retain Shane Jeffries as a productive employee"
        },
        {
          "nodeID": "150_164813044708340528",
          "type": "MA",
          "text": "Default Rephrase"
        },
        {
          "nodeID": "152_164813044708340528",
          "type": "YA",
          "text": "Restating"
        },
        {
          "nodeID": "54_164813044708340528",
          "type": "I",
          "text": "A formal investigation will likely not be required if immediate steps are taken to mitigate Shane Jeffries’ intent through addressing the likely bullying he is currently experiencing and greater covert surveillance of Shane Jeffries systems access"
        }
      ],
      "edges": [
        {
          "edgeID": "91",
          "fromID": "82_164813044708340528",
          "toID": "150_164813044708340528"
        },
        {
          "edgeID": "92",
          "fromID": "150_164813044708340528",
          "toID": "54_164813044708340528"
        },
        {
          "edgeID": "94",
          "fromID": "152_164813044708340528",
          "toID": "150_164813044708340528"
        }
      ]
    }
  },
  {
    "nodesetId": "kosciuszko00219-ma-610671",
    "relationNodeId": "610671",
    "relationType": "MA",
    "raw": {
      "corpusId": "kosciuszko00219",
      "sourceRepository": "arg-tech/ACH-ArgNav",
      "sourcePath": "uploaded_data/FFkosciuszko00219.json",
      "sourceNodeCount": 1195,
      "sourceEdgeCount": 1383,
      "nodes": [
        {
          "nodeID": "610597",
          "type": "I",
          "text": "the relationship between Target A (Muhamad Sadili Nazrin bin Aizad) and Target B (Fadhlan Mangunsong) remains an intelligence gap",
          "timestamp": "2020-12-13 14:49:03"
        },
        {
          "nodeID": "610659",
          "type": "I",
          "text": "this would require knowledge into the relationship between the two targets",
          "timestamp": "2020-12-13 14:49:19"
        },
        {
          "nodeID": "610671",
          "type": "MA",
          "text": "Default Rephrase",
          "timestamp": "2020-12-13 14:49:21"
        },
        {
          "nodeID": "610673",
          "type": "YA",
          "text": "Restating",
          "timestamp": "2020-12-13 14:49:21"
        }
      ],
      "edges": [
        {
          "edgeID": "790484",
          "fromID": "610597",
          "toID": "610671",
          "formEdgeID": null
        },
        {
          "edgeID": "790485",
          "fromID": "610671",
          "toID": "610659",
          "formEdgeID": null
        },
        {
          "edgeID": "790489",
          "fromID": "610673",
          "toID": "610671",
          "formEdgeID": null
        }
      ]
    }
  },
  {
    "nodesetId": "otway00219-ma-278_164813044708340528",
    "relationNodeId": "278_164813044708340528",
    "relationType": "MA",
    "raw": {
      "corpusId": "otway00219",
      "sourceRepository": "arg-tech/AMF_Scheme_Classifier2",
      "sourcePath": "data/corpespotway.json",
      "sourceNodeCount": 739,
      "sourceEdgeCount": 784,
      "nodes": [
        {
          "nodeID": "258_164813044708340528",
          "type": "I",
          "text": "the probability that Shane Jeffries is involved in corporate theft or espionage rises to 49%"
        },
        {
          "nodeID": "280_164813044708340528",
          "type": "YA",
          "text": "Restating"
        },
        {
          "nodeID": "278_164813044708340528",
          "type": "MA",
          "text": "Default Rephrase"
        },
        {
          "nodeID": "238_164813044708340528",
          "type": "I",
          "text": "there is an even chance (49%) that Shane Jeffries is involved in corporate espionage"
        }
      ],
      "edges": [
        {
          "edgeID": "175",
          "fromID": "258_164813044708340528",
          "toID": "278_164813044708340528"
        },
        {
          "edgeID": "176",
          "fromID": "278_164813044708340528",
          "toID": "238_164813044708340528"
        },
        {
          "edgeID": "178",
          "fromID": "280_164813044708340528",
          "toID": "278_164813044708340528"
        }
      ]
    }
  },
  {
    "nodesetId": "kosciuszko00219-ma-610678",
    "relationNodeId": "610678",
    "relationType": "MA",
    "raw": {
      "corpusId": "kosciuszko00219",
      "sourceRepository": "arg-tech/ACH-ArgNav",
      "sourcePath": "uploaded_data/FFkosciuszko00219.json",
      "sourceNodeCount": 1195,
      "sourceEdgeCount": 1383,
      "nodes": [
        {
          "nodeID": "610507",
          "type": "I",
          "text": "Target A (Muhamad Sadili Nazrin bin Aizad) may be tasked with scouting transit routes and actively recruiting new militants",
          "timestamp": "2020-12-13 14:48:42"
        },
        {
          "nodeID": "610557",
          "type": "I",
          "text": "it is likely that Target A (Muhamad Sadili Nazrin bin Aizad) is tasked with recruiting new foreign fighters",
          "timestamp": "2020-12-13 14:48:54"
        },
        {
          "nodeID": "610678",
          "type": "MA",
          "text": "Default Rephrase",
          "timestamp": "2020-12-13 14:49:21"
        },
        {
          "nodeID": "610680",
          "type": "YA",
          "text": "Restating",
          "timestamp": "2020-12-13 14:49:21"
        }
      ],
      "edges": [
        {
          "edgeID": "790498",
          "fromID": "610557",
          "toID": "610678",
          "formEdgeID": null
        },
        {
          "edgeID": "790499",
          "fromID": "610678",
          "toID": "610507",
          "formEdgeID": null
        },
        {
          "edgeID": "790503",
          "fromID": "610680",
          "toID": "610678",
          "formEdgeID": null
        }
      ]
    }
  },
  {
    "nodesetId": "otway00219-ma-702_164813044708340528",
    "relationNodeId": "702_164813044708340528",
    "relationType": "MA",
    "raw": {
      "corpusId": "otway00219",
      "sourceRepository": "arg-tech/AMF_Scheme_Classifier2",
      "sourcePath": "data/corpespotway.json",
      "sourceNodeCount": 739,
      "sourceEdgeCount": 784,
      "nodes": [
        {
          "nodeID": "696_164813044708340528",
          "type": "I",
          "text": "His seating position increases the ability of Shane Jeffries to secretly remove printed documents from the lab"
        },
        {
          "nodeID": "704_164813044708340528",
          "type": "YA",
          "text": "Restating"
        },
        {
          "nodeID": "702_164813044708340528",
          "type": "MA",
          "text": "Default Rephrase"
        },
        {
          "nodeID": "662_164813044708340528",
          "type": "I",
          "text": "It is likely Shane Jeffries had the capability to remove secret corporate information from the lab at Ultimate Audio"
        }
      ],
      "edges": [
        {
          "edgeID": "443",
          "fromID": "696_164813044708340528",
          "toID": "702_164813044708340528"
        },
        {
          "edgeID": "444",
          "fromID": "702_164813044708340528",
          "toID": "662_164813044708340528"
        },
        {
          "edgeID": "446",
          "fromID": "704_164813044708340528",
          "toID": "702_164813044708340528"
        }
      ]
    }
  },
  {
    "nodesetId": "kosciuszko00219-ma-610759",
    "relationNodeId": "610759",
    "relationType": "MA",
    "raw": {
      "corpusId": "kosciuszko00219",
      "sourceRepository": "arg-tech/ACH-ArgNav",
      "sourcePath": "uploaded_data/FFkosciuszko00219.json",
      "sourceNodeCount": 1195,
      "sourceEdgeCount": 1383,
      "nodes": [
        {
          "nodeID": "610283",
          "type": "I",
          "text": "Muhamad Sadili Nazrin bin AIZAD was attempting to erase his mobile phone when arrested",
          "timestamp": "2020-12-13 14:43:24"
        },
        {
          "nodeID": "610463",
          "type": "I",
          "text": "at time of arrest Muhamad Sadili Nazrin bin Aizad was attempting to erase his mobile phone, with only four photographs able to be recovered",
          "timestamp": "2020-12-13 14:48:30"
        },
        {
          "nodeID": "610759",
          "type": "MA",
          "text": "Default Rephrase",
          "timestamp": "2020-12-13 15:10:06"
        },
        {
          "nodeID": "610761",
          "type": "YA",
          "text": "Restating",
          "timestamp": "2020-12-13 15:10:08"
        }
      ],
      "edges": [
        {
          "edgeID": "790578",
          "fromID": "610759",
          "toID": "610283",
          "formEdgeID": null
        },
        {
          "edgeID": "790581",
          "fromID": "610463",
          "toID": "610759",
          "formEdgeID": null
        },
        {
          "edgeID": "790583",
          "fromID": "610761",
          "toID": "610759",
          "formEdgeID": null
        }
      ]
    }
  },
  {
    "nodesetId": "kosciuszko00219-ma-610765",
    "relationNodeId": "610765",
    "relationType": "MA",
    "raw": {
      "corpusId": "kosciuszko00219",
      "sourceRepository": "arg-tech/ACH-ArgNav",
      "sourcePath": "uploaded_data/FFkosciuszko00219.json",
      "sourceNodeCount": 1195,
      "sourceEdgeCount": 1383,
      "nodes": [
        {
          "nodeID": "610192",
          "type": "I",
          "text": "the relationship between Target A (AIZAD) and Target B (MANGUNSONG) remains an intelligence gap",
          "timestamp": "2020-12-13 14:38:52"
        },
        {
          "nodeID": "610597",
          "type": "I",
          "text": "the relationship between Target A (Muhamad Sadili Nazrin bin Aizad) and Target B (Fadhlan Mangunsong) remains an intelligence gap",
          "timestamp": "2020-12-13 14:49:03"
        },
        {
          "nodeID": "610765",
          "type": "MA",
          "text": "Default Rephrase",
          "timestamp": "2020-12-13 15:10:10"
        },
        {
          "nodeID": "610767",
          "type": "YA",
          "text": "Restating",
          "timestamp": "2020-12-13 15:10:12"
        }
      ],
      "edges": [
        {
          "edgeID": "790590",
          "fromID": "610765",
          "toID": "610192",
          "formEdgeID": null
        },
        {
          "edgeID": "790593",
          "fromID": "610597",
          "toID": "610765",
          "formEdgeID": null
        },
        {
          "edgeID": "790595",
          "fromID": "610767",
          "toID": "610765",
          "formEdgeID": null
        }
      ]
    }
  },
  {
    "nodesetId": "kosciuszko00219-ma-610768",
    "relationNodeId": "610768",
    "relationType": "MA",
    "raw": {
      "corpusId": "kosciuszko00219",
      "sourceRepository": "arg-tech/ACH-ArgNav",
      "sourcePath": "uploaded_data/FFkosciuszko00219.json",
      "sourceNodeCount": 1195,
      "sourceEdgeCount": 1383,
      "nodes": [
        {
          "nodeID": "610382",
          "type": "I",
          "text": "the Southern Philippines has become a focal point for jihadist activity in the Asia-Pacific",
          "timestamp": "2020-12-13 14:47:22"
        },
        {
          "nodeID": "610768",
          "type": "MA",
          "text": "Default Rephrase",
          "timestamp": "2020-12-13 15:10:12"
        },
        {
          "nodeID": "610769",
          "type": "I",
          "text": "Southern Philippines remains an attractive target for Islamist extremist groups for acts of terrorism",
          "timestamp": "2020-12-13 15:10:13"
        },
        {
          "nodeID": "610771",
          "type": "YA",
          "text": "Restating",
          "timestamp": "2020-12-13 15:10:13"
        }
      ],
      "edges": [
        {
          "edgeID": "790596",
          "fromID": "610768",
          "toID": "610769",
          "formEdgeID": null
        },
        {
          "edgeID": "790599",
          "fromID": "610382",
          "toID": "610768",
          "formEdgeID": null
        },
        {
          "edgeID": "790601",
          "fromID": "610771",
          "toID": "610768",
          "formEdgeID": null
        }
      ]
    }
  },
  {
    "nodesetId": "kosciuszko00219-ma-610950",
    "relationNodeId": "610950",
    "relationType": "MA",
    "raw": {
      "corpusId": "kosciuszko00219",
      "sourceRepository": "arg-tech/ACH-ArgNav",
      "sourcePath": "uploaded_data/FFkosciuszko00219.json",
      "sourceNodeCount": 1195,
      "sourceEdgeCount": 1383,
      "nodes": [
        {
          "nodeID": "610931",
          "type": "I",
          "text": "the Indonesian translation reads: “I hope this card reaches you. I feel very happy in Mindanao The weather is perfect. I also snorkel yesterday, and it was very impressive - lots of beautiful fish and coral! Initially a bit problematic when trying on the mask, but all resolved well. I am planning to dive maybe I will send you a photo! Say hello to my family.”",
          "timestamp": "2020-12-13 15:51:31"
        },
        {
          "nodeID": "610938",
          "type": "I",
          "text": "the Malay translation reads: “I hope this card is for you. I feel so happy in Mindanao. The weather is perfect. I was snorkelling yesterday too and it was amazing - lots of fish and pretty coral! At first it was a bit tricky to try on the mask, but it all worked out. Planning to dive I may send you a picture! Say hello to my family.”",
          "timestamp": "2020-12-13 15:51:35"
        },
        {
          "nodeID": "610950",
          "type": "MA",
          "text": "Default Rephrase",
          "timestamp": "2020-12-13 15:51:41"
        },
        {
          "nodeID": "610952",
          "type": "YA",
          "text": "Restating",
          "timestamp": "2020-12-13 15:51:41"
        }
      ],
      "edges": [
        {
          "edgeID": "790807",
          "fromID": "610938",
          "toID": "610950",
          "formEdgeID": null
        },
        {
          "edgeID": "790808",
          "fromID": "610950",
          "toID": "610931",
          "formEdgeID": null
        },
        {
          "edgeID": "790812",
          "fromID": "610952",
          "toID": "610950",
          "formEdgeID": null
        }
      ]
    }
  }
] as ExtractedNodeset[];

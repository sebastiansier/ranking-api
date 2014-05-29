ranking-api
===========

Calculate soccer's ranking table based on matches results

This is just a prof of concept of building an API with node.

Prerequisites
-------------

To run this server you'll only need nodejs

How it works
-------------

* Start the server: `node server.js`
* Make post requests with the match data, and the response will be the ranking table
* Every match should have the following structure:
```json
  { "local_team":    xx,
    "visitor_team":  xx,
    "local_goals":   xx,
    "visitor_goals": xx
  }
```

* The response will be the table (ordered by points) with the following structure:
```json
  [
    { "teamId": xx,
      "played": xx,
      "winned": xx,
      "drawed": xx,
      "loosed": xx,
      "gf":     xx,
      "ga":     xx,
      "pts":    xx
    }, 
    ...
  ]
```

Example
===========

Request
-----------

```json
  {"matches":
    [
      { "local_goals":2,
        "visitor_goals":3,
        "local_team":1,
        "visitor_team":2
      },
      { "local_team":2,
        "visitor_team":1,
        "local_goals":1,
        "visitor_goals":1
      },
      { "local_team":2,
        "visitor_team":3,
        "local_goals":5,
        "visitor_goals":1
      }
    ]
  }
```

Response
-----------

```json
[
  { "teamId":2,
    "played":3,
    "winned":2,
    "drawed":1,
    "loosed":0,
    "gf":9,
    "ga":4,
    "pts":7
  },
  { "teamId":1,
    "played":2,
    "winned":0,
    "drawed":1,
    "loosed":1,
    "gf":3,
    "ga":4,
    "pts":1
  },
  { "teamId":3,
    "played":1,
    "winned":0,
    "drawed":0,
    "loosed":1,
    "gf":1,
    "ga":5,
    "pts":0
  }
]
```

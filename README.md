# Application - Voting

[![Eclipse License](http://img.shields.io/badge/license-Eclipse-brightgreen.svg)](LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/dirigiblelabs/application-voting.svg)](https://github.com/dirigiblelabs/application-voting/graphs/contributors)

## Overview
Voting application, levereging Dirigible 3.x APIs
 
## Build

```
docker build -t samples-application-voting .
```

## Push

```
docker tag samples-application-voting dirigiblelabs/samples-application-voting
docker push dirigiblelabs/samples-application-voting
```

## Deploy

#### Cloud Foundry
```
cf push voting \
--docker-image=dirigiblelabs/samples-application-voting \
--hostname voting-<Org-Name> \
-m 2G -k 2GB
```

XSUAA Configuration
```json
{
   "xsappname": "xsuaa-voting",
   "scopes": [
      {
         "name": "$XSAPPNAME.Developer",
         "description": "Developer scope"
      },
      {
         "name": "$XSAPPNAME.Operator",
         "description": "Operator scope"
      },
      {
         "name": "$XSAPPNAME.Admin",
         "description": "Voting admin scope"
      }
   ],
   "role-templates": [
      {
         "name": "Developer",
         "description": "Developer related roles",
         "scope-references": [
            "$XSAPPNAME.Developer"
         ]
      },
      {
         "name": "Operator",
         "description": "Operator related roles",
         "scope-references": [
            "$XSAPPNAME.Operator"
         ]
      },
      {
         "name": "Admin",
         "description": "Voting related roles",
         "scope-references": [
            "$XSAPPNAME.Admin"
         ]
      }
   ],
   "role-collections": [
      {
         "name": "dirigible",
         "description": "Dirigible Developer",
         "role-template-references": [ 
            "$XSAPPNAME.Developer",
            "$XSAPPNAME.Operator"
         ]
      },
      {
         "name": "voting-admin",
         "description": "Voting Admin",
         "role-template-references": [ 
            "$XSAPPNAME.Admin"
         ]
      }
   ]	
}
```

## License

This project is copyrighted by [SAP SE](http://www.sap.com/) and is available under the [Eclipse Public License v 1.0](https://www.eclipse.org/legal/epl-v10.html). See [LICENSE](LICENSE) and [NOTICE.txt](NOTICE.txt) for further details.

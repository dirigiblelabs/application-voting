# Application - Voting

[![Eclipse License](http://img.shields.io/badge/license-Eclipse-brightgreen.svg)](LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/dirigiblelabs/application-voting.svg)](https://github.com/dirigiblelabs/application-voting/graphs/contributors)

## Overview
Voting application, levereging Dirigible 3.x APIs
 
## Build

#### Kyma
```
docker build -t samples-application-voting:kyma . -f Dockerfile-kyma
```

#### Cloud Foundry
```
docker build -t samples-application-voting:cf . -f Dockerfile-cf
```

## Push

#### Kyma
```
docker tag samples-application-voting:kyma dirigiblelabs/samples-application-voting:kyma
docker push dirigiblelabs/samples-application-voting:kyma
```

#### Cloud Foundry
```
docker tag samples-application-voting:cf dirigiblelabs/samples-application-voting:cf
docker push dirigiblelabs/samples-application-voting:cf
```

## Deploy

#### Kyma
```
kubectl create secret generic hana-database-credentials \
--from-literal=URL='<HANA-URL>' \
--from-literal=USERNAME='<HANA-USERNAME>' \
--from-literal=PASSWORD=<HANA_PASSWORD>
```

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: voting
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: voting
  template:
    metadata:
      labels:
        app: voting
    spec:
      containers:
        - name: voting
          image: dirigiblelabs/samples-application-voting:kyma
          ports:
            - containerPort: 8080
              name: voting
          env:
            - name: DIRIGIBLE_HOST
              value: https://voting.<KYMA-CLUSTER-HOST>
            - name: DIRIGIBLE_THEME_DEFAULT
              value: "fiori"
            - name: DIRIGIBLE_DATABASE_PROVIDER
              value: custom
            - name: DIRIGIBLE_DATABASE_CUSTOM_DATASOURCES
              value: HANA
            - name: DIRIGIBLE_DATABASE_DATASOURCE_NAME_DEFAULT
              value: HANA
            - name: HANA_DRIVER
              value: com.sap.db.jdbc.Driver
            - name: HANA_URL
              valueFrom:
                secretKeyRef:
                  name: hana-database-credentials
                  key: URL
            - name: HANA_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: hana-database-credentials
                  key: PASSWORD
            - name: HANA_USERNAME
              valueFrom:
                secretKeyRef:
                  name: hana-database-credentials
                  key: USERNAME
            - name: DIRIGIBLE_SCHEDULER_DATABASE_DRIVER
              value: com.sap.db.jdbc.Driver
            - name: DIRIGIBLE_SCHEDULER_DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: hana-database-credentials
                  key: URL
            - name: DIRIGIBLE_SCHEDULER_DATABASE_USERNAME
              valueFrom:
                secretKeyRef:
                  name: hana-database-credentials
                  key: USERNAME
            - name: DIRIGIBLE_SCHEDULER_DATABASE_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: hana-database-credentials
                  key: PASSWORD
            - name: DIRIGIBLE_MESSAGING_USE_DEFAULT_DATABASE
              value: "false"
            - name: DIRIGIBLE_FLOWABLE_USE_DEFAULT_DATABASE
              value: "false"
---
apiVersion: v1
kind: Service
metadata:
  name: voting
  namespace: default
  labels:
    app: voting
spec:
  ports:
  - port: 8080
    name: voting
  clusterIP: None
  selector:
    app: voting
```

XSUAA Configuration:
```json
{
   "xsappname": "xsuaa-voting-kyma",
   "oauth2-configuration": {
      "token-validity": 7200,
      "redirect-uris": [
         "https://voting.<KYMA-CLUSTER-HOST>"
      ]
   },
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
         "name": "voting-dirigible-developer",
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

#### Cloud Foundry
```
cf push voting \
--docker-image=dirigiblelabs/samples-application-voting:cf \
--hostname voting-<Org-Name> \
-m 2G -k 2GB
```

XSUAA Configuration:
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
         "name": "voting-dirigible-developer",
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

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

## License

This project is copyrighted by [SAP SE](http://www.sap.com/) and is available under the [Eclipse Public License v 1.0](https://www.eclipse.org/legal/epl-v10.html). See [LICENSE](LICENSE) and [NOTICE.txt](NOTICE.txt) for further details.

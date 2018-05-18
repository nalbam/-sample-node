# sample-node
```
FROM node:latest
EXPOSE 3000

docker pull nalbam/sample-node:latest (268MB)
docker pull nalbam/sample-node:alpine (24MB)
docker pull nalbam/sample-node:slim   (94MB)
```

## Openshift
### Create project
```
oc new-project ops
oc new-project dev
oc new-project qa

oc policy add-role-to-user admin admin -n ops
oc policy add-role-to-user admin admin -n dev
oc policy add-role-to-user admin admin -n qa
```

### Create app
```
oc new-app -f https://raw.githubusercontent.com/nalbam/sample-node/master/openshift/templates/deploy.json -n dev \
           -p PROFILE=dev
oc new-app -f https://raw.githubusercontent.com/nalbam/sample-node/master/openshift/templates/deploy.json -n qa \
           -p PROFILE=dev
```

### Create pipeline
```
oc new-app jenkins-ephemeral -n ops

oc policy add-role-to-user edit system:serviceaccount:ops:jenkins -n dev
oc policy add-role-to-user edit system:serviceaccount:ops:jenkins -n qa

oc new-app -f https://raw.githubusercontent.com/nalbam/sample-node/master/openshift/templates/pipeline.json -n ops \
           -p SOURCE_REPOSITORY_URL=https://github.com/nalbam/sample-node
```

### Start Build
```
oc start-build sample-node-pipeline -n ops
```

### Cleanup
```
oc delete project ops dev qa
```

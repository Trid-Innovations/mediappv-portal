# MediaPPV-portal

This platform is to allow `Mediappv` users to manage their account, profile, credits and authenticate
The solution have been implemented in Next Framework

To run the backend in local :

```bash
cd function
pnpm serve
```

note : make sure to set the baseULR accordingly in the webClient.tsgit file

for prod:
const baseURL = 'https://us-central1-mediappv-936c2.cloudfunctions.net/api/';

for local

const baseURL = 'http://127.0.0.1:5001/mediappv-936c2/us-central1/api/';

deploy the function: firebase deploy --only functions

### Add custom secure domain for local

add this line on the etc/host file:
127.0.0.1 local.mediappv.tech

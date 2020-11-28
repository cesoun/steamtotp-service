# steamtotp-service
A deployable web service with an endpoint to consume for getting Steam TOTP codes.

Heroku is pretty simple for this and I've got it deployed [here](https://steamtotp-service.herokuapp.com). Codes can be recieved by posting to `/totp`.

Ideally you should set this up youself to keep your data safe. You never know what someone could be doing on the backend.

The request payload is expected to look like this:

```json
{
  "shared_secret": "string"
}
```

### Why????

I've got a few Steam accounts that are VAC banned from CS:GO and don't want to accidentally ban ones that I use. Although I don't play CS much these days and I
really only cheat for the laughs. Also because I would need to bring my laptop with me to get into my accounts and with this I can just consume the 
endpoints via an iOS app.

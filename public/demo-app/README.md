# Sandbox bundle

`/demo` loads the Martian console from this folder in an iframe:
`/demo-app/index.html?embed=1`.

The bundle comes from the platform repo (`aniketxdey/martian`):

```sh
npm run build:embed          # in the platform repo, writes dist-embed/
rm -rf public/demo-app/*     # here
cp -R ../martian/dist-embed/. public/demo-app/
```

Then add `public/demo-app/embed.json` (any JSON object, for example
`{ "source": "aniketxdey/martian@<commit>", "builtAt": "<date>" }`). The `/demo`
page checks for that file before it shows the iframe, because a missing bundle
would otherwise come back as this site's own `index.html`.

The bundle has to work from a sub-path, so build it with a relative base, and it
must not need sign-in or an API: `?embed=1` starts it on fixed sample data.
Copying the bundle in deletes this README, so put it back afterwards.

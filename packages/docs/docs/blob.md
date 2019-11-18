# Blob

Blobs are the core unit of `dcpm`. A blob defines what a package can do, how to do it, and who made it. When fetched from the `backend` you'll see this response:

```json
{
  "about": {
    "name": "string",
    "author": "string",
    "about": "string",
    "version": "string"
  },
  "remotes": {
    "scm": "url"
  },
  "configs": {
    "default": "path",
    "any-env": "other-path"
  },
  "supports": {
    "docker": "version",
    "docker-compose": "version"
  }
}
```

This response is built by your manifest and a little bit of `backend` parsing. This should be completely obfuscated by the `dcpm` cli, but this information may be interesting for an end user.

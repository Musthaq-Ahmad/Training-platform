A **web application manifest**, defined in the [Web Application Manifest](https://w3c.github.io/manifest/ 'External link (opens in new tab)') specification, is a [JSON](https://developer.mozilla.org/en-US/docs/Glossary/JSON) text file that provides information about a web application.

The most common use for a web application manifest is to provide information that the browser needs to install a [progressive web app](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) (PWA) on a device, such as the app's name and icon.

A web application manifest contains a single JSON object where the top-level keys are called _members_.

## [Members](#members)

This section lists [reference pages for manifest members](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference) that are documented on MDN. All members are optional in the specification, but some applications require some members to be present. For example, [PWAs must provide certain manifest members](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#required_manifest_members).

- [\*\_localized](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/*_localized)
- [background\_color](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/background_color)
- [categories](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/categories)
- [description](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/description)
- [display](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/display)
- [display\_override](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/display_override)
- [file\_handlers](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/file_handlers)
- [icons](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/icons)
- [id](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/id)
- [launch\_handler](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/launch_handler)
- [name](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/name)
- [note\_taking](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/note_taking)
- [orientation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/orientation)
- [prefer\_related\_applications](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/prefer_related_applications)
- [protocol\_handlers](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/protocol_handlers)
- [related\_applications](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/related_applications)
- [scope](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/scope)
- [scope\_extensions](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/scope_extensions)
- [screenshots](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/screenshots)
- [serviceworker](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/serviceworker)
- [share\_target](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/share_target)
- [short\_name](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/short_name)
- [shortcuts](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/shortcuts)
- [start\_url](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/start_url)
- [theme\_color](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/theme_color)

**Note:** The `dir`, `lang`, and `iarc_rating_id` members are not implemented.

## [Example manifest](#example_manifest)

```
{
  "short_name": "MDN",
  "name": "MDN Web Docs",
  "icons": [
    {
      "src": "/favicon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/favicon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "black",
  "background_color": "white"
}
```

## [Deploying a manifest](#deploying_a_manifest)

Web app manifests are deployed in your HTML pages using a [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link) element in the [`<head>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head) of a document:

```
<link rel="manifest" href="manifest.json" />
```

The `.webmanifest` extension is specified in the [Media type registration](https://w3c.github.io/manifest/#media-type-registration 'External link (opens in new tab)') section of the specification (the response of the manifest file should return `Content-Type: application/manifest+json`). Browsers generally support manifests with other appropriate extensions like `.json` (`Content-Type: application/json`).

If the manifest requires credentials to fetch, the [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/crossorigin) attribute must be set to `use-credentials`, even if the manifest file is in the same origin as the current page.

```
<link rel="manifest" href="/app.webmanifest" crossorigin="use-credentials" />
```

## [Splash screens](#splash_screens)

In some browsers and operating systems, a splash screen is displayed when an installed PWA is launched. This splash screen is automatically generated and its appearance is defined by members in the web app manifest, specifically:

- [`name`](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/name)
- [`background_color`](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/background_color)
- [`icons`](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/icons)

## [Browser compatibility](#browser_compatibility)

## [See also](#see_also)

- [Progressive Web Apps (PWAs)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

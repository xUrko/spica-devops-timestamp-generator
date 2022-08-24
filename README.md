# Spica DevOps Timestamp Generator

Simple extension for generating OnTime like timestamps to be used in DevOps.
Currently not yet sent into review for publishing.

## Installing in Chrome

1.  Clone/download repo
2.  Navigate to [chrome://extensions/](chrome://extensions/)
3.  Click `Load unpacked`
4.  Select the `...\spica-devops-timestamp-generator\chrome` folder

## Installing in Firefox

Firefox automatically uninstalls extensions that are added as described below. The process will need to be re-done everytime Firefox is closed (it might even uninstall it after a specific time. not sure).

1.  Clone/download repo
2.  Navigate to [about:addons](about:addons)
3.  Click on the gear icon
4.  Click on `Debug Add-ons`
5.  Click on `Load Temporary Add-on...`
6.  Select any file within the `...\spica-devops-timestamp-generator\firefox` folder

## Differences

- Firefox doesn't allow copying to clipboard without user interaction first, so automatically copying when popup appears is disabled. This means that after opening the popup, the timestamp must be copied manually (Ctrl+C, clicking on timestamp, pressing generate).

## Options

The options page is available on both browsers, but it's easier to access via Chrome :)

Available options:

- Name
- Choice between 12 and 24 hour clock
- Choice on whether to show day of week or not

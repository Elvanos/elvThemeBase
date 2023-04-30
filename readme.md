# Elv Theme Base - A highly opinionated Wordpress theme base

## Quick navigation
* [What is this?](#what-is-this)
* [Why use this?](#why-use-this)
* [Why avoid this?](#why-avoid-this)
* [Installation](#installation)
* [Suggested post-install tweaks/Quick fixes for common problems](#suggested-post-install-tweaksquick-fixes-for-common-problems)
* [Settings](#settings)
* [Theme base structure philosophy](#theme-base-structure-philosophy)
* [Example files](#example-files)
* [VScode tasks integration](#vscode-tasks-integration)
* [Theme base file/folder list explanation](#theme-base-filefolder-list-explanation)
* [Change log](#change-log)

---
## What is this?
#### [Quick navigation](#quick-navigation)
This a base for Wordpress theme development ("theme base" in this context means that you build up on this; you can think of it a little bit like a "semi-framework" for Wordpress themes) named after its creator (Elvanos) who happens to have fairly strong opinions on how a lot of Wordpress theme development is done and handled in one word: Horribly.

Therefore, he spent last couple years perfecting his beautiful monstrosity found in this theme base and decided to share it with the whole of internet!

---
## Why use this?
#### [Quick navigation](#quick-navigation)
- You also despise how chaotic most Wordpress themes are
- You don't mind possibly strange ways of structuring PHP files and folder structure in general
- You like Scss and TypeScript
- You also dislike PHP classes and prefer functional approach to programming
- You also dislike Gutenberg
- You wish there would be some kind of automation helping you with boring bits of the development
  - You need to use VScode as your editor for this bit
- You like using Advanced Custom Fields
  - You ideally own Advanced Custom Fields Pro license/subscription

---
## Why avoid this?
#### [Quick navigation](#quick-navigation)
- You have your own strong opinions on how to structure and approach Wordpress themes
- You dislike Scss or TypeScript
- You prefer using PHP classes to functional approach
- You use a different editor than VScode
  - Not as important, but can be a bit of a detriment
- You are very anxious about manually editing your editor's settings in any way, shape or form
  - Once again: Not as important, but can be a bit of a detriment
- You dislike Advanced Custom Fields
  - And one last time: Not as important, but can be a detriment

---
## Installation:
#### [Quick navigation](#quick-navigation)
* 1\. Set up your Wordpress project as you would normally do (folders, files, database, WP install, etc.)
* 2\. Clone via GIT into your project's `/wp-content/themes/` folder or simply unpack the downloaded folder there; you can rename it to whatever you want if you wish to
* 3\. Open this theme's folder in your VScode (or other editor) and run `npm install`
  * 3.1\. This project is optimized for node `18.16.0`; use of `nvm` is recommended
* 4\. Consider renaming the theme itself inside `style.css` Wordpress theme file
* 5\. Take a look inside `.env` file and adjust it as needed (more inside "Settings" section)
* 6\. Finish by installing needed/suggested plugins in the Wordpress admin panel; unless you disabled them via `.env` file mentioned above
* 7\. Consider checking the "VScode tasks integration" and "Suggested post-install tweaks/Quick fixes for common problems" sections below
* 8\. Run `npm run build` or `npm run watch` or corresponding VScode tasks depending on your needs (make sure you are on the right nodeJS version if you are using NVM)
* 9\. Happy deving, that is it! - Or keep reading, if you wish you to learn more about this theme base as it is quite a bit more than just a script/style transpiler.

---
## Suggested post-install tweaks/Quick fixes for common problems
#### [Quick navigation](#quick-navigation)
* 1\. If you own Advanced Custom Fields Pro license/subscription:
  * 1.1\. Download the newest version
  * 1.2\. Delete everything inside `_plugins-and-libs\acf` folder
  * 1.3\. Unpack the contents of `advanced-custom-fields-pro` folder inside the package inside `_plugins-and-libs\acf`
* 2\. For improved PHP intellisense and auto-suggestions in VScode:
  * 2.1\. VScode's "PHP Intelephense" extension is recommended
  * 2.2\. Configure the settings as the extension itself recommends
  * 2.3\. Create a sym-link to your main projects wordpress directory (the one containing "wp-content" folder) inside this theme base folder and rename the created sym-link to "Wordpress"
  * 2.4\. If your VScode's suggestions/file search starts giving you double-results, then edit your user settings (either global or for the project) with the following file/folder excludes for the settings of extensions/VScode you need to adjust
    * 2.4.1\. If you do this via global settings, then  this will work for all instance of this theme base installs, which means this needs to be done only once
    * 2.4.2\. Exclude paths:
      ```bash
        "**/Wordpress/wp-content/themes/**",
        "/Wordpress/wp-content/themes/**"
      ```
  * 2.5\. Restart your VScode at some point to properly re-index the workspace for all affected extensions/core parts
* 3\. "ESLint" and "Stylelint" extensions for VScode are also recommended for this theme base
* 4\. Considering setting up an auto-running task for the NVM or non-NVM watch task in order to auto-start on opening this project in VScode.
  * 4.1\. Find `.vscode\tasks.json` file and open it
  * 4.2\. Find either "Vite Watch (No NVM)" or "Vite Watch (NVM)" tasks inside the file (depends if you intend to use this with NVM or not; pick the right one for you)
  * 4.3\. Add `"runOn": "folderOpen"` inside `"runOptions"` settings and save the file
  
---
## Settings
#### [Quick navigation](#quick-navigation)
The theme base comes with fairly extensive options that can be found inside the `.env` file. You can of course adjust any other part of the any other config files if you need to, but the `.env` file is the only one the whole theme reads from and adjusts to (even JS task scripts and actual PHP files).

### List of options
#### [Quick navigation](#quick-navigation)
* THEME_NAME
  * Name of your theme - Ideally in camelCase
* THEME_NAME_LOWERCASE
  * Name of your theme - MUST be in lowercase
* THEME_NAME_LONG
  * Name of your theme - In normal, humanly readable way
* GOOGLEMAPS_API_KEY
  * If your will use Google maps with Advanced Custom Fields, consider getting the key fill this, otherwise, you can leave this empty
* TWEAK_FIX_FILE_UPLOAD_NAMES
  * Some files with unusual characters can sometimes cause Wordpress problems on some servers; this fixes it for almost all cases
* TWEAK_REMOVE_WP_EMBEDS
  * Since this theme doesn't use Gutenberg editor by default, it also un-loads embeds by default.
  * If you intend to use Gutenberg, turn this off.
* TWEAK_REMOVE_SRCSET_GENERATION
  * Since this theme uses a very different way to handle images than normal Wordpress in general, it also turns off SRCset generation to save a little bit of performance.
* TWEAK_REMOVE_COMMENTS_FROM_ADMIN
  * If you won't be needing comments for your theme, turn this on - Less clutter in admin.
* TWEAK_REMOVE_STANDARD_WP_POSTS
  * If you won't be needing standard Wordpress posts for your theme and instead will make your own post-types, turn this on - Less clutter in admin.
* TWEAK_ADD_FRONTEND_JQUERY
  * Considering many custom libraries people often use with Wordpress along with one specific pre-made element this theme base comes with use jQuery, the theme loads it; just to the on the safe side. If you don't intend to use either; feel free to disable this.
* USE_CLASSIC_EDITOR
  * If you intend to use Gutenberg, turn this off.
* SUGGEST_TWEAK_PLUGGINS
  * The theme base comes with a few suggested plugins that the author thought were very good/useful for deving anything Wordpress-theme related. If you dislike the idea, disable this.
  * You can find the current list of plugins in this file: `added-functionality\pluginActivator\addPluginActivator.php`
* ACF_USE_LOCAL
  * Loads local "Advanced Custom Fields" plugin found in `_plugins-and-libs\acf` and  "Advanced Custom Fields Extended" plugin found in `_plugins-and-libs\acf-extended` 
* ACF_USE_OPTION_PAGE
  * The theme base comes with a pre-made options page that is integrated to most parts of the theme as a globally accessible variable that handles most of the data concerning the theme. If you do not require such functionality, turn this off.
* CF7_REMOVE_PADDINGS
  * As the author of this theme is a big fan of "Contact Form 7" plugin; this setting removes all kinds of padding/margins from all of the plugin's forms - Making it much easier to custom-style for the needs of the theme. Disable this if you do not need such functionality.

--- 
## Theme base structure philosophy
#### [Quick navigation](#quick-navigation)
The theme base is fairly rigidly structured in regards of what goes where, when it comes to files, different logical parts of theme and soon.

To start off, the basic structure of the theme follows this pattern: `Page Template -> Component + Element/Layout`

This means that you are mostly expected to use `Page Templates` that will be largely composed of `Components` which will basically function as different blocks of the theme. The whole page will likely be wrapped in `Layout` - Which means a footer and a header of some kind along with any kind of other "layout-related bits" you might need; for example a sidebar or a floating button on some kind.

`Components` are also expected to potentially have `Sub-components` if the original component grows too complex and too large and becomes too much of a hassle to be contained to a single file - However, `Sub-components` are still expected to be basically parts of the parent `Component` and have their functionality be closely tied to it.

Finally, `Elements` are basically generic, repetitive bits of your code that are being used over and over again throughout the theme at multiple different places, but are complex enough to deserve their own files as no sane developer wishes to retype the same 20 lines of code 20 times over unless he absolutely has to.

As a side-note of the theme's structural philosophy: The author has a habbit of strictly dividing CSS-related classes from any JS-related selector-classes a lot of people like to use. Therefore, you might find things like `button` class coupled with `js-button` in the theme-base. You do not need to follow this pattern, but the theme-base low-key expects it and the author found it quite helpful in the long run, so it is at least somewhat suggested.

---
## Example files
#### [Quick navigation](#quick-navigation)

As an example of this, the theme comes with the following examples you can get inspired by or just keep on using, adjusting as you require or simply deleting them if you don't require such "bloat" in your future theme.

- `Element - Image`
  - Fairly self-explanatory: A small wrapper for advanced `picture` and `img` tag handling of responsive sizes of images in way, shape or form
  - This file in particular is intentionally unfinished and will likely require a little tinkering to adjust for all the responsive breakpoint you will need in your theme
- `Element - Button`
  - A small wrapper for buttons of any kind; basically a fancy "dynamic action link" wrapper
  - Uses `Element - Dynamic Action Link` mentioned below
- `Element - Dynamic Action Link`
  - A relatively complex PHP script that generates either a normal URL with extra config (extra classes, target, text, etc.) or creates a div element with special capabilities like smooth scrolling, pre-filling text into input fields or auto-checking checkbox in forms of any kind
  - The peculiarity of this element is the fact that is also comes with a full, pre-packed "Advanced Custom Fields" configuration inside the `acfe-php` folder that allows for instant integration of this element into whatever administration parts you could even need it at
    - You need "Advanced Custom Fields Pro" to run this, normal "Advanced Custom Field" sadly lack the features this element needs
  - Currently runs on jQuery due to being taken from an older build of mine, will be adjusted to vanilla in the future release

---
## VScode tasks integration
#### [Quick navigation](#quick-navigation)
**IF YOU DO NOT USE VSCODE, SKIP THIS - THIS WILL NOT WORK FOR YOU**

This theme base makes a heavy use of VScode's task manager system that allows one to make custom tasks of any kind directly integrated into the VScode's GUI while also interacting with basically anything else on the user's system.

In case you never used VScode's task system before: You can open the command panel and find `Tasks: Run Task` command which will open a whole file of tasks this theme base comes pre-equipped with.

The first four are fairly self-explanatory - There are two sets of basic commands for Vite; one expecting the user to have NVM installed (that automatically attempts to switch to the currently needed nodeJS version before even running the script) and the other for those without NVM. These tasks exist for sheer convenience of the user as they can easily be substituted for `npm run build` or `npm run watch` if you prefer manual input instead (nvm interaction of any kind is not included in the manual npm commands however)
- `Vite Watch (NVM)`
- `Vite Build (NVM)`
- `Vite Watch (No NVM)`
- `Vite Build (No NVM)`

Then there are the following tasks:
- `Theme Helper: Make new Page Template`
- `Theme Helper: Make new Component`
- `Theme Helper: Make new Element`

These allow you to create new components/elements/page templates/etc. at lighting speed by going through a set of inputs prompts inside VScode itself that quickly let you set up whatever you need your need "code part" to be - This can include file names, humanly readable names, if scss and ts files should be generated and so on. Once all the input-arguments are filled as needed, the new "code bit" will be:
- Automatically generated new via pre-made file templates at the appropriate places inside the theme's folder structure
- Automatically integrated into the Vite's SCSS/TS src build at the appropriate places
- Automatically added to the `tasks.json` for further use with the theme base (more on it soon, keep reading)
- All created files will auto-open in current instance of VScode so you can start to immediately code (or at least should open, unless your OS hates the "open" nodeJS package and won't work with it)

When using this theme base, you will likely run into a massively annoying issue of having to include any of the components/element/etc. into whatever file you are working on and then having to call the function to actually render the code bit wherever you need it in your code.

This is where the following task comes into play and automatically inserts whatever you need into your current PHP file at the line where your mouse-cursor currently is at while also allowing you to wrap the "render function" in PHP code tags or add it as a simple function call; in a lot of way working very similar to nodeJS's auto-imports when typing names of existing functions/packages.
- `Theme Helper: Insert into PHP`
  - To make sure this function works properly, your active file needs to have PHP tags somewhere in it so the script can find where to include your included file (ideally somewhere near the top, where the following code gets auto-added in all task-generated files mentioned in the tasks above)
    ```bash
      /* Elements */

      /* Components */

    ```
  
The newly created components/elements/etc. get automatically added to the `tasks.json` list in order to be potentially used by the "PHP inserting" task mentioned above. However; as we all know, things occasionally don't work as well as they should and in case any of the auto-generation scripts should ever fail to add the newly created "code bit", then just manually run the task below that will quickly re-scan your folders and rebuild the possible list for the auto-including.
- `Theme Helper: Refresh list (manual)`

---
## Theme base file/folder list explanation
#### [Quick navigation](#quick-navigation)
Underneath you will find a list of the folder tree with explanations as to what is what, what goes where and how to approach different parts of it when using it.

Not every single folder/file is mentioned as some are (or at least should) be completely self-explanatory. The list itself is NOT sorted by alphabet, but instead by attempted logical similarities to different parts of it for easier understanding of what parts do what.

To differentiate - When talking about files, they will be high-lit like `this`:

* `.env` (main config file for the whole thee base; edit ad needed)
* `XYZ.php` (all kinds of php files normally found inside Wordpress and working exactly the same here with the sole exception of trying to follow the theme's file structural patterns; adjust any of them as needed)
* .vscode (folder for VScode config)
  * `launch.json` (comes with a common preset for XDebug config for PHP; adjust as needed)
  * `settings.json` (project-scope config for VScode, simply has auto-running tasks enabled in it by default to allow for VScode task integration mentioned below; adjust as needed)
  * `tasks.json` (main bread and butter of this theme base; if you will be editing this file manually for any reason, seriously consider making a backup first)
* _commands (nodeJS scripts and connected file templates that the tasks from `tasks.json` interact with and run; feel free to adjust this to your needs if you will need)
* _plugins-and-libs (folder for auto-loaded Wordpress plugins that the theme base is expected to run with; feel free to add to to it if you will need to add something very specific)
* _src (the source folder for your scripts and styles)
  * `main.ts` (auto-source file, don't edit)
  * `vite-env.d.ts` (TypeScript definition file; adjust as needed)
  * scripts
    * `index.ts` (do not edit this if you will be using VScode tasks mentioned in the section below)
    * components (list of component files)
    * elements (list of element files)
    * layout (list of layout files)
    * pageTemplates (list of page template files)
  * styles
    * `index.scss` (do not edit this if you will be using VScode tasks mentioned in the section below)
    * components (list of component files)
    * elements (list of element files)
    * layout (list of layout files)
    * pageTemplates (list of page template files)
    * globals (list of globals-relates files - mostly animations, fonts, different mixins, variables and all kinds of tweaks)
    * vendors (list of vendor files)
      * `normalize.scss` (normalize.css in scss format; delete this if you don't wish to use this)
* views (folder containing all )
  * components (list of all component files/sub-folders)
  * elements (list of all element files)
  * layout (list of all layout files/folders)
* page-templates (folder containing all "Page Template" files - this on is outside of "views" for sheer fact that Wordpress doesn't allow for custom paths for this one)
* acfe-php (auto-sync list of PHP files for each of the theme's field-group from "Advanced Custom Fields Pro" and "Advanced Custom Fields Extended")
* added-functionality (folder containing all kinds of Wordpress PHP tweaks, adjustments, plugin options and so on)
  * pluginActivator
    * `addPluginActivator.php` (handles installation of plugins required/suggested by theme; adjust as needed)
    * customPostTypes   
      * `registerCustomPostTypes.php` (custom post types get added here)
      * `registerCustomCategories.php` (custom post type categories/tags get added here)
  * imageHelpers
    * `customImageResizer.php` (contains "Aqua Resizer" PHP script covered by a beautiful WTFPL license)
  * wpMenus
    * `registerCustomMenus.php` (file responsible for adding menus of any kind to your theme)
  * wpTweaks
    * `removeCommentsFromAdmin.php` (file responsible for removing comments from admin panel; can be turned on/off with settings)
    * `removeNonAsciiCharsFromFileUpload.php` (file responsible for fixing unusual file upload names; can be turned on/off with settings)
    * `removeStandardWPPosts.php` (file responsible for removing standard Wordpress Posts; can be turned on/off with settings)
    * `removeWPEmbed.php` (file responsible for removing Wordpress Gutenberg embeds; can be turned on/off with settings)
  * acf (all adjustments for "Advances Custom Fields/Advanced Custom Fields Pro" and "Custom Fields Extended" plugins)
  * contactForm7 (all adjustments for "Contact Form 7" plugin)
* assets
  * _autogenerated (folder auto-generated by Vite; do not edit this, it gets auto-deleted and remade every time Vite transpiles your new script/style files)
  * documents (pre-made folder for easier theme base use; delete if not needed)
  * images (pre-made folder for easier theme base use; delete if not needed)

---
## Change log
#### [Quick navigation](#quick-navigation)

### v1.0.0
- Initial release
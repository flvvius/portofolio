# Public URL compatibility

The owner requested separate pages and removed the interests collection after the initial PR. Main navigation uses ordinary page URLs. Fragment handling below supports previously shared links.

| Original | Current destination |
| --- | --- |
| / | Short service homepage |
| /#work | /work |
| /#process | /process |
| /#pricing | /pricing |
| /#the-shelf or /about#projects | /projects |
| /#the-record-player or /about#experience | /experience |
| /#the-door | /about#contact |
| /#note-{project} or /about#note-{project} | /projects#note-{project} |
| /the-back-room, with or without a collection fragment | 301 to /about?from=back-room, then clean /about |
| /about#interests, #books, #film, #art, #places, #aesthetics | /about; collection removed by owner request |
| /#the-bar and /#main | Retained |
| /blog and /blog/exploring-something-new | Retained |
| /api/now-playing and /monitoring | Retained API/tunnel contracts |
| /sitemap.xml and /robots.txt | Updated endpoints retained |
| /main.png and /icon.svg | Public asset paths retained |

Project slugs are miez, commit-ink, sisc, agrobot, pricele and joke-bot. Fragments do not reach the server, so client handling moves those visits. No-JavaScript homepage links point to the new pages. The back-room collection was explicitly retired, so its former collection anchors no longer identify content.

Draft concept routes remain 404 in production. The sitemap now includes process, pricing, FAQ, projects and experience.

# Public URL compatibility

| Original | Current behavior |
| --- | --- |
| `/` | Service landing page, 200 |
| `/blog` | Writing index, 200 |
| `/blog/exploring-something-new` | Original post, 200 |
| `/the-back-room` | 301 to `/about?from=back-room`, then `#interests` |
| `/the-back-room#books` | 301, browser retains fragment, then `/about#books` |
| `/the-back-room#film` | 301, then `/about#film` |
| `/the-back-room#art` | 301, then `/about#art` |
| `/the-back-room#places` | 301, then `/about#places` |
| `/the-back-room#aesthetics` | 301, then `/about#aesthetics` |
| `/#the-bar` | Existing hero fragment remains |
| `/#the-shelf` | Client replacement to `/about#projects` |
| `/#the-record-player` | Client replacement to `/about#experience` |
| `/#the-door` | Client replacement to `/about#contact` |
| `/#note-miez` | Client replacement to `/about#note-miez` |
| `/#note-commit-ink` | Client replacement to `/about#note-commit-ink` |
| `/#note-sisc` | Client replacement to `/about#note-sisc` |
| `/#note-agrobot` | Client replacement to `/about#note-agrobot` |
| `/#note-pricele` | Client replacement to `/about#note-pricele` |
| `/#note-joke-bot` | Client replacement to `/about#note-joke-bot` |
| `/#main` | Skip link remains |
| `/api/now-playing` | Original JSON contract retained |
| `/monitoring` | Sentry tunnel retained |
| `/sitemap.xml`, `/robots.txt` | Updated endpoints retained |
| `/main.png`, `/icon.svg` | Public paths retained; favicon restyled |

URL fragments never reach the server, so they cannot receive distinct HTTP 301 responses. The homepage provides a client compatibility map and ordinary fallback links for no-JavaScript visits. The back-room redirect does not replace the fragment; About preserves it, removes the compatibility query and focuses the destination. Without JavaScript, the content and original collection fragment still exist on About.

No old standalone project URLs exist in the inventory source or live sitemap. Unknown project slugs remain 404. Current draft concept routes are also 404 in production.

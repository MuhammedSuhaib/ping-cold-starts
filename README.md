# About this Project
It is a basic React todo app the does nothing except 
- Taking Input
- Add that to the Ram using `useState`
- map those Todo items below the input area
- completed status using marked checkbox
- delete that todo

# Learnings from this Project

- This was my first React project 
    (This is not  even a project, just a First Hands on `React` After alot of `Next.js` Projects). 

- `useState` data lives **only in React’s memory (inside the component)**.   
When you refresh the page, React reloads → memory resets → all `useState` values reset.

So:

* not in localStorage
* not in sessionStorage
* not in cookies
* only in React component memory, temporary RAM.

---

## Netlify Blobs – URL seed (for future keep-alive)

URLs for cold-start prevention are stored in Netlify Blobs.

1. Deploy this site to Netlify (link the repo).
2. Call the seed endpoint once:
   ```
   GET/POST https://YOUR-SITE.netlify.app/api/seed-urls
   ```
3. List is saved under store `keep-alive` → key `ping-list`.

Edit the list in `netlify/functions/seed-urls.js` (`DEFAULT_URLS`) then hit the endpoint again to update.

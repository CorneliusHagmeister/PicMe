# PicMe

PicMe is a a little webapp, which helps users in a fun way to pick images they like. It's based on the dating app swipe mechanic.

The app uses the serpapi to fetch google images search result for the provided query. Images are only stored locally.

It's deployed on Vercel: [Demo](https://pic-me-seven.vercel.app/).
Since it's supposed to be a mobile web app, I centered it. Best experience is either to view on mobile or use the devtool. Full desktop view would've worked as well, but I found swiping on desktop is a bit weird.

## Implementation

### routes

- /

  - home route contains the 3 intro screens. The screens are triggered via a button click

- /searchPage?search_query
  - This is the main route, which contains the 'Saved Pictures' as well as the 'Explore' section. I primarily put this together, because I didn't want a reload when toggling between them. Would be fun to at least adjust the browser history on toggle.
- /api/fetch-images
  - is used to query the serpApi

### Potential future features

- storage of preferences in db
  - doesn't make too much sense without being able to assign them back the user
- preloading of images
- animation on swipe e.g. Yay/ Nay
- Adjusting shown images based on user selection
  - Given that we only use a search api to get images, the only way for us to adjust the selection of pictures is to adjust the search query. An easy way would be to just ask an llm what is present on a liked image and build that into the next search query.

## Development

The project is based on a next.js boilerplate i.e. the common next.js workflow applies.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

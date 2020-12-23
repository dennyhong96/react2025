const title = "Fast Feedback – The easiest way to add comments or reviews to your static site.";
const description = "Fast Feedback is being built as part of React 2025.";

const SEO_DEFAULT = {
  title,
  description,
  canonical: process.env.NEXT_PUBLIC_DOMAIN,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_DOMAIN,
    title,
    description,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/og.png`,
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
};

export default SEO_DEFAULT;

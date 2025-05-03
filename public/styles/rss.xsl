<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
  version="3.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
>
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>RSS Feed | <xsl:value-of select="/rss/channel/title"/></title>
        <meta charset="UTF-8" />
        <meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1" />
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1,shrink-to-fit=no"
        />
        <link
          rel="stylesheet"
          href="/public/styles/reset.css"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="/public/styles/global-v9.css"
          type="text/css"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="/public/img/meta/favicon-32x32.png"
        />
        <style>
          header {
            margin-top: 1rem;
          }
        </style>
      </head>
      <body>
        <div class="deco-vert-1 bg-deco" aria-hidden="true"></div>
        <div class="deco-vert-2 bg-deco" aria-hidden="true"></div>
        <header>
          <a id="skip-to-content" class="button" href="#main-section"
            >Skip to content</a
          >
          <div class="deco-horiz-1 bg-deco" aria-hidden="true"></div>
        </header>
        <main id="main-section" class="center">
          <div class="post-header">
            <div class="headline-row">
              <h1>RSS feed</h1>
            </div>
            <p class="label">
              <xsl:value-of select="/rss/channel/description" />
            </p>
          </div>
          <h2>Latest posts</h2>
          <xsl:for-each select="/rss/channel/item">
            <ul class="nobullet post-rows-with-label filtered-list">
              <li>
                <time class="label dt-duration">
                  <xsl:value-of select="substring(pubDate,5,7)" />
                </time>
                <span class="details">
                  <a>
                    <xsl:attribute name="href">
                      <xsl:value-of select="link" />
                    </xsl:attribute>
                    <xsl:value-of select="title"
                  /></a>
                </span>
              </li>
            </ul>
          </xsl:for-each>
        </main>
        <footer>
          <a href="/">Back to homepage</a>
          <div class="deco-horiz-2 bg-deco" aria-hidden="true"></div>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

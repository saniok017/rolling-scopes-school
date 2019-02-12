import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';

const Layout = (
  {
    children,
    title,
    description,
    backButton,
  },
) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
    <div className="container">
      <nav>
        {backButton && (
          <span onClick={() => Router.back()} className="back-button">
            &#x2b05;
          </span>
        )}
        <Link href="/">
          <a>
            <span className="main-link">Some Link</span>
          </a>
        </Link>
        <Link href="/">
          <a className="secondary-link">Home</a>
        </Link>
        <Link href="/about">
          <a className="secondary-link">About</a>
        </Link>
        <Link href="/login">
          <a className="secondary-link">Login</a>
        </Link>
      </nav>

      {children}
    </div>

    <style jsx>{`
      .container {
        max-width: 800px;
        margin: 0 auto;
        background: #f6f6ef;
      }
      nav {
        background: #f60;
        padding: 1em;
        display: flex;
        justify-content: space-between;
      }
      nav > * {
        display: inline-block;
        color: black;
      }
      nav a {
        text-decoration: none;
      }
      nav .main-link {
        font-weight: bold;
      }
      nav .back-button {
        font-size: 0.9rem;
        padding-right: 1em;
        cursor: pointer;
      }
    `}</style>
    <style global jsx>{`
      body {
        background: white;
        font-family: Verdana, Geneva, sans-serif;
      }
    `}</style>
  </div>
);

export default Layout;

import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import { Fragment } from 'react';

const Layout = (
  {
    children,
    title,
    description,
    backButton,
    user,
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
        <Link href="https://rollingscopes.com/">
          <a className="RSSLink">
            <img src='/static/icons/icon-192x192.png' alt="RSSchool link" />
            <span className="main-link">RSSchool</span>
          </a>
        </Link>
        <Link href="/">
          <a className="main-link">Home</a>
        </Link>
        <Link href="/about">
          <a className="main-link">About</a>
        </Link>
        {(!user)
          ? <Link href="/auth/github"><a className="main-link">Login</a></Link>
          : <Fragment>
              <Link href="/logout"><a className="main-link">Log Out</a></Link>
              <img className="RSSLink" alt="User Avatar" src={user.photos[0].value} />
            </Fragment>
        }
      </nav>

      {children}
    </div>

    <style jsx>{`
      .container {
        max-width: 90vw;
        margin: 0 auto;
        background: #f6f6ef;
      }
      nav {
        background: #f60;
        padding: 0.5em;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
      nav .RSSLink {
        width: 2.7em;
        height: 2.4em;
        display: flex;
      }
      nav .RSSLink img {
        width: 2.6em;
      }
      nav .RSSLink span {
        align-self: center;
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

import { Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
      </body>
    </Html>
  )
}


import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Index() {
    return (
        <div className={styles.container}>
        <Head>
        <title>Ragnarok Online のなんとか</title>
        </Head>

        <main className={styles.main}>
        <h1 className={styles.title}>
        Ragnarok Online のなんとか
        </h1>

        <div className={styles.grid}>
            <div className={styles.card}>
                <a href="/cards"><h3>カード</h3></a>
                <div>カード一覧です</div>
            </div>
            <div className={styles.card}>
                <a href="/enchants"><h3>エンチャント</h3></a>
                <div>エンチャント一覧です</div>
            </div>
        </div>

        </main>

        <footer className={styles.footer}>
        Powered by{' '}
        <img src="/0nyx_logo.svg" alt="0nyx Logo" className={styles.logo} />
        </footer>
        </div>
    )
}

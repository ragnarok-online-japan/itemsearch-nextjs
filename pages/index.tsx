
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useRequest from '../libs/useRequest'

const items_url = "https://ragnarokonline.0nyx.net/assets/json/items.json"

export default function Index() {
    const { data } = useRequest({
        url: items_url
    })

    return (
        <div className={styles.container}>
        <Head>
        <title>Ragnarok Online アイテム検索UI</title>
        </Head>

        <main className={styles.main}>
        <h1 className={styles.title}>
        Ragnarok Online アイテム検索UI
        </h1>

        <div className={styles.grid}>
        {data
            ? Object.keys(data).map(item_id => {
                var item = data[item_id]
                if (item['type_card'] == true) {
                    return (<div className={styles.card}>
                        <h3>{item.displayname}</h3>
                        <div>{item.description}</div>
                        </div>
                    )
                }
            })
            : 'Now loading...'
        }
        </div>

        </main>

        <footer className={styles.footer}>
        Powered by{' '}
        <img src="/0nyx_logo.svg" alt="0nyx Logo" className={styles.logo} />
        </footer>
        </div>
    )
}

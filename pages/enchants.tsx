
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useRequest from '../libs/useRequest'

const items_url = "https://ragnarokonline.0nyx.net/assets/json/items.json"
const image_url_prefix = "https://ragnarokonline.0nyx.net/assets/image_ro/"

export default function Index() {
    const { data } = useRequest({
        url: items_url
    })

    return (
        <div className={styles.container}>
        <Head>
        <title>Ragnarok Online のなんとか : エンチャント</title>
        </Head>

        <main className={styles.main}>
        <h1 className={styles.title}>
        Ragnarok Online のなんとか : エンチャント
        </h1>

        <div className={styles.grid}>
        {data
            ? Object.keys(data).map(item_id => {
                var item = data[item_id]
                if (item['is_enchant'] == true && item['type'] != 'カード') {
                    var injection_type = '';
                    if (item.injection_detail['prefix'] == true) {
                        injection_type = 'prefix'
                    } else {
                        injection_type = 'suffix'
                    }
                    return (<div id={item_id} className={styles.card}>
                        <h3>{item.displayname}</h3>
                        <img src={image_url_prefix + item_id + ".png"} alt="image" />
                        <div dangerouslySetInnerHTML={{__html: item.description.replace(/\n/g, '<br>')}}/>
                        <h5>{injection_type} : {item.injection_detail['name']}</h5>
                        <a href={'/item/'+(item_id)}>LINK:ROのなんとか</a><br/>
                        <a href={'https://rotool.gungho.jp/monster/item.php?item='+(item_id)} target="_blank" rel="noopener noreferrer">LINK:RO公式 アイテム情報</a>
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


import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import useRequest from '../../libs/useRequest'
import {useRouter} from 'next/router'

const items_url = "https://ragnarokonline.0nyx.net/assets/json/items.json"

export async function getServerSideProps() {
    const data = await fetch(items_url).then((r) => r.json());
    return {
        props: {
            data,
        }
    }
 }

export default function Index({ data }: Props) {
    /*
    const data = useRequest({
        url: items_url
    })
    */
    const router = useRouter()
    const item_id = router.query.item_id

    var item = data[item_id]
    var injection_type = '';
    if (item['is_card'] && (item['is_card'] == true || item['type'] == 'カード')) {
        if (item.injection_detail['prefix'] == true) {
            injection_type = 'prefix'
        } else {
            injection_type = 'suffix'
        }
    }

    return (
        <div className={styles.container}>
        <Head>
        <title>Ragnarok Online のなんとか</title>
        </Head>

        <main className={styles.main}>
        <h1 className={styles.title}>
        Ragnarok Online のなんとか
        </h1>

            <div id={item_id} className={styles.card}>
                <h3>{item.displayname}</h3>
                <div dangerouslySetInnerHTML={{__html: item.description.replace(/\n/g, '<br>')}}/>
                {injection_type ?
                    <h5>{injection_type} : {item.injection_detail['name']}</h5>
                    : ''
                }
                <a href={'https://rotool.gungho.jp/monster/item.php?item='+(item_id)} target="_blank" rel="noopener noreferrer">LINK:RO公式 アイテム情報</a>
            </div>

        </main>

        <footer className={styles.footer}>
        Powered by{' '}
        <img src="/0nyx_logo.svg" alt="0nyx Logo" className={styles.logo} />
        </footer>
        </div>
    )
}

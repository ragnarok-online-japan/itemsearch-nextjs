
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import useRequest from '../../libs/useRequest'
import {useRouter} from 'next/router'

const items_url = "https://ragnarokonline.0nyx.net/assets/json/items.json"
const image_url_prefix = "https://ragnarokonline.0nyx.net/assets/image_ro/"

export default function Index() {
    const { data } = useRequest({
        url: items_url
    })

    if (data) {
        const router = useRouter()
        var item_id = ''
        if (typeof router.query.item_id === 'string') {
            item_id = router.query.item_id
        }

        if (Object.keys(data).indexOf(item_id) === -1) {
            // 404 NotFound
            router.push('/404')
            return (<div />)
        }
        var item = data[item_id]
        var injection_type = '';
        if (item['is_card'] && (item['is_card'] == true || item['type'] == 'カード')) {
            if (item.injection_detail['prefix'] == true) {
                injection_type = 'prefix'
            } else {
                injection_type = 'suffix'
            }
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
        {item ?
            <div id={item_id} className={styles.card}>
                <h3>{item.displayname}</h3>
                <img src={image_url_prefix + item_id + ".png"} alt="image" />
                <div dangerouslySetInnerHTML={{__html: item.description.replace(/\n/g, '<br>')}}/>
                {injection_type ?
                    <h5>{injection_type} : {item.injection_detail['name']}</h5>
                    : ''
                }
                <a href={'https://rotool.gungho.jp/monster/item.php?item='+(item_id)} target="_blank" rel="noopener noreferrer">LINK:RO公式 アイテム情報</a>
            </div>
            : 'Now loading...'
        }
        </main>

        <footer className={styles.footer}>
        Powered by{' '}
        <img src="/0nyx_logo.svg" alt="0nyx Logo" className={styles.logo} />
        </footer>
        </div>
    )
}

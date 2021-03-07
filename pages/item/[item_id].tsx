
import Head from '../../components/head'
import styles from '../../styles/Home.module.css'
import Error from 'next/error'

const items_url = "https://ragnarokonline.0nyx.net/assets/json/items.json"
const image_url_prefix = "https://ragnarokonline.0nyx.net/assets/image_ro/"

function Item({ error_code, item_id, item}) {
    if (error_code) {
        return <Error statusCdoe={error_code} />
    }

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

        {item ?
            <main className={styles.main}>
            <Head
                title={"Ragnarok Online のなんとか"}
                description={"アイテム紹介ページ"}
                keyword={""}
                type={"article"}
                image={image_url_prefix + item_id + ".png"}
                url={"https://ronntk.0nyx.net/item/" + item_id}
            />
            <h1 className={styles.title}>
            Ragnarok Online のなんとか
            </h1>
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
            </main>
            : 'Now loading...'
        }

        <footer className={styles.footer}>
        Powered by{' '}
        <img src="/0nyx_logo.svg" alt="0nyx Logo" className={styles.logo} />
        </footer>
        </div>
    )
}

export async function getServerSideProps (context) {
    const response = await fetch(items_url)
    const items = await response.json()
    const item_id = context.query.item_id
    var item = 0
    var error_code = 0
    if (response.ok && Object.keys(items).indexOf(item_id) >= 0) {
        item = items[item_id]
    } else if (!response.ok) {
        error_code = response.status
    } else {
        error_code = 404
    }

    return {
        props: {
            error_code,
            item: item,
            item_id: item_id
        }
    }
}

export default Item

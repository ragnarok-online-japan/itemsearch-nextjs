
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Error from 'next/error'

const special_enchant_url = "https://ragnarokonline.0nyx.net/assets/json/special_enchant.json"

function SpecialEnchant({ error_code, special_enchant}) {
    if (error_code) {
        return <Error statusCode={error_code} />
    }

    var html_body = ""
    Object.keys(special_enchant).map(npc_name => {
        html_body += "<h1>"
        html_body += npc_name
        html_body += "</h1>"
        var target_items = special_enchant[npc_name]["target_items"]
        Object.keys(target_items).map(item_name => {
            var item = special_enchant[npc_name]["target_items"][item_name]
            var description = special_enchant[npc_name]["target_items"][item_name]["description"]
            html_body += "<table class=table_box>"
            html_body += "<tr><th colspan=3>"
            html_body += item_name
            html_body += "</th></tr>"
            html_body += "<tr><td colspan=3>"
            html_body += description
            html_body += "</td></tr>"
            Object.keys(item["slot"]).map(slot => {
                var message = item["slot"][slot]["message"]
                var smelting = item["slot"][slot]["smelting"]
                var enchants = item["slot"][slot]["enchants"]
                html_body += "<tr><td>"
                html_body += slot
                html_body += "</td><td>"
                if (smelting == null) {
                    html_body += "-"
                } else {
                    html_body += "精錬値"
                    html_body += smelting
                    html_body += "以上"
                }
                html_body += "</td><td>"
                if (message == "スロットエンチャント") {
                    html_body += "スロットエンチャント"
                } else {
                    Object.keys(enchants).map(idx => {
                        var enchant_id = enchants[idx]["id"]
                        var displayname = enchants[idx]["displayname"]
                        html_body += displayname
                        html_body += "<br/>"
                    })
                }
                html_body += "</td></tr>"
            })
            html_body += "</table>"
        })
    })

    return (
        <div className={styles.container}>
        <Head>
        <title>Ragnarok Online のなんとか</title>
        </Head>

        <main className={styles.main}>
        <h1 className={styles.title}>
        Ragnarok Online のなんとか
        </h1>
        <div dangerouslySetInnerHTML={{__html: html_body}}/>
        </main>

        <footer className={styles.footer}>
        Powered by{' '}
        <img src="/0nyx_logo.svg" alt="0nyx Logo" className={styles.logo} />
        </footer>
        </div>
    )
}

export async function getServerSideProps (context) {
    const response = await fetch(special_enchant_url)
    const special_enchant = await response.json()

    var error_code = 0
    if (!response.ok) {
        error_code = response.status
    }

    return {
        props: {
            error_code,
            special_enchant: special_enchant
        }
    }
}

export default SpecialEnchant

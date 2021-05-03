#!/bin/bash
cd /opt/ro-itemsearch-nextjs/tools
rsync -a -e "ssh -p 46904 -i ~/.ssh/id_ed25519_passthrough" h-mineta@sechs:/mnt/c/Gravity/Ragnarok/data.grf .
./grf_export.py
./itemdata2json.py
cp items.json /var/www/html_ragnarokonline/assets/json/
./get_item_img.py --export-path /var/www/html_ragnarokonline/assets/image_ro/

#!/usr/bin/env python3

import argparse
import json
import os
import re

parser = argparse.ArgumentParser(description='')

parser.add_argument('--import-path',
                    action='store',
                    nargs=1,
                    default='./export_grf',
                    type=str,
                    help='import path')

args = parser.parse_args()

def main(args:dict):
    if os.path.isdir(args.import_path) == False:
        raise ValueError('Illigal import path')

    items = {}

    filename = 'idnum2itemdisplaynametable.txt'
    print('import', filename)
    with open('{:}/{:}'.format(args.import_path, filename), 'r', encoding='utf-8') as fp:
        for line in fp:
            line = line.rstrip()
            if re.match(r'^//.*', line):
                continue

            matches = re.match(r'^(\d+)#(.+)#$', line)
            if matches:
                item_id = int(matches[1])
                items[item_id] = {
                    'displayname': matches[2],
                    'description': '',
                    'type'       : None,
                    'is_card'    : False,
                    'is_enchant' : False
                }

    filename = 'idnum2itemdesctable.txt'
    print('import', filename)
    item_id = None
    with open('{:}/{:}'.format(args.import_path, filename), 'r', encoding='utf-8') as fp:
        for line in fp:
            line = line.rstrip()
            if re.match(r'^//.*', line):
                continue
            if re.match(r'^#.*', line):
                item_id = None
                continue

            matches = re.match('^(\d+)#$', line)
            if matches and int(matches[1]) in items:
                item_id = int(matches[1])
                continue

            if item_id is not None:
                line = re.sub(r'\^000000', '</span>', line)
                line = re.sub(r'\^([0-9a-fA-F]{6})', r'<span style="color:#\1">', line)
                items[item_id]['description'] = items[item_id]['description'] + line + '\n'

    filename = 'cardprefixnametable.txt'
    print('import', filename)
    with open('{:}/{:}'.format(args.import_path, filename), 'r', encoding='utf-8') as fp:
        for line in fp:
            line = line.rstrip()
            if re.match(r'^//.*', line):
                continue

            matches = re.match(r'^(\d+)#(.+)#$', line)
            if matches and int(matches[1]) in items:
                item_id = int(matches[1])

                # 末尾がカードじゃないとカード判定しない
                # -> エンチャントも何故かこのファイルに含まれる...
                if re.match('^.+カード$', items[item_id]['displayname']):
                    items[item_id]['is_card'] = True
                else:
                    items[item_id]['is_enchant'] = True

                items[item_id]['injection_detail'] = {
                    'name': matches[2],
                    'prefix': True
                }

    filename = 'cardpostfixnametable.txt'
    print('import', filename)
    with open('{:}/{:}'.format(args.import_path, filename), 'r', encoding='utf-8') as fp:
        for line in fp:
            line = line.rstrip()
            if re.match(r'^//.*', line):
                continue

            matches = re.match(r'^(\d+)#', line)
            if matches and int(matches[1]) in items:
                item_id = int(matches[1])

                items[item_id]['injection_detail']['prefix'] = False

    # item判定
    pattern_type      = re.compile(r'系列 : <.+?>(.+?)</')
    pattern_equipment = re.compile(r'装備 : <.+?>(.+?)</')
    pattern_position  = re.compile(r'位置 : <.+?>(.+?)</')
    for item in items.values():
        match = pattern_type.search(item['description'])
        if match:
            item['type'] = match.group(1)

        match = pattern_equipment.search(item['description'])
        if match:
            if item['type'] == 'カード':
                item['card_postion'] = match.group(1)
            else:
                item['jobs'] = match.group(1)

        match = pattern_position.search(item['description'])
        if match and match.group(1) != '-':
            item['position'] = match.group(1)

    #/////////////////////////////////////////////////////////////////////////

    filename = "items.json"
    print('export', filename)
    with open('{:}'.format(filename), 'w', encoding='utf-8') as fp:
        json.dump(items, fp, sort_keys=True, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    main(args)

#!/usr/bin/env python3

import argparse
import os
import subprocess

parser = argparse.ArgumentParser(description='')

parser.add_argument('--grftool',
                    action='store',
                    nargs=1,
                    default='/usr/local/bin/grftool',
                    type=str,
                    help='grftool path')

parser.add_argument('--nkf',
                    action='store',
                    nargs=1,
                    default='/usr/bin/nkf',
                    type=str,
                    help='nkf path')

parser.add_argument('--grffile',
                    action='store',
                    nargs=1,
                    default='data.grf',
                    type=str,
                    help='data.grf path')

parser.add_argument('--export-path',
                    action='store',
                    nargs=1,
                    default='./export_grf',
                    type=str,
                    help='export path')

args = parser.parse_args()

def main(args:dict):
    export_txts = {
        'carditemnametable.txt'         : 'data\\carditemnametable.txt',
        'cardpostfixnametable.txt'      : 'data\\cardpostfixnametable.txt',
        'cardprefixnametable.txt'       : 'data\\cardprefixnametable.txt',
        'idnum2itemdesctable.txt'       : 'data\\idnum2itemdesctable.txt',
        'idnum2itemdisplaynametable.txt': 'data\\idnum2itemdisplaynametable.txt',
        'idnum2itemresnametable.txt'    : 'data\\idnum2itemresnametable.txt',
        'itemparamtable.txt'            : 'data\\itemparamtable.txt',
        'itemslotcounttable.txt'        : 'data\\itemslotcounttable.txt',
        'itemslottable.txt'             : 'data\\itemslottable.txt',
    }

    if os.path.isdir(args.export_path) == False:
        os.mkdir(args.export_path)

    for filename, path in export_txts.items():
        print('export', filename)
        with open('{:}/{:}'.format(args.export_path, filename), 'w') as fp:
            fp.write(subprocess.check_output('{grftool:s} "{grffile}" "{path:s}" | {nkf:s} {nkf_options:s}'.format(
                    grftool=args.grftool,
                    grffile=args.grffile,
                    nkf=args.nkf,
                    nkf_options='-wLu',
                    path=path
                ),
                shell=True).decode('utf-8')
            )

if __name__ == '__main__':
    main(args)

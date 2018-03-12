from bigchaindb_driver import BigchainDB
import sys

bdb_root_url = 'http://localhost:9984'
bdb = BigchainDB(bdb_root_url)

#def transfer(create_id, supplier_pub_key, enterprise_priv_key):
        creation_tx = bdb.transactions.retrieve(sys.argv[1])
        #print(creation_tx)
        asset_id = creation_tx['id']
        transfer_asset = {
                'id': asset_id,
        }
        output_index = 0
        output = creation_tx['outputs'][output_index]
        transfer_input = {
                'fulfillment': output['condition']['details'],
                'fulfills': {
                        'output_index': output_index,
                        'transaction_id': creation_tx['id'],
                },
                'owners_before': output['public_keys'],
        }
        prepared_transfer_tx = bdb.transactions.prepare(
        operation='TRANSFER',
        asset=transfer_asset,
        inputs=transfer_input,
        recipients=sys.argv[2],
        )

        fulfilled_transfer_tx = bdb.transactions.fulfill(
        prepared_transfer_tx,
        private_keys=sys.argv[3],
        )
        sent_transfer_tx = bdb.transactions.send(fulfilled_transfer_tx)
        sent_transfer_tx == fulfilled_transfer_tx
        print(sent_transfer_tx['id'])

import './../../shim';
import EOSJS from 'eosjs';

const KEYS = [
  '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
  '5Hq2vqUAJUduvsnGQBAhrGRcth1uhbQR9V2Wj9Pt2Uxm1NjZHYq'
];

const RPC_API_URL = 'http://localhost:8888';

export function eos() {
  const config = {
    keyProvider: KEYS, // WIF string or array of keys..
    httpEndpoint: RPC_API_URL,
    broadcast: true,
    sign: true
  };

  const localNet = EOSJS(config);
  return localNet;
}


export function getInfo() {
  //debugger;
	const net = eos().getInfo({}).then(info => {
		return info;
	});
	return net;
}

export const getAccountInfo = async(account, uid) => {
  const net = await eos().getAccount(account).then(info => {return info;})
  return { data: net, uid };
}

export const getTableData = async(code, scope, table) => {
  const result = await eos().getTableRows({
      code: code, //'CONTRACT_NAME',
      scope:scope, //'SCOPE_ACCOUNT (Normally contract)',
      table: table, //'TABLE_NAME',
      json: true,
  });
  return result;
}

export const transaction = async(actor, action, data) => 
{
   return await eos().transaction({
    actions: [
      {
        account: 'freecycle',
        name: action,
        authorization: [
          {
            actor,
            permission: 'active'
          }
        ],
        data: {
          ...data
        }
      }
    ]
  });
}
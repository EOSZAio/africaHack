# App setup

Traider logs in with their own account. Traider account is a global property.

## Create traider account

cleos create account eosio traider1 EOS7rv65EBnndXmCdgcqYRA5RzQQCewFmXJ3ybAbSS1keSrQtvPzG EOS7rv65EBnndXmCdgcqYRA5RzQQCewFmXJ3ybAbSS1keSrQtvPzG

# List products

Populate using
```bash
cleos push action freecycle productadd '[1,"Clear plastic (PET)","{\"image\":\"https://dev.mytribez.com/images/clear-plastic-3.jpg\"}"]' -p testsite1@active
cleos push action freecycle productadd '[2,"Coloured Plastic","{\"image\":\"https://dev.mytribez.com/images/colored-plastic.jpg\"}"]' -p testsite1@active
cleos push action freecycle productadd '[3,"Paper","{\"image\":\"https://dev.mytribez.com/images/paper.jpg\"}"]' -p testsite1@active
cleos push action freecycle productadd '[4,"Metal","{\"image\":\"https://dev.mytribez.com/images/cans.jpg\"}"]' -p testsite1@active
cleos push action freecycle productadd '[5,"Glass","{\"image\":\"https://dev.mytribez.com/images/glass.jpg\"}"]' -p testsite1@active
```

List using
```bash
cleos get table freecycle freecycle products

{
  "rows": [{
      "id": 1,
      "name": "Clear plastic (PET)",
      "settings": "{\"image\":\"https://dev.mytribez.com/images/clear-plastic-3.jpg\"}",
      "currentbatch": 11,
      "current_weight": "2.50000000000000000",
      "total_weight": "2.50000000000000000"
    },{
      "id": 2,
      "name": "Coloured Plastic",
      "settings": "{\"image\":\"https://dev.mytribez.com/images/colored-plastic.jpg\"}",
      "currentbatch": 0,
      "current_weight": "0.00000000000000000",
      "total_weight": "0.00000000000000000"
    },{
      "id": 3,
      "name": "Paper",
      "settings": "{\"image\":\"https://dev.mytribez.com/images/paper.jpg\"}",
      "currentbatch": 0,
      "current_weight": "0.00000000000000000",
      "total_weight": "0.00000000000000000"
    },{
      "id": 4,
      "name": "Metal",
      "settings": "{\"image\":\"https://dev.mytribez.com/images/cans.jpg\"}",
      "currentbatch": 0,
      "current_weight": "0.00000000000000000",
      "total_weight": "0.00000000000000000"
    },{
      "id": 5,
      "name": "Glass",
      "settings": "{\"image\":\"https://dev.mytribez.com/images/glass.jpg\"}",
      "currentbatch": 0,
      "current_weight": "0.00000000000000000",
      "total_weight": "0.00000000000000000"
    }
  ],
  "more": false
}
```
NB : At scale products will be added globally, site will select products they use. This will standardise product definitions in industry. Data model for this is too complex for MVP so demo with one site only / simplified data model.

NB : Use current_weight from here to indicate how much product is available at a site.
# List sites

```bash
cleos get table freecycle freecycle sitesettings

{
  "rows": [{
      "owner": "testsite1",
      "sitename": "Test site 1",
      "geohash": "kekj1",
      "settings": "{\"contact\":\"Sebokeng\",\"number\":\"0612345678\"}"
    }
  ],
  "more": false
}
```

1. We need total volume of product at site. Add this to products structure.
2. We will have to use geohash to return only "nearby" sites when scaling. Not possible in emulator without GPS so ignore for demo.

# Order / traider bid

### Action
* batchoffer (traider won't offer on a specific batch, will ask for a quantity of product, doesn't care about batches). Process similar to exchange matching process, probably need to look at exchange contract.

### Parameters
* Traider (account name)
* Site (account name)
* Product id
* Quantity (weight)
* Price (offered)

```bash
cleos push action freecycle batchoffer '["traider1","testsite1",1,2500,3000.0]' -p testsite1@active
```

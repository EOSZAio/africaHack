# Site details

Load data
```bash
cleos push action freecycle registersite '["testsite1","Test site 1","kekj1","{\"contact\":\"Sebokeng\",\"number\":\"0612345678\"}"]' -p testsite1@active
```

Get data
```bash
cleos get table freecycle freecycle sitesettings
```
Output
```bash
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

# Coop members

Load data

```bash
cleos push action freecycle memberdel '["testsite1","member1"]' -p testsite1@active
cleos push action freecycle memberdel '["testsite1","member2"]' -p testsite1@active
cleos push action freecycle memberdel '["testsite1","member3"]' -p testsite1@active
cleos push action freecycle memberdel '["testsite1","member4"]' -p testsite1@active
cleos push action freecycle memberdel '["testsite1","member5"]' -p testsite1@active
```
```bash
cleos push action freecycle memberadd '["testsite1","member1","Sebokeng","{\"contact\":\"Sebokeng\",\"number\":\"0612345678\",\"image\":\"https://dev.mytribez.com/images/member1.png\"}"]' -p testsite1@active
cleos push action freecycle memberadd '["testsite1","member2","Abel","{\"contact\":\"Abel\",\"number\":\"0612345678\",\"image\":\"https://dev.mytribez.com/images/member2.png\"}"]' -p testsite1@active
cleos push action freecycle memberadd '["testsite1","member3","Abram","{\"contact\":\"Abram\",\"number\":\"0612345678\",\"image\":\"https://dev.mytribez.com/images/member3.png\"}"]' -p testsite1@active
cleos push action freecycle memberadd '["testsite1","member4","Begabantu","{\"contact\":\"Begabantu\",\"number\":\"0612345678\",\"image\":\"https://dev.mytribez.com/images/member4.png\"}"]' -p testsite1@active
cleos push action freecycle memberadd '["testsite1","member5","Jonathan","{\"contact\":\"Jonathan\",\"number\":\"0612345678\",\"image\":\"https://dev.mytribez.com/images/member5.png\"}"]' -p testsite1@active
```

Get data
```bash
cleos get table freecycle freecycle members
```
Output
```bash
{
  "rows": [{
      "owner": "member1",
      "site": "testsite1",
      "name": "Sebokeng",
      "settings": "{\"contact\":\"Sebokeng\",\"number\":\"0612345678\",\"image\":\"https://mytribez.com/images/member1.jpg\"}"
    },{
      "owner": "member2",
      "site": "testsite1",
      "name": "Abel",
      "settings": "{\"contact\":\"Abel\",\"number\":\"0612345678\",\"image\":\"https://mytribez.com/images/member2.jpg\"}"
    },{
      "owner": "member3",
      "site": "testsite1",
      "name": "Abram",
      "settings": "{\"contact\":\"Abram\",\"number\":\"0612345678\",\"image\":\"https://mytribez.com/images/member3.jpg\"}"
    },{
      "owner": "member4",
      "site": "testsite1",
      "name": "Begabantu",
      "settings": "{\"contact\":\"Begabantu\",\"number\":\"0612345678\",\"image\":\"https://mytribez.com/images/member4.jpg\"}"
    },{
      "owner": "member5",
      "site": "testsite1",
      "name": "Jonathan",
      "settings": "{\"contact\":\"Jonathan\",\"number\":\"0612345678\",\"image\":\"https://mytribez.com/images/member5.jpg\"}"
    }
  ],
  "more": false
}
```

```bash
[  
   {  
      "account":"randomacctaa",
      "active_private":"5JTNoSGA6HVSajqAHyEdePQdzcvf41uGXBwj41NShczL1RYdGpT",
      "image":"https://mytribez.com/images/975aa59e-5e0a-4d50-93cb-7189918676a6.png",
      "name":"Rory",
      "owner_private":"5JTNoSGA6HVSajqAHyEdePQdzcvf41uGXBwj41NShczL1RYdGpT",
      "uid":"-LLySDk7gSgKlKRT87FD"
   },
   {  
      "account":"randomacctab",
      "active_private":"5JgxNXs3rBAzaC44bX8EuuRUqDDAZnf2MKbbP1XoSEgTXZBkRMg",
      "image":"https://mytribez.com/images/baaab171-80c0-4bba-d055-7a0df2f62457.png",
      "name":"Janet",
      "owner_private":"5JgxNXs3rBAzaC44bX8EuuRUqDDAZnf2MKbbP1XoSEgTXZBkRMg",
      "uid":"-LLyUoGXzv6iaFghSXTM"
   },
   {  
      "account":"randomacctac",
      "active_private":"5JnPRYYptxNnCz5W4ASFe9CKYfVu9bLncy2VVpLPmGtdvKTkEiS",
      "image":"https://mytribez.com/images/4178f7dc-add2-42c1-e503-8b5b867db0ef.png",
      "name":"Bradley",
      "owner_private":"5JnPRYYptxNnCz5W4ASFe9CKYfVu9bLncy2VVpLPmGtdvKTkEiS",
      "uid":"-LLyXgRC9kXTGZQ8hxe-"
   },
   {  
      "account":"randomacctad",
      "active_private":"5JepU323t1YC8PfXuj3dytudnR1KsNkUzyBXySS8uk2DAeKfdhA",
      "image":"https://mytribez.com/images/6f93417c-e1fc-4da1-9ad8-eff525581616.png",
      "name":"Kirstin",
      "owner_private":"5JepU323t1YC8PfXuj3dytudnR1KsNkUzyBXySS8uk2DAeKfdhA",
      "uid":"-LM8aWy4YuxBvXgqW2cu"
   }
]
```

# Products

```bash
#cleos push action freecycle productadd '[1,"Clear plastic (PET)","{\"image\":\"https://dev.mytribez.com/images/clear-plastic-3.jpg\"}", 1]' -p freecycle@active
#cleos push action freecycle productadd '[2,"Coloured Plastic","{\"image\":\"https://dev.mytribez.com/images/colored-plastic.jpg\"}", 2]' -p freecycle@active
#cleos push action freecycle productadd '[3,"Paper","{\"image\":\"https://dev.mytribez.com/images/paper.jpg\"}", 3]' -p freecycle@active
#cleos push action freecycle productadd '[4,"Metal","{\"image\":\"https://dev.mytribez.com/images/cans.jpg\"}", 4]' -p freecycle@active
#cleos push action freecycle productadd '[5,"Glass","{\"image\":\"https://dev.mytribez.com/images/glass.jpg\"}", 5]' -p freecycle@active

cleos push action freecycle productdel '[1]' -p freecycle@active
cleos push action freecycle productdel '[2]' -p freecycle@active
cleos push action freecycle productdel '[3]' -p freecycle@active
cleos push action freecycle productdel '[4]' -p freecycle@active
cleos push action freecycle productdel '[5]' -p freecycle@active

cleos push action freecycle productadd '[1,"Clear plastic (PET)","{\"image\":\"https://dev.mytribez.com/images/clear-plastic-3.jpg\"}"]' -p testsite1@active
cleos push action freecycle productadd '[2,"Coloured Plastic","{\"image\":\"https://dev.mytribez.com/images/colored-plastic.jpg\"}"]' -p testsite1@active
cleos push action freecycle productadd '[3,"Paper","{\"image\":\"https://dev.mytribez.com/images/paper.jpg\"}"]' -p testsite1@active
cleos push action freecycle productadd '[4,"Metal","{\"image\":\"https://dev.mytribez.com/images/cans.jpg\"}"]' -p testsite1@active
cleos push action freecycle productadd '[5,"Glass","{\"image\":\"https://dev.mytribez.com/images/glass.jpg\"}"]' -p testsite1@active
```

```bash
cleos get table freecycle freecycle products

{
  "rows": [{
      "id": 1,
      "name": "Clear plastic (PET)",
      "settings": "{\"image\":\"https://dev.mytribez.com/images/clear-plastic-3.jpg\"}",
      "currentbatch": 1
    },{
      "id": 2,
      "name": "Coloured Plastic",
      "settings": "{\"image\":\"https://dev.mytribez.com/images/colored-plastic.jpg\"}",
      "currentbatch": 2
    },{
      "id": 3,
      "name": "Paper",
      "settings": "{\"image\":\"https://dev.mytribez.com/images/paper.jpg\"}",
      "currentbatch": 3
    },{
      "id": 4,
      "name": "Metal",
      "settings": "{\"image\":\"https://dev.mytribez.com/images/cans.jpg\"}",
      "currentbatch": 4
    },{
      "id": 5,
      "name": "Glass",
      "settings": "{\"image\":\"https://dev.mytribez.com/images/glass.jpg\"}",
      "currentbatch": 5
    }
  ],
  "more": false
}
```



```bash
[  
   {  
      "image":"https://dev.mytribez.com/images/clear-plastic-3.jpg",
      "name":"Clear Plastic",
      "price":"0.75",
      "uid":"-LLz3z8AU_1ojrb9l80v"
   },
   {  
      "image":"https://dev.mytribez.com/images/colored-plastic.jpg",
      "name":"Coloured Plastic",
      "price":"0.15",
      "uid":"-LLz5jGKYvlp5Nqe9e2G"
   },
   {  
      "image":"https://dev.mytribez.com/images/paper.jpg",
      "name":"Paper",
      "price":"0.35",
      "uid":"-LLz6yJIC83Q6nmTPq31"
   },
   {  
      "image":"https://dev.mytribez.com/images/cans.jpg",
      "name":"Metal",
      "price":"0.28",
      "uid":"-LLz7-u7TrovPsaHXrRw"
   },
   {  
      "image":"https://dev.mytribez.com/images/glass.jpg",
      "name":"Glass",
      "price":"0.22",
      "uid":"-LLz75xd6pfGSuzdzbng"
   }
]
```

# Batches

```bash
-- New batch
cleos push action freecycle batchadd '["testsite1","member1",1,1,2.5]' -p testsite1@active

-- Current batch
cleos push action freecycle batchadd '["testsite1","member1",1,0,2.5]' -p testsite1@active
cleos push action freecycle batchadd '["testsite1","member2",1,0,2.5]' -p testsite1@active
```

```bash
cleos get table freecycle freecycle batches

{
  "rows": [{
      "batchid": 9,
      "site": "testsite1",
      "productid": 1,
      "weight": "10.00000000000000000"
    },{
      "batchid": 10,
      "site": "testsite1",
      "productid": 1,
      "weight": "2.50000000000000000"
    }
  ],
  "more": false
}
```

# Batch shares

This table records the contribution of each member to a batch. This information is used to distribute the revenue from the batch pro-rate. The "scope" of the structure is set to batch id. Records are therefre returned by batch id.

```bash
cleos get table freecycle 9 batcheshares

{
  "rows": [{
      "member": "member1",
      "weight": "5.00000000000000000"
    },{
      "member": "member2",
      "weight": "2.50000000000000000"
    }
  ],
  "more": false
}

cleos get table freecycle 10 batcheshares

{
  "rows": [{
      "member": "member1",
      "weight": "2.50000000000000000"
    }
  ],
  "more": false
}
```


# Blockchain related notes

## Keys

(For simplicity) use the following keys for all accounts.

```bash
Private key: 5Hq2vqUAJUduvsnGQBAhrGRcth1uhbQR9V2Wj9Pt2Uxm1NjZHYq
Public key:  EOS7rv65EBnndXmCdgcqYRA5RzQQCewFmXJ3ybAbSS1keSrQtvPzG
```

```bash
cleos wallet import 5Hq2vqUAJUduvsnGQBAhrGRcth1uhbQR9V2Wj9Pt2Uxm1NjZHYq
```
We will add more keys if required

## Accounts

For contract
```bash
cleos create account eosio freecycle EOS7rv65EBnndXmCdgcqYRA5RzQQCewFmXJ3ybAbSS1keSrQtvPzG EOS7rv65EBnndXmCdgcqYRA5RzQQCewFmXJ3ybAbSS1keSrQtvPzG
```

For sites
```bash
cleos create account eosio testsite1 EOS7rv65EBnndXmCdgcqYRA5RzQQCewFmXJ3ybAbSS1keSrQtvPzG EOS7rv65EBnndXmCdgcqYRA5RzQQCewFmXJ3ybAbSS1keSrQtvPzG
cleos create account eosio testsite2 EOS7rv65EBnndXmCdgcqYRA5RzQQCewFmXJ3ybAbSS1keSrQtvPzG EOS7rv65EBnndXmCdgcqYRA5RzQQCewFmXJ3ybAbSS1keSrQtvPzG
cleos create account eosio testsite3 EOS7rv65EBnndXmCdgcqYRA5RzQQCewFmXJ3ybAbSS1keSrQtvPzG EOS7rv65EBnndXmCdgcqYRA5RzQQCewFmXJ3ybAbSS1keSrQtvPzG

cleos create account eosio member1 EOS7rv65EBnndXmCdgcqYRA5RzQQCewFmXJ3ybAbSS1keSrQtvPzG EOS7rv65EBnndXmCdgcqYRA5RzQQCewFmXJ3ybAbSS1keSrQtvPzG
cleos create account eosio member2 EOS7rv65EBnndXmCdgcqYRA5RzQQCewFmXJ3ybAbSS1keSrQtvPzG EOS7rv65EBnndXmCdgcqYRA5RzQQCewFmXJ3ybAbSS1keSrQtvPzG

```

Add testsite1
```bash
cleos push action freecycle registersite '["testsite1","Test site 1","","{}"]' -p testsite1@active
```

## Contracts

### Setup

```bash
alias eosiocpp='docker exec nodeos eosiocpp'
```

```bash
eosiocpp -o /work/freecycle/freecycle.wast /work/freecycle/freecycle.cpp

eosiocpp -g /work/freecycle/freecycle.abi /work/freecycle/freecycle.cpp

cleos wallet unlock --password PW5K4EJaofnfmcQzSttnDYkae6ifTTFzdt339hs5kRE6xzuC2LkWi

cleos set contract freecycle /work/freecycle/ --permission freecycle
```

Test actions
```bash
cleos push action freecycle registersite '["testsite1","Test site 1","kekj1","{\"contact\":\"Sebokeng\",\"number\":\"0612345678\"}"]' -p testsite1@active

cleos get table freecycle freecycle sitesettings

cleos push action freecycle unregsite '["testsite1"]' -p testsite1@active

cleos get table freecycle freecycle sitesettings

cleos push action freecycle memberadd '["testsite1","member1","Sebokeng","{\"contact\":\"Sebokeng\",\"number\":\"0612345678\"}"]' -p testsite1@active
cleos push action freecycle memberadd '["testsite1","member2","Abel","{\"contact\":\"Abel\",\"number\":\"0612345678\"}"]' -p testsite1@active

cleos get table freecycle freecycle members

cleos push action freecycle memberdel '["testsite1","member1"]' -p testsite1@active
cleos push action freecycle memberdel '["testsite1","member2"]' -p testsite1@active


#cleos push action freecycle productadd '[1,"Clear plastic (PET)","{}", 1]' -p freecycle@active
#cleos push action freecycle productadd '[1,"Clear plastic (PET)","{\"image\":\"https://dev.mytribez.com/images/clear-plastic-3.jpg\"}", 1]' -p freecycle@active

cleos push action freecycle productadd '[1,"Clear plastic (PET)","{\"image\":\"https://dev.mytribez.com/images/clear-plastic-3.jpg\"}"]' -p testsite1@active
cleos push action freecycle productadd '[2,"Coloured Plastic","{\"image\":\"https://dev.mytribez.com/images/colored-plastic.jpg\"}"]' -p testsite1@active
cleos push action freecycle productadd '[3,"Paper","{\"image\":\"https://dev.mytribez.com/images/paper.jpg\"}"]' -p testsite1@active
cleos push action freecycle productadd '[4,"Metal","{\"image\":\"https://dev.mytribez.com/images/cans.jpg\"}"]' -p testsite1@active
cleos push action freecycle productadd '[5,"Glass","{\"image\":\"https://dev.mytribez.com/images/glass.jpg\"}"]' -p testsite1@active

cleos get table freecycle freecycle products

#cleos push action freecycle productdel '[1]' -p freecycle@active
cleos push action freecycle productdel '[1]' -p testsite1@active

-- New batch
cleos push action freecycle batchadd '["testsite1","member1",1,1,2.5]' -p testsite1@active

-- Current batch
cleos push action freecycle batchadd '["testsite1","member1",1,0,2.5]' -p testsite1@active
cleos push action freecycle batchadd '["testsite1","member12",1,0,2.5]' -p testsite1@active

cleos get table freecycle freecycle batches

cleos push action freecycle batchdel '[1]' -p testsite1@active

cleos get table freecycle 9 batcheshares

cleos push action freecycle batchshrdel '[9,"member1"]' -p testsite1@active


cleos push action freecycle prodselect '["testsite1"]' -p testsite1@active
cleos push action freecycle memberadd '["testsite1"]' -p testsite1@active
cleos push action freecycle memberdel '["testsite1"]' -p testsite1@active
cleos push action freecycle batchadd '["testsite1"]' -p testsite1@active
cleos push action freecycle batchoffer '["testsite1"]' -p testsite1@active
cleos push action freecycle batchaccept '["testsite1"]' -p testsite1@active

```

### freecycle

#### Actions

##### registersite

account : EOS account

location : Geohash of site latitude / longitude allowing mobile app to discover nearby sites without the need for backend servers.

data : Json structure containing unindexed site data.

##### unregsite

account : EOS account

##### addproduct

##### selectprod

##### addmembers

##### delmembers

##### picker sells product

##### coop sells product

##### xxxx

##### xxxx


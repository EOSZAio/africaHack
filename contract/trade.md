### Just work through the "batchoffer" process in detail

#### Inputs

* account_name traider : Linked to trader profile when they login to app
* account_name site : Selected by traider as part of purchase process
* uint64_t productid : Selected by traider as part of purchase process
* const double weight : Entered by traider
* const double offer_price : Entered by traider

#### Process

* Itterate through available batches till all batches of quantity satisfied
  - deduct quantity from total required
  - Itterate through batch shares
    - add member's share in transaction to temporary record
    - (remove batch share records to free memory, don't do this in demo else we have to repopulate structure)
  - (remove batch records to free memory, don't do this in demo else we have to repopulate structure)
  - Reduce available stock
*. Distribute income to members based on their contribution
  - Token transfer from traider to member.

#### Command line stuff

Populate batches

```bash
-- New batch
cleos push action freecycle batchadd '["testsite1","member1",1,1,2.5]' -p testsite1@active
cleos push action freecycle batchadd '["testsite1","member2",1,1,2.5]' -p testsite1@active

-- Current batch
cleos push action freecycle batchadd '["testsite1","member1",1,0,2.5]' -p testsite1@active
cleos push action freecycle batchadd '["testsite1","member2",1,0,2.5]' -p testsite1@active
cleos push action freecycle batchadd '["testsite1","member3",1,0,2.5]' -p testsite1@active
```

Send action
```bash
cleos push action freecycle batchoffer '["traider1","testsite1",1,2500,3000.0]' -p testsite1@active
```

Get batches
```bash
cleos get table freecycle freecycle batches

{
  "rows": [{
      "batchid": 11,
      "site": "testsite1",
      "productid": 1,
      "weight": "10.00000000000000000"
    },{
      "batchid": 12,
      "site": "testsite1",
      "productid": 1,
      "weight": "2.50000000000000000"
    },{
      "batchid": 13,
      "site": "testsite1",
      "productid": 1,
      "weight": "2.50000000000000000"
    }
  ],
  "more": false
}
```
Need to update to only return single product

Get member contributions
```bash
cleos get table freecycle 11 batcheshares

{
  "rows": [{
      "member": "member1",
      "weight": "5.00000000000000000"
    },{
      "member": "member2",
      "weight": "2.50000000000000000"
    },{
      "member": "member3",
      "weight": "2.50000000000000000"
    }
  ],
  "more": false
}

cleos get table freecycle 12 batcheshares

{
  "rows": [{
      "member": "member1",
      "weight": "2.50000000000000000"
    }
  ],
  "more": false
}

cleos get table freecycle 13 batcheshares

{
  "rows": [{
      "member": "member2",
      "weight": "2.50000000000000000"
    }
  ],
  "more": false
}
```


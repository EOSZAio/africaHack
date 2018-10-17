# ZAR Token

Use the standard EOSIO token contract to represent a pegged currency token within the system. Going forward;

* We may be avle to adopt an existing stable coin token
* Alternatively, we can build on the standard currency token to accomodate the needs of minting, ... we may require

### EOSIO token contract

Create token account

```
cleos create account eosio zar.token EOS7rv65EBnndXmCdgcqYRA5RzQQCewFmXJ3ybAbSS1keSrQtvPzG EOS7rv65EBnndXmCdgcqYRA5RzQQCewFmXJ3ybAbSS1keSrQtvPzG
```

Then we need to upload the smart contract:

```
cleos set contract zar.token /work/eosio.token -p zar.token
```
Once that done, we can issue new token!

```
cleos push action zar.token create '{"issuer":"freecycle", "maximum_supply":"1000000000.00 ZAR"}' -p zar.token
```

### Issue Tokens to Account "traider1"

Now that we have created the token, the issuer can issue new tokens to the account user we created earlier.

We will use the positional calling convention (vs named args).

```
cleos push action zar.token issue '[ "traider1", "100.00 ZAR", "memo" ]' -p freecycle
```

Let's check member1's balance:

```
cleos get table zar.token member1 accounts
```

You should see following output:

```
{
  "rows": [{
      "balance": "100.00 ZAR"
    }
  ],
  "more": false
}
```

Test a transfer of tokens

```
cleos push action zar.token transfer '[ "member1", "member2", "50.00 ZAR", "Test transfer" ]' -p member1

cleos get table zar.token member1 accounts
cleos get table zar.token member2 accounts
```

#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/multi_index.hpp>
#include <eosio.system/eosio.system.hpp>

//using eosio::asset;
using std::string;
using namespace eosio;

class freecycle : public contract {
public:
//    using contract::contract;

/**-----------------------------------------------------------------------------------------------
 * constructor
 *------------------------------------------------------------------------------------------------*/
    freecycle(account_name self) :
    contract(self),
    sitesettings(_self, _self),
    products(_self, _self), // TODO : Production, handle multiple sites using a global and site specific table
    batches(_self, _self),
//    batcheshares(_self, _self),
    members(_self, _self),
    membershare(_self, _self) {}

/**-----------------------------------------------------------------------------------------------
 * Store of site settings
 * - index by owner and geohash
 * - site name stored in plain text
 * - all other settings stored in json, allows data structure to be changed without modifying table
 *   structure
 *------------------------------------------------------------------------------------------------*/

    /// @abi action
    void registersite(const account_name owner, const string sitename, const string geohash, const string settings ) {
        require_auth(owner);

        // Quick check to remind the user the payload must be json.
        eosio_assert(settings[0] == '{', "payload must be json");
        eosio_assert(settings[settings.size()-1] == '}', "payload must be json");

        // If entry exists, update it.
        auto target_itr = sitesettings.find(owner);
        if (target_itr != sitesettings.end()) {
            print( "Site ", name{owner}, " exists, updating it" );
            sitesettings.modify(target_itr, owner, [&](auto& j) {
                j.owner = owner;
                j.sitename = sitename;
                j.geohash = geohash;
                j.settings = settings;
            });
        } else {  // Otherwise, create a new entry for it.
            print( "Adding site ", name{owner} );
            sitesettings.emplace(owner, [&](auto& j) {
                j.owner = owner;
                j.sitename = sitename;
                j.geohash = geohash;
                j.settings = settings;
            });
        }
    }

/**-----------------------------------------------------------------------------------------------
 * retire site, remove record
 *------------------------------------------------------------------------------------------------*/

    /// @abi action
    void unregsite( account_name owner ) {
        require_auth(owner);

        auto target_itr = sitesettings.find(owner);
        eosio_assert(target_itr != sitesettings.end(), "No site for this account");

        print( "Site no longer needed, removing ", name{owner} );
        sitesettings.erase(target_itr);
    }

/**-----------------------------------------------------------------------------------------------
 * This action will be a system action, not a site action. Made some shortchts for the purposes of
 * getting a demo out
 *------------------------------------------------------------------------------------------------*/

    /// @abi action
    void productadd( const uint64_t id, const string name, string settings ) {
//        void productadd( const uint64_t id, const string name, string settings, const uint64_t currentbatch ) {
//        require_auth(_self);

        // Not going to support multiple sites for demo
        // products_table products(_self, site);

        // Quick check to remind the user the payload must be json.
        eosio_assert(settings[0] == '{', "payload must be json");
        eosio_assert(settings[settings.size()-1] == '}', "payload must be json");

        // If entry exists, update it.
        auto target_itr = products.find(id);
        if (target_itr != products.end()) {
            print( "Product ", id, " exists, updating" );

            products.modify(target_itr, _self, [&](auto& j) {
                j.id = id;
                j.name = name;
                j.settings = settings;
//                j.currentbatch = currentbatch;
            });
        } else {  // Otherwise, create a new entry for it.
            print( "Adding product ", id );
            products.emplace(_self, [&](auto& j) {
//            j.id = sequence::nextval(N(products));
                j.id = id;
                j.name = name;
                j.settings = settings;
//                j.currentbatch = currentbatch;
                j.currentbatch = 0;
                j.current_weight = 0;
                j.total_weight = 0;
            });
        }
    }

/**-----------------------------------------------------------------------------------------------
 * TODO : Just here for development (removing unwanted data), will be removed later
 *------------------------------------------------------------------------------------------------*/

    /// @abi action
    void productdel( const uint64_t id ) {

        auto target_itr = products.find(id);
        eosio_assert(target_itr != products.end(), "Product not found");

        print( "Removing product : ", id );
        products.erase(target_itr);
    }

/**-----------------------------------------------------------------------------------------------
 * TODO : This is needed when supporting multiple sites, skip for now
 *------------------------------------------------------------------------------------------------*/

    /// @abi action
    void prodselect( account_name user ) {
        print( "prodselect : ", name{user} );
    }

/**-----------------------------------------------------------------------------------------------
 *
 *------------------------------------------------------------------------------------------------*/

    /// @abi action
    void memberadd( account_name site, account_name owner, const string membername, const string settings ) {
        require_auth(site);

        // Quick check to remind the user the payload must be json.
        eosio_assert(settings[0] == '{', "payload must be json");
        eosio_assert(settings[settings.size()-1] == '}', "payload must be json");

        // If entry exists, update it.
        auto target_itr = members.find(owner);
        if (target_itr != members.end()) {
            print( "Member ", name{owner}, " exists, updating" );
            members.modify(target_itr, site, [&](auto& j) {
                j.owner = owner;
                j.site = site;
                j.name = membername;
                j.settings = settings;
            });
        } else {  // Otherwise, create a new entry for it.
            print( "Adding member ", name{owner} );
            members.emplace(site, [&](auto& j) {
                j.owner = owner;
                j.site = site;
                j.name = membername;
                j.settings = settings;
            });
        }
    }

/**-----------------------------------------------------------------------------------------------
 *
 *------------------------------------------------------------------------------------------------*/

    /// @abi action
    void memberdel( account_name site, account_name owner ) {
        require_auth(site);

        auto target_itr = members.find(owner);
        eosio_assert(target_itr != members.end(), "Not a member from coop");

        print( "Removing member ", name{owner} );
        members.erase(target_itr);
    }

/**-----------------------------------------------------------------------------------------------
 *
 *------------------------------------------------------------------------------------------------*/

    /// @abi action
    void batchadd( account_name site, account_name member, const uint64_t productid, const uint64_t newbatch, const double weight ) {
//        require_auth(site);

        // Find product
        auto product_itr = products.find(productid);
        eosio_assert(product_itr != products.end(), "Invalid product");

//        print("Found product : ", productid, ", name : ", product_itr->name, ", batch : ", product_itr->currentbatch );
        uint64_t currentbatch = product_itr->currentbatch;

        // If entry exists and not newbatch update it
        auto target_itr = batches.find(currentbatch);
        if (newbatch == 0 && target_itr != batches.end()) {
            print( "Batch ", currentbatch, " exists and newbatch = ", newbatch );
            batches.modify(target_itr, site, [&](auto& j) {
                j.site = site;
                j.productid = productid;
                j.weight += weight;
            });
        } else {  // Otherwise, create a new entry for it.
            if ( newbatch == 1 || currentbatch == 0) currentbatch = nextval(N(batches));
            print( "Adding batch ", name{currentbatch} );

            batches.emplace(site, [&](auto& j) {
                j.batchid = currentbatch;
                j.site = site;
                j.productid = productid;
                j.weight = weight;
            });
        }

        // Have to update product current batch (if changed) and weight
        products.modify(product_itr, _self, [&](auto& j) {
            print("Product ", productid, ", update  currentbatch ", currentbatch );
            j.currentbatch = currentbatch;
            j.current_weight += weight;
            j.total_weight += weight;
        });

        batchsharesadd( site, member, currentbatch, weight );
    }


/**-----------------------------------------------------------------------------------------------
 * TODO : Just here for development (removing unwanted data), will be removed later
 *------------------------------------------------------------------------------------------------*/

    /// @abi action
    void batchdel( uint64_t batchid ) {
//        require_auth(site);

        auto target_itr = batches.find(batchid);
        eosio_assert(target_itr != batches.end(), "Batch not found");

        print( "Removing batch ", name{batchid} );
        batches.erase(target_itr);
    }

/**-----------------------------------------------------------------------------------------------
 * Not part of ABI
 *------------------------------------------------------------------------------------------------*/

    void batchsharesadd( account_name site, account_name member, const uint64_t batchid, const double weight ) {
//        require_auth(site);

        print( "batchsharesadd : (", name{member}, ", ", batchid, ", ", weight, ")" );

        // Initialised here so scope can be set to batchid
        batcheshares_table batcheshares(_self, batchid);

        // If member already has entry update it else add it
        auto target_itr = batcheshares.find(member);

        if (target_itr != batcheshares.end()) {
            print( "Batch share found for ", name{member}, " , updating" );
            batcheshares.modify(target_itr, site, [&](auto& j) {
                j.weight += weight;
            });
        } else {  // Otherwise, create a new entry for it.
            batcheshares.emplace(site, [&]( auto& j ) {
                print( "batchsharesadd : (", name{member}, ", ", batchid, ", ", weight, ")" );
                j.member = member;
                j.weight = weight;
            });

        }
    }

/**-----------------------------------------------------------------------------------------------
 * TODO : Just here for development (removing unwanted data), will be removed later
 *------------------------------------------------------------------------------------------------*/

    /// @abi action
    void batchshrdel( uint64_t batchid, account_name member ) {
//        require_auth(site);
        batcheshares_table batcheshares(_self, batchid);

        auto target_itr = batcheshares.find(member);
        eosio_assert(target_itr != batcheshares.end(), "Batcheshares not found");

        print( "Removing batcheshares ", batchid, ", ", name{member} );
        batcheshares.erase(target_itr);
    }

/**-----------------------------------------------------------------------------------------------
 * Simplified process here
 * 1. Itterate through available batches till all batches of quantity satisfied
 *   - deduct quantity from total required
 *   - Itterate through batch shares
 *     - add member's share in transaction to temporary record
 *     - (remove batch share records to free memory, don't do this in demo else we have to repopulate structure)
 *   - (remove batch records to free memory, don't do this in demo else we have to repopulate structure)
 *   - Reduce available stock
 * 2. Distribute income to members based on their contribution
 *   - Token transfer from traider to member.
 *------------------------------------------------------------------------------------------------*/

    void membershare_delete( account_name member ) {
        auto target_itr = membershare.find(member);
        if (target_itr != membershare.end()) {
//            print( "Removing member share for ", name{member} );
            membershare.erase(target_itr); // TODO : Delete failing (probably messed up permissions)
        }
    }

    void membershare_add( account_name site, account_name member, const double weight ) {
        auto target_itr = membershare.find(member);

        if (target_itr != membershare.end()) {
//            print( "Add member (", name{member}, " , ", weight, ") " );
            membershare.modify(target_itr, site, [&](auto& j) {
                j.weight += weight;
            });
        } else {  // Otherwise, create a new entry for it.
            membershare.emplace(site, [&]( auto& j ) {
//                print( "Update member (", name{member}, " , ", weight, ") " );
                j.member = member;
                j.weight = weight;
            });
        }
    }

    void process_batch_shares(account_name site, uint64_t batchid) {
        batcheshares_table batcheshares(_self, batchid);

        // Member's share
        for (auto& b : batcheshares) {
//            print( ", process_batch_shares : (", name{b.member}, ", ", b.weight, ") " );

            // Add member's share
            membershare_add(site, b.member, b.weight);

            // member share record
            batchshrdel( batchid, b.member );  // TODO : Comment out during dev to prevent loosing state
        }
    }

    /// @abi action
    void batchoffer( account_name traider, account_name site, uint64_t productid, const double weight, const double offer_price  ) {

        // Clear member share table (ugly but it works!)
        for (auto& m : membershare) {
            membershare_delete(m.member);
        }

        // Batches
        auto w = weight;
        for (auto& batch : batches) {
//            print( ", batchoffer : (", batch.batchid, ", ", batch.weight, ") " );
//            print( ", (need:", w, ", found:", batch.weight, ") " );
            if (batch.weight > w) break;
            w -= batch.weight;

            // Need to do this in a separate routine, each batch has it's own scope
            process_batch_shares(site, batch.batchid);

            // Remove batch record
            batchdel( batch.batchid );  // TODO : Comment out during dev to prevent loosing state
        }

        // Stock found ?
        auto matched = weight-w;
        eosio_assert(matched > 0.0, "Insufficient stock");
//        print( ", matched ", weight-w, "kg of ", weight, "kg) " );

        // Adjust site stock
        auto product = products.find(productid);
        eosio_assert(product != products.end(), "Error in business rules");
//        print("Product ", productid, " found, updating");
        products.modify(product, _self, [&](auto &j) {
//            print( ", reducing ", j.current_weight, "kg by ", weight, "kg) " );
            j.current_weight -= matched;  // TODO : Comment out during dev to prevent loosing state
        });

        // Distribute income
        for (auto& m : membershare) {
            print( ", Dist : (", m.weight, " / ", weight, ", " );

            // Tokens from traider to member
            /*
            INLINE_ACTION_SENDER(eosio::token, transfer)( N(eosio.token), {payer,N(active)},
                                                          { payer, N(eosio.ram), quant_after_fee, std::string("buy ram") } );
            action(
                    permission_level{get_self(),N(active)},
                    get_self(),
                    N(notify),
                    std::make_tuple(user, name{user}.to_string() + " " + message)
            ).send();
             */

//            INLINE_ACTION_SENDER(eosio::token, transfer)( N(eosio.token), {payer,N(active)},
//                                                          { payer, N(eosio.ram), quant_after_fee, std::string("buy ram") } );

        }
    }

/**-----------------------------------------------------------------------------------------------
 *
 *------------------------------------------------------------------------------------------------*/

    /// @abi action
    void batchaccept( account_name user ) {
        print( "batchaccept : ", name{user} );
    }

private:
/**-----------------------------------------------------------------------------------------------
 * Note on Geohash. Encoding is in base32 but different character set to EOSIO. A 4 character
 * geohash (20 bits) occupies approximately 20km x 20km. This can be used to find 'sites near me'
 * directly off the blockchain - see https://en.wikipedia.org/wiki/Geohash
 *
 * Use strings, no index for now
 *
 * Encoding https://www.movable-type.co.uk/scripts/geohash.html
 * Clubview
 * -25.8390532,28.1797913
 * kekj1 (3 characters probably better - see square on link above)
 *
 * cleos push action freecycle registersite '["testsite1","Test site 1","kekj1","{\"contact\":\"Sebokeng\",\"number\":\"0612345678\"}"]' -p testsite1@active
 *------------------------------------------------------------------------------------------------*/

    // @abi table sitesettings i64
    struct sitesettings {
        account_name owner;
        string       sitename;
        string       geohash;
        string       settings;

        auto primary_key() const {  return owner;  }
        EOSLIB_SERIALIZE(sitesettings, (owner)(sitename)(geohash)(settings))
    };
    typedef eosio::multi_index<N(sitesettings), sitesettings> sitesettings_table;
    sitesettings_table sitesettings;

/**-----------------------------------------------------------------------------------------------
 *
 *------------------------------------------------------------------------------------------------*/
    // @abi table products i64
    struct products {
        uint64_t  id;
        string    name;
        string    settings;
        uint64_t  currentbatch;
        double    current_weight;
        double    total_weight;

        auto primary_key() const { return id; }

        EOSLIB_SERIALIZE( products, (id)(name)(settings)(currentbatch)(current_weight)(total_weight) )
    };

    typedef eosio::multi_index< N(products), products> products_table;
    products_table products;

/**-----------------------------------------------------------------------------------------------
 *
 *------------------------------------------------------------------------------------------------*/
    // @abi table members i64
    struct members {
        account_name owner;
        account_name site;
        string       name;
        string       settings;

        auto primary_key() const {  return owner;  }
        EOSLIB_SERIALIZE(members, (owner)(site)(name)(settings))
    };
    typedef eosio::multi_index<N(members), members> members_table;
    members_table members;

/**-----------------------------------------------------------------------------------------------
 *
 *------------------------------------------------------------------------------------------------*/
    // @abi table membershare i64
    struct membershare {
        account_name member;
        double       weight;

        auto primary_key() const {  return member;  }
        EOSLIB_SERIALIZE(membershare, (member)(weight))
    };
    typedef eosio::multi_index<N(membershare), membershare> membershare_table;
    membershare_table membershare;

/**-----------------------------------------------------------------------------------------------
 *
 *------------------------------------------------------------------------------------------------*/
    // @abi table batches i64
    struct batches {
        uint64_t     batchid;
        account_name site;
        uint64_t     productid;
        double       weight;

        auto primary_key() const {  return batchid;  }
        EOSLIB_SERIALIZE(batches, (batchid)(site)(productid)(weight))
    };
    typedef eosio::multi_index<N(batches), batches> batches_table;
    batches_table batches;

/**-----------------------------------------------------------------------------------------------
 * Use scope = batch, make member primary key
 *------------------------------------------------------------------------------------------------*/
    // @abi table batcheshares i64
    struct batcheshares {
//        uint64_t     id;
        account_name member;
//        uint64_t     batchid;
//        uint64_t     productid;
        double       weight;

        auto primary_key() const {  return member;  }
        EOSLIB_SERIALIZE(batcheshares, (member)(weight))
    };
    typedef eosio::multi_index<N(batcheshares), batcheshares> batcheshares_table;
//    batcheshares_table batcheshares;

/**-----------------------------------------------------------------------------------------------
 *
 *------------------------------------------------------------------------------------------------*/
    uint64_t nextval(const account_name table) {
        sequence seq;
        auto it = db_find_i64( _self, table, N(sequence), sequence::key );

        if ( it == -1 ) {
            db_store_i64( table, N(sequence), _self, sequence::key, (const char *)&seq, sizeof(sequence) );
        } else {
            auto size = db_get_i64( it, (char*)&seq, sizeof(sequence) );
            eosio_assert( size == sizeof(sequence), "Wrong record size" );
            seq.value++;
            db_update_i64( it, _self, (const char *)&seq, sizeof(sequence) );
        }

        print("\n  nextval(",name{table},") : key=", name{seq.key},", value=",seq.value);
        return seq.value;
    }

/**-----------------------------------------------------------------------------------------------
 * sequence : unique auto-increment sequence for record indexing
 *------------------------------------------------------------------------------------------------*/
    struct sequence {
        sequence() {}
        constexpr static uint64_t key = N(sequence);
        uint64_t value = 1;
    };

};

EOSIO_ABI( freecycle, (registersite)(unregsite)(productadd)(productdel)(prodselect)(memberadd)(memberdel)(batchadd)(batchdel)(batchshrdel)(batchoffer)(batchaccept) )

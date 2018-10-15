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
    members(_self, _self) {}

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
        eosio_assert(settings[0] == '{',             "payload must be json");
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
 *
 *------------------------------------------------------------------------------------------------*/

    /// @abi action
    void productadd( account_name user ) {
        print( "productadd : ", name{user} );
    }

/**-----------------------------------------------------------------------------------------------
 * This is needed when supporting multiple sites, skip for now
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
        eosio_assert(settings[0] == '{',             "payload must be json");
        eosio_assert(settings[settings.size()-1] == '}', "payload must be json");

        // If entry exists, update it.
        auto target_itr = members.find(owner);
        if (target_itr != members.end()) {
            print( "Member ", name{owner}, " exists, updating" );
            members.modify(target_itr, owner, [&](auto& j) {
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
    void skipadd( account_name user ) {
        print( "skipadd : ", name{user} );
    }

/**-----------------------------------------------------------------------------------------------
 *
 *------------------------------------------------------------------------------------------------*/

    /// @abi action
    void skipoffer( account_name user ) {
        print( "skipoffer : ", name{user} );
    }

/**-----------------------------------------------------------------------------------------------
 *
 *------------------------------------------------------------------------------------------------*/

    /// @abi action
    void skipaccept( account_name user ) {
        print( "skipaccept : ", name{user} );
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
    auto nextval(const account_name table) {
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

EOSIO_ABI( freecycle, (registersite)(unregsite)(productadd)(prodselect)(memberadd)(memberdel)(skipadd)(skipoffer)(skipaccept) )

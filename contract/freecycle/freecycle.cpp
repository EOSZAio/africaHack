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
    sitesettings(_self, _self) {}

/**-----------------------------------------------------------------------------------------------
 * Store of site settings
 * - index by owner and geohash
 * - site name stored in plain text
 * - all other settings stored in json, allows data structure to be changed without modifying table
 *   structure
 *------------------------------------------------------------------------------------------------*/

    /// @abi action
    void registersite(const account_name owner, const string sitename, const string geohash, const string settings) {
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
    void addproduct( account_name user ) {
        print( "Hello, ", name{user} );
    }

/**-----------------------------------------------------------------------------------------------
 *
 *------------------------------------------------------------------------------------------------*/

    /// @abi action
    void selectprod( account_name user ) {
        print( "Hello, ", name{user} );
    }



private:
/**-----------------------------------------------------------------------------------------------
 * Note on Geohash. Encoding is in base32 but different character set to EOSIO. A 4 character
 * geohash (20 bits) occupies approximately 20km x 20km. This can be used to find 'sites near me'
 * directly off the blockchain - see https://en.wikipedia.org/wiki/Geohash
 *
 * Use strings, no index for now
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

EOSIO_ABI( freecycle, (registersite)(unregsite)(addproduct)(selectprod) )

#include <eosiolib/eosio.hpp>
using namespace eosio;

class freecycle : public eosio::contract {
  public:
      using contract::contract;

      /// @abi action 
      void hi( account_name user ) {
         print( "Hello, ", name{user} );
      }
};

EOSIO_ABI( freecycle, (hi) )

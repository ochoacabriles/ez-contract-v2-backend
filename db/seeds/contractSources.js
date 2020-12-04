export default [
  {
    _id: '5fc15896126ac0cf498e6660',
    name: 'erc20 basic',
    abi: JSON.stringify([
      {
        'constant': true,
        'inputs': [],
        'name': 'name',
        'outputs': [
          {
            'name': '',
            'type': 'string'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_spender',
            'type': 'address'
          },
          {
            'name': '_value',
            'type': 'uint256'
          }
        ],
        'name': 'approve',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_from',
            'type': 'address'
          },
          {
            'name': '_to',
            'type': 'address'
          },
          {
            'name': '_value',
            'type': 'uint256'
          }
        ],
        'name': 'transferFrom',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'decimals',
        'outputs': [
          {
            'name': '',
            'type': 'uint8'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_spender',
            'type': 'address'
          },
          {
            'name': '_subtractedValue',
            'type': 'uint256'
          }
        ],
        'name': 'decreaseApproval',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_owner',
            'type': 'address'
          }
        ],
        'name': 'balanceOf',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'symbol',
        'outputs': [
          {
            'name': '',
            'type': 'string'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_to',
            'type': 'address'
          },
          {
            'name': '_value',
            'type': 'uint256'
          }
        ],
        'name': 'transfer',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_spender',
            'type': 'address'
          },
          {
            'name': '_addedValue',
            'type': 'uint256'
          }
        ],
        'name': 'increaseApproval',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_owner',
            'type': 'address'
          },
          {
            'name': '_spender',
            'type': 'address'
          }
        ],
        'name': 'allowance',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'name': '_name',
            'type': 'string'
          },
          {
            'name': '_symbol',
            'type': 'string'
          },
          {
            'name': '_decimals',
            'type': 'uint8'
          },
          {
            'name': '_supply',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'constructor'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'name': 'owner',
            'type': 'address'
          },
          {
            'indexed': true,
            'name': 'spender',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': 'value',
            'type': 'uint256'
          }
        ],
        'name': 'Approval',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'name': 'from',
            'type': 'address'
          },
          {
            'indexed': true,
            'name': 'to',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': 'value',
            'type': 'uint256'
          }
        ],
        'name': 'Transfer',
        'type': 'event'
      }
    ]),
    bytecode: '0x60806040523480156200001157600080fd5b50604051620014c6380380620014c68339810180604052810190808051820192919060200180518201929190602001805190602001909291908051906020019092919050505083838382600090805190602001906200007292919062000101565b5081600190805190602001906200008b92919062000101565b5080600260006101000a81548160ff021916908360ff16021790555050505080600481905550600454600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050505050620001b0565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200014457805160ff191683800117855562000175565b8280016001018555821562000175579182015b828111156200017457825182559160200191906001019062000157565b5b50905062000184919062000188565b5090565b620001ad91905b80821115620001a95760008160009055506001016200018f565b5090565b90565b61130680620001c06000396000f3006080604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b4578063095ea7b31461014457806318160ddd146101a957806323b872dd146101d4578063313ce56714610259578063661884631461028a57806370a08231146102ef57806395d89b4114610346578063a9059cbb146103d6578063d73dd6231461043b578063dd62ed3e146104a0575b600080fd5b3480156100c057600080fd5b506100c9610517565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101095780820151818401526020810190506100ee565b50505050905090810190601f1680156101365780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561015057600080fd5b5061018f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506105b5565b604051808215151515815260200191505060405180910390f35b3480156101b557600080fd5b506101be6106a7565b6040518082815260200191505060405180910390f35b3480156101e057600080fd5b5061023f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506106b1565b604051808215151515815260200191505060405180910390f35b34801561026557600080fd5b5061026e610a71565b604051808260ff1660ff16815260200191505060405180910390f35b34801561029657600080fd5b506102d5600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610a84565b604051808215151515815260200191505060405180910390f35b3480156102fb57600080fd5b50610330600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d16565b6040518082815260200191505060405180910390f35b34801561035257600080fd5b5061035b610d5f565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561039b578082015181840152602081019050610380565b50505050905090810190601f1680156103c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156103e257600080fd5b50610421600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610dfd565b604051808215151515815260200191505060405180910390f35b34801561044757600080fd5b50610486600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611022565b604051808215151515815260200191505060405180910390f35b3480156104ac57600080fd5b50610501600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061121e565b6040518082815260200191505060405180910390f35b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105ad5780601f10610582576101008083540402835291602001916105ad565b820191906000526020600020905b81548152906001019060200180831161059057829003601f168201915b505050505081565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600454905090565b6000600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561070157600080fd5b600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561078c57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156107c857600080fd5b61081a82600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546112a590919063ffffffff16565b600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506108af82600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546112be90919063ffffffff16565b600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061098182600560008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546112a590919063ffffffff16565b600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b600260009054906101000a900460ff1681565b600080600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508083101515610b96576000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610c2a565b610ba983826112a590919063ffffffff16565b600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610df55780601f10610dca57610100808354040283529160200191610df5565b820191906000526020600020905b815481529060010190602001808311610dd857829003601f168201915b505050505081565b6000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610e4d57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515610e8957600080fd5b610edb82600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546112a590919063ffffffff16565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610f7082600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546112be90919063ffffffff16565b600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b60006110b382600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546112be90919063ffffffff16565b600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60008282111515156112b357fe5b818303905092915050565b600081830190508281101515156112d157fe5b809050929150505600a165627a7a723058200e4ac661b9fc696789fea783e2b183b75d71e8c1ab0581539a23245a6c7058f30029',
  }
];
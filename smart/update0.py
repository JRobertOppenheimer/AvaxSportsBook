import json
from web3 import Web3
from web3.middleware import geth_poa_middleware

# Solidity contract address and function name
contract_address = "0x5b53b798dc019B790f87068A628964b61190aD8D"
function_name = "createParams"

# Load the JSON file containing the compiled contract data
contract_json_file = "Oracle.json"
with open(contract_json_file) as f:
    contract_json_data = json.load(f)

# Solidity contract ABI (Application Binary Interface)
contract_abi = contract_json_data["abi"]

# Connect to an Ethereum node (you can use Infura, Alchemy, or run your own node)
#w3 = Web3(Web3.HTTPProvider("http://localhost:8545"))  # Update the URL if using a different node
infura_api_key = "83f0731415fc493db0dc5dab899c2ef0"
avalanche_fuji_chain_id = 43113

#url= "https://api.avax-test.network/ext/bc/C/rpc"
urlFuji = "https://fuji.infura.io/v3/{infura_api_key}"
w3 = Web3(Web3.HTTPProvider(f"https://fuji.infura.io/v3/{infura_api_key}"))
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

# Set the chain ID manually
w3.net.chainId = avalanche_fuji_chain_id

# w3 = Web3(Web3.HTTPProvider(f"https://fuji.infura.io/v3/{infura_api_key}", # #chain_id=avalanche_fuji_chain_id))

# Set the default Ethereum account (optional)
# This step is required only if you need to sign transactions.
# If you're just calling a read-only function, you can skip this part.
private_key = "0x4765ce94f9ef7d4ea3f4023e9a1e2936f47fb2cbb8be104d3883b6ef721f5aa4"
if private_key:
    account = w3.eth.account.from_key(private_key)
    w3.eth.defaultAccount = account.address

# Create a contract instance using the address and ABI
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

# Solidity function argument
arguments = [666, 10448, 500, 919, 909, 800, 510, 739, 620, 960, 650, 688, 970, 730, 699, 884, 520, 901, 620, 764, 851, 820, 770, 790, 730, 690, 970, 760, 919, 720, 672, 800]

# Call the Solidity function
try:
    # Use the call() function for read-only/view functions
    result = contract.functions.updatePost(arguments).call()
    print("Function call result:", result)
except Exception as e:
    # Use the transact() function for state-changing functions (requires an Ethereum account with sufficient balance)
    # result = contract.functions.createParams(arguments).transact()
    print("Error:", e)

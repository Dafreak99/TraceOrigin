import base58
from cryptoconditions import Ed25519Sha256

pubkey = 'HFp773FH21sPFrn4y8wX3Ddrkzhqy4La4cQLfePT2vz7'

# Convert pubkey to a bytes representation (a Python 3 bytes object)
pubkey_bytes = base58.b58decode(pubkey)

# Construct the condition object
ed25519 = Ed25519Sha256(public_key=pubkey_bytes)

# Compute the condition uri (string)
uri = ed25519.condition_uri
# uri should be:
# 'ni:///sha-256;at0MY6Ye8yvidsgL9FrnKmsVzX0XrNNXFmuAPF4bQeU?fpt=ed25519-sha-256&cost=131072'
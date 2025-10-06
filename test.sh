curl -i -N -H "Connection: Upgrade" -H "Upgrade: websocket" \
    -H "Host: localhost:3000" \
    -H "Origin: http://localhost:3000" \
    http://localhost:3000/socket.io/?EIO=4&transport=websocket&sid=Jx5Bii4XsZMixMa8AAAC

#!/bin/sh

STATUS=$(curl -s -o /dev/null -w “%{http_code}” http://localhost:2333/v4/info)

if [ “$STATUS” = “200” ]; then
exit 0
else
exit 1
fi

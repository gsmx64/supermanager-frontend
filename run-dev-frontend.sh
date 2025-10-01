#!/bin/bash
echo -----------------------------------------
echo > Runing App Frontend - Development
echo -----------------------------------------
if [ ! -f .env.development ]; then yes | cp -rf .env.development.sample .env.development; fi
source .env.development && npm run dev && cd.. && exit 0
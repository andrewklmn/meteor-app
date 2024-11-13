#!/bin/bash

# This script is used to deploy the app to the remote server
npm run build && npm run deploy && npm run restart:remote

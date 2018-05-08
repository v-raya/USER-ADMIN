#!/usr/bin/env bash

ENV_REPO=https://github.com/ca-cwds/case-management-env.git

if [ "$1" == "" ]; then
  echo "You must provide a file name or glob pattern (.env, .env.test, '.env.local.*')"
  exit 1
fi

TMP_DIR=`mktemp -d 2>/dev/null || mktemp -d -t 'mytmpdir'`

if [[ ! "$TMP_DIR" || ! -d "$TMP_DIR" ]]; then
  echo "Failed to create temp dir"
  exit 1
fi

git clone -q --depth 1 $ENV_REPO $TMP_DIR

while [ "$1" != "" ]; do
  cp $TMP_DIR/$1 $PWD
  shift
done

function cleanup {
  rm -rf "$TMP_DIR"
}

trap cleanup EXIT

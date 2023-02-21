#!/bin/sh
# This is for Mac/Linux users.
# Zips the dir specified at the command line, defaulting to the directory containing publish.sh
CURRENT_DIR="`dirname \"$0\"`"
dir_to_be_zipped="${1:-${CURRENT_DIR}}"
zipfile="${CURRENT_DIR}/../index.zip"
rm "${zipfile}"
zip "${zipfile}" "${dir_to_be_zipped}"/* -r -x "${CURRENT_DIR}"/publish.sh* -x "${CURRENT_DIR}"/publish.bat* -9
aws lambda update-function-code --function-name myMovieLambda --zip-file fileb://"${zipfile}"

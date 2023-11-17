# set -x

TEST_DIR=$(realpath ${1/:-.})
THRESHOLD=${2:-80}
COVERAGE_DIR=./coverage
COVERAGE_OUTPUT_FILE=$COVERAGE_DIR/output.txt
COVERAGING_URL=https://gist.githubusercontent.com/dragos-tudor/2e164789ff6e4b501e7ae9e7595c8b16/raw/4f6240badd7bc2c30a97a5746092629cf0159290/coveraging.js
INCLUDE_FILES=$TEST_DIR/.*\.js*

[ -d $COVERAGE_DIR ] && rm -rf $COVERAGE_DIR

deno test --allow-all --parallel --coverage=$COVERAGE_DIR $TEST_DIR
deno coverage --include=$INCLUDE_FILES $COVERAGE_DIR > $COVERAGE_OUTPUT_FILE
deno run --allow-read $COVERAGING_URL $COVERAGE_OUTPUT_FILE $THRESHOLD

EXIT_CODE=$(echo $?)
[ -d $COVERAGE_DIR ] && rm -rf $COVERAGE_DIR
exit $EXIT_CODE
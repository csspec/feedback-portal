#!/usr/bin/env bash
#
#  Installs various dependencies
#

check_package_exists() {
    if hash $1 > /dev/null 2>&1; then
        return 0
    fi
    return 1
}

# check whether node exists or not
if check_package_exists node; then
    echo "Found Node.JS version: " `node --version`
else
    echo "Installing Node.js..."
    curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# check whether java exists or not
if check_package_exists java; then
    echo "Found Java version: " `java -version`
else
    echo "Installing Java..."
    sudo apt-add-repository -y ppa:webupd8team/java
    sudo apt-get update
    sudo apt-get install -y oracle-java8-installer maven
fi

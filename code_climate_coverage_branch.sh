git name-rev --name-only $(git log | grep -m1 -oE '[^ ]+$')

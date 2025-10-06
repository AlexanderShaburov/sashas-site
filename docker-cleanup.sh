#!/bin/bash

echo "📦 Checking Docker disk usage before cleanup..."
BEFORE=$(docker system df -v | grep -E '^Total space used' | awk '{print $4}')
echo "🔍 Total Docker space used before: $BEFORE"

echo "🚧 Stopping all containers..."
docker stop $(docker ps -aq) 2>/dev/null

echo "🧹 Removing all containers..."
docker rm $(docker ps -aq) 2>/dev/null

echo "🔥 Removing all images..."
docker rmi -f $(docker images -q) 2>/dev/null

echo "🧱 Removing all build cache..."
docker builder prune --all -f

echo "🔗 Removing all networks (not in use)..."
docker network prune -f

echo "💾 Removing all unused volumes..."
docker volume prune -f

echo "🧼 Running full system prune..."
docker system prune -a --volumes -f

echo "📦 Checking Docker disk usage after cleanup..."
AFTER=$(docker system df -v | grep -E '^Total space used' | awk '{print $4}')
echo "📊 Total Docker space used after: $AFTER"

# Calculate difference using numfmt and bc
BEFORE_BYTES=$(docker system df --format '{{.Size}}' | head -1 | numfmt --from=iec)
AFTER_BYTES=$(docker system df --format '{{.Size}}' | head -1 | numfmt --from=iec)
FREED_BYTES=$((BEFORE_BYTES - AFTER_BYTES))
FREED_HUMAN=$(numfmt --to=iec --suffix=B $FREED_BYTES)

echo "✅ Cleanup complete!"
echo "🧮 Space freed: $FREED_HUMAN"

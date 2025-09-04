# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Install pnpm and set environment variables
RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Set working directory
WORKDIR /app

# Copy package management files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with optimizations for Docker
RUN pnpm config set store-dir /root/.pnpm-store
RUN pnpm install --frozen-lockfile --no-optional --production=false

# Copy application source
COPY . .

# Build the application
RUN pnpm run build

# Remove dev dependencies to reduce image size
RUN pnpm prune --production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Start the application
CMD ["pnpm", "start"]
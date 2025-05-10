#lightweight base image
FROM node:24-alpine AS base
##new stage where depencies will be handed
FROM base AS deps
##ensure compatibility with certain native modules
RUN apk add --no-cache libc6-compat
WORKDIR /app
##ensure exact install as stated in package and package-lock jsons
COPY package.json package-lock.json ./
RUN npm ci
##create another stage so that first stage will be skipped if package&package-lock don't change
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM build AS runner
WORKDIR /app

ENV  NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chwon nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next./static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node server.js
FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

RUN apk add --no-cache git

COPY . .
ARG API_URL
ENV API_URL $API_URL
ENV NODE_ENV production

EXPOSE 3000
ENV PORT 3000

RUN npm run build

CMD npm run start

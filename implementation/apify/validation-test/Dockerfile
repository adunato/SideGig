FROM apify/actor-node:24 AS builder

COPY --chown=myuser:myuser package*.json ./
RUN npm install --include=dev

COPY --chown=myuser:myuser . ./
RUN npm run build

FROM apify/actor-node:24

COPY --chown=myuser:myuser package*.json ./
RUN npm install --omit=dev --omit=optional

COPY --from=builder --chown=myuser:myuser /usr/src/app/dist ./dist

CMD ["node", "dist/main.js"]

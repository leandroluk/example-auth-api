 FROM node as builder
 WORKDIR /app
 COPY . .
 RUN npm install --frozen-lockfile && \
     npm build

 FROM alpine as runner
 ENV NODE_ENV="development" \
     PORT=3000 \
     JWT_PRIVATE_KEY="secret" \
     JWT_PUBLIC_KEY="secret" \
     JWT_AUGORITHM="HS256" \
     JWT_AUDIENCE="http://localhost:13000" \
     JWT_ISSUER="issuer" \
     JWT_ACCESS_TTL=600000 \
     JWT_REFRESH_TTL=1209600000 \
     DB_LIMIT=50 \
     DB_POSTGRES="postgresql://postgres:postgres@localhost:5432/postgres"

RUN apk add --update nodejs
WORKDIR /app
COPY --from=builder /app/dist/ /app/
EXPOSE ${PORT}
CMD node index.js
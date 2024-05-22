yarn add swagger-ui-express express-openapi-validator && yarn add -D swagger-jsdoc openapi-typescript @types/swagger-ui-express copyfiles

npx swagger-jsdoc -d src/routes/definitation.yaml src/routes/\*.ts "src/routes/!(definition).yaml" -o src/schemas/openapi.json

npx openapi-typescript src/schemas/openapi.json -o src/schemas/index.d.ts
# nodejs-typescript-example

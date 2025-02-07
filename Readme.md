# Pasos para inicilizar el Backend

## Instalacion de dependencias 

Inicializamos
```
$ npm init -y
```

Instalamos el framework express con dotenv
```
$ npm install express dotenv --save
```

Aseguramos de tener typescript
```
$ npm install typescript -g
```

Instalamos el framework express para typescript
```
$ npm install @types/express @types/node --save-dev
```

```
$ npx tsc --init
```

# Ejecución

Compilamos, esto creara un index.js en la carpeta dist(la cual fue configurada en tsconfig.json package.json package-lock.json)
```
$ npx tsc
```

Ejecutamos
```
$ node dist/index.js
```

# Instalacion de nodemon

Si queremos solo iniciar con un "npm run dev", y hacer cambios mientras esta ejecutandose el servidor, entonces necesitaremos configurar el package.json en su start y dev, pero antes instalamos lo siguiente
```
$ npm install ts-node --save-dev
```

```
$ npx nodemon src/index.ts 
```
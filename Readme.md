# Pasos para inicilizar el Backend

## Instalacion de dependencias 
Inicializamos
```
npm init -y
```

Instalamos el framework express con dotenv
```
npm install express dotenv --save
```

Aseguramos de tener typescript
```
npm install typescript -g
```

Instalamos el framework express para typescript
```
npm install @types/express @types/node --save-dev
```

```
npx tsc --init
```

# Ejecución
Compilamos, esto creara un index.js en la carpeta dist(la cual fue configurada en tsconfig.json package.json package-lock.json)
```
npx tsc
```

Ejecutamos
```
node dist/index.js
```

# Instalacion de nodemon
Si queremos solo iniciar con un "npm run dev", y hacer cambios mientras esta ejecutandose el servidor, entonces necesitaremos configurar el package.json en su start y dev, pero antes instalamos lo siguiente
```
npm install ts-node --save-dev
```

```
npx nodemon src/index.ts 
```

# Instalacion de cors
Si al momento de ejecutar, les sale error en el fetch del frontend, debe ser porque falta instalar cors
```
npm install cors --save
```

Incluyendo sus tipos
```
npm install --save-dev @types/cors
```

# Intalacion de sequelize
Instalamos sequelize y el drive para poder utilizar postgresql
```
npm install sequelize pg pg-hstore --save
```

Independencia de desarrollo de sequelize
```
npm install sequelize-cli --save-dev
```

Inicializar configuracion (ojo, esto lo hacemos en un folder que crearemos dentro de src, lo llamaremos DAO)
```
cd src/DAO
```

```
npx sequelize init
```

# Creacion de base de datos 
Para crear una base de datos (una vez hallamos configurado en config.json y seguimos en DAO) ponemos:
```
npx sequelize db:create
```
# Creacion de modelos
Aqui definimos la estructura, en este caso, de Usuarios
```
npx sequelize model:generate --name Usuario --attributes nombre:string,username:string,password:string
```
Listo, se habra creado un usuario.js en models

# Ejecucion de migraciones
Ya que seguimos en la carpeta DAO, ejecutaremos lo siguiente
```
npx sequelize db:migrate
```
Ahora, revisa las tablas de la aplicacion pgAdmin 4, estara implementado la migracion

Si queremos crear una migracion, se realiza asi, en este caso de estado de usuarios
```
npx sequelize migration:generate --name estado_en_usuarios
```
La configuramos luego de su creacion obviamente

Ejecutaremos la migracion y se actualizara y agregara en el pgAdmin 4
```
npx sequelize db:migrate
```

# Creacion de seeders
Iniciamos con el siguiente codigo (en este caso, para gastos será y no olvidar estar ubicado en la carpeta DAO)
```
npx sequelize seed:generate --name data_gastos
```

Agregamos el seeder una vez lo hallamos configurado
```
npx sequelize db:seed:all 
```
Listo, eso es todo para tener un seeder

# Quieres rehacer una base de datos?
Pues borra la que tienes, y ahora que tienes seeders, controladores y migraciones sera facil reconstruirla
Empezando por poner para crear la base de datos (Aun estamos en DAO por si te lo preguntas)
```
npx sequelize db:create 
```
Aplicamos ahora las migraciones para crear las tablas
```
npx sequelize db:migrate 
```
y ahora aplicamos los seeders para rellenarlas
```
npx sequelize db:seed:all 
```

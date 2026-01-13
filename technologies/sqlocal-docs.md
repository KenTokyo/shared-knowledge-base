SQLocal
Local-First Database
Run SQLite3 in the browser, backed by the origin private file system.
🔎
Any Query
Locally executes any query that SQLite3 supports

🧵
Threaded
Runs the SQLite engine in a web worker so queries do not block the main thread

📂
Persisted
Persists data to the origin private file system, which is optimized for fast file I/O

🚀
Simple API
Just name your database and start running SQL queries

⚡️
Reactive
Subscribe to query results and receive changes, even across tabs

🔒
Per-User
Each user can have their own private database instance

🛠️
TypeScript
Works with Kysely and Drizzle ORM for making type-safe queries

🤝
Integrations
Get set up quickly with hooks for UI frameworks and a Vite plugin

Introduction
SQLocal makes it easy to run SQLite3 in the browser, backed by the origin private file system which provides high-performance read/write access to a SQLite database file stored on the user's device.

SQLocal acts as a lightweight wrapper of the WebAssembly build of SQLite3 and gives you a simple interface to interact with databases running locally. It can also act as a database driver for Kysely or Drizzle ORM to make fully-typed queries.

Having the ability to store and query relational data on device makes it possible to build powerful, local-first web apps and games no matter the complexity of your data model.

Examples

import { SQLocal } from 'sqlocal';

// Create a client with a name for the SQLite file to save in
// the origin private file system
const { sql } = new SQLocal('database.sqlite3');

// Use the "sql" tagged template to execute a SQL statement
// against the SQLite database
await sql`CREATE TABLE groceries (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)`;

// Execute a parameterized statement just by inserting
// parameters in the SQL string
const items = ['bread', 'milk', 'rice'];
for (let item of items) {
	await sql`INSERT INTO groceries (name) VALUES (${item})`;
}

// SELECT queries and queries with the RETURNING clause will
// return the matched records as an array of objects
const data = await sql`SELECT * FROM groceries`;
console.log(data);
Log:


[
	{ id: 1, name: 'bread' },
	{ id: 2, name: 'milk' },
	{ id: 3, name: 'rice' },
];
Kysely

import { SQLocalKysely } from 'sqlocal/kysely';
import { Kysely, Generated } from 'kysely';

// Initialize SQLocalKysely and pass the dialect to Kysely
const { dialect } = new SQLocalKysely('database.sqlite3');
const db = new Kysely<DB>({ dialect });

// Define your schema
// (passed to the Kysely generic above)
type DB = {
	groceries: {
		id: Generated<number>;
		name: string;
	};
};

// Make type-safe queries
const data = await db
	.selectFrom('groceries')
	.select('name')
	.orderBy('name', 'asc')
	.execute();
console.log(data);
See the Kysely documentation for getting started.

Drizzle

import { SQLocalDrizzle } from 'sqlocal/drizzle';
import { drizzle } from 'drizzle-orm/sqlite-proxy';
import { sqliteTable, int, text } from 'drizzle-orm/sqlite-core';

// Initialize SQLocalDrizzle and pass the driver to Drizzle
const { driver } = new SQLocalDrizzle('database.sqlite3');
const db = drizzle(driver);

// Define your schema
const groceries = sqliteTable('groceries', {
	id: int('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
});

// Make type-safe queries
const data = await db
	.select({ name: groceries.name })
	.from(groceries)
	.orderBy(groceries.name)
	.all();
console.log(data);
See the Drizzle ORM documentation for declaring your schema and making queries.

Drizzle ORM Setup
SQLocal provides a driver for Drizzle ORM so that you can use it to make fully typed queries against databases in your TypeScript codebase.

Install
Install the Drizzle ORM package alongside SQLocal in your application using your package manager.


npm

yarn

pnpm

npm install sqlocal drizzle-orm
Initialize
SQLocal provides the Drizzle ORM driver from a child class of SQLocal called SQLocalDrizzle imported from sqlocal/drizzle. This class has all the same methods as SQLocal but adds driver and batchDriver which you pass to the drizzle instance.


import { SQLocalDrizzle } from 'sqlocal/drizzle';
import { drizzle } from 'drizzle-orm/sqlite-proxy';

const { driver, batchDriver } = new SQLocalDrizzle('database.sqlite3');
export const db = drizzle(driver, batchDriver);
Now, any queries you run through this Drizzle instance will be executed against the database passed to SQLocalDrizzle.

Define Schema
Define your schema using the functions that Drizzle ORM provides. You will need to import the table definitions where you will be making queries. See the Drizzle documentation.


import { sqliteTable, int, text } from 'drizzle-orm/sqlite-core';

export const groceries = sqliteTable('groceries', {
	id: int('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
});
Make Queries
Import your Drizzle instance to start making type-safe queries.


const data = await db
	.select({ name: groceries.name, quantity: groceries.quantity })
	.from(groceries)
	.orderBy(groceries.name)
	.all();
console.log(data);
See the Drizzle documentation for more examples.

Transactions
Drizzle's transaction method cannot isolate transactions from outside queries. It is recommended to use the transaction method of SQLocalDrizzle instead. See the transaction documentation.








Setup
Prepare the SQLocal client and connect to a database.

Install
Install the SQLocal package in your application using your package manager.


npm

yarn

pnpm

npm install sqlocal
Cross-Origin Isolation
In order to persist data to the origin private file system, this package relies on APIs that require cross-origin isolation, so the page you use this package on must be served with the following HTTP headers. Otherwise, the browser will block access to the origin private file system.


Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
How this is configured will depend on what web server or hosting service your application uses. If your development server uses Vite, see the configuration below.

Initialize
Import the SQLocal class to initialize your client for interacting with a local SQLite database.


import { SQLocal } from 'sqlocal';

export const db = new SQLocal('database.sqlite3');
Pass the file name for your SQLite database file to the SQLocal constructor, and the client will connect to that database file. If your file does not already exist in the origin private file system, it will be created automatically.

The file extension that you use does not matter for functionality. It is conventional to use .sqlite3 or .db, but feel free to use whatever extension you need to (e.g., you are using SQLite as an application file format).

You will probably also want to export the client so that you can use it throughout your application.

If your application needs to query multiple databases, you can initialize another instance of SQLocal for each database.

With the client initialized, you are ready to start making queries.

NOTE

If you are using the Kysely Query Builder or Drizzle ORM for type-safe queries, you will initialize the client with a child class of SQLocal. See the corresponding setup page. Usage is the same otherwise.

Options
The SQLocal constructor can also be passed an object to accept additional options.


export const db = new SQLocal({
	databasePath: 'database.sqlite3',
	readOnly: true,
	verbose: true,
	reactive: true,
	onInit: (sql) => {},
	onConnect: (reason) => {},
});
databasePath (string) - The file name for the database file. This is the only required option.
readOnly (boolean) - If true, connect to the database in read-only mode. Attempts to run queries that would mutate the database will throw an error.
verbose (boolean) - If true, any SQL executed on the database will be logged to the console.
reactive (boolean) - If true, listening for database table changes is enabled, allowing the client to work with the reactiveQuery method.
onInit (function) - A callback that will be run once when the client has initialized but before it has connected to the database. This callback should return an array of SQL statements (using the passed sql tagged template function, similar to the batch method) that should be executed before any other statements on the database connection. The onInit callback will be called only once, but the statements will be executed every time the client creates a new database connection. This makes it the best way to set up any PRAGMA settings, temporary tables, views, or triggers for the connection.
onConnect (function) - A callback that will be run after the client has connected to the database. This will happen at initialization and any time overwriteDatabaseFile or deleteDatabaseFile is called on any SQLocal client connected to the same database. The callback is passed a string ('initial' | 'overwrite' | 'delete') that indicates why the callback was executed. This callback is useful for syncing your application's state with data from the newly-connected database.
processor (SQLocalProcessor | Worker) - Allows you to override how this instance communicates with the SQLite database. This is for advanced use-cases, such as for using custom compilations or forks of SQLite or for cases where you need to initialize the web worker yourself rather than have SQLocal do it.

Read https://sqlocal.dev/api for queries
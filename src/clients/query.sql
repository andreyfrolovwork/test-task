CREATE TABLE IF NOT EXISTS "users5" ("id"  SERIAL UNIQUE , "email" VARCHAR(255) NOT NULL UNIQUE, "password" VARCHAR(255) DEFAULT false, "banReason" BOOLEAN, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'users5' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname; 
Executing (default): CREATE TABLE IF NOT EXISTS "testAdress008" ("id"  SERIAL UNIQUE , "name" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'testAdress008' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): 
CREATE TABLE IF NOT EXISTS "client008" (
    "id"  SERIAL UNIQUE , 
    "name" VARCHAR(255), 
    "surname" VARCHAR(255), 
    "patronymic" VARCHAR(255), 
    "dob" DATE, "curWorkExp" VARCHAR(255) DEFAULT 0, 
    "typeEducation" VARCHAR(255) NOT NULL DEFAULT 'secondary', 
    "monIncome" VARCHAR(255) DEFAULT 0, 
    "monExpenses" VARCHAR(255) DEFAULT 0, 
    "spouse" INTEGER, 
    "livingAddressId" INTEGER REFERENCES "testAdress008" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, 
    "regAddressId" INTEGER, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id")
    );
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'client008' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "passport008" ("id"  SERIAL UNIQUE , "series" VARCHAR(255), "number" VARCHAR(255), "giver" VARCHAR(255), "dateIssued" DATE, "clientId" INTEGER REFERENCES "client008" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT 
NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'passport008' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "child008" ("id"  SERIAL UNIQUE , "name" VARCHAR(255), "surname" VARCHAR(255), "patronymic" VARCHAR(255), "dob" DATE, "clientId" INTEGER REFERENCES "client008" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
"destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'child008' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "job008" ("id"  SERIAL UNIQUE , "name" VARCHAR(255), "clientId" INTEGER REFERENCES "client008" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));     
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'job008' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname; 


CREATE TABLE IF NOT EXISTS "users5" ("id"  SERIAL UNIQUE , "email" VARCHAR(255) NOT NULL UNIQUE, "password" VARCHAR(255) DEFAULT false, "banReason" BOOLEAN, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'users5' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname; 
Executing (default): 
CREATE TABLE IF NOT EXISTS "testAdress008" 
    (
    "id"  SERIAL UNIQUE , 
    "name" VARCHAR(255), 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id")
    );


Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'testAdress008' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): 
CREATE TABLE IF NOT EXISTS "client008" (
    "id"  SERIAL UNIQUE , 
    "name" VARCHAR(255), 
    "surname" VARCHAR(255), 
    "patronymic" VARCHAR(255), 
    "dob" DATE, 
    "curWorkExp" VARCHAR(255) DEFAULT 0, 
    "typeEducation" VARCHAR(255) NOT NULL DEFAULT 'secondary', 
    "monIncome" VARCHAR(255) DEFAULT 0, 
    "monExpenses" VARCHAR(255) DEFAULT 0, 
    "spouse" INTEGER, 
    "livingAddressId" INTEGER REFERENCES "testAdress008" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, 
    "regAddressId" INTEGER, "createdAt" TIMESTAMP WITH TIME ZONE NOT 
NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'client008' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "passport008" ("id"  SERIAL UNIQUE , "series" VARCHAR(255), "number" VARCHAR(255), "giver" VARCHAR(255), "dateIssued" DATE, "clientId" INTEGER REFERENCES "client008" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT 
NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'passport008' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "child008" ("id"  SERIAL UNIQUE , "name" VARCHAR(255), "surname" VARCHAR(255), "patronymic" VARCHAR(255), "dob" DATE, "clientId" INTEGER REFERENCES "client008" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
"destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'child008' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "job008" ("id"  SERIAL UNIQUE , "name" VARCHAR(255), "clientId" INTEGER REFERENCES "client008" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));     
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'job008' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname; 

CREATE TABLE IF NOT EXISTS "client011" (
    "id"  SERIAL UNIQUE , "name" VARCHAR(255), 
    "livingAddressId" INTEGER REFERENCES "testAdress011" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, 
"regAddressId" INTEGER, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));


Executing (default): CREATE TABLE IF NOT EXISTS "users5" ("id"  SERIAL UNIQUE , "email" VARCHAR(255) NOT NULL UNIQUE, "password" VARCHAR(255) DEFAULT false, "banReason" BOOLEAN, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'users5' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "testAdress1" ("id"  SERIAL UNIQUE , "name" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'testAdress1' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): 
CREATE TABLE IF NOT EXISTS "client1" ("id"  SERIAL UNIQUE , "name" VARCHAR(255), "livingAddressId" INTEGER REFERENCES "testAdress1" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, "regAddressId" INTEGER, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'client1' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "passport1" ("id"  SERIAL UNIQUE , "series" VARCHAR(255), "number" VARCHAR(255), "giver" VARCHAR(255), "dateIssued" DATE, "clientId" INTEGER REFERENCES "client1" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'passport1' 
GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "child1" ("id"  SERIAL UNIQUE , "name" VARCHAR(255), "surname" VARCHAR(255), "patronymic" VARCHAR(255), "dob" DATE, "clientId" INTEGER, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'child1' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "job1" ("id"  SERIAL UNIQUE , "name" VARCHAR(255), "clientId" INTEGER, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'job1' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;



Executing (default): SELECT 1+1 AS result
Executing (default): CREATE TABLE IF NOT EXISTS "users5" ("id"  SERIAL UNIQUE , "email" VARCHAR(255) NOT NULL UNIQUE, "password" VARCHAR(255) DEFAULT false, "banReason" BOOLEAN, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'users5' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "testAdress2" ("id"  SERIAL UNIQUE , "name" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'testAdress2' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): 
CREATE TABLE IF NOT EXISTS "client2" (
    "id"  SERIAL UNIQUE , 
    "name" VARCHAR(255), 
    "regAddressId" INTEGER REFERENCES "testAdress2" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, 
    "livingAddressId" INTEGER, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id")
    );
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'client2' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "passport2" ("id"  SERIAL UNIQUE , "series" VARCHAR(255), "number" VARCHAR(255), "giver" VARCHAR(255), "dateIssued" DATE, "clientId" INTEGER REFERENCES "client2" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'passport2' 
GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "child2" ("id"  SERIAL UNIQUE , "name" VARCHAR(255), "surname" VARCHAR(255), "patronymic" VARCHAR(255), "dob" DATE, "clientId" INTEGER, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'child2' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "job2" ("id"  SERIAL UNIQUE , "name" VARCHAR(255), "clientId" INTEGER, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'job2' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;


Executing (default): SELECT 1+1 AS result
Executing (default): CREATE TABLE IF NOT EXISTS "users5" ("id"  SERIAL UNIQUE , "email" VARCHAR(255) NOT NULL UNIQUE, "password" VARCHAR(255) DEFAULT false, "banReason" BOOLEAN, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'users5' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "testAdress4" ("id"  SERIAL UNIQUE , "name" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'testAdress4' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): 
CREATE TABLE IF NOT EXISTS "client4" (
    "id"  SERIAL UNIQUE , "name" VARCHAR(255), 
    "regAddressId" INTEGER REFERENCES "testAdress4" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, 
    "livingAddressId" INTEGER, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id")
    );

Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'client4' 
GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): 
CREATE TABLE IF NOT EXISTS "passport4" (
    "id"  SERIAL UNIQUE , 
    "series" VARCHAR(255), 
    "number" VARCHAR(255), 
    "giver" VARCHAR(255), 
    "dateIssued" DATE, 
    "clientId" INTEGER REFERENCES "client4" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "destroyTime" TIMESTAMP WITH TIME ZONE, 
    PRIMARY KEY ("id")
    );
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'passport4' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "child4" ("id"  SERIAL UNIQUE , "name" VARCHAR(255), "surname" VARCHAR(255), "patronymic" VARCHAR(255), "dob" DATE, "clientId" INTEGER, "createdAt" TIMESTAMP WITH 
TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'child4' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "job4" ("id"  SERIAL UNIQUE , "name" VARCHAR(255), "clientId" INTEGER, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "destroyTime" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'job4' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
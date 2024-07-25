BEGIN;


    CREATE TABLE "Utilisateurs" (
        id SERIAL PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        prenom VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        telephone VARCHAR(255),
        NbrOfAttemps INTEGER,
        isBLocked BOOLEAN,*
        Token TEXT
    );

ALTER TABLE "Utilisateurs" ADD COLUMN "BlockTime" TIMESTAMP;

ALTER TABLE "FicheChantier" ADD COLUMN "imageUrl" TEXT;
ALTER TABLE "FicheChantier" ADD COLUMN "audioUrl" TEXT;



ALTER TABLE "Item" DROP COLUMN IF EXISTS "Id";
ALTER TABLE "Item" ADD COLUMN "Id" SERIAL PRIMARY KEY;

ALTER TABLE "Customer" ADD COLUMN "Lat" DOUBLE PRECISION;
ALTER TABLE "Customer" ADD COLUMN "Lon" DOUBLE PRECISION;

COMMIT;
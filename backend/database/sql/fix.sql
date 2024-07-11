BEGIN;

ALTER TABLE "FicheChantier" ADD COLUMN "imageUrl" TEXT;
ALTER TABLE "FicheChantier" ADD COLUMN "audioUrl" TEXT;

COMMIT;

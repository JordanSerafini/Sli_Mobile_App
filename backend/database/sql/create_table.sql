BEGIN;


CREATE TABLE "Staff" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    grade TEXT,
    role VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255) UNIQUE
);

CREATE TABLE "Calendars" (
    id SERIAL PRIMARY KEY,
    calendar_id VARCHAR(255) UNIQUE NOT NULL,
    access_level VARCHAR(50),
    allowed_attendee_types TEXT[],
    allowed_availabilities TEXT[], 
    allowed_reminders TEXT[],
    allows_modifications BOOLEAN,
    color VARCHAR(7),
    is_primary BOOLEAN,
    is_synced BOOLEAN,
    is_visible BOOLEAN,
    name VARCHAR(255),
    owner_account VARCHAR(255),
    source_is_local_account BOOLEAN,
    source_name VARCHAR(255),
    source_type VARCHAR(50),
    time_zone VARCHAR(50),
    title VARCHAR(255)
);

CREATE TABLE "Chantier" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    address VARCHAR(255),
    city VARCHAR(255),
    postal_code VARCHAR(255),
    country VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    contact VARCHAR(255),
    start_date DATE,
    end_date DATE,
    client_id INTEGER REFERENCES "Customer"(id),
    calendar_id INTEGER REFERENCES "Calendars"(id)
);

CREATE TABLE "FicheChantier" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    project_supervision TEXT,
    project_manager_id INTEGER REFERENCES "Staff"(id),
    chantier_id INTEGER REFERENCES "Chantier"(id)
);

CREATE TABLE "Chantier_Staff" (
    id SERIAL PRIMARY KEY,
    FicheChantier_id INTEGER REFERENCES "FicheChantier"(id),
    staff_id INTEGER REFERENCES "Staff"(id),
    grade TEXT DEFAULT 'Ouvrier'
);

CREATE TABLE "Chantier_Item" (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    item_id INTEGER REFERENCES "Item"(id),
    fiche_chantier_id INTEGER REFERENCES "FicheChantier"(id)
);

COMMIT;

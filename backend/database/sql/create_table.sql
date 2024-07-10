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


COMMIT;



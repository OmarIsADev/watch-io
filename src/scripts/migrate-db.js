const { createClient } = require("@libsql/client");
const fs = require("node:fs");
const path = require("node:path");

const db = createClient({
  url: "file:./dev.db",
});

const migrationsPath = path.join(__dirname, "..", "migrations");

async function runMigrations() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const result = await db.execute("SELECT name FROM migrations");
    const appliedMigrations = new Set(result.rows.map((row) => row.name));

    const files = fs
      .readdirSync(migrationsPath)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    const newMigrations = files.filter((file) => !appliedMigrations.has(file));

    if (newMigrations.length === 0) {
      console.log("No new migrations to apply.");
      return;
    }

    for (const file of newMigrations) {
      const sql = fs.readFileSync(path.join(migrationsPath, file), "utf8");

      console.log(`Applying migration: ${file}`);

      try {
        // Use db.batch() directly as it is already a transaction
        await db.batch(
          sql
            .split(";")
            .filter(Boolean)
            .map((s) => ({ sql: s.trim() })),
        );

        await db.execute({
          sql: `INSERT INTO migrations (name) VALUES (?)`,
          args: [file],
        });

        console.log(`Successfully applied and logged migration: ${file}`);
      } catch (error) {
        console.error(`Error applying migration ${file}:`, error);
        // No need for rollback since db.batch() is transactional
        break;
      }
    }
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

runMigrations();

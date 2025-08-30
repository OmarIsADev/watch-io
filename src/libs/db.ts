import { createClient } from "@libsql/client";

const db = createClient({
    url: "file:./dev.db"
})

export default db
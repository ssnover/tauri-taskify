use rusqlite::Connection;
use std::path::Path;

use crate::models::Todo;

pub struct DbConn {
    conn: Connection,
}

impl DbConn {
    pub fn new(db_path: impl AsRef<Path>) -> rusqlite::Result<Self> {
        let conn = Connection::open(db_path)?;
        let schema_version = get_schema_version(&conn)?;
        let conn = Self { conn };

        if schema_version == 0 {
            conn.initialize_database()?;
        }

        Ok(conn)
    }

    fn initialize_database(&self) -> rusqlite::Result<()> {
        self.conn.execute(
            "CREATE TABLE todo_items (
                     id INTEGER PRIMARY KEY,
                     todo TEXT NOT NULL,
                     is_done INTEGER NOT NULL
                )",
            (),
        )?;

        set_schema_version(&self.conn, 1)
    }

    pub fn get_todos(&self) -> rusqlite::Result<Vec<Todo>> {
        let mut stmt = self
            .conn
            .prepare("SELECT id, todo, is_done FROM todo_items")?;
        let rows_iter = stmt.query_map([], |row| {
            let todo_name: String = row.get(1)?;
            Ok(Todo {
                id: row.get(0)?,
                todo: todo_name,
                is_done: row.get::<_, i32>(2)? != 0,
            })
        })?;
        rows_iter.collect::<rusqlite::Result<Vec<_>>>()
    }

    pub fn add_todo(&self, todo_text: &str) -> rusqlite::Result<Todo> {
        self.conn.execute(
            "INSERT INTO todo_items (todo, is_done) VALUES (?, ?)",
            (todo_text, 0),
        )?;
        let id = self.conn.last_insert_rowid();
        Ok(Todo {
            id: id.try_into().unwrap(),
            todo: todo_text.to_owned(),
            is_done: false,
        })
    }

    pub fn update_todo_state(&self, todo_id: i32, todo_state: bool) -> rusqlite::Result<()> {
        self.conn.execute(
            "UPDATE todo_items SET is_done = ? WHERE id = ?",
            (if todo_state { 1 } else { 0 }, todo_id),
        )?;
        Ok(())
    }

    pub fn delete_todo(&self, todo_id: i32) -> rusqlite::Result<()> {
        self.conn
            .execute("DELETE FROM todo_items WHERE id = ?", (todo_id,))?;
        Ok(())
    }

    pub fn update_todo_text(&self, todo_id: i32, todo_text: String) -> rusqlite::Result<()> {
        self.conn.execute(
            "UPDATE todo_items SET todo = ? WHERE id = ?",
            (todo_text, todo_id),
        )?;
        Ok(())
    }
}

fn get_schema_version(conn: &Connection) -> rusqlite::Result<i32> {
    conn.pragma_query_value(None, "user_version", |row| row.get::<_, i32>(0))
}

fn set_schema_version(conn: &Connection, schema_version: i32) -> rusqlite::Result<()> {
    conn.pragma_update(None, "user_version", schema_version)
}

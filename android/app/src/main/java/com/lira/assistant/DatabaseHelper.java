package com.lira.assistant;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import java.util.ArrayList;
import java.util.List;

public class DatabaseHelper extends SQLiteOpenHelper {
    private static final String DATABASE_NAME = "lira_assistant.db";
    private static final int DATABASE_VERSION = 1;

    public DatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("CREATE TABLE chat (id TEXT PRIMARY KEY, message TEXT, is_user INTEGER, time TEXT)");
        db.execSQL("CREATE TABLE habits (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, target TEXT, streak INTEGER, is_completed INTEGER)");
        db.execSQL("CREATE TABLE transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, category TEXT, amount REAL, is_income INTEGER, date TEXT)");
        
        // Initial welcome chat messages
        db.execSQL("INSERT INTO chat VALUES ('1', '⚡ L.I.R.A. Нативный Android Движок активен. Все функции работают локально!', 0, '12:00')");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS chat");
        db.execSQL("DROP TABLE IF EXISTS habits");
        db.execSQL("DROP TABLE IF EXISTS transactions");
        onCreate(db);
    }

    // Chat CRUD
    public List<ChatMessage> getChatMessages() {
        List<ChatMessage> list = new ArrayList<>();
        SQLiteDatabase db = getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM chat ORDER BY rowid ASC", null);
        if (cursor.moveToFirst()) {
            do {
                list.add(new ChatMessage(
                        cursor.getString(0),
                        cursor.getString(1),
                        cursor.getInt(2) == 1,
                        cursor.getString(3)
                ));
            } while (cursor.moveToNext());
        }
        cursor.close();
        return list;
    }

    public void addChatMessage(ChatMessage msg) {
        SQLiteDatabase db = getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put("id", msg.getId());
        cv.put("message", msg.getText());
        cv.put("is_user", msg.isUser() ? 1 : 0);
        cv.put("time", msg.getTime());
        db.insert("chat", null, cv);
    }

    // Habits CRUD
    public List<HabitItem> getHabits() {
        List<HabitItem> list = new ArrayList<>();
        SQLiteDatabase db = getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM habits", null);
        if (cursor.moveToFirst()) {
            do {
                list.add(new HabitItem(
                        cursor.getInt(0),
                        cursor.getString(1),
                        cursor.getString(2),
                        cursor.getInt(3),
                        cursor.getInt(4) == 1
                ));
            } while (cursor.moveToNext());
        }
        cursor.close();
        return list;
    }

    public void addHabit(String title, String target) {
        SQLiteDatabase db = getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put("title", title);
        cv.put("target", target);
        cv.put("streak", 0);
        cv.put("is_completed", 0);
        db.insert("habits", null, cv);
    }

    public void updateHabitCompletion(int id, boolean isCompleted) {
        SQLiteDatabase db = getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put("is_completed", isCompleted ? 1 : 0);
        db.update("habits", cv, "id=?", new String[]{String.valueOf(id)});
    }

    // Transactions CRUD
    public List<TransactionItem> getTransactions() {
        List<TransactionItem> list = new ArrayList<>();
        SQLiteDatabase db = getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM transactions ORDER BY id DESC", null);
        if (cursor.moveToFirst()) {
            do {
                list.add(new TransactionItem(
                        cursor.getInt(0),
                        cursor.getString(1),
                        cursor.getString(2),
                        cursor.getDouble(3),
                        cursor.getInt(4) == 1,
                        cursor.getString(5)
                ));
            } while (cursor.moveToNext());
        }
        cursor.close();
        return list;
    }

    public void addTransaction(String title, String category, double amount, boolean isIncome, String date) {
        SQLiteDatabase db = getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put("title", title);
        cv.put("category", category);
        cv.put("amount", amount);
        cv.put("is_income", isIncome ? 1 : 0);
        cv.put("date", date);
        db.insert("transactions", null, cv);
    }
}

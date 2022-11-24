/*
  Warnings:

  - Added the required column `description` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Member" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Member" ("id", "name") SELECT "id", "name" FROM "Member";
DROP TABLE "Member";
ALTER TABLE "new_Member" RENAME TO "Member";
CREATE TABLE "new_Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL
);
INSERT INTO "new_Tag" ("id", "name") SELECT "id", "name" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

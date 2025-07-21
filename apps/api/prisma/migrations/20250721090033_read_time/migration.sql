/*
  Warnings:

  - Added the required column `cover_url` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "cover_url" TEXT NOT NULL,
ADD COLUMN     "read_time" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar_url" TEXT NOT NULL DEFAULT 'https://pzayzfkambqnvlzxqlbb.supabase.co/storage/v1/object/public/files-container//anonymous.png';

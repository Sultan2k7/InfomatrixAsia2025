/*
  Warnings:

  - You are about to drop the column `error_time` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `licensePlate` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `maintenance` on the `Vehicle` table. All the data in the column will be lost.
  - The `malfunctions` column on the `Vehicle` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "error_time",
DROP COLUMN "licensePlate",
DROP COLUMN "maintenance",
ADD COLUMN     "arrivalTime" TEXT,
ADD COLUMN     "bearing" DOUBLE PRECISION,
ADD COLUMN     "engineLoad" INTEGER,
ADD COLUMN     "routeIndex" INTEGER,
ADD COLUMN     "weather" JSONB,
DROP COLUMN "malfunctions",
ADD COLUMN     "malfunctions" INTEGER;

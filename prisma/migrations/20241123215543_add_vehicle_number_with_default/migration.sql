-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MANAGER', 'DRIVER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "media" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "driverId" TEXT,
    "vehicleNumber" TEXT DEFAULT 'UNKNOWN',
    "licensePlate" TEXT,
    "currentMission" TEXT,
    "location" TEXT,
    "speed" INTEGER DEFAULT 0,
    "maintenance" JSONB,
    "malfunctions" JSONB,
    "error_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicleType" TEXT,
    "status" TEXT DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "DateoOfBirth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "driver_id" INTEGER NOT NULL,
    "job_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "media" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Obd" (
    "id" SERIAL NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "engineRpm" DOUBLE PRECISION NOT NULL,
    "vehicleSpeed" DOUBLE PRECISION NOT NULL,
    "throttlePosition" DOUBLE PRECISION NOT NULL,
    "fuelLevel" DOUBLE PRECISION NOT NULL,
    "shortTrim1" DOUBLE PRECISION,
    "longTrim1" DOUBLE PRECISION,
    "shortTrim2" DOUBLE PRECISION,
    "longTrim2" DOUBLE PRECISION,
    "engineLoad" DOUBLE PRECISION NOT NULL,
    "intakeAirTemperature" DOUBLE PRECISION NOT NULL,
    "massAirFlow" DOUBLE PRECISION NOT NULL,
    "fuelPressure" DOUBLE PRECISION NOT NULL,
    "fuelConsumptionRate" DOUBLE PRECISION NOT NULL,
    "engineCoolantTemperature" DOUBLE PRECISION NOT NULL,
    "oxygenSensorReading" DOUBLE PRECISION NOT NULL,
    "catalystTemperature" DOUBLE PRECISION NOT NULL,
    "evapEmissionControlPressure" DOUBLE PRECISION NOT NULL,
    "diagnosticTroubleCode" TEXT NOT NULL,
    "batteryVoltage" DOUBLE PRECISION NOT NULL,
    "oilTemperature" DOUBLE PRECISION NOT NULL,
    "distanceTraveled" DOUBLE PRECISION NOT NULL,
    "time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Obd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gps" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "altitude" DOUBLE PRECISION,
    "speed" DOUBLE PRECISION,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Routes" (
    "id" SERIAL NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    "startingLocation" JSONB NOT NULL,
    "endingLocation" JSONB NOT NULL,
    "startingTime" TIMESTAMP(3) NOT NULL,
    "endingTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Obd_fuel" (
    "id" SERIAL NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "engineRpm" INTEGER NOT NULL,
    "fuelLevel" INTEGER NOT NULL,
    "engineLoad" INTEGER NOT NULL,
    "massAirFlow" DOUBLE PRECISION NOT NULL,
    "fuelPressure" INTEGER NOT NULL,
    "fuelConsumptionRate" DOUBLE PRECISION NOT NULL,
    "diagnosticTroubleCode" TEXT NOT NULL,
    "absStatus" BOOLEAN NOT NULL,
    "tirePressure" INTEGER NOT NULL,
    "distanceTraveled" DOUBLE PRECISION NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Obd_fuel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Obd_check" (
    "id" SERIAL NOT NULL,
    "all" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Obd_check_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "obd_checktest" (
    "id" SERIAL NOT NULL,
    "all" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "obd_checktest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

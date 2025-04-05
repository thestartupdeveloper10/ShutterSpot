-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'deposit_paid', 'fully_paid', 'refunded', 'failed');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Status" ADD VALUE 'completed';
ALTER TYPE "Status" ADD VALUE 'no_show';
ALTER TYPE "Status" ADD VALUE 'expired';
ALTER TYPE "Status" ADD VALUE 'refunded';

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "cancellationReason" TEXT,
ADD COLUMN     "depositAmount" DOUBLE PRECISION,
ADD COLUMN     "depositPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastRescheduleDate" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'pending',
ADD COLUMN     "rescheduleCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "BookingHistory" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "reason" TEXT,
    "changedBy" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookingHistory" ADD CONSTRAINT "BookingHistory_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

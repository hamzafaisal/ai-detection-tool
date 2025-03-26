-- CreateTable
CREATE TABLE "DetectedText" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "score" DOUBLE PRECISION,
    "isAI" BOOLEAN,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DetectedText_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DetectedText" ADD CONSTRAINT "DetectedText_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

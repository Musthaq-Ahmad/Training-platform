-- CreateTable
CREATE TABLE "trainee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "trainee_pkey" PRIMARY KEY ("id")
);

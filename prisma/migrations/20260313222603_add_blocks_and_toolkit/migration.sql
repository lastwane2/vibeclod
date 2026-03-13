-- CreateTable
CREATE TABLE "BlockCompletion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "levelId" INTEGER NOT NULL,
    "blockId" TEXT NOT NULL,
    "score" INTEGER,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlockCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromptToolkitEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "patternId" TEXT NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromptToolkitEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BlockCompletion_userId_levelId_idx" ON "BlockCompletion"("userId", "levelId");

-- CreateIndex
CREATE UNIQUE INDEX "BlockCompletion_userId_blockId_key" ON "BlockCompletion"("userId", "blockId");

-- CreateIndex
CREATE UNIQUE INDEX "PromptToolkitEntry_userId_patternId_key" ON "PromptToolkitEntry"("userId", "patternId");

-- AddForeignKey
ALTER TABLE "BlockCompletion" ADD CONSTRAINT "BlockCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromptToolkitEntry" ADD CONSTRAINT "PromptToolkitEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

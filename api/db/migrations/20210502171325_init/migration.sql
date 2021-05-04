-- CreateEnum
CREATE TYPE "IdentityType" AS ENUM ('DEVTO_IDENTITY', 'DISCORD_IDENTITY', 'DISCOURSE_IDENTITY', 'EMAIL_IDENTITY', 'GITHUB_IDENTITY', 'LINKEDIN_IDENTITY', 'SLACK_IDENTITY', 'TWITTER_IDENTITY', 'UNKNOWN_IDENTITY');

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orbitSyncAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orbitUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orbitId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orbitSyncAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orbitUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orbitId" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "activitiesCount" INTEGER NOT NULL DEFAULT 0,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "birthday" TEXT,
    "company" TEXT,
    "firstActivityOccurredAt" TIMESTAMP(3),
    "lastActivityOccurredAt" TIMESTAMP(3),
    "mergedAt" TIMESTAMP(3),
    "location" TEXT,
    "name" TEXT,
    "orbitLevel" INTEGER NOT NULL DEFAULT 5,
    "pronouns" TEXT,
    "reach" INTEGER DEFAULT 0,
    "shippingAddress" TEXT,
    "slug" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "tagList" TEXT[],
    "tags" TEXT[],
    "teammate" BOOLEAN NOT NULL,
    "tshirt" TEXT,
    "url" TEXT,
    "orbitUrl" TEXT NOT NULL,
    "created" BOOLEAN NOT NULL,
    "love" DOUBLE PRECISION DEFAULT 0,
    "twitter" TEXT,
    "github" TEXT,
    "discourse" TEXT,
    "email" TEXT,
    "devto" TEXT,
    "linkedin" TEXT,
    "githubFollowers" INTEGER DEFAULT 0,
    "twitterFollowers" INTEGER DEFAULT 0,
    "topics" TEXT[],
    "languages" TEXT[],
    "identitiesCount" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Identity" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orbitSyncAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orbitUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "identityType" "IdentityType" NOT NULL,
    "memberId" TEXT,
    "orbitId" INTEGER NOT NULL,
    "email" TEXT,
    "username" TEXT,
    "name" TEXT,
    "source" TEXT NOT NULL,
    "sourceHost" TEXT,
    "uid" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityType" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orbitSyncAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orbitUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orbitId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orbitSyncAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orbitUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orbitId" INTEGER NOT NULL,
    "activityTypeId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3),
    "type" TEXT NOT NULL,
    "orbitUrl" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "gNumber" INTEGER,
    "gHtmlUrl" TEXT,
    "gCreatedAt" TIMESTAMP(3),
    "gId" INTEGER,
    "repositoryId" TEXT,
    "gStarredAt" TIMESTAMP(3),
    "gTitle" TEXT,
    "gMerged" BOOLEAN,
    "gMergedAt" TIMESTAMP(3),
    "gMergedBy" TEXT,
    "gBody" TEXT,
    "isPullRequest" BOOLEAN DEFAULT false,
    "tags" TEXT[],
    "activityLink" TEXT,
    "url" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repository" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orbitSyncAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orbitUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orbitId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MemberToWorkspace" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RepositoryToWorkspace" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Workspace.orbitId_unique" ON "Workspace"("orbitId");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace.name_unique" ON "Workspace"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace.slug_unique" ON "Workspace"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Member.orbitId_unique" ON "Member"("orbitId");

-- CreateIndex
CREATE UNIQUE INDEX "Member.slug_unique" ON "Member"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Identity.orbitId_unique" ON "Identity"("orbitId");

-- CreateIndex
CREATE INDEX "Identity.email_index" ON "Identity"("email");

-- CreateIndex
CREATE INDEX "Identity.source_index" ON "Identity"("source");

-- CreateIndex
CREATE INDEX "Identity.sourceHost_index" ON "Identity"("sourceHost");

-- CreateIndex
CREATE INDEX "Identity.uid_index" ON "Identity"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityType.orbitId_unique" ON "ActivityType"("orbitId");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityType.key_unique" ON "ActivityType"("key");

-- CreateIndex
CREATE INDEX "ActivityType.category_index" ON "ActivityType"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Activity.orbitId_unique" ON "Activity"("orbitId");

-- CreateIndex
CREATE INDEX "Activity.gId_index" ON "Activity"("gId");

-- CreateIndex
CREATE INDEX "Activity.gNumber_index" ON "Activity"("gNumber");

-- CreateIndex
CREATE INDEX "Activity.key_index" ON "Activity"("key");

-- CreateIndex
CREATE INDEX "Activity.memberId_index" ON "Activity"("memberId");

-- CreateIndex
CREATE INDEX "Activity.type_index" ON "Activity"("type");

-- CreateIndex
CREATE INDEX "Activity.action_index" ON "Activity"("action");

-- CreateIndex
CREATE UNIQUE INDEX "Repository.orbitId_unique" ON "Repository"("orbitId");

-- CreateIndex
CREATE UNIQUE INDEX "Repository.name_unique" ON "Repository"("name");

-- CreateIndex
CREATE INDEX "Repository.name_index" ON "Repository"("name");

-- CreateIndex
CREATE INDEX "Repository.owner_index" ON "Repository"("owner");

-- CreateIndex
CREATE UNIQUE INDEX "_MemberToWorkspace_AB_unique" ON "_MemberToWorkspace"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberToWorkspace_B_index" ON "_MemberToWorkspace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RepositoryToWorkspace_AB_unique" ON "_RepositoryToWorkspace"("A", "B");

-- CreateIndex
CREATE INDEX "_RepositoryToWorkspace_B_index" ON "_RepositoryToWorkspace"("B");

-- AddForeignKey
ALTER TABLE "Identity" ADD FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD FOREIGN KEY ("activityTypeId") REFERENCES "ActivityType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToWorkspace" ADD FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToWorkspace" ADD FOREIGN KEY ("B") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RepositoryToWorkspace" ADD FOREIGN KEY ("A") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RepositoryToWorkspace" ADD FOREIGN KEY ("B") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

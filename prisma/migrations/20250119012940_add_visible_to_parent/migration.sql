-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "CourseCatagory" AS ENUM ('Islamic', 'Skill', 'Sport', 'Language');

-- CreateEnum
CREATE TYPE "payPlan" AS ENUM ('term', 'year');

-- CreateEnum
CREATE TYPE "AttendanceState" AS ENUM ('ontime', 'absent', 'late');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('teacher', 'mentor', 'incident', 'other');

-- CreateEnum
CREATE TYPE "ReportSubType" AS ENUM ('behaviour', 'angry');

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "DOB" TIMESTAMP(3) NOT NULL,
    "pic" TEXT,
    "gender" TEXT NOT NULL,
    "internalPhotoAllowed" BOOLEAN,
    "externalPhotoAllowed" BOOLEAN,
    "medicalNotes" TEXT,
    "yearEnteredReception" INTEGER NOT NULL,
    "followUp" BOOLEAN DEFAULT true,
    "followUpNotes" TEXT,
    "followUpAssignee_id" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "name" TEXT,
    "lastName" TEXT,
    "address" TEXT,
    "postcode" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "user_id" TEXT,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "course_name" TEXT NOT NULL,
    "learning_outcomes" TEXT,
    "description" TEXT,
    "more_info" TEXT,
    "image" TEXT,
    "is_new" BOOLEAN,
    "is_closed" BOOLEAN DEFAULT false,
    "minAge" INTEGER DEFAULT 1,
    "maxAge" INTEGER DEFAULT 6,
    "catagory" "CourseCatagory",
    "show" BOOLEAN,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calendar" (
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "private" BOOLEAN
);

-- CreateTable
CREATE TABLE "Attendance" (
    "student_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "class1" "AttendanceState",
    "class2" "AttendanceState",
    "class3" "AttendanceState",
    "class4" "AttendanceState"
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "report" TEXT NOT NULL,
    "type" "ReportType" NOT NULL,
    "course_category" "CourseCatagory",
    "user_id" TEXT NOT NULL,
    "registration_id" INTEGER NOT NULL,
    "visibleToParent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Term" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "House" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "term_id" INTEGER NOT NULL,
    "point" INTEGER NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentor" (
    "id" SERIAL NOT NULL,
    "term_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" SERIAL NOT NULL,
    "parent_email" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "term_id" INTEGER NOT NULL,
    "conditions" BOOLEAN,
    "payRef" TEXT,
    "paid" BOOLEAN DEFAULT false,
    "scholarship_essay" TEXT,
    "scholarship_amount" DECIMAL(3,2),
    "paymentPlan" "payPlan",
    "confirmed" BOOLEAN,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseChoice" (
    "applicatiopn_id" INTEGER NOT NULL,
    "Islamic1" TEXT NOT NULL,
    "Islamic2" TEXT NOT NULL,
    "Islamic3" TEXT NOT NULL,
    "Skill1" TEXT NOT NULL,
    "Skill2" TEXT NOT NULL,
    "Skill3" TEXT NOT NULL,
    "Sport1" TEXT NOT NULL,
    "Sport2" TEXT NOT NULL,
    "Sport3" TEXT NOT NULL,
    "Language1" TEXT NOT NULL,
    "Language2" TEXT NOT NULL,
    "Language3" TEXT NOT NULL,
    "islamic_id" INTEGER,
    "skill_id" INTEGER,
    "language_id" INTEGER,
    "sport_id" INTEGER,

    CONSTRAINT "CourseChoice_pkey" PRIMARY KEY ("applicatiopn_id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "hashedPassword" TEXT,
    "image" TEXT,
    "isStaff" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "EndOfTermReport" (
    "reg_id" INTEGER NOT NULL,
    "message_to_student" TEXT NOT NULL,
    "message_to_parent" TEXT NOT NULL,

    CONSTRAINT "EndOfTermReport_pkey" PRIMARY KEY ("reg_id")
);

-- CreateTable
CREATE TABLE "CareerApplication" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "weeklyAvailability" TEXT NOT NULL,
    "sundayAvailability" TEXT NOT NULL,
    "team" TEXT[],
    "explain" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "age" TEXT,
    "gender" TEXT,
    "ethnicity" TEXT,

    CONSTRAINT "CareerApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ParentToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseToTerm" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_HouseToStudent" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MentorToStudent" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Parent_user_id_key" ON "Parent"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Calendar_title_date_key" ON "Calendar"("title", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_student_id_date_key" ON "Attendance"("student_id", "date");

-- CreateIndex
CREATE INDEX "House_term_id_idx" ON "House"("term_id");

-- CreateIndex
CREATE UNIQUE INDEX "House_name_term_id_key" ON "House"("name", "term_id");

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_user_id_term_id_key" ON "Mentor"("user_id", "term_id");

-- CreateIndex
CREATE UNIQUE INDEX "CourseChoice_applicatiopn_id_key" ON "CourseChoice"("applicatiopn_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ParentToStudent_AB_unique" ON "_ParentToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_ParentToStudent_B_index" ON "_ParentToStudent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToTerm_AB_unique" ON "_CourseToTerm"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToTerm_B_index" ON "_CourseToTerm"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HouseToStudent_AB_unique" ON "_HouseToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_HouseToStudent_B_index" ON "_HouseToStudent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MentorToStudent_AB_unique" ON "_MentorToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_MentorToStudent_B_index" ON "_MentorToStudent"("B");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_followUpAssignee_id_fkey" FOREIGN KEY ("followUpAssignee_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_term_id_fkey" FOREIGN KEY ("term_id") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentor" ADD CONSTRAINT "Mentor_term_id_fkey" FOREIGN KEY ("term_id") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentor" ADD CONSTRAINT "Mentor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_parent_email_fkey" FOREIGN KEY ("parent_email") REFERENCES "Parent"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_term_id_fkey" FOREIGN KEY ("term_id") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseChoice" ADD CONSTRAINT "CourseChoice_applicatiopn_id_fkey" FOREIGN KEY ("applicatiopn_id") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseChoice" ADD CONSTRAINT "CourseChoice_islamic_id_fkey" FOREIGN KEY ("islamic_id") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseChoice" ADD CONSTRAINT "CourseChoice_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseChoice" ADD CONSTRAINT "CourseChoice_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseChoice" ADD CONSTRAINT "CourseChoice_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EndOfTermReport" ADD CONSTRAINT "EndOfTermReport_reg_id_fkey" FOREIGN KEY ("reg_id") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParentToStudent" ADD CONSTRAINT "_ParentToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Parent"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParentToStudent" ADD CONSTRAINT "_ParentToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToTerm" ADD CONSTRAINT "_CourseToTerm_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToTerm" ADD CONSTRAINT "_CourseToTerm_B_fkey" FOREIGN KEY ("B") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HouseToStudent" ADD CONSTRAINT "_HouseToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "House"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HouseToStudent" ADD CONSTRAINT "_HouseToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentorToStudent" ADD CONSTRAINT "_MentorToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Mentor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentorToStudent" ADD CONSTRAINT "_MentorToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

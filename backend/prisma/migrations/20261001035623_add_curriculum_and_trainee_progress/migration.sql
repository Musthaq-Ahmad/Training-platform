-- CreateEnum
CREATE TYPE "task_runtime" AS ENUM ('browser', 'node', 'sql');

-- CreateEnum
CREATE TYPE "task_status" AS ENUM ('not_started', 'in_progress', 'completed');

-- CreateEnum
CREATE TYPE "flag_event_type" AS ENUM ('FULLSCREEN_EXIT', 'TAB_SWITCH', 'PASTE_BLOCKED');

-- CreateEnum
CREATE TYPE "review_priority" AS ENUM ('LOW', 'NORMAL', 'HIGH');

-- CreateTable
CREATE TABLE "course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curriculum_day" (
    "id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "day_number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "lesson_summary" TEXT NOT NULL,
    "journal_prompt" TEXT NOT NULL,

    CONSTRAINT "curriculum_day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_objective" (
    "id" TEXT NOT NULL,
    "curriculum_day_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL,

    CONSTRAINT "learning_objective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "self_check_item" (
    "id" TEXT NOT NULL,
    "curriculum_day_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_required" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL,

    CONSTRAINT "self_check_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL,
    "curriculum_day_id" TEXT NOT NULL,
    "sequence_order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "instructions_markdown" TEXT NOT NULL,
    "is_stretch_goal" BOOLEAN NOT NULL DEFAULT false,
    "estimated_minutes" INTEGER,
    "runtime" "task_runtime" NOT NULL,
    "run_command" TEXT,
    "setup_sql" TEXT,
    "starter_files" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_progress" (
    "id" UUID NOT NULL,
    "trainee_id" UUID NOT NULL,
    "task_id" TEXT NOT NULL,
    "status" "task_status" NOT NULL DEFAULT 'in_progress',
    "files" JSONB,
    "code_updated_at" TIMESTAMPTZ,
    "first_submitted_at" TIMESTAMPTZ,
    "last_submitted_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "day_completion" (
    "id" UUID NOT NULL,
    "trainee_id" UUID NOT NULL,
    "curriculum_day_id" TEXT NOT NULL,
    "completed_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "day_completion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journal_response" (
    "id" UUID NOT NULL,
    "trainee_id" UUID NOT NULL,
    "curriculum_day_id" TEXT NOT NULL,
    "response_text" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "journal_response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typing_test_result" (
    "id" UUID NOT NULL,
    "trainee_id" UUID NOT NULL,
    "wpm" INTEGER NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "taken_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "typing_test_result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flag_event" (
    "id" UUID NOT NULL,
    "trainee_id" UUID NOT NULL,
    "task_id" TEXT NOT NULL,
    "type" "flag_event_type" NOT NULL,
    "review_priority" "review_priority" NOT NULL DEFAULT 'NORMAL',
    "context_data" JSONB,
    "duration_ms" INTEGER,
    "timestamp" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "flag_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_log" (
    "id" UUID NOT NULL,
    "trainee_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "active_seconds" INTEGER NOT NULL DEFAULT 0,
    "coding_seconds" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "activity_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "course_sort_order_key" ON "course"("sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "curriculum_day_course_id_day_number_key" ON "curriculum_day"("course_id", "day_number");

-- CreateIndex
CREATE INDEX "learning_objective_curriculum_day_id_sort_order_idx" ON "learning_objective"("curriculum_day_id", "sort_order");

-- CreateIndex
CREATE INDEX "self_check_item_curriculum_day_id_sort_order_idx" ON "self_check_item"("curriculum_day_id", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "task_curriculum_day_id_sequence_order_key" ON "task"("curriculum_day_id", "sequence_order");

-- CreateIndex
CREATE UNIQUE INDEX "task_progress_trainee_id_task_id_key" ON "task_progress"("trainee_id", "task_id");

-- CreateIndex
CREATE UNIQUE INDEX "day_completion_trainee_id_curriculum_day_id_key" ON "day_completion"("trainee_id", "curriculum_day_id");

-- CreateIndex
CREATE UNIQUE INDEX "journal_response_trainee_id_curriculum_day_id_key" ON "journal_response"("trainee_id", "curriculum_day_id");

-- CreateIndex
CREATE INDEX "typing_test_result_trainee_id_taken_at_idx" ON "typing_test_result"("trainee_id", "taken_at");

-- CreateIndex
CREATE INDEX "flag_event_trainee_id_task_id_timestamp_idx" ON "flag_event"("trainee_id", "task_id", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "activity_log_trainee_id_date_key" ON "activity_log"("trainee_id", "date");

-- AddForeignKey
ALTER TABLE "curriculum_day" ADD CONSTRAINT "curriculum_day_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_objective" ADD CONSTRAINT "learning_objective_curriculum_day_id_fkey" FOREIGN KEY ("curriculum_day_id") REFERENCES "curriculum_day"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "self_check_item" ADD CONSTRAINT "self_check_item_curriculum_day_id_fkey" FOREIGN KEY ("curriculum_day_id") REFERENCES "curriculum_day"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_curriculum_day_id_fkey" FOREIGN KEY ("curriculum_day_id") REFERENCES "curriculum_day"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_progress" ADD CONSTRAINT "task_progress_trainee_id_fkey" FOREIGN KEY ("trainee_id") REFERENCES "trainee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_progress" ADD CONSTRAINT "task_progress_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "day_completion" ADD CONSTRAINT "day_completion_trainee_id_fkey" FOREIGN KEY ("trainee_id") REFERENCES "trainee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "day_completion" ADD CONSTRAINT "day_completion_curriculum_day_id_fkey" FOREIGN KEY ("curriculum_day_id") REFERENCES "curriculum_day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_response" ADD CONSTRAINT "journal_response_trainee_id_fkey" FOREIGN KEY ("trainee_id") REFERENCES "trainee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_response" ADD CONSTRAINT "journal_response_curriculum_day_id_fkey" FOREIGN KEY ("curriculum_day_id") REFERENCES "curriculum_day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "typing_test_result" ADD CONSTRAINT "typing_test_result_trainee_id_fkey" FOREIGN KEY ("trainee_id") REFERENCES "trainee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flag_event" ADD CONSTRAINT "flag_event_trainee_id_fkey" FOREIGN KEY ("trainee_id") REFERENCES "trainee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flag_event" ADD CONSTRAINT "flag_event_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_trainee_id_fkey" FOREIGN KEY ("trainee_id") REFERENCES "trainee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

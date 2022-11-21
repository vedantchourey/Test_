
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."author" (
    "id" int8 NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "message" text,
    "subject" text,
    "type" text,
    "user_id" text
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."b_group" (
    "id" int8 NOT NULL,
    "stage_id" int8,
    "number" int8,
    "created_at" timestamptz DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."b_match" (
    "id" int8 NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "number" int8,
    "stage_id" int8,
    "group_id" int8,
    "round_id" int8,
    "child_count" int8,
    "status" int8,
    "opponent1" jsonb,
    "opponent2" jsonb,
    "screenshot" text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."b_match_game" (
    "id" int8 NOT NULL,
    "stage_id" int8,
    "parent_id" int8,
    "number" int8,
    "created_at" timestamptz DEFAULT now(),
    "opponent1" jsonb,
    "opponent2" jsonb,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."b_participant" (
    "id" int8 NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "tournament_id" int8,
    "name" varchar,
    "user_id" uuid,
    "team_id" uuid,
    "gameUniqueId" text,
    "is_checked_in" json DEFAULT '{"matches": []}'::json,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."b_round" (
    "id" int8 NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "number" int8,
    "stage_id" int8,
    "group_id" int8,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."b_stage" (
    "id" int8 NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "tournament_id" int8,
    "name" varchar,
    "type" varchar,
    "number" int8,
    "settings" json,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."b_tournament" (
    "id" int8 NOT NULL,
    "tournament_uuid" uuid,
    "created_at" timestamptz DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition // remove=
-- CREATE TABLE "public"."blocked_users" (
--     "id" uuid NOT NULL DEFAULT gen_random_uuid(),
--     "blockedBy" uuid NOT NULL,
--     "blockedUser" uuid NOT NULL,
--     "createdAt" timestamptz DEFAULT now(),
--     PRIMARY KEY ("id")
-- );

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."brackets" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamptz DEFAULT now(),
    "tournament_id" uuid,
    "players" json,
    "brackets" json,
    "rounds" int8,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."channel" (
    "id" uuid NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "owner" text,
    "is_deleted" bool DEFAULT false,
    "type" text DEFAULT 'one-to-one'::text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."chat_users" (
    "id" int8 NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "channel_id" text,
    "user_id" text,
    "channel_name" text,
    "other_user" text,
    "updated_at" timestamp DEFAULT now(),
    "last_message" text,
    "user_name" text DEFAULT 'NA'::text,
    "channel_type" text DEFAULT 'team'::text,
    "chat_image" text,
    "last_message_by" text DEFAULT 'user'::text,
    "unread" bool DEFAULT false,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."comment_likes" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "commentId" uuid NOT NULL,
    "likedBy" uuid NOT NULL,
    "createdAt" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."configs" (
    "id" int8 NOT NULL,
    "key" varchar,
    "value" varchar,
    "created_at" timestamptz DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition // remove
-- CREATE TABLE "public"."countries" (
--     "id" uuid NOT NULL DEFAULT gen_random_uuid(),
--     "isoCode" text NOT NULL,
--     "displayName" text NOT NULL,
--     PRIMARY KEY ("id")
-- );

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."elo_ratings" (
    "id" int8 NOT NULL,
    "elo_rating" int8 NOT NULL DEFAULT '750'::bigint,
    "game_id" uuid NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "user_id" uuid NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."elo_ratings_history" (
    "id" int8 NOT NULL,
    "elo_rating" int8,
    "user_id" uuid,
    "game_id" uuid,
    "tournament_id" uuid,
    "match_id" int8,
    "created_at" timestamptz DEFAULT now(),
    "team_id" uuid,
    "status" text DEFAULT 'loss'::text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."email_team_invitation" (
    "id" int8 NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "team_id" uuid,
    "invite_by" uuid,
    "email_id" text,
    "type" text DEFAULT 'INVITE'::text,
    "secret" text,
    "message" text,
    PRIMARY KEY ("id")
);

-- Table Definition
CREATE TABLE "public"."free_agency_market" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamptz DEFAULT now(),
    "platform_id" text,
    "game_id" text,
    "user_id" uuid,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."home-carousel" (
    "id" int8 NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "name" varchar,
    "subtitle" varchar,
    "navigation" varchar,
    "image" varchar,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."kyc_details" (
    "id" int8 NOT NULL,
    "user_id" uuid,
    "mobile" varchar,
    "account_no" varchar,
    "ifsc" varchar,
    "name" varchar,
    "aadhar_no" varchar,
    "created_at" timestamptz DEFAULT now(),
    "aadhar_transaction_id" varchar,
    "aadhar_verification_data" json,
    "bank_transaction_id" varchar,
    "bank_verification_data" json,
    "acc_type" text DEFAULT ''::text,
    "bank_name" text,
    PRIMARY KEY ("id")
);

-- Table Definition
CREATE TABLE "public"."match_dispute" (
    "id" int8 NOT NULL,
    "createdAt" timestamptz DEFAULT now(),
    "updatedAt" timestamptz DEFAULT (now() AT TIME ZONE 'utc'::text),
    "tournamentId" text,
    "matchId" text,
    "status" text,
    "reportedBy" text,
    "reason" text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
-- CREATE TABLE "public"."match_formats" (
--     "id" uuid NOT NULL DEFAULT gen_random_uuid(),
--     "displayName" text NOT NULL,
--     "code" text NOT NULL,
--     "peopleInEachTeam" int4 NOT NULL,
--     PRIMARY KEY ("id")
-- );

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."match_result_request" (
    "id" int8 NOT NULL,
    "match_id" int8,
    "screenshot" text,
    "opponent1" jsonb,
    "opponent2" jsonb,
    "created_at" timestamptz DEFAULT now(),
    "status" varchar DEFAULT 'PENDING'::character varying,
    "tournament_id" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."message_report" (
    "id" int8 NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "channel_id" text,
    "user_id" text,
    "message_id" text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."messages" (
    "id" int8 NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "channel_id" text,
    "send_by" text,
    "message" text,
    "metadata" json,
    "is_deleted" bool DEFAULT false,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."news" (
    "id" int8 NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "author" varchar,
    "title" varchar,
    "subtitle" varchar,
    "image" varchar,
    "description" varchar,
    "label" text DEFAULT ''::text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."news_likes" (
    "id" int8 NOT NULL,
    "createdAt" timestamptz DEFAULT now(),
    "likedBy" varchar,
    "newsId" varchar,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."notifications" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" uuid NOT NULL,
    "type" varchar,
    "is_action_required" bool DEFAULT false,
    "status" varchar DEFAULT 'PENDING'::character varying,
    "data" json,
    "created_at" timestamptz DEFAULT now(),
    "message" text,
    "sent_by" text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."orders" (
    "id" int8 NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "order_id" text DEFAULT uuid_generate_v4(),
    "products" _json,
    "amount" int8,
    "payment_status" text,
    "status" text,
    "paymentInfo" json,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."posts_mentions" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamptz DEFAULT now(),
    "post_id" uuid,
    "user_id" text,
    "mention_by" uuid,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."product" (
    "id" int8 NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "name" text,
    "image" text,
    "description" text,
    "amount" int8,
    "product_code" text,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."products" (
    "id" int8 NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "name" text,
    "image" text,
    "description" text,
    "amount" text,
    "product_code" text,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."reported_post" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamptz DEFAULT now(),
    "reported_by" uuid,
    "post_id" uuid,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."support" (
    "id" text NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "message" text,
    "type" text,
    "user_id" uuid,
    "subject" text,
    "status" varchar DEFAULT 'active'::character varying,
    "tableid" int8,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."team_players" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "team_id" uuid NOT NULL,
    "user_id" uuid NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "is_owner" bool DEFAULT false,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."teams" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_by" uuid NOT NULL,
    "platform_id" uuid NOT NULL,
    "game_id" uuid NOT NULL,
    "is_active" bool DEFAULT true,
    "created_at" timestamptz DEFAULT now(),
    "name" varchar,
    "elo_rating" float8 DEFAULT '750'::double precision,
    "teamLogo" text,
    "teamCover" text,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."teams_invitation" (
    "id" int8 NOT NULL,
    "team_id" uuid NOT NULL,
    "user_id" uuid NOT NULL,
    "type" varchar,
    "status" varchar DEFAULT 'PENDING'::character varying,
    "created_at" timestamptz DEFAULT now(),
    "secret" varchar,
    "invite_by" text,
    "message" text,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."tournament_invites" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" uuid NOT NULL,
    "status" varchar DEFAULT 'PENDING'::character varying,
    "team_id" uuid,
    "tournament_id" uuid,
    "created_at" timestamptz DEFAULT now(),
    "is_checked_in" bool DEFAULT false,
    "gameUniqueId" text,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."tournament_users" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamptz DEFAULT now(),
    "userId" uuid,
    "tournamentId" uuid,
    "checkedIn" bool DEFAULT false,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."tournamentsData" (
    "created_at" timestamptz DEFAULT now(),
    "info" json,
    "settings" json,
    "bracketsMetadata" json,
    "streams" json,
    "status" text,
    "joinStatus" text,
    "createTemplateCode" text,
    "name" varchar,
    "game" varchar,
    "startDate" date,
    "startTime" time,
    "about" text,
    "banner" text,
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "templateCode" varchar,
    "sponsor" text,
    "isDeleted" bool DEFAULT false,
    "joinCode" text,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."tournamentsData_backup" (
    "created_at" timestamptz DEFAULT now(),
    "basic" json,
    "info" json,
    "settings" json,
    "bracketsMetadata" json,
    "streams" json,
    "status" text,
    "joinStatus" text,
    "createTemplateCode" text,
    "name" varchar,
    "game" varchar,
    "startDate" date,
    "startTime" time,
    "about" text,
    "banner" text
);

CREATE TABLE "public"."transaction" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "walletId" uuid,
    "userId" uuid,
    "credit" float4,
    "debit" float4,
    "invoice_no" varchar,
    "type" varchar,
    "created_at" timestamptz DEFAULT now(),
    "data" json,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."user_last_seen" (
    "id" int8 NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "user_id" text,
    "last_seen" timestamptz,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."wallet" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "userId" uuid,
    "balance" float4,
    "last_transaction_id" uuid,
    "updatedAt" timestamp,
    "createdAt" timestamptz DEFAULT now(),
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."watchlist" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamptz DEFAULT now(),
    "userId" uuid,
    "playerId" uuid,
    "gameId" text,
    "platformId" text,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."withdraw_request" (
    "id" int8 NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "userId" uuid,
    "status" text DEFAULT 'PENDING'::text,
    PRIMARY KEY ("id")
);
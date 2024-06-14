DROP TABLE IF EXISTS book;
DROP TABLE IF EXISTS author;

CREATE TABLE `author` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`initial` text,
	`birth` text,
	`death` text
);
--> statement-breakpoint
CREATE TABLE `book` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text,
	`initial` text,
	`author_id` integer,
	`translator` text,
	`country` text,
	`genre` text,
	`pub` text,
	`pub_at` text,
	`detail` text,
	`views` integer DEFAULT 0,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`author_id`) REFERENCES `author`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `author_id_idx` ON `book` (`author_id`);
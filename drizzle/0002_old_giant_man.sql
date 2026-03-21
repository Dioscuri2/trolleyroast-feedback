CREATE TABLE `email_captures` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`source` varchar(64) NOT NULL DEFAULT 'landing',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `email_captures_id` PRIMARY KEY(`id`)
);
